<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'back'" :title="'商品评价'" :bgClass="'bg-red'">
            <div class="header-icon-main">
                <div class="header-icon">
                    <support-ico :size="15" :type="'share'"></support-ico>
                    <div @click="showNav">
                        <support-ico :size="16" :type="'more'" class="ml-30"></support-ico>
                    </div>
                </div>
            </div>
        </mall-header>
        <mall-nav ref="navWrapper"></mall-nav>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="goods" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <div class="comment-wrapper">
                    <div class="comment-part-1">
                        <div class="comment-part-1-item comment-part-1-item-active">全部</div>
                        <div class="comment-part-1-item">全新</div>
                        <div class="comment-part-1-item">好评 106</div>
                        <div class="comment-part-1-item">中评 0</div>
                        <div class="comment-part-1-item">有图 16</div>
                    </div>
                    <div class="comment-part-2">
                        <div class="good-slide-comment-items">
                            <div class="good-slide-comment-item" v-for="(item, index) in items" :key="index" @load="onImgLoad">
                                <div class="good-slide-comment-item-message">
                                    <div class="good-slide-comment-item-message-title">
                                        <support-ico :size="7" :type="'portrait'"></support-ico>
                                        <div class="message-title-text">aq123456</div>
                                        <div class="message-title-star">
                                            <support-ico :size="18" :type="'star'"></support-ico>
                                            <support-ico :size="18" :type="'star'"></support-ico>
                                            <support-ico :size="18" :type="'star'"></support-ico>
                                            <support-ico :size="18" :type="'star'"></support-ico>
                                            <support-ico :size="18" :type="'emptystar'"></support-ico>
                                        </div>
                                    </div>
                                    <div class="good-slide-comment-item-message-sku">
                                        <span>2019-10-20</span>
                                        <span>尺码:S</span>
                                        <span>颜色:红色</span>
                                    </div>
                                    <div class="good-slide-comment-item-message-msg">皮蛋瘦皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮皮蛋瘦皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥肉粥蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥肉粥</div>
                                </div>

                                <div class="good-slide-comment-item-imgs">
                                    <ul class="imgs-items">
                                        <li v-for="(item, index) in items" :key="index" class="imgs-item" @click="handleImgsClick(index)" @load="onImgLoad()">
                                            <img :src="item.image" />
                                        </li>
                                        <li v-for="i in items.length % 3" :key="i" class="imgs-item"></li>
                                    </ul>
                                </div>

                                <div class="good-slide-replay-item">
                                    <div class="good-slide-replay-item-message">
                                        <div class="good-slide-replay-item-message-title">
                                            <support-ico :size="7" :type="'portrait'"></support-ico>
                                            <div class="message-title-text">商家回复</div>
                                        </div>
                                        <div class="good-slide-replay-item-message-msg">皮蛋瘦皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮皮蛋瘦皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥肉粥蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥肉粥</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api'
import mallHeader from '@/components/mall-header/mall-header'
import SupportIco from '@/components/support-ico/support-ico'
import mallNav from '@/components/mall-nav/mall-nav'
export default {
    name: 'goods',
    data () {
        return {
            loadStatus: true,
            items: [
                {
                    url: 'http://www.didichuxing.com/',
                    image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3978382133,2176310874&fm=27&gp=0.jpg'
                },
                {
                    url: 'http://www.didichuxing.com/',
                    image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3978382133,2176310874&fm=27&gp=0.jpg'
                },
                {
                    url: 'http://www.didichuxing.com/',
                    image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3978382133,2176310874&fm=27&gp=0.jpg'
                },
                {
                    url: 'http://www.didichuxing.com/',
                    image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3978382133,2176310874&fm=27&gp=0.jpg'
                },
                {
                    url: 'http://www.didichuxing.com/',
                    image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3978382133,2176310874&fm=27&gp=0.jpg'
                }
            ],
            imgs: [],
            isNav: false,
            initialImgIndex: 0,
            options: {
                pullDownRefresh: {
                    threshold: 60,
                    txt: this.$i18n.t('message.hello')
                },
                pullUpLoad: true
            },
            secondStop: 26,
            transshape: false,
            sortType: -1,
            upDown: -1,
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
            this.goods = res.data[0].foods
            this.items.forEach(item => {
                this.imgs.push(item.image)
            })
        },
        showNav () {
            if (!this.$refs.navWrapper.isVisible) {
                this.$refs.navWrapper.show()
            } else {
                this.$refs.navWrapper.hide()
            }
        },
        handleImgsClick (index) {
            this.initialImgIndex = index
            const params = {
                $props: {
                    imgs: this.imgs,
                    initialIndex: 'initialImgIndex', // 响应式数据的key名
                    loop: false,
                    speed: 500
                },
                $events: {
                    change: i => {
                        // 必须更新 initialIndex
                        this.initialImgIndex = i
                    }
                }
            }
            this.$createImagePreview({ ...params }).show()
        },
        onPullingDown () {
            setTimeout(() => {
                this.getGoods()
                this.$refs.contentScroll.forceUpdate(true)
            }, 1000)
        },
        onPullingUp () {
            setTimeout(() => {
                this.goods = this.goods.concat(this.goods)
            }, 1000)
        },
        onImgLoad () {
            const contentScroll = this.$refs.contentScroll
            contentScroll.scroll.beforePullDown && contentScroll.refresh()
        }
    },
    components: {
        mallHeader,
        SupportIco,
        mallNav
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
        .comment-wrapper
            width 100%
            .comment-part-1
                padding 20px 30px 10px
                background #FFFFFF
                margin-bottom 20px
                display flex
                align-items center
                flex-flow wrap
                .comment-part-1-item
                    margin 10px 25px 10px 0
                    padding 20px 35px
                    background #f7f7f7
                    font-size 28px
                    border-radius 50px
                .comment-part-1-item-active
                    background #ee3147
                    color #FFFFFF
            .comment-part-2
                .good-slide-comment-items
                    background #FFFFFF
                    .good-slide-comment-item
                        padding-bottom 40px
                        .good-slide-comment-item-message
                            padding 0 30px
                            .good-slide-comment-item-message-title
                                padding 30px 0 20px
                                display flex
                                align-items center
                                .message-title-text
                                    padding 0 20px 0 10px
                                .message-title-star
                                    .support-ico
                                        padding 0 2px
                            .good-slide-comment-item-message-sku
                                color #b6b6b6
                                font-size 20px
                                text-align left
                                span
                                    &:first-child
                                        padding-right 20px
                            .good-slide-comment-item-message-msg
                                margin 18px 0 0
                                width 100%
                                text-align left
                                overflow hidden
                                text-overflow ellipsis
                                display -webkit-box
                                -webkit-line-clamp 2
                                line-clamp 2
                                -webkit-box-orient vertical
                                line-height 140%
                                white-space pre-wrap
                    .good-slide-comment-item-imgs
                        padding 0 30px
                        .imgs-items
                            width 100%
                            display flex
                            align-items center
                            justify-content space-between
                            flex-flow wrap
                            .imgs-item
                                width 220px
                                img
                                    width 100%
                                    height 220px
                                    border-radius 8px
                                    margin-top 10px
                    .good-slide-replay-item
                        margin-top 20px
                        padding 0 30px
                        .good-slide-replay-item-message
                            background #F8F8F8
                            border-radius 8px
                            padding 20px 30px
                            .good-slide-replay-item-message-title
                                display flex
                                align-items center
                                .message-title-text
                                    padding 0 20px 0 10px
                            .good-slide-replay-item-message-msg
                                margin 18px 0 0
                                width 100%
                                text-align left
                                overflow hidden
                                text-overflow ellipsis
                                display -webkit-box
                                -webkit-line-clamp 2
                                line-clamp 2
                                -webkit-box-orient vertical
                                line-height 140%
                                white-space pre-wrap
    .header-icon-main
        position absolute
        right 0
        top 0
        .header-icon
            height 60px
            display flex
            align-items center
            .ml-30
                margin-left 30px
            div
                display flex
    >>>.once-load
        position absolute
        left 50%
        >span
            margin auto
            transform translate(-50%, 100%)
// .show-nav-enter-active, .show-nav-leave-active
//     transition width 0.5s
// .show-nav-enter, .show-nav-leave-to
//     width 70%
// .show-nav-enter-to, .show-nav-leave
//     width 100%
</style>
