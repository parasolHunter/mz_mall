<template>
    <div class="download">
        <img class="download-logo" src="./download2.png" alt="">
        <img class="download-text" src="./download3.png" alt="">
        <img class="download-img" src="./download1.png" alt="">
        <div class="download-flex">
            <img src="./Android.png" alt="">
            <img src="./ios.png" alt="">
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            options: {}
        }
    },
    mounted () {

        console.log(this.$i18n.t('message.hello'))

    },
    methods: {},
    components: {}
}
</script>

<style lang="stylus" scoped>
    .download
        width 100%
        height 100%
        background url('./dwonloadBg.png') no-repeat center
        background-size 100% 100%
        position relative
        .download-text
            width  308px
            height 120px
            position: absolute;
            top 25%
            left 10%
        .download-logo
            width  308px
            height 120px
            position: absolute;
            top 10%
            left 10%
        .download-img
                width  541px
                height 497px
                position: absolute;
                bottom 20%
                left 50%
                margin-left -270.5px
    .download-flex
        padding 0 20px
        box-sizing border-box
        position: absolute;
        bottom 5%
        width 100%
        display flex
        justify-content space-between
        img
           width 320px
           height 100px

</style>
