import Vue from 'vue'
import Vuex from 'vuex'
import _get from 'lodash/get'

Vue.use(Vuex)

const ADD_POSTS = 'ADD_POSTS'

export default new Vuex.Store({
  state: {
    posts: []
  },
  getters: {
    /**
     * Get the stored posts
     * @param {Object} state of the application
     * @return {Array} list of posts
     */
    selectPosts(state) {
      return _get(state, 'posts', [])
    }
  },
  mutations: {
    /**
     * Add posts to the store
     */
    [ADD_POSTS](state, posts) {
      state.posts = posts
    }
  },
  actions: {
    /**
     * Add posts the the store
     * @param {Object} context 
     * @param {Object} payload 
     */
    addPosts({ commit }, payload) {
      commit(ADD_POSTS, payload)
    }
  }
})
