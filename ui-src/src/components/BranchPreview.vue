<template>
  <a class="v-link" v-bind:href="item.endpoint">
    <div class="card-body">
      <div>
        <i style="font-size: 3rem; margin-right: 10px" class="el-icon-news"></i>
      </div>
      <div>
        <span style="color: #409EFF; font-size: large">Branch #{{ item.name }}</span>
        <br>
        <span
          :title="item.created | moment('dddd, D MMMM YYYY, HH:mm:ss a')"
          style="color: #909399"
        >Criado: {{ item.created | moment('from') }} atrás</span>
        <br>
        <span>
          Disponível em:
          <a
            class="v-link"
            style="color: #409EFF;"
            :href="'https://gitlab.com/projeto-petrobras/frontend/tree/' + item.name"
          >GitLab</a>
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
</style>


