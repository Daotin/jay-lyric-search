<script setup>
import { ref, shallowRef, onMounted } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import SongCard from "./components/songCard.vue";
import Footer from "./components/Footer.vue";
import MiniSearch from "minisearch";
// import documents from "/jay.json?raw";
// const aaa = new URL("../public/jay.json", import.meta.url).href;

/******************************************************
 * 搜索部分
 ****************************************************/
const searchText = ref("apple");
const results = ref([]); // 搜索的结果

function handleSearch() {
  const results = miniSearch.value.search(searchText.value.trim());
  console.log("⭐results==>", results);
}

/******************************************************
 * MiniSearch 部分
 ****************************************************/
const documents = shallowRef([]);
const miniSearch = shallowRef(
  new MiniSearch({
    fields: ["title", "text"], // fields to index for full-text search
    storeFields: ["title", "category"], // fields to return with search results
  })
);

/******************************************************
 * 生命周期
 ****************************************************/
async function getJayJson() {
  try {
    const module = await import("../public/jay.json");
    documents.value = module.default;
    console.log("⭐documents==>", documents.value);
    miniSearch.value.addAll(documents.value);
  } catch (error) {
    console.error(error);
  } finally {
  }
}

onMounted(() => {
  getJayJson();
});
</script>

<template>
  <el-container>
    <el-header>
      <div class="search-header">
        <el-input v-model="searchText" placeholder="输入标题或者正文">
          <template #append>
            <el-button icon="Search" @click="handleSearch" />
          </template>
        </el-input>
      </div>
    </el-header>
    <el-main>
      <div class="card-box">
        <SongCard :data="item" v-for="item in 30" />
      </div>
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<style scoped lang="less">
.el-container {
  height: 100%;
  padding: 20px;
  .search-header {
    width: 400px;
    margin: 0 auto;
  }
  .card-box {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    .card-item {
      margin: 0 20px 20px 0;
    }
  }
}
</style>
