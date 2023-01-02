<script setup>
import { ref, shallowRef, onMounted } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import SongCard from "./components/songCard.vue";
import Footer from "./components/Footer.vue";
import MiniSearch from "minisearch";
// import { search } from "./search";
// import documents from "/jay.json?raw";
// const aaa = new URL("../public/jay.json", import.meta.url).href;

/******************************************************
 * 搜索部分
 ****************************************************/
const searchText = ref("你微笑浏览");
const results = ref([]); // 搜索的结果

function handleSearch() {
  results.value = miniSearch.value
    .search(searchText.value.trim())
    .map((result) => {
      result.hints = markHints(result);
      return result;
    });
  console.log("⭐handleSearch==>", results.value);
}

function markHints(result) {
  const hints = {};

  result.terms.forEach((term) => {
    const regexp = new RegExp(`(${term})`, "gi");

    result.match[term].forEach((field) => {
      const value = result[field];

      if (typeof value === "string") {
        hints[field] = value.replace(regexp, "<mark>$1</mark>");
      }
      // else if (field === "headings") {
      //   const markedValue = value.reduce((items, h) => {
      //     if (h.title.toLowerCase().includes(term)) {
      //       items.push({
      //         id: h.id,
      //         title: h.title.replace(regexp, "<mark>$1</mark>"),
      //       });
      //     }
      //     return items;
      //   }, []);
      //   hints[field] = markedValue.length ? markedValue : null;
      // }
    });
  });

  return hints;
}

/******************************************************
 * MiniSearch 部分
 ****************************************************/
const documents = shallowRef([]);
const miniSearch = shallowRef(
  new MiniSearch({
    idField: "name",
    fields: ["album", "lrc"],
    storeFields: ["name", "lrc"],
    // Custom extractField function that can deal with arrays
    extractField: (document, fieldName) => {
      if (Array.isArray(document[fieldName])) {
        return document[fieldName].join(" ");
      } else {
        return document[fieldName];
      }
    },
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

  // search();
});
</script>

<template>
  <el-container>
    <el-header>
      <div class="search-header">
        <h2>周杰伦歌词搜索</h2>
        <el-input
          v-model="searchText"
          placeholder="输入标题或者正文"
          @keyup.enter.native="handleSearch"
        >
          <template #append>
            <el-button icon="Search" @click="handleSearch" />
          </template>
        </el-input>
      </div>
    </el-header>
    <el-main>
      <div class="card-box">
        <template v-if="results.length">
          <SongCard
            :keyword="searchText"
            :result="result"
            v-for="result in results"
          />
        </template>
        <div v-else class="empty-box">
          <el-empty description="点击按钮进行搜索🔍" />
        </div>
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
  padding-top: 40px;
  .el-header {
    height: auto;
  }
  .search-header {
    width: 400px;
    margin: 0 auto;
    h2 {
      text-align: center;
      margin-bottom: 20px;
    }
  }
  .card-box {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    .card-item {
      margin: 0 20px 20px 0;
    }
    .empty-box {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
