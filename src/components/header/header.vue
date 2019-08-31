<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{ seller.name }}</span>
                </div>
                <div class="description">
                    {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{ seller.supports[0].description }}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{ seller.supports.length }}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{ seller.bulletin }}></span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
        <div v-show="detailShow" class="detail">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{ seller.name }}</h1>
                    <div class="star-wrapper">
                        <e-star :size="48" :score="seller.score"></e-star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="item in seller.supports" :key="item.id">
                            <span class="icon" :class="classMap[item.type]"></span>
                            <span class="text">{{ item.description }}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content">{{ seller.bulletin }}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hideDetail">
                <i class="icon-close"></i>
            </div>
        </div>
        </transition>

    </div>
</template>

<script>
import star from '../star/star'

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            detailShow: false
        };
    },
    methods: {
        showDetail() {
            this.detailShow = true;
        },
        hideDetail() {
            this.detailShow = false;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
        'e-star': star,
    },
};
</script>

<style lang="sass">
@import "../../common/sass/index.scss"
.header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7,17,27,0.5)
    .content-wrapper
        position: relative
        padding: 1.5rem .75rem 1.125rem 1.5rem
        .avatar
            display: inline-block
            vertical-align: top
            img 
                border-radius: 2px
        .content
            display: inline-block
            margin-left: 1rem
            .title
                margin: .125rem 0 .5rem 0
                .brand
                    display: inline-block
                    vertical-align: bottom
                    width: 1.875rem
                    height: 1.125rem
                    @include bg-image('brand')
                    background-size: 1.875rem 1.125rem
                    background-repeat: no-repeat
                .name
                    margin-left: .375rem
                    font-size: 1rem
                    line-height: 1.125rem
                    font-weight: bold
            .description
                margin-bottom: .625rem
                font-size: .75rem
                line-height: .75rem
            .support
                .icon   
                    display: inline-block
                    vertical-align: bottom
                    width: .75rem
                    height: .75rem
                    margin-right: .25rem
                    background-size: .75rem .75rem
                    background-repeat: no-repeat
                    &.decrease
                        @include bg-image('decrease_1')
                    &.discount
                        @include bg-image('discount_1')
                    &.guarantee
                        @include bg-image('guarantee_1')
                    &.invoice
                        @include bg-image('invoice_1')
                    &.special
                        @include bg-image('special_1')
                .text
                    line-height: .75rem
                    font-size: .625rem
        .support-count
            position: absolute
            right: .75rem
            bottom: 1.125rem
            padding: 0 .5rem
            height: 1.5rem
            line-height: 1.5rem
            border-radius: .875rem
            background: rgba(0,0,0,0.2)
            text-align: center
            .count
                vertical-align: top
                font-size: .625rem
            .icon-keyboard_arrow_right
                margin-bottom: 1rem
                margin-left: .125rem
                line-height: 1.5rem
                font-size: .625rem
    .bulletin-wrapper
        position: relative
        height: 1.75rem
        line-height: 1.75rem
        padding: 0 1.375rem 0 .75rem
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        background: rgba(7,17,27,0.2)
        .bulletin-title
            display: inline-block
            vertical-align: top
            margin-top: .499rem
            width: 1.375rem
            height: .75rem
            @include bg-image('bulletin')
            background-size: 1.375rem .75rem
            background-repeat: no-repeat
        .bulletin-text
            vertical-align: top
            margin: 0 .25rem
            font-size: .625rem
        .icon-keyboard_arrow_right
            vertical-align: top
            position: absolute
            font-size: .625rem
            right: .75rem
            top: .625rem
    .background
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: -1
        filter: blur(.625rem)
    .detail
        position: fixed
        z-index: 100
        top: 0
        left: 0
        width: 100%
        height: 100%
        overflow: auto
        background: rgba(7,17,27,0.8)
        transition: all 0.5s
        backdrop-filter: blur(10px)
        &.fade-enter, &.fade-leave-to
            opacity: 0
            background: rgba(7,17,27,0)
        .detail-wrapper
            width: 100%
            min-height: 100%
            .detail-main
                margin-top: 4rem
                padding-bottom: 4rem
                .name
                    line-height: 1rem
                    text-align: center
                    font-size: 1rem
                    font-weight: 700
                .star-wrapper
                    margin-top: 1.125rem
                    padding: .125rem 0
                    text-align: center
                .title
                    display: flex
                    width: 80%
                    margin: 1.75rem auto 1.5rem auto
                    .line 
                        flex: 1
                        position: relative
                        top: -0.375rem
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2)
                    .text   
                        padding: 0 .75rem
                        font-weight: 700
                        font-size: .875rem
                .supports
                    width: 80%
                    margin: 0 auto
                    .support-item
                        padding: 0 .75rem
                        margin-bottom: .75rem
                        font-size: 0
                        &:last-child
                            margin-bottom: 0
                        .icon     
                            display: inline-block
                            width: 1rem
                            height: 1rem
                            vertical-align: top
                            margin-right: .375rem
                            background-size: 1rem 1rem
                            background-repeat: no-repeat
                            &.decrease
                                @include bg-image('decrease_2')
                            &.discount
                                @include bg-image('discount_2')
                            &.guarantee
                                @include bg-image('guarantee_2')
                            &.invoice
                                @include bg-image('invoice_2')
                            &.special
                                @include bg-image('special_2')
                        .text
                            line-height: 1rem
                            font-size: .75rem
                .bulletin
                    width: 80%
                    margin: 0 auto
                    .content
                        padding: 0 .75rem
                        line-height: 1.5rem
                        font-size: .75rem
        .detail-close
            position: relative
            width: 2rem
            height: 2rem
            margin: -4rem auto 0 auto
            clear: both
            font-size: 2rem

</style>

