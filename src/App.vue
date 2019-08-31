<template>
  <div id="app">
    <e-header :seller="seller"></e-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<style lang="sass">
  @import "./common/sass/index.scss"
  @import "./common/sass/icon.css"

  #app 
    line-height: 1
    line-weight: 200
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    //-webkit-font-smoothing: antialiased
    //-moz-osx-font-smoothing: grayscale
    //text-align: center
    //color: #2c3e50
    //margin-top: 3.75em
  

  #app>.tab 
    display: flex
    width: 100%
    height: 2.5rem
    line-height: 2.5rem

  #app>.tab>.tab-item 
    flex: 1
    text-align: center

  #app>.tab>.tab-item>a 
    display: block
    font-size: 1rem
    color: rgb(77, 85, 93)

  #app>.tab>.tab-item>a.active 
    color: rgb(240, 20, 20)
</style>

<script>
  import axios from "axios";
  import header from "./components/header/header";

  export default {
    name: "home",

    data() { 
      return {
        seller: {},
      };
    },

    created() {
      this.getSellerData();
      this.getGoodsData();
      this.getRatingsData();
    },

    components: {
      "e-header": header,
    },

    methods: {
      getSellerData() {
        axios.get("https://api.myjson.com/bins/19fsaz").then(res => {
          this.seller = res.data.seller;
          console.log(this.seller);
        });
      },

      getGoodsData() {
        axios.get("https://api.myjson.com/bins/19fsaz").then(res => {
            console.log(res.data.goods);
          });
      },

      getRatingsData() {
        axios.get("https://api.myjson.com/bins/19fsaz").then(res => {
          console.log(res.data.ratings);
        });
      }
    }
  }
</script>