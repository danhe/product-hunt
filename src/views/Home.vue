<template>
  <div class="home">
    <h1>Hello</h1>
    <p>
      I'm Dan, here is my project on VueJS with product-hunt's API.
      I designed the project as a large application.
      Here is some things that I want to explain to you:
    </p>
    <ul>
      <li>
        I created a ProductHuntMixin to get the posts list from product-hunt's API,
        and it could also allow me to get different kind of data if needed.
      </li>
      <li>
        I also used vuex to centralize the state(posts list) of the application.
        I connected it to the mixin, so the component could just listen the store.
      </li>
      <li>
        I used css grid system to display my post card, and maked it responsive.
      </li>
      <li>
        I connected the single select to the url params, so we can get the same results when copying the url
      </li>
      <li>
        Finally, I deployed the project on the cloud with Zeit Now. 
        <a href="https://product-hunt.danhe.now.sh">Click here</a>
      </li>
    </ul>
    <p>
      Here is my <a href="https://github.com/danhe/product-hunt">github repository</a>, 
      you can also see the tag "1.0-without-vuex" which is without vuex
    </p>

    <p class="home-button">
      <router-link 
        to="/product-hunt"
        tag="button"
      >
        Show me the Posts
      </router-link>
    </p>
  </div>
</template>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/colors.styl'

  .home {
    text-align: justify

    h1 {
      color: $primary_color
    }

    a {
      color: $primary_color
      text-decoration: none

      &:hover {
        color: #f57e58
      }
    }

    &-button {
      text-align: center
      margin-top: 40px

      button {
        background: $primary_color
        color: white
        font-weight: 400;
        border: 1px solid transparent
        padding: .375rem .75rem
        font-size: 1rem
        line-height: 1.5
        border-radius: .25rem
        cursor: pointer
      }
    }
  }
</style>

