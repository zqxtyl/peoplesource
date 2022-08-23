<template>
  <el-dropdown @command="changeLanguage">
    <span class="el-dropdown-link">
      选择语言<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="key" v-for="(value,key) in messages" :key="key" :disabled="key === $i18n.locale"
        >{{key}}</el-dropdown-item
      >

    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from "@/i18n";
import Cookie from 'js-cookie'
console.log(messages);
export default {
  name: "ToggleLang",
  data() {
    return {
      messages,
    };
  },

  created() {},

  methods: {
    changeLanguage(val) {
      this.$i18n.locale = val; // 
      this.$router.go(0)
      Cookie.set('lang',val)
    },
  },
};
</script>

<style scoped></style>
