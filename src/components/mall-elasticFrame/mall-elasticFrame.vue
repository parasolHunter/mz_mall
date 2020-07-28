<template>
    <div class="mall-frame">
        <div class="bg">
            <div class="frame">
                <img src="./success@2x.png" alt="">
                <p class="title">恭喜您,签到成功!</p>
                <p class="number">+{{number}}积分</p>
                <p class="submit" @click="submit">好的</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        number:{
            type: [Number,String],
            default:'0'
        }
    },
    methods: {
        submit () {
            this.$emit('isDisplay',false)
        }
    },
}
</script>

<style lang="stylus" scoped>
    .mall-frame
        width 100%
        height 100%
        position relative
        z-index 9999
    .bg
        position fixed
        left 0
        top 0
        width 100%
        height 100%
        background-color rgba(000,000,000,0.4)

    .frame
        width 480px
        height 500px
        background-color: #fff;
        border-radius 8px
        position absolute
        left 50%
        top 50%
        margin-top -200px
        margin-left -240px
        text-align center
        padding  200px 15px 30px 15px
        box-sizing border-box
        img
            width 451px
            height 451px
            position absolute
            top -195px
            margin-left -225px
            left 50%
        .title
            font-size 34px
        .number
            font-size   48px
            color #ee3147
            margin 30px 0 60px
        .submit
            width 400px
            height 88px
            line-height  88px
            color #FFFFFF
            background-color #ee3147
            border-radius  44px
            font-size 32px
            margin  0 auto

</style>
