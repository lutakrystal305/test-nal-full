<script lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  async setup() {
    const router = useRouter()

    const store = useStore()
    const posts = computed(() => store?.state.postModule?.posts)
    const onNavigatePage = (id: string): void => {
      router.push({ name: 'about', params: { id } })
    }
    await store.dispatch('postModule/getPosts', { currentPage: 0, perPage: 10 })

    return { posts, onNavigatePage }
  },
}
</script>

<template>
  <div class="PostsContainer w-100">
    <div class="container w-100">
      <div class="mt-5 list-unstyled w-100" v-if="posts && posts.length > 0">
        <div
          v-for="(item, index) in posts"
          :key="index"
          class="media item-post my-4 w-100"
          @click="onNavigatePage(item.id)"
        >
          <div><img :src="item.avatar" alt="avatr" /></div>
          <div class="media-body ml-3">
            <h5 class="mt-0 mb-1 text-left">{{ item.name }}</h5>
            <p class="text-left">{{ item.des }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.item-post {
  border-radius: 8px;
  padding: 1rem 1.5rem;
  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
  }
  img {
    border-radius: 4px;
    overflow: hidden;
  }
  &:hover {
    border: 1px solid #ddd;
    cursor: pointer;
    box-shadow: 0 3px 10px #ddd;
  }
  .media-body {
    @media (max-width: 600px) {
      max-height: 128px;
      overflow: hidden;
    }
  }
}
</style>
