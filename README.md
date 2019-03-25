# product-hunt

[Demo here](https://product-hunt.danhe.now.sh)

This is a project on VueJS with product-hunt's API. Here is some things that I want to explain to you:

*   I created a ProductHuntMixin to get the posts list from product-hunt's API, and it could also allow me to get different kind of data if needed.
*   I also used vuex to centralize the state(posts list) of the application. I connected it to the mixin, so the component could just listen the store.
*   I used css grid system to display my post card, and maked it responsive.
*   I connected the single select to the url params, so we can get the same results when copying the url
*   Finally, I deployed the project on the cloud with Zeit Now. [Click here](https://product-hunt.danhe.now.sh)

You can also see the tag "1.0-without-vuex" which is without vuex

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
