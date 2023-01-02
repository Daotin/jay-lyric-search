<script setup>
import { ref } from "vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>
<template>
  <el-card class="card-item" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <!-- <el-button class="button" text>Operation button</el-button> -->
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</div>
  </el-card>
</template>
<style lang="less" scoped>
.card-item {
  width: 300px;
}
</style>
