
import $ from "jquery";

//储存全局信息
export default ({
  state: {
    is_verified: false,
  },

  getters: {
  },

  mutations: {

    updateVerified(state, is_verified) {
      state.is_verified = is_verified
    },
  },

  actions: {

    getVerified(context, data) {
      $.ajax({
        url: "http://localhost:3000/api/user/account/verify/",
        type: "post",
        data: {
          turnstileResponse: data.turnstileResponse,
        },
        success(resp) {
          if (resp.error_message == "success") {
            context.commit("updateVerified", true);
            data.success(resp);
          } else {
            data.error(resp);
          }
        }
      })
    },

  },

  modules: {
  },

})
