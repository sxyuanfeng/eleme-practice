<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :key='itemClass.id' :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType(){
            return 'star-' + this.size;
        },
        itemClasses() {
            let result = [];
            let score = Math.floor(this.score * 2) / 2;
            let hasDecimal = score % 1 !== 0;
            let integer = Math.floor(score);
            for(let i=0; i<integer; i++) {
                result.push(CLS_ON);
            }
            if (hasDecimal) {
                result.push(CLS_HALF);
            }
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }
            return result;
        }
    }
};
</script>

<style lang="sass">
@import "../../common/sass/index.scss"

.star
    font-size: 0
    .star-item
        display: inline-block
        background-repeat: no-repeat
    &.star-48
        .star-item
            width: 1.25rem
            height: 1.25rem
            margin-right: 1.375rem
            background-size: 1.25rem 1.25rem
            &:last-child
                margin-right: 0
            &.on
                @include bg-image('star48_on')
            &.half
                @include bg-image('star48_half')
            &.off
                @include bg-image('star48_off')
    &.star-36
        .star-item
            width: .9375rem
            height: .9375rem
            margin-right: .375rem
            background-size: .9375rem .9375rem
            &:last-child
                margin-right: 0
            &.on
                @include bg-image('star36_on')
            &.half
                @include bg-image('star36_half')
            &.off
                @include bg-image('star36_off')
    &.star-24
        .star-item
            width: .625rem
            height: .625rem
            margin-right: .1875rem
            background-size: .625rem .625rem
            &:last-child
                margin-right: 0
            &.on
                @include bg-image('star24_on')
            &.half
                @include bg-image('star24_half')
            &.off
                @include bg-image('star24_off')

</style>

