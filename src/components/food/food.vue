<template>
    <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image">
                <div class="back" @click="hide">
                    <i class="icon-arrow_lift"></i>
                </div>
            </div>
            <div class="content">
                <h1 class="title">{{ food.name }}</h1>
                <div class="detail">
                    <span class="sell-count">月售{{ food.sellCount }}份</span>
                    <span class="rating">好评率{{ food.rating }}</span>
                </div>
                <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                    <e-cartcontrol :food="food"></e-cartcontrol>
                </div>
                <transition name="fade">
                <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
                </transition>
            </div>
            <e-split v-show="food.info"></e-split>
            <div class="info" v-show="food.info">
                <h1 class="title">商品信息</h1>
                <p class="text">{{ food.info }}</p>
            </div>
            <e-split></e-split>
            <div class="rating">
                <h1 class="title">商品评价</h1>
                <e-ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" v-on:ratingtype-select="changeType($event)" v-on:content-toggle="changeToggle($event)"></e-ratingselect>
                <div class="rating-wrapper">
                    <ul v-show="food.ratings && food.ratings.length">
                        <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" :key="rating.id" class="rating-item border-1px">
                            <div class="user">
                                <span class="name">{{ rating.username }}</span>
                                <img class="avatar" width="12" height="12" :src="rating.avatar">
                            </div>
                            <div class="time">{{ rating.rateTime | formatDate }}</div>
                            <p class="text">
                                <span :class="{'icon-thumb_up': rating.rateType===0, 'icon-thumb_down': rating.rateType===1}"></span>{{ rating.text }}
                            </p>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
import BScroll from 'better-scroll';
import Vue from 'vue';
import cartcontrol from '../cartcontrol/cartcontrol';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import {formatDate} from '../../common/js/date';

const ALL = 2;

export default {
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    components: {
        'e-cartcontrol': cartcontrol,
        'e-split': split,
        'e-ratingselect': ratingselect,
    },
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        };
    },
    methods: {
        show() {
            this.showFlag = true;
            this.selectType = ALL;
            this.onlyContent = true;
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            });
        },
        hide() {
            this.showFlag = false;
        },
        addFirst(event) {
            if (!event._constructed) {
                return;
            }
            this.$emit('cart-add', event.target);
            Vue.set(this.food,'count',1);
        },
        needShow(type, text) {
            if (this.onlyContent && !text) {
                return false;
            }
            if (this.selectType === ALL) {
                return true;
            } else {
                return type === this.selectType;
            }
        },
        changeType(type) {
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        changeToggle(content) {
            this.onlyContent = content;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
    },
}
</script>

<style lang="sass">
@import '../../common/sass/index.scss'

.food
    position: fixed
    left: 0
    top: 0
    bottom: 3rem
    z-index: 30
    width: 100%
    background: #fff
    transition: all 0.2s linear
    transform: translate3d(0,0,0)
    &.move-enter, &.move-leave-to
        transform: translate3d(100%, 0, 0)
    .image-header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
        .back
            position: absolute
            top: .625rem
            left: 0
            .icon-arrow_lift
                display: block
                padding: .625rem
                font-size: 1.25rem
                color: #fff
    .content
        position: relative
        padding: 1.125rem
        .title
            line-height: .875rem
            margin-bottom: .5rem
            font-size: .875rem
            font-weight: 700
            color: rgb(7,17,27)
        .detail
            margin-bottom: 1.125rem
            line-height: .625rem
            height: .625rem
            font-size: 0
            .sell-count, .rating
                font-size: .625rem
                color: rgb(147,153,159)
            .sell-count
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
            right: .75rem
            bottom: .75rem
        .buy
            position: absolute
            right: 1.125rem
            bottom: 1.125rem
            z-index: 10
            height: 1.5rem
            line-height: 1.5rem
            padding: 0 .75rem
            box-sizing: border-box
            border-radius: .75rem
            font-size: .625rem
            color: #fff
            background: rgb(0,160,220)
            opacity: 1
            transition: all 0.2s
            &.fade-enter, &.fade-leave-to
                opacity: 0
    .info
        padding: 1.125rem
        .title
            line-height: .875rem
            margin-bottom: .375rem
            font-size: .875rem
            color: rgb(7,17,27)
        .text
            line-height: 1.5rem
            padding: 0 .5rem
            font-size: .75rem
            color: rgb(77,85,93)
    .rating
        padding-top: 1.125rem
        .title
            line-height: .875rem
            margin-left: 1.125rem
            font-size: .875rem
            color: rgb(7,17,27)
        .rating-wrapper
            padding: 0 1.125rem
            .rating-item
                position: relative
                padding: 1rem 0
                .user
                    position: absolute
                    right: 0
                    top: 1rem
                    line-height: .75rem
                    font-size: 0
                    .name
                        display: inline-block
                        vertical-align: top
                        margin-right: .375rem
                        font-size: .625rem
                        color: rgb(147,153,159)
                    .avatar
                        border-radius: 50%
                .time
                    margin-bottom: .375rem
                    line-height: .75rem
                    font-size: .625rem
                    color: rgb(147,153,159)
                .text
                    line-height: 1rem
                    font-size: .75rem
                    color: rgb(7,17,27)
                    .icon-thumb_up,.icon-thumb_down
                        margin-right: .25rem
                        line-height: 1rem
                        font-size: .75rem
                    .icon-thumb_up
                        color: rgb(0,160,220)
                    .icon-thumb_down
                        color: rgb(147,153,159)
            .no-rating
                padding: 1rem 0
                font-size: .75rem
                color: rgb(147,153,159)
</style>
