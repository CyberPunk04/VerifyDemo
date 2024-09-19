<template>
  <ContentField>
    <template v-slot:main>
      <h3>jinzhihang.xyz</h3>
      <h5>正在验证您的身份。这可以需要几秒钟时间。</h5>
      <h6>稍后将为您跳转...</h6>
      <vue-turnstile v-model="token" site-key="0x4AAAAAAAj8m6NsokMdL4BD" />
    </template>
  </ContentField>
</template>

<script>
import ContentField from "@/components/ContentField.vue";
import { watch } from "vue";
import VueTurnstile from "vue-turnstile";
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    let token = ref("");
    const store = useStore();
    const router = useRouter();

    watch(token, (newToken) => {
      if (newToken) {
        store.dispatch("getVerified", {
          turnstileResponse: newToken,
          success: () => {
            const redirect = router.currentRoute.value.query.redirect || '/user/account/login/';
            router.push({
              path:redirect,
            });
          },
        });
      }
    });

    return {
      token
    };
  },

  components: {
    ContentField,
    VueTurnstile
  }
};
</script>

<style>
</style>