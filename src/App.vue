<template>
    <div id="app" class="app-body">
        <transition name="router-fade" mode="out-in">
            <keep-alive><router-view /></keep-alive>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style lang="stylus">
#app
    font-family 'PingFang SC'
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #1d1d1d
    background #f8f8f8
.app-body
    position fixed
    top 0
    left 0
    right 0
    bottom 0
.cube-dialog-main
    border-radius 12px !important
.cube-input_active::after
    border-color transparent !important
</style>
