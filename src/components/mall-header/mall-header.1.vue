<template>
    <div class="mall-header" :class="bgClass">
        <!-- 首页头部 -->
        <div v-show="type == 'home'" class="search-header">
            <div class="part-1">
                <support-ico :size="1" :type="'search'"></support-ico>
                <p>搜索店铺或商品</p>
            </div>
            <div class="part-2">
                <support-ico :size="3" :type="'scann'"></support-ico>
                <support-ico :size="4" :type="'chat'" class="ml-40"></support-ico>
            </div>
        </div>
        <!-- 无点击搜索头部 -->
        <div v-show="type == 'noneSearch'" class="none-search-header">
            <div class="part-search">
                <support-ico :size="1" :type="'search'"></support-ico>
                <p>搜索店铺或商品</p>
            </div>
        </div>
        <!-- 有点击搜索头部 -->
        <div v-show="type == 'clickSearch'" class="click-search-header">
            <div class="part-search">
                <support-ico :size="1" :type="'search'"></support-ico>
                <input type="text" placeholder="搜索店铺或商品" />
            </div>
            <div class="part-text">取消</div>
        </div>
        <!-- 回退头部 -->
        <div v-show="type == 'back'" class="back-header">
            <h1>{{ title }}</h1>
            <i @click="back" class="cubeic-back"></i>
            <slot></slot>
        </div>
        <!-- 其他头部 -->
        <div v-show="type == 'other'" class="other-header">
            <h1>{{ title }}</h1>
            <i @click="back" class="cubeic-back"></i>
        </div>
        <!-- 没回退头部 -->
        <div v-show="type == 'noback'" class="back-header">
            <h1>{{ title }}</h1>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import SupportIco from '@/components/support-ico/support-ico'

export default {
    data () {
        return {
            value: '',
            clearable: {
                visible: true,
                blurHidden: true
            }
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        bgClass: {
            type: String,
            default: ''
        }
    },
    methods: {
        back () {
            this.$router.back()
        }
    },
    components: {
        SupportIco
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'

.bg-white
    background #FFFFFF
.bg-red
    background #e1313a
.mall-header
    height 60px
    padding 20px 30px
    // 首页头部
    .search-header
        height 100%
        display flex
        align-items center
        justify-content space-between
        .part-1
            width 480px
            height 100%
            display flex
            align-items center
            background #f5f5f5
            padding 0 30px
            border-radius 30px
            p
                color #8f8f8f
                padding 0 20px
        .part-2
            display flex
            align-items center
            .ml-40
                margin-left 40px
    // 无点击搜索头部
    .none-search-header
        height 100%
        display flex
        align-items center
        justify-content space-between
        .part-search
            width 100%
            height 100%
            display flex
            align-items center
            background #f5f5f5
            padding 0 30px
            border-radius 30px
            p
                color #8f8f8f
                padding 0 20px
    // 有点击搜索头部
    .click-search-header
        height 100%
        display flex
        align-items center
        justify-content space-between
        .part-search
            width 560px
            height 100%
            display flex
            align-items center
            background #f5f5f5
            padding 0 30px
            border-radius 30px
            input
                width 90%
                padding 0 20px
                height 60px
                outline none
                border 0
                background #f5f5f5
                -webkit-appearance none
        .part-text
            color #FFFFFF
    // 回退头部
    .back-header
        position relative
        line-height 60px
        font-size 36px
        color #FFFFFF
        h1
            text-align center
        .cubeic-back
            position absolute
            top 0
            left 0
        .text
            position absolute
            top 0
            right 0
            font-style normal
            font-weight normal
    // 其他头部
    .other-header
        position relative
        line-height 60px
        font-size 36px
        color #1d1d1d
        h1
            text-align center
        .cubeic-back
            position absolute
            top 0
            left 0
</style>
