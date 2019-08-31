<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span @click="select(2,$event)" class="block positive" :class="{'active': selectedType===2}">{{ desc.all }}<span class="count">{{ ratings.length }}</span></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active': selectedType===0}">{{ desc.positive }}<span class="count">{{ positives.length }}</span></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active': selectedType===1}">{{ desc.negative }}<span class="count">{{ negatives.length}}</span></span>
        </div>
        <div @click="toggleContent" class="switch" :class="{'on': onlyedContent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意',
                }
            }
        },
    },
    data() {
        return {
            selectedType: this.selectType,
            onlyedContent: this.onlyContent,
        };
    },
    computed: {
        positives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE;
            });
        },
        negatives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE;
            });
        },
    },
    methods: {
        select(type, event) {
            if (!event._constructed) {
                return;
            }
            this.selectedType = type;
            this.$emit('ratingtype-select', type);
        },
        toggleContent(event) {
            if (!event._constructed) {
                return;
            }
            this.onlyedContent = !this.onlyedContent;
            this.$emit('content-toggle', this.onlyedContent);
        }
    },
}
</script>

<style lang="sass">
@import "../../common/sass/index.scss"

.ratingselect
    .rating-type
        padding: 1.125rem 0
        margin: 0 1.125rem
        font-size: 0
        .block
            display: inline-block
            padding: .5rem .75rem
            margin-right: .5rem
            border-radius: 1px
            line-height: 1rem
            font-size: .75rem
            color: rgb(77,85,93)
            &.active
                color: #fff
            .count
                margin-left: .125rem
                font-size: .5rem
            &.positive
                background: rgba(0,160,220,0.2)
                &.active
                    background: rgb(0,160,220)
            &.negative
                background: rgba(77,85,93,0.2)
                &.active
                    background: rgb(77,85,93)
    .switch
        padding: .75rem 1.125rem
        line-height: 1.5rem
        border-bottom: 1px solid rgba(7,17,27,0.1)
        color: rgb(147,153,159)
        font-size: 0
        &.on
            .icon-check_circle
                color: #00c850
        .icon-check_circle
            display: inline-block
            vertical-align: top
            margin-right: .25rem
            font-size: 1.5rem
        .text
            display: inline-block
            vertical-align: top
            font-size: .75rem
</style>
