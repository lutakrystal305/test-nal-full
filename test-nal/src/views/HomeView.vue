<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed, onMounted, defineAsyncComponent, ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import { createPostSchema } from '@/validates/createPost'
import { PAGINATE } from '@/constant'

const PostsContainer = defineAsyncComponent(
  () => import('@/components/PostsContainer.vue')
)

const store = useStore()

const currentPage = computed(() => store.state.postModule.currentPage + 1)
const totalPage = computed(() => store.state.postModule.totalPage)
const isSearch = computed(() => store.state.postModule.isSearch)

const openCreate = ref(false)

const { handleSubmit, errors, isSubmitting, resetForm } = useForm({
  validationSchema: createPostSchema,
})

const { value: name } = useField('name')
const { value: des } = useField('des')

const onSubmit = handleSubmit(async (values) => {
  console.log(values) // send data to API
  // reset the form and the field values to their initial values
  await store.dispatch('postModule/createPost', {
    name: values.name,
    des: values.des,
    avatar: `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${Math.floor(
      Math.random() * 100
    )}.jpg`,
  })
  console.log(123123)
  await store.dispatch('postModule/getPosts', { currentPage: 0, perPage: 10 })
  resetForm()
  openCreate.value = false
})

const onChangePage = async (type: string): Promise<void> => {
  let pageNavigate
  if (type === PAGINATE.INCRE) {
    pageNavigate = currentPage.value
  } else {
    pageNavigate = currentPage.value - 2
  }
  await store.dispatch('postModule/getPosts', {
    currentPage: pageNavigate,
    perPage: 10,
  })
}

watch(
  () => isSearch,
  (prev, curr) => {
    if (!curr)
      store.dispatch('postModule/getPosts', { currentPage: 0, perPage: 10 })
  }
)
</script>
<template>
  <div
    class="home w-100 d-flex flex-column justify-content-center align-items-center h-100"
  >
    <div class="hello my-4">
      <h1>My Blogs</h1>
    </div>
    <div v-if="openCreate">
      <form
        @submit="onSubmit"
        class="d-flex flex-column justify-content-center align-items-center"
      >
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          placeholder="name"
          class="px-3 py-3 my-2"
        />
        <span :class="{ isActiveErr: errors.name }">{{ errors.name }}</span>
        <textarea
          id="des"
          v-model="des"
          type="text"
          name="des"
          placeholder="des"
          class="px-3 py-3 my-2"
        />
        <span :class="{ isActiveErr: errors.des }">{{ errors.des }}</span>
        <button
          :class="{
            'btn-primary':
              !errors.des && !errors.name && name.length > 0 && des.length > 0,
          }"
          class="btn"
        >
          Create Blog
        </button>
      </form>
    </div>
    <div v-else>
      <button @click="openCreate = true">Create Blog</button>
    </div>
    <Suspense>
      <template #default>
        <component :is="PostsContainer" />
      </template>
      <template #fallback>
        <div class="spinner-border text-success my-4" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </template>
    </Suspense>
    <div class="pagination-custom" v-if="!isSearch && totalPage > 0">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" @click="onChangePage(PAGINATE.DECRE)">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              v-if="currentPage !== 1"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            class="page-item"
            v-if="currentPage !== 1"
            @click="onChangePage(PAGINATE.DECRE)"
          >
            <a class="page-link" href="#">{{ currentPage - 1 }}</a>
          </li>
          <li class="page-item active">
            <a class="page-link" href="#">{{ currentPage }}</a>
          </li>
          <li
            class="page-item"
            v-if="currentPage < totalPage"
            @click="onChangePage(PAGINATE.INCRE)"
          >
            <a class="page-link" href="#">{{ currentPage + 1 }}</a>
          </li>
          <li
            class="page-item"
            v-if="currentPage < totalPage"
            @click="onChangePage(PAGINATE.INCRE)"
          >
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<style scoped lang="scss">
.isActiveErr {
  color: red;
}
form {
  input {
    width: 400px;
    height: 50px;
  }
  textarea {
    width: 400px;
  }
  button {
    border: 1px solid #aaa;
  }
}
</style>
