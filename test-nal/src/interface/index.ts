export interface IPost {
  avatar: string
  createdAt: string
  des: string
  name: string
  id: string
}

export interface IState {
  posts: IPost[]
  currentPage: number
  perPage: number
  totalPage: number
  isSearch: boolean
  isLoading: boolean
}

export interface IPayload {
  currentPage: number
  perPage: number
}

export interface IQsearch {
  query: string
}

export interface IEditPayload {
  des: string
  id: string
}

export interface ICreatePayload {
  avatar: string
  createdAt: string
  des: string
  name: string
}

export interface IResPost {
  posts: IPost[]
  currentPage: number
  perPage: number
  totalPage: number
}
