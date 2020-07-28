<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'back'" :title="'我的收藏'" :bgClass="'bg-red'">
        </mall-header>
        <div class="nav flex justifyBetween">
            <span v-for="item in navList" @click="active = item.id" :class="active == item.id?'nav_active':''">{{item.name}}</span>
        </div>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="content" :options="options" @pulling-down="onPullingDown"
                         @pulling-up="onPullingUp">
                <div v-if="active==1" class="goods">
                    <div class="goods-content-flow">
                        <div class="goods-items">
                            <div @click.stop="action(0)" class="goods-item" v-for="(item, index) in goods" :key="index">
                                <div class="flow-img">
                                    <img :src="item.icon" alt="">
                                </div>
                                <div class="goods-text">
                                    <div class="goods-text-title">{{item.name}}</div>
                                    <div class="goods-text-price">
                                        <div class="goods-text-price-content">
                                            <div class="goods-text-price-item">
                                                <div>
                                                    <span class="goods-text-price-s">￥</span>
                                                    <span class="goods-text-price-ss">{{item.price}}</span>
                                                </div>
                                                <div class="goods-shop">查看店铺</div>
                                            </div>
                                            <div @click.stop="action(1)">
                                                <support-ico :size="12" :type="'cartccc'"></support-ico>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="active==2" class="shop">
                    <div class="shop-content-flow">
                        <div class="shop-items">
                            <div @click.stop="action(0)" class="shop-item" v-for="(item, index) in goods" :key="index">
                                <div class="flow-img">
                                    <img :src="item.icon" alt="">
                                </div>
                                <div class="shop-text">
                                    <div class="shop-text-title flex justifyBetween">
                                        <p class="address">{{item.name}}</p>
                                        <p class="takeaway">外卖</p>
                                    </div>
                                    <div class="shop-text-info flex justifyBetween">
                                        <div>
                                            <support-ico v-for="item in 4" :size="18" :type="'star'"></support-ico>
                                            <support-ico v-for="item in 5-4" :size="18" :type="'emptystar'"></support-ico>
                                            <span class="shop-price">¥99.00</span>
                                        </div>
                                        <p class="distance">距您2.3Km</p></div>
                                    <div class="shop-text-discount flex justifyBetween">
                                        <div>
                                            <span v-if="index!=1" class="shop-discount" >优惠</span><span v-if="index!=1" class="shop-discount-info">新用户立减17元</span>
                                             <p v-else class="shop-discount-info" >满100减20,满50减12</p>
                                        </div>
                                        <p class="cancel">取消收藏</p></div>
                                    <div class="bd"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="active==3">
                    <div class="article" v-for="(item, index) in goods" :key="index">
                        <img :src="item.icon" alt="">
                        <p class="text">{{item.info}}</p>
                        <p class="time">2小时以前</p>
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

const imgs = [
    {
        img: 'https://dpubstatic.udache.com/static/dpubimg/7EzIhoEvnG/toutiao_12.JPG'
    },
    {
        img: 'https://dpubstatic.udache.com/static/dpubimg/GR0Piaf5sz/toutiao_21.JPG'
    },
    {
        img: 'https://dpubstatic.udache.com/static/dpubimg/K1JqUN8HSA/toutiao_31.JPG'
    }
]
let cnt = 1
export default {
    data () {
        return {
            content: imgs.slice(),
            index: 0,
            swiperIndex: 0,
            loadStatus: false,
            items: [
                {
                    url: 'http://www.didichuxing.com/',
                    image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
                },
                {
                    url: 'http://www.didichuxing.com/',
                    image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
                },
                {
                    url: 'http://www.didichuxing.com/',
                    image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
                }
            ],
            options: {
                pullDownRefresh: {
                    threshold: 60,
                    txt: this.$i18n.t('message.hello')
                },
                pullUpLoad: true
            },
            secondStop: 26,
            active: 2,
            navList: [{ name: '商品', id: 1 }, { name: '线下店铺', id: 2 }, { name: '文章', id: 3 }],
            goods: []
        }
    },
    mounted () {
        this.getGoods()
        console.log(this.$i18n.t('message.hello'))
        setTimeout(() => {
            this.loadStatus = false
        }, 1000)
    },
    methods: {
        async getGoods () {
            let res = await getGoods()
            this.goods = res.data
            console.log(res.data)
        },
        onPullingDown () {
            setTimeout(() => {
                this.content.unshift(imgs[cnt++ % 3])
                this.$refs.contentScroll.forceUpdate()
            }, 1000)
        },
        onPullingUp () {
            setTimeout(() => {
                this.content = this.content.concat(imgs)
            }, 1000)
        },
        onImgLoad () {
            const contentScroll = this.$refs.contentScroll
            contentScroll.scroll.beforePullDown && contentScroll.refresh()
        },
        action (val) {
            if (val === 0) {
                this.$router.push('/good/1')
            } else if (val === 1) {
                console.log(111)
            } else if (val === 2) {
                this.$router.push('/shopping')
            }
        },
    },
    components: {
        mallHeader,
        SupportIco
    }
}
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/mixin'

    .mall-scroll-wrapper
        .mall-scroll-list-wrap
            width 100%
            position absolute
            top 188px
            left 0
            right 0
            bottom 0px
            overflow scroll

            .imageList {
                overflow-x: auto;
                overflow-y: hidden;
                height: 180px;
                white-space: nowrap;

                img {
                    width 300px
                    height 200px
                    margin-right: 10px;
                }
            }

        >>> .once-load
            position absolute
            left 50%

            > span
                margin auto
                transform translate(-50%, 100%)

    .success-enter-active, .success-leave-active
        transition width 0.5s

    .success-enter, .success-leave-to
        width 70%

    .success-enter-to, .success-leave
        width 100%
    .nav
        height 68px
        line-height 68px
        font-size 26px
        padding 0 90px
        box-sizing border-box
        background-color #fff

    .nav_active
        color #ee3147

    .goods
        .goods-content-flow
            margin-top 10px

            .goods-items
                width 100%

                .goods-item
                    display flex
                    align-items flex-start
                    height 300px
                    padding 10px 0 0 24px
                    position relative
                    background #FFFFFF

                    .flow-img
                        width 40%

                        img
                            width 260px
                            height 260px
                            border-radius 10px
                            display block

                    .goods-text
                        width 60%
                        height 100%
                        position relative
                        border-bottom 1px solid #ebebeb

                        .goods-text-title
                            padding 10px 24px 0 0
                            text-align left
                            display -webkit-box
                            -webkit-box-orient vertical
                            -webkit-line-clamp 2
                            overflow hidden
                            line-height 140%
                            font-weight bold
                            font-size 26px

                        .goods-text-tag
                            position absolute
                            padding 0 24px 0 0
                            bottom 160px

                            .goods-text-tag-content
                                display flex
                                align-items center
                                padding 0 24px 0 0
                                overflow hidden
                                width 100%

                                .goods-text-tag-item
                                    padding 5px 15px
                                    margin-right 10px
                                    border-radius 14px
                                    background #F7F7F7
                                    color #8F8F8F
                                    font-size 20px

                        .goods-text-price
                            position absolute
                            bottom 60px
                            width 100%

                            .goods-text-price-content
                                display flex
                                align-items flex-end
                                justify-content space-between
                                padding 0 24px 0 0

                                .goods-text-price-item
                                    text-align left

                                    .goods-text-price-s
                                        color #ee3147
                                        font-weight bold

                                    .goods-text-price-ss
                                        color #ee3147
                                        font-size 38px
                                        font-weight bold

                                    .goods-shop
                                        font-size 20px
                                        width 126px
                                        height 42px
                                        line-height 42px
                                        text-align center
                                        border 2px solid #ebebeb
                                        border-radius 21px
                                        margin-top 20px


    .shop
        .shop-content-flow
            margin-top 10px

            .shop-items
                width 100%

                .shop-item
                    display flex
                    align-items flex-start
                    padding 30px 30px 0px
                    position relative
                    background #FFFFFF

                    .flow-img
                        img
                            width 180px
                            height 180px
                            border-radius 10px
                            display block
                            margin-right 40px

                    .shop-text
                        width 100%

                        .shop-text-title
                            padding-top 10px

                            .address
                                font-size 30px

                            .takeaway
                                width 68px
                                height 32px
                                line-height 32px
                                border-radius 16px
                                color #fff
                                background-image linear-gradient(#f5a81f, #fdc35e)

                        .shop-text-info
                            margin 12px 0 50px
                            .shop-price
                                color #ee3147
                            .distance
                                color #8f8f8f
                        .shop-text-discount
                            margin-bottom 30px

                            .shop-discount
                                display inline-block
                                width 68px
                                height 32px
                                line-height 32px
                                border-radius 16px
                                color #fff
                                margin-right 10px
                                background-image linear-gradient(#ee3147, #ff6274)

                            .shop-discount-info
                                color #8f8f8f

                            .cancel
                                width 142px
                                height 48px
                                line-height 48px
                                text-align center
                                border 2px solid #ededed
                                border-radius 24px


                        .bd
                            border 1px solid #ededed


    .article
        padding 20px 30px 32px
        box-sizing border-box
        background-color #fff
        margin-bottom 20px

        img
            height 296px
            width 100%
            border-radius 8px

        .text
            font-size 28px
            text-align left
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 1
            -webkit-box-orient vertical
            margin 30px 0 20px

        .time
            font-size 22px
            color #8f8f8f
            text-align right
</style>
