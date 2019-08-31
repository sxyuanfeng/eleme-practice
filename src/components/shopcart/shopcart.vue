<template>
<div>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight': totalCount>0}">
                        <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{ totalCount }}</div>
                </div>
                <div class="price" :class="{'highlight': totalPrice>0}">￥{{ totalPrice }}</div>
                <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
            </div>
            <div class="content-right" @click.stop.prevent="pay">
                <div class="pay" :class="payClass">
                    {{ payDesc }}
                </div>
            </div>
        </div>
        <div class="ball-container">
            <transition-group name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter"
                v-on:after-enter="afterEnter">
                <div v-for="(ball, index) in balls" :key="index" v-show="ball.show" class="ball">
                    <div class="inner inner-hook"></div>
                </div>
            </transition-group>
        </div>
        <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listContent">
                <ul>
                    <li class="food border-1px" v-for="food in selectFoods" :key="food.id">
                        <span class="name">{{ food.name }}</span>
                        <div class="price">
                            <span>￥{{ food.price*food.count }}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <e-cartcontrol :food="food"></e-cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </transition>
    </div>
    <transition name="fade">
        <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
</div>
</template>

<style lang="sass">
    @import '../../common/sass/index.scss'

    .shopcart
        position: fixed 
        left: 0 
        bottom: 0 
        z-index: 50 
        width: 100% 
        height: 3rem 
        .content 
            display: flex 
            background: #141d27 
            font-size: 0 
            .content-left 
                flex: 1 
                .logo-wrapper 
                    display: inline-block 
                    vertical-align: top 
                    position: relative 
                    top: -0.625rem 
                    margin: 0 .75rem 
                    padding: .375rem 
                    width: 3.5rem 
                    height: 3.5rem 
                    box-sizing: border-box 
                    border-radius: 50% 
                    background: #141d27 
                    .logo 
                        width: 100% 
                        height: 100% 
                        border-radius: 50% 
                        text-align: center 
                        background: #2b343c 
                        &.highlight 
                            background: rgb(0, 160, 220) 
                        .icon-shopping_cart 
                            line-height: 2.75rem 
                            font-size: 1.5rem 
                            color: #80858a 
                            &.highlight 
                                color: #fff 
                    .num 
                        position: absolute 
                        top: 0 
                        right: 0 
                        width: 1.5rem 
                        height: 1rem 
                        line-height: 1rem 
                        text-align: center 
                        border-radius: 1rem 
                        font-size: .5625rem 
                        font-weight: 700 
                        color: #fff 
                        background: rgb(240, 20, 20) 
                        box-shadow: 0 .25rem .5rem 0 rgba(0, 0, 0, 0.4) 
                .price 
                    display: inline-block 
                    vertical-align: top 
                    margin-top: .75rem 
                    line-height: 1.5rem 
                    padding-right: .75rem 
                    box-sizing: border-box 
                    border-right: 1px solid rgba(255, 255, 255, 0.1) 
                    font-size: 1.5rem 
                    font-weight: 700 
                    color: rgba(255, 255, 255, 0.4) 
                    &.highlight 
                        color: #fff 
                .desc 
                    display: inline-block 
                    vertical-align: top 
                    line-height: 1.5rem 
                    margin: .75rem 0 0 .75rem 
                    color: rgba(255, 255, 255, 0.4) 
                    font-size: .625rem 
            .content-right
                flex: 0 0 6.5625rem 
                width: 6.5625rem 
                .pay 
                    height: 3rem 
                    line-height: 3rem 
                    text-align: center 
                    font-size: .75rem 
                    color: rgba(255, 255, 255, 0.4) 
                    fonr-weight: 700 
                    &.not-enough 
                        background: #2b333b 
                    &.enough 
                        background: #00b43c 
                        color: #fff 
        .ball-container 
            .ball 
                position: fixed 
                left: 2.75rem 
                bottom: 1.375rem 
                z-index: 200 
                transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41) 
                .inner 
                    width: 1rem 
                    height: 1rem 
                    border-radius: 50% 
                    background: rgb(0, 160, 220) 
                    transition: all 0.4s linear
        .shopcart-list
            position: absolute
            left: 0
            top: 0
            z-index: -1
            width: 100%
            transition: all 0.5s
            transform: translate3d(0, -100%, 0)
            &.fold-enter, &.fold-leave-to
                transform: translate3d(0,0,0)
            .list-header
                height: 2.5rem
                line-height: 2.5rem
                padding: 0 1.125rem
                background: #f3f5f7
                border-bottom: 1px solid rgba(7,17,27,0.1)
                .title
                    float: left
                    font-size: .875rem
                    color: rgb(7,17,27)
                .empty
                    float: right
                    font-size: .75rem
                    color: rgb(0,160,220)
            .list-content
                padding: 0 1.125rem
                max-height: 13.5625rem
                overflow: hidden
                background: #fff
                .food
                    position: relative
                    padding: .75rem 0
                    box-sizing: border-box
                    .name
                        line-height: 1.5rem
                        font-size: .875rem
                        color: rgb(7,17,27)
                    .price
                        position: absolute
                        right: 5.625rem
                        bottom: .75rem
                        line-height: 1.5rem
                        font-size: .875rem
                        font-weight: 700
                        color: rgb(240, 20,20)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: .375rem
    .list-mask
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 40
        backdrop-filter: blur(10px)
        transition: all 0.5s
        opacity: 1
        background: rgba(7,17,27,0.6)
        &.fade-enter, &.fade-leave-to
            opacity: 0
            background: rgba(7,17,27,0)
</style>

<script>
    import BScroll from 'better-scroll';
    import cartcontrol from '../cartcontrol/cartcontrol';

    export default {
        components: {
            'e-cartcontrol': cartcontrol,
        },
        props: {
            selectFoods: {
                type: Array,
                default () {
                    return [];
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            },
        },
        data() {
            return {
                balls: [{
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                ],
                dropBalls: [],
                fold: true
            };
        },
        computed: {
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
                return total;
            },
            totalCount() {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice}元起送`;
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`;
                } else {
                    return '去结算';
                }
            },
            payClass() {
                if (this.totalPrice < this.minPrice) {
                    return 'not-enough';
                } else {
                    return 'enough';
                }
            },
            listShow() {
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if(!this.scroll) {
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click:true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            },
        },
        methods: {
            drop(el) {
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },
            beforeEnter: function(el) {
                console.log(el);
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect();
                        let x = rect.left - 32;
                        let y = -(window.innerHeight - rect.top - 22);
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                        el.style.transform = `translate3d(0,${y}px,0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.transform = `translate3d(${x}px,0,0)`;

                    }
                }
            },
            enter: function(el) {
                let rf = el.offsetHeight;
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0, 0, 0)';
                    el.style.transform = 'translate3d(0, 0, 0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0, 0, 0)';
                    inner.style.transform = 'translate3d(0, 0, 0)';
                });
            },
            afterEnter: function(el) {
                let ball = this.dropBalls.shift();
                if (ball) {
                    ball.show = false;
                    el.style.display = 'none';
                }
            },
            toggleList() {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            empty() {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            },
            hideList() {
                this.fold = true;
            },
            pay() {
                if(this.totalPrice < this.minPrice) {
                    return;
                }
                window.alert(`支付${this.totalPrice}元`);
            },
        },
    }
</script>