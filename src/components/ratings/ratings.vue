<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{ seller.score }}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <e-star :size="36" :score="seller.serviceScore"></e-star>
                        <span class="score">{{ seller.serviceScore }}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <e-star :size="36" :score="seller.foodScore"></e-star>
                        <span class="score">{{ seller.foodScore }}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{ seller.deliveryTime }}分钟</span>
                    </div>
                </div>
            </div>
            <e-split></e-split>
            <e-ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings" v-on:ratingtype-select="changeType($event)" v-on:content-toggle="changeToggle($event)"></e-ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="rating in ratings" :key="rating.id" v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px">
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <e-star :size="24" :score="rating.score"></e-star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span class="item" v-for="item in rating.recommend" :key="item.id">{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import star from '../star/star';
import BScroll from 'better-scroll';
import {formatDate} from '../../common/js/date';
import ratingselect from '../ratingselect/ratingselect';
import split from '../split/split';
import axios from 'axios';

const ALL = 2;

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    created() {
        axios.get("https://api.myjson.com/bins/19fsaz").then(res => {
            this.ratings = res.data.ratings;
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.ratings, {
                click: true
                });
            });
        });
    },
    methods: {
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
    components: {
        'e-star': star,
        'e-ratingselect': ratingselect,
        'e-split': split,
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
}
</script>

<style lang="sass">
@import "../../common/sass/index.scss"

.ratings
    position: absolute
    top: 10.875rem
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
        display: flex
        padding: 1.125rem 0
        .overview-left
            flex: 0 0 8.5625rem
            padding: .375rem 0
            width: 8.5625rem
            border-right: 1px solid rgba(7,17,27,0.1)
            text-align: center
            @media only screen and (max-width: 7.5rem)
                flex: 0 0 7.5rem
                width: 7.5rem
            .score
                margin-bottom: .375rem
                line-height: 1.75rem
                font-size: 1.5rem
                color: rgb(255,153,0)
            .title
                margin-bottom: .5rem
                line-height: .75rem
                font-size: .75rem
                color: rgb(7,17,27)
            .rank
                line-height: .625rem
                font-size: .625rem
                color: rgb(147,153,159)
        .overview-right
            flex: 1
            padding: .375rem 0 .375rem 1.5rem
            @media only screen and (max-width: 320px)
                padding-left: .375rem
            .score-wrapper
                margin-bottom: .5rem
                font-size: 0
                .title
                    display: inline-block
                    line-height: 1.125rem
                    vertical-align: top
                    font-size: .75rem
                    color: rgb(7,17,27)
                .star
                    display: inline-block
                    margin: 0 .75rem
                    vertical-align: top
                .score
                    display: inline-block
                    line-height: 1.125rem
                    vertical-align: top
                    font-size: .75rem
                    color: rgb(255, 153, 0)
            .delivery-wrapper
                font-size: 0
                .title
                    line-height: 1.125rem
                    font-size: .75rem
                    color: rgb(7, 17, 27)
                .delivery
                    margin-left: .75rem
                    font-size: .75rem
                    color: rgb(147, 153, 159)
    .rating-wrapper
        padding: 0 1.125rem
        .rating-item
            display: flex
            padding: 1.125rem 0
            .avatar
                flex: 0 0 1.75rem
                width: 1.75rem
                margin-right: .75rem
                img
                    border-radius: 50%
            .content
                position: relative
                flex: 1
                .name
                    margin-bottom: .25rem
                    line-height: .75rem
                    font-size: .625rem
                    color: rgb(7, 17, 27)
                .star-wrapper
                    margin-bottom: .375rem
                    font-size: 0
                    .star
                        display: inline-block
                        margin-right: .375rem
                        vertical-align: top
                    .delivery
                        display: inline-block
                        vertical-align: top
                        line-height: .75rem
                        font-size: .625rem
                        color: rgb(147, 153, 159)
                .text
                    margin-bottom: .5rem
                    line-height: 1.125rem
                    color: rgb(7, 17, 27)
                    font-size: .75rem
                .recommend
                    line-height: 1rem
                    font-size: 0
                    .icon-thumb_up, .item
                        display: inline-block
                        margin: 0 .5rem .25rem 0
                        font-size: 0.5625rem
                    .icon-thumb_up
                        color: rgb(0, 160, 220)
                    .item
                        padding: 0 .375rem
                        border: 1px solid rgba(7, 17, 27, 0.1)
                        border-radius: 1px
                        color: rgb(147, 153, 159)
                        background: #fff
                .time
                    position: absolute
                    top: 0
                    right: 0
                    line-height: .75rem
                    font-size: .625rem
                    color: rgb(147, 153, 159)
</style>
