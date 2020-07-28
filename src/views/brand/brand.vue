<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'back'" :title="'品牌墙'" :bgClass="'bg-red'"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="goods" :options="options" @pulling-down="onPullingDown">
                <div class="brand-content" v-for="(brand, index) in goods" :key="index">
                    <div class="brand-title">
                        <div class="line"></div>
                        <div class="name">{{brand.name}}</div>
                        <div class="line"></div>
                    </div>
                    <div class="brand-items">
                        <div class="brand-item" v-for="(item, index) in brand.foods" :key="index">
                            <img :src="item.icon" alt="">
                            <div class="text">{{item.name}}</div>
                        </div>
                        <div v-for="i in brand.foods.length % 3" class="brand-item"></div>
                    </div>
                </div>
                <!-- <ul class="imgs-wrapper">
                    <li v-for="(item, index) in content" :key="index" class="imgs-item"><img :src="item.img" @load="onImgLoad" /></li>
                </ul> -->
            </cube-scroll>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api'
import mallHeader from '@/components/mall-header/mall-header'
export default {
    name: 'brands',
    data () {
        return {
            loadStatus: true,
            items: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png',
            options: {
                pullDownRefresh: {
                    threshold: 60,
                    txt: this.$i18n.t('message.hello')
                }
            },
            secondStop: 26,
            goods: []
        }
    },
    mounted () {
        // 获取默认的分类数据
        this.getGoods()
        console.log(this.$i18n.t('message.hello'))
        setTimeout(() => {
            this.loadStatus = false
        }, 1000)
    },
    methods: {
        // 获取分类
        async getGoods () {
            let res = await getGoods()
            this.goods = res.data
        },
        onPullingDown () {
            setTimeout(() => {
                this.$refs.contentScroll.forceUpdate(true)
            }, 1000)
        },
        onImgLoad () {
            const contentScroll = this.$refs.contentScroll
            contentScroll.scroll.beforePullDown && contentScroll.refresh()
        }
    },
    components: {
        mallHeader
    }
}
</script>

<style lang="stylus" scoped>
.mall-scroll-wrapper
    .mall-scroll-list-wrap
        width 100%
        position absolute
        top 100px
        left 0
        right 0
        bottom 0
        overflow scroll
        .brand-content
            background #FFFFFF
            padding 40px 50px 0
            margin-bottom 20px
            .brand-title
                display flex
                align-items center
                justify-content center
                .name
                    font-weight bold
                    color #1d1d1d
                .line
                    width 24px
                    height 2px
                    background #b6b6b6
                    margin 0 20px
            .brand-items
                width 100%
                display flex
                align-items center
                justify-content space-between
                flex-wrap wrap
                .brand-item
                    width 166px
                    padding 20px 0
                    img
                        width 100%
                        height 166px
                    .text
                        padding-top 10px
                        color #8f8f8f
                        text-overflow ellipsis
                        white-space nowrap
                        overflow hidden
    >>>.once-load
        position absolute
        left 50%
        >span
            margin auto
            transform translate(-50%, 100%)
.success-enter-active, .success-leave-active
    transition width 0.5s
.success-enter, .success-leave-to
    width 70%
.success-enter-to, .success-leave
    width 100%
</style>
