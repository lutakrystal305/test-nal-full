<script lang="ts" setup>
import { useStore } from 'vuex'
import { defineProps, ref, defineEmits } from 'vue'
import { useField, useForm } from 'vee-validate'

const store = useStore()

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['updatePost'])

const handleUpdatePost = () => {
  emit('updatePost')
}

const checkEditOption = ref(false)
const openEdit = ref(false)

const desEdit = ref(props.data.des)
const error = ref(false)

const onClickOption = () => {
  checkEditOption.value = !checkEditOption.value
  desEdit.value = props.data.des
}

const handleInput = (evt) => {
  if (evt.target.value.length < 6) {
    error.value = true
  } else {
    error.value = false
  }
}

const onSubmit = async () => {
  await store.dispatch('postModule/editPost', {
    id: props.data.id,
    des: desEdit.value,
  })
  handleUpdatePost()
  desEdit.value = ''
  openEdit.value = false
}
</script>

<template>
  <div class="PostItem d-flex w-100">
    <div class="container w-100">
      <div class="mt-5 list-unstyled w-100" v-if="data">
        <div
          class="d-flex flex-column justify-content-center align-items-center item-post my-4 position-relative w-100"
        >
          <div class="options-post position-absolute">
            <p @click="onClickOption">...</p>
          </div>
          <div class="options" v-if="checkEditOption">
            <button class="edit-btn" @click="openEdit = true">Edit</button>
          </div>
          <div class="img my-2"><img :src="data.avatar" alt="avatr" /></div>
          <div class="d-flex flex-column ml-3">
            <h5 class="mt-0 mb-1 text-left">{{ data.name }}</h5>
            <div
              class="d-flex flex-column justify-content-center align-items-center my-3 form"
              v-if="openEdit"
            >
              <textarea
                name="desEdit"
                id="desEdit"
                v-model="desEdit"
                type="text"
                @input="handleInput"
              ></textarea>
              <p :class="{ isActiveErr: error }" v-if="error">
                The min description is 6 character
              </p>
              <button
                @click="onSubmit"
                class="my-2 btn"
                :class="{ 'btn-primary': !error }"
              >
                OK
              </button>
            </div>
            <p v-else class="text-left">{{ data.des }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.isActiveErr {
  color: red;
}
.options-post {
  top: 5px;
  right: 10px;
  font-size: 32px;
  line-height: 0.2;
  cursor: pointer;
}
.options {
  top: 25px;
  right: 10px;
  position: absolute;
}
.PostItem {
  max-width: 500px;
  max-height: 500px;
  .img {
    width: 80% !important;
    height: 80% !important;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.form {
  textarea {
    width: 300px;
    height: 125px;
  }
  button {
    padding: 10px 40px;
    border: 1px solid #aaa;
    box-shadow: 0 3px 10px #ddd;
  }
}
</style>
