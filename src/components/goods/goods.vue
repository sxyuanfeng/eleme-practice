<template>
<div>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" :key="item.id" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index, $event)">
                    <span class="text border-1px">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{ item.name }}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" :key="item.id" class="food-list food-list-hook">
                    <h1 class="title">{{ item.name }}</h1>
                    <ul>
                        <li @click="selectFood(food, $event)" v-for="food in item.foods" :key="food.id" class="food-item border-1px">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name }}</h2>
                                <p class="desc">{{ food.description }}</p>
                                <div class="extra">
                                    <span class="count">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{ food.price }}</span><span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <e-cartcontrol :food="food" v-on:cart-add="cartAdd"></e-cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <e-shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></e-shopcart>
    </div>
    <e-food :food="selectedFood" ref="food"></e-food>
</div>
</template>

<style lang="sass">
@import "../../common/sass/index.scss"

.goods
    display: flex
    position: absolute
    top: 10.875rem
    bottom: 2.875rem
    width: 100%
    overflow: hidden
    .menu-wrapper   
        flex: 0 0 5rem
        width: 5rem
        background: #f3f5f7
        .menu-item
            display: table
            height: 3.375rem
            width: 3.5rem
            padding: 0 .75rem
            line-height: .875rem
            &.current
                position: relative
                z-index: 10
                margin-top: -1px
                background: #fff
                font-weight: 700
                .text 
                    border-bottom: 0rem
            .icon
                display: inline-block
                vertical-align: bottom
                width: .75rem
                height: .75rem
                margin-right: .125rem
                background-size: .75rem .75rem
                background-repeat: no-repeat
                &.decrease
                    @include bg-image('decrease_3')
                &.discount
                    @include bg-image('discount_3')
                &.guarantee
                    @include bg-image('guarantee_3')
                &.invoice
                    @include bg-image('invoice_3')
                &.special
                    @include bg-image('special_3')
            .text
                display: table-cell
                width: 3.5rem
                vertical-align: middle
                font-size: .75rem
    .foods-wrapper
        flex: 1
        .title 
            padding-left: .875rem
            height: 1.625rem
            line-height: 1.625rem
            border-left: .125rem solid #d9dde1
            font-size: .75rem
            color: rgb(147, 153, 159)
            background: #f3f5f7
        .food-item  
            display: flex
            margin: 1.125rem
            padding-bottom: 1.125rem
            &:last-child
                border-bottom: 0rem
                margin-bottom: 0
            .icon
                flex: 0 0 3.5625rem
                margin-right: .625rem
            .content
                position: relative
                flex: 1
                .name
                    margin: .125rem 0 .5rem 0
                    height: .875rem
                    line-height: .875rem
                    font-size: .875rem
                    color: rgb(7, 17, 27)
                .desc, .extra
                    line-height: .625rem
                    font-size: .625rem
                    color: rgb(147, 153, 159)
                .desc
                    margin-bottom: .5rem
                    line-height: .75rem
                .extra
                    .count
                        margin-right: .75rem
                .price
                    font-weight: 700
                    line-height: 1.125rem
                    .now
                        margin-right: .5rem
                        font-size: .875rem
                        color: rgb(240, 20, 20)
                    .old
                        text-decoration: line-through
                        font-size: .625rem
                        color: rgb(147, 153, 159)
                .cartcontrol-wrapper
                    position: absolute
                    right: 0
                    bottom: -0.65rem

</style>


<script>
import axios from "axios";
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'

export default {
    components: {
        'e-shopcart': shopcart,
        'e-cartcontrol': cartcontrol,
        'e-food': food,
    },
    props: {
        seller: {
            type: Object
        }
    },
    data() { 
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {},
      };
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) { //!height2是为了判断是不是最后一个item，后面的判断条件是为了判断当前高度是不是在item之间
                    return i;
                }
            }
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if(food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        },
    },
    created() {
        this.getGoodsData();
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
        getGoodsData() {
            axios.get("https://api.myjson.com/bins/19fsaz").then(res => {
                this.goods = res.data.goods;
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                });
            });
        },
        selectFood(food, event) {
            if (!event._constructed) {
                return;
            }
            this.selectedFood = food;
            this.$refs.food.show();
        },
        cartAdd(el) {
            this.$nextTick(() => {
                this.$refs['shopcart'].drop(el);
            });
        },
        _initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                probeType: 3,
                click: true
            });

            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        _calculateHeight() {
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        selectMenu(index) {
            if (!event._constructed) {
                return;
            }
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el, 300);
        },
    },
};
</script>
