import { createStore } from "vuex";
import postModule from "./post";

const store = createStore({
  modules: { postModule }
});

export default store;
