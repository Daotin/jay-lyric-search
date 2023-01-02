<script setup>
import { ref } from "vue";

const props = defineProps({
  keyword: {
    type: String,
    default: "",
  },
  result: {
    type: Object,
    default: () => {},
  },
});

function getMatchScore() {
  if (props.result.score) {
    return props.result.score.toFixed(2);
  }
  return 0;
}
function getShowLrcIndexs() {
  let indexs = [];
  console.log("⭐==>props.result.lrc", props.result);
  // if (props.result.lrc?.length) {
  //   props.result.lrc.map((item, i) => {
  //     if (props.keyword && item.includes(props.keyword)) {
  //       indexs.push(i - 1);
  //       indexs.push(i);
  //       indexs.push(i + 1);
  //     }
  //   });
  // }
  return indexs;
}
</script>
<template>
  <el-card class="card-item" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>{{ result.name }}</span>
        <el-tag type="success" effect="light" round>
          <span>匹配度：</span>{{ getMatchScore() }}
        </el-tag>
      </div>
    </template>
    <div class="text item">...</div>
    <div v-html="result.hints.lrc"></div>
    <!-- <div v-for="(item, index) in result.lrc" :key="index" class="text item">
      <span>{{ item }}</span>
    </div> -->
    <div class="text item">...</div>
  </el-card>
</template>
<style lang="less" scoped>
.card-item {
  width: 300px;
  :deep(.el-card__header) {
    background-color: #f9f9f9;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
