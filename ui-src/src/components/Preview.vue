<template>
  <a class="v-link" v-bind:href="item.endpoint">
    <div class="card-body">
      <div>
        <i style="font-size: 3rem; margin-right: 10px" class="el-icon-news"></i>
      </div>
      <div style="flex-grow: 1">
        <span style="color: #409EFF; font-size: large">
          !{{ item.name }} - {{ item.gitlab.title }}
          <el-tag
            :type="item.gitlab.state === 'merged' ? 'danger' : item.gitlab.state === 'opened' ? 'success' : 'info' "
            size="small"
          >{{ item.gitlab.state }}</el-tag>
        </span>
        <br>
        <span
          :title="item.updated | moment('dddd, D MMMM YYYY, HH:mm:ss a')"
          style="color: #909399"
        >Modificado: {{ item.updated | moment('from') }} atrás</span>
        <br>
        <span>
          Disponível em:
          <a
            class="v-link"
            style="color: #409EFF;"
            :href=" item.gitlab.web_url"
          >GitLab</a>
        </span>
        <span style="display: flex; margin-left: auto; margin-top: auto; float: inline-end">
          <a
            class="v-link"
            style="color: #409EFF; font-size: 0.9rem; display: contents"
            :href="item.gitlab.author.web_url"
          >
            <img class="v-avatar" :src="item.gitlab.author.avatar_url">
            {{ item.gitlab.author.name }}
          </a>
        </span>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    item: {
      name: String,
      created: Number,
      endpoint: String,
    },
  },
};
</script>

<style scoped>
.v-link {
  color: #909399;
  text-decoration: none;
}

.card-body:hover {
  transition: all 0.2s linear;
}

.card-body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1em;
  text-align: left;
}

.light-shadow,
.card-body:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.basic-shadow,
.card-body {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.v-avatar {
  border-radius: 100%;
  max-width: 1.5rem;
  padding: 0 0.5rem;
}
</style>


