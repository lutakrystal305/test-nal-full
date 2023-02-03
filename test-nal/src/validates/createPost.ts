import * as yup from 'yup'

export const editPostSchema = yup.object({
  description: yup.string().required().min(10),
})

export const createPostSchema = yup.object({
  name: yup.string().required().max(20),
  des: yup.string().required().min(10),
})
