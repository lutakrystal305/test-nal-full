import type {
  ICreatePayload,
  IEditPayload,
  IPayload,
  IPost,
  IQsearch,
  IState,
  IResPost,
} from '@/interface/index'
import { MUTATIONS } from '@/constant'
import { getPosts, createPost, editPost, searchPost } from '@/APIs/post.api'

const state: IState = {
  posts: [],
  currentPage: 0,
  perPage: 10,
  totalPage: 0,
  isSearch: false,
  isLoading: false,
}

const actions = {
  async getPosts({ commit }: any, payload: IPayload): Promise<void> {
    commit(MUTATIONS.UPDATEPAGE, payload.currentPage)
    const res = await getPosts(payload)
    console.log(res)
    commit(MUTATIONS.GET, res)
  },
  async editPost({ commit }: any, payload: IEditPayload): Promise<void> {
    const res = await editPost(payload)
    commit(MUTATIONS.EDIT, res)
  },
  async createPost({ commit }: any, payload: ICreatePayload): Promise<void> {
    const res = await createPost(payload)
    commit(MUTATIONS.CREATE, res)
  },
  async searchPost({ commit }: any, payload: IQsearch): Promise<void> {
    if (payload?.query?.length > 0) {
      commit(MUTATIONS.SEARCH, true)
      const res = await searchPost(payload)
      commit(MUTATIONS.GET, res)
    } else {
      commit(MUTATIONS.SEARCH, false)
    }
  },
}

const mutations = {
  [MUTATIONS.GET](state: IState, data: IResPost): void {
    console.log(data)
    state.posts = data.posts
    state.currentPage = +data.currentPage
    state.totalPage = +data.totalPage
    state.perPage = +data.perPage
  },
  [MUTATIONS.EDIT](state: IState, data: IPost[]): void {
    state.posts = data
  },
  [MUTATIONS.CREATE](state: IState, data: IPost[]): void {
    state.posts = data
  },
  [MUTATIONS.UPDATEPAGE](state: IState, data: number): void {
    state.currentPage = data
  },
  [MUTATIONS.SEARCH](state: IState, data: boolean): void {
    state.isSearch = data
  },
}

const postModule = {
  namespaced: true,
  state,
  mutations,
  actions,
}
export default postModule
