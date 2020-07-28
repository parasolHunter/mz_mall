<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'noneSearch'" :bgClass="'bg-white'"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap">
            <div class="scroll-nav-wrapper">
                <cube-scroll-nav :side="true" :data="goods" :options="scrollOptions" v-if="goods.length">
                    <template slot="bar" slot-scope="props">
                        <cube-scroll-nav-bar direction="vertical" :labels="props.labels" :txts="barTxts" :current="props.current">
                            <template slot-scope="props">
                                <div class="text">{{ props.txt.name }}</div>
                            </template>
                        </cube-scroll-nav-bar>
                    </template>
                    <div class="panel-main">
                        <div class="top-img">
                            <img src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114" />
                        </div>
                        <cube-scroll-nav-panel class="panel-list" v-for="good in goods" :key="good.name" :label="good.name" :title="good.name">
                            <ul class="panel-items">
                                <li v-for="food in good.foods" :key="food.name" class="panel-item">
                                    <img :src="food.icon" />
                                    <div class="text">{{ food.name }}</div>
                                </li>
                                <li v-for="i in good.foods.length % 3" :key="i" class="panel-item"></li>
                            </ul>
                        </cube-scroll-nav-panel>
                    </div>
                </cube-scroll-nav>
            </div>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api'
import mallHeader from '@/components/mall-header/mall-header'
export default {
    name: 'itemize',
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
            goods: [],
            selectedFood: {},
            scrollOptions: {
                click: false,
                directionLockThreshold: 0
            }
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
    computed: {
        barTxts () {
            let ret = []
            this.goods.forEach(good => {
                const { type, name } = good
                ret.push({
                    type,
                    name
                })
            })
            return ret
        }
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
        .scroll-nav-wrapper
            width 100%
            position absolute
            top 100px
            left 0
            right 0
            bottom 100px
            overflow scroll
            background #FFFFFF
            >>>.cube-sticky
                .panel-main
                    .top-img
                        padding 30px 25px 15px
                        img
                            width 100%
                            height 170px
                            border-radius 8px
                    .panel-list
                        padding 0 25px
                        border-left 1px solid #ebebeb
                        .cube-sticky-ele
                            font-size 30px
                            color #1d1d1d
                            background #FFFFFF
                            text-align left
                            height 80px
                            line-height 80px
                            .cube-scroll-nav-panel-title
                                font-weight bold
                        .panel-items
                            display flex
                            position relative
                            align-items center
                            justify-content space-between
                            flex-flow wrap
                            width 100%
                            .panel-item
                                width 126px
                                padding 15px 0
                                img
                                    width 100%
                                    height 126px
                                .text
                                    padding-top 22px
                                    color #8f8f8f
                                    text-overflow ellipsis
                                    overflow hidden
                                    white-space nowrap
            >>>.cube-sticky-fixed
                .cube-scroll-nav-panel-title
                    font-size 30px
                    color #1d1d1d
                    background #FFFFFF
                    font-weight bold
                    text-align left
                    padding 0 25px
                    border-left 1px solid #ebebeb
                    height 80px
                    line-height 80px
            >>>.cube-scroll-nav-bar-items
                    width 214px
                    position relative
                    .cube-scroll-nav-bar-item
                        display flex
                        align-items center
                        line-height 140%
                        font-size 28px
                        background #FFFFFF
                        padding 0 40px
                        .text
                            width 100%
                            height 120px
                            color #1d1d1d
                            border-bottom 1px solid #ebebeb
                            display flex
                            align-items center
                            justify-content center
                    .cube-scroll-nav-bar-item_active
                        background #FFFFFF
                        .text
                            font-weight bold
                            color #dc352c
                            &:before
                                content ''
                                width 4px
                                height 30px
                                background #dc352c
                                position absolute
                                left 0
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
