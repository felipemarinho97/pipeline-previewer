<template>
  <el-container v-loading.fullscreen="isMrLoading || isBrLoading">
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">Recentes</el-menu-item>
        <el-menu-item index="2">Branchs</el-menu-item>
        <el-menu-item index="3">Merge requests</el-menu-item>
      </el-menu>
    </el-header>
    <div v-if="activeIndex != 2">
      <div v-bind:key="item.name" style="margin: .8rem;" v-for="item in mrs">
        <Preview v-if="activeIndex == 1 || activeIndex == 3" v-bind:item="item"/>
      </div>
    </div>
    <div v-bind:key="item.name" style="margin: .8rem;" v-for="item in branchs">
      <BranchPreview v-if="activeIndex == 2" v-bind:item="item"/>
    </div>
  </el-container>
</template>

<script>
import axios from 'axios';
import Preview from './Preview.vue';
import BranchPreview from './BranchPreview.vue';

export default {
  name: 'Home',
  components: {
    Preview,
    BranchPreview,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      mrs: null,
      branchs: null,
      activeIndex: 1,
      isMrLoading: true,
      isBrLoading: true,
    };
  },
  methods: {
    handleSelect(i) {
      this.activeIndex = i;
    },
  },
  mounted() {
    this.isMrLoading = true;
    this.isBrLoading = true;

    axios
      .get('/api/mr/list')
      .then(response => {
        this.isMrLoading = false;

        this.mrs = response.data.merge_requests.sort(
          (a, b) => Date.parse(b.updated) - Date.parse(a.updated)
        );
      })
      .catch(() => {
        this.isMrLoading = false;
      });

    axios
      .get('/api/branch/list')
      .then(response => {
        this.isBrLoading = false;

        this.branchs = response.data.branchs.sort(
          (a, b) => a.created < b.created
        );
      })
      .catch(() => {
        this.isBrLoading = false;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
