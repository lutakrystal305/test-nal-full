<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const data = ref('')

const redirectHome = (): void => {
  router.push({ name: 'home' })
}

const handleSearch = (): void => {
  console.log(data)
  store.dispatch('postModule/searchPost', { query: data.value })
}
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="navbar-brand logo" @click="redirectHome">TEST</div>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/">Home</router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="data"
          @input="handleSearch"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
.logo {
  cursor: pointer;
}
</style>
