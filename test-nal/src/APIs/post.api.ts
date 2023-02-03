import type {
  ICreatePayload,
  IEditPayload,
  IPayload,
  IQsearch,
} from '@/interface'
import AxiosClient from './api'

async function getPosts(payload: IPayload) {
  const res = await AxiosClient.get(
    `/post?currentPage=${payload.currentPage}&perPage=${payload.perPage}`
  )
  return res.data
}

async function searchPost(payload: IQsearch) {
  const res = await AxiosClient.get(`/post/search?query=${payload.query}`)
  return res.data
}

async function getPostById(id: string) {
  const res = await AxiosClient.get(`/post/byId/${id}`)
  return res.data
}
async function createPost(data: ICreatePayload) {
  const res = await AxiosClient.post('/post/create', data)
  return res.data
}

async function editPost(data: IEditPayload) {
  const res = await AxiosClient.post(`/post/update/${data.id}`, {
    des: data.des,
  })
  return res.data
}
export { getPosts, getPostById, createPost, editPost, searchPost }
