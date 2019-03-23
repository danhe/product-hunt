<template>
  <div class="home">
    <PostCardsList 
      :posts="posts"
    />
  </div>
</template>

<script>
import _get from 'lodash/get'

import axios from 'axios'
import PostCardsList from '@/components/PostCardsList.vue'

export default {
  name: 'home',
  data(){
    return {
      posts: []
    }
  },
  created(){
    this.fetchPosts()
  },
  components: {
    PostCardsList
  },
  methods: {
    fetchPosts(){
      const instance = axios.create({
        baseURL: 'https://api.producthunt.com',
        timeout: 1000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 9fc09fc67a01d1ab20b258db5b1751f071e1aabd1c394c54850b85da0890bda5'
        }
      })

      instance.get('/v1/posts')
        .then(response => {
          this.posts = _get(response, 'data.posts')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .home {
    
  }

</style>

