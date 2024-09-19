import { createRouter, createWebHistory } from 'vue-router'
import VerifyPage from '@/components/VerifyPage.vue'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PostsIndex,
    meta: {
      requestAuth: false,
      requestVerify: false
    }
  },//重定向主页等等
  {
    path: '/posts/',
    name: 'posts_index',
    redirect: '/',
    meta: {
      requestAuth: false,
      requestVerify: false
    }
  },
  {
    path: '/404/',
    name: '404',
    component: NotFound,
    meta: {
      requestAuth: false
    }

  },
  {
    path: '/user/account/verify/',
    name: 'verify_page',
    component: VerifyPage,

    meta: {
      requestAuth: false
    }

  },

  {
    path: '/user/account/login/',
    name: 'user_account_login',
    component: UserLogin,
    meta: {
      requestAuth: false,
      requestVerify: true
    }
  },
  {
    path: '/user/account/register/',
    name: 'user_account_register',
    component: UserRegister,
    meta: {
      requestAuth: false,
      requestVerify: true
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404/'
  },//输入其他地址则重定向到404
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
//实现必须登录
//to:要去的页面
//from:从哪个页面来
//next:下一步操作
router.beforeEach((to, from, next) => {
  //判断是否已经登录，登录持久化，从localStorage中获取jwt_token
  const jwt_token = localStorage.getItem('jwt_token');
  if (jwt_token) {
    store.commit("updateToken", jwt_token);
    //通过获取用户信息是否成功来判断是否登录
    store.dispatch('getinfo', {
      success() {
        store.state.user.is_login = true;
        if (to.meta.requestVerifyd && !store.state.user.is_verified) {
          next({
            name: "verify_page",
            query: { redirect: to.fullPath } // 将目标页面信息存储起来
          })
        } else {
          next();
        }
        store.commit("updatePullingInfo", false);
      },
      error() {
        store.commit("updatePullingInfo", false);
        //获取用户信息失败后跳转到登录页
        //这里不能用router.push，因为这里是在路由守卫中，会导致死循环
        //因为router会立马改变路由，又会触发路由守卫
        if (to.meta.requestAuth) {
          next({
            name: "user_account_login",
          })
        } else {
          next();
        }
      }
    })
  } else {
    store.commit("updatePullingInfo", false);
    if (to.meta.requestAuth) {
      next({
        name: "user_account_login",
      })
    } else {
      if (to.meta.requestVerify && !store.state.user.is_verified) {
        next({
          name: "verify_page",
          query: { redirect: to.fullPath } // 将目标页面信息存储起来
        })
      } else {
        next();
      }
    }
  }
})


export default router
