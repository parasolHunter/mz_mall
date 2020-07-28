<template>
    <transition name="show-nav">
        <div v-show="isVisible" class="nav-container" @click="hide">
            <div class="nav-content-b"></div>
            <div class="nav-content">
                <div class="nav-content-item" @click.stop="navRouter('home')">
                    <support-ico :size="26" :type="'goodhome'"></support-ico>
                    <span class="text">首页</span>
                </div>
                <div class="nav-content-item" @click.stop="navRouter('messages')">
                    <support-ico :size="26" :type="'goodmsg'"></support-ico>
                    <span class="text">消息</span>
                </div>
                <div class="nav-content-item" @click.stop="navRouter('search')">
                    <support-ico :size="26" :type="'goodsearch'"></support-ico>
                    <span class="text">搜索</span>
                </div>
                <div class="nav-content-item" @click.stop="navRouter('collection')">
                    <support-ico :size="26" :type="'goodhollow'"></support-ico>
                    <span class="text">我的收藏</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import popupMixin from 'common/mixins/popup'
import SupportIco from '@/components/support-ico/support-ico'

export default {
    mixins: [popupMixin],
    methods: {
        show () {
            if (this.isVisible) {
                return
            }
            this.isVisible = true
        },
        hide () {
            if (!this.isVisible) {
                return
            }
            this.isVisible = false
        },
        navRouter (val) {
            this.isVisible = !this.isVisible
            this.$router.push({ path: `/${val}` })
        }
    },
    components: {
        SupportIco
    }
}
</script>

<style lang="stylus" scoped>
.nav-container
    width 100%
    height 100%
    position absolute
    z-index 999
    .nav-content
        width 290px
        position absolute
        right 30px
        background #FFFFFF
        border-radius 8px
        box-shadow 0 0 6px 3px rgba(0, 0, 0, 0.1)
        .nav-content-item
            width 100%
            height 98px
            border-bottom 2px solid #ebebeb
            font-size 28px
            display flex
            align-items center
            &:last-child
                border-bottom 0
            .text
                padding-left 20px
            .support-ico
                margin-left 44px
.show-nav-enter-active, .show-nav-leave-active {
    transition all 0.3s ease-in-out
}
.show-nav-enter, .show-nav-leave-active {
    transform translate3d(100%, 0, 0)
}
</style>
