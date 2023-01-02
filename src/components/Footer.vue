<script setup>
import { ref } from "vue";
</script>
<template>
  <div class="footer-box">
    Copyright © 2022 Powered By
    <el-link href="https://github.com/Daotin/jay-lyric-search"
      >jay-lyric-search</el-link
    >
  </div>
</template>
<style lang="less" scoped>
.footer-box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  :deep(.el-link) {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    vertical-align: text-bottom;
  }
}
</style>
