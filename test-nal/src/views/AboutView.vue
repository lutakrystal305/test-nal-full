<script lang="ts" setup>
import { onMounted, defineAsyncComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getPostById } from '@/APIs/post.api'
const route = useRoute()

const PostItem = defineAsyncComponent(() => import('@/components/PostItem.vue'))
const data = reactive({})

const getPost = async (): Promise<void> => {
  const res = await getPostById(route.params.id.toString())
  Object.assign(data, res)
}

onMounted(() => {
  getPost()
})
</script>

<template>
  <div class="about d-fex flex-column">
    <h1>This is an about page</h1>
    <component :is="PostItem" :data="data" @updatePost="getPost" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
