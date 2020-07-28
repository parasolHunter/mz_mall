<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'home'" :bgClass="'bg-white'"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="qjList" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <div class="content-main">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item, index) in bannerList" :key="index"><img :src="item.img_url" /></div>
                        </div>
                    </div>
                    <div class="broadcast-container">
                        <div class="broadcast-slider-item">
                            <support-ico :size="2" :type="'broadcast'"></support-ico>
                            <cube-slide ref="slide" :data="msgList" direction="vertical" :showDots="false" :loop="true" :auto-play="true" :interval="2000" @change="changePage">
                                <cube-slide-item v-if="msgList">暂无消息</cube-slide-item>
                                <cube-slide-item v-else v-for="(item, index) in msgList" :key="index" @click.native="clickHandler(item, index)">
                                    <router-link to="messages">
                                        <div class="slider-text">{{ item.url }}</div>
                                    </router-link>
                                </cube-slide-item>
                            </cube-slide>
                        </div>
                        <router-link to="messages" class="broadcast-more">更多</router-link>
                    </div>
                    <div class="can-container">
                        <div class="can-item" v-for="(item, index) in canList" :key="index">
                            <img :src="item.img_url" />
                            <div class="can-text">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="special-container">
                        <div class="special-container-items">
                            <div class="special-items">
                                <div class="special-item">
                                    <div class="special-text-block">
                                        <support-ico :size="5" :type="'odds'"></support-ico>
                                        <div class="special-text">{{ mrList.ztname }}</div>
                                    </div>
                                    <div class="special-item-block">
                                        <div class="special-block-item" :class="'special-block-bg-' + index" v-for="(item, index) in mrList.pList" :key="index">
                                            <div class="txt-color-red">￥19.9</div>
                                            <div class="txt-color-grey">￥49.9</div>
                                            <img :src="item.img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="special-items">
                                <div class="special-item">
                                    <div class="special-text-block">
                                        <support-ico :size="6" :type="'shopping'"></support-ico>
                                        <div class="special-text">{{ czList.ztname }}</div>
                                    </div>
                                    <div class="special-item-block">
                                        <div class="special-block-item" :class="'special-block-bg-' + (index + 2)" v-for="(item, index) in czList.pList" :key="index">
                                            <div class="txt-color-purple">直降19.9元</div>
                                            <img :src="item.img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="special-container-items">
                            <div class="special-items">
                                <div class="special-item">
                                    <div class="special-text-block">
                                        <support-ico :size="8" :type="'sort'"></support-ico>
                                        <div class="special-text">{{ phList.ztname }}</div>
                                    </div>
                                    <div class="special-item-block">
                                        <div class="special-block-item" v-for="(item, index) in mrList.pList" :key="index">
                                            <div class="txt-color-blue">黄金饰品榜</div>
                                            <img :src="item.img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="special-items">
                                <div class="special-item">
                                    <div class="special-text-block">
                                        <support-ico :size="7" :type="'live'"></support-ico>
                                        <div class="special-text">直播</div>
                                    </div>
                                    <div class="special-item-block">
                                        <div class="special-block-item" v-for="(item, index) in mrList.pList" :key="index">
                                            <div class="txt-color-yellow">直降19.9元</div>
                                            <img :src="item.img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="special-container-jx">
                        <div class="special-container-jx-item">
                            <div class="jx-title">{{ jxList.ztname }}</div>
                            <div class="jx-banner"></div>
                        </div>
                        <cube-scroll ref="scroll" direction="horizontal" class="horizontal-scroll-list-wrap">
                            <ul class="list-wrapper">
                                <li v-for="(item, index) in jxList.pList" :key="index" class="list-item">
                                    <img :src="item.img" />
                                    <div class="jx-text">五分文无核桂仁五分文无核桂仁</div>
                                    <div class="jx-price">
                                        <span class="font-s">￥</span>
                                        <span class="font-ss">100.00</span>
                                    </div>
                                </li>
                            </ul>
                        </cube-scroll>
                    </div>
                    <div class="special-container-rm">
                        <div class="special-container-rm-item">
                            <div class="rm-title">{{ rmList.ztname }}</div>
                            <div class="rm-banners"><img :src="item.img" v-for="(item, index) in rmList.pList" :key="index" /></div>
                        </div>
                    </div>
                    <div class="special-container-qj">
                        <div class="special-container-qj-item">
                            <div class="qj-title">
                                {{ qjList.ztname }}
                                <span class="qj-title-1">大牌直营</span>
                                <span class="qj-title-2">更多</span>
                            </div>
                            <div class="qj-banners">
                                <div class="qj-banner"></div>
                                <div class="qj-pros">
                                    <cube-slide ref="slide" :loop="false" :autoPlay="false" @change="changePage">
                                        <!-- <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)"> -->
                                        <cube-slide-item>
                                            <div class="qj-pro" v-for="(item, index) in qjList.pList" :key="index">
                                                <div class="qj-pro-text">
                                                    <div class="qj-pro-text-1">吾尼索尼(SONY)(SONY)</div>
                                                    <div class="qj-pro-text-2">Alpha 7 III Alpha 7 III</div>
                                                </div>
                                                <img :src="item.img" />
                                            </div>
                                        </cube-slide-item>
                                    </cube-slide>
                                </div>
                                <!-- <div class="qj-pros">
                                    <div class="qj-pro" v-for="(item, index) in qjList.pList" :key="index">
                                        <div class="qj-pro-text">
                                            <div class="qj-pro-text-1">吾尼索尼(SONY)(SONY)</div>
                                            <div class="qj-pro-text-2">Alpha 7 III Alpha 7 III</div>
                                        </div>
                                        <img :src="item.img">
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="special-container-xh">
                        <div class="special-container-xh-item">
                            <div class="xh-title">猜你喜欢</div>
                            <div class="xh-waterfall-content">
                                <div class="xh-waterfall-items">
                                    <div class="xh-waterfall-item xh-waterfall-even-item" v-for="(item, a) in evenProList" :key="a">
                                        <img :src="item.img" />
                                        <div class="xh-waterfall-text">
                                            <div class="xh-text xh-even-text">吾尼索尼(SO吾尼索尼(SONY)(SONY)吾尼索尼(SONY)(SONY)吾尼索</div>
                                            <div class="xh-price-text">
                                                <span class="xh-price-text-s">￥</span>
                                                <span class="xh-price-text-ss">59.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="xh-waterfall-items">
                                    <div class="xh-waterfall-item xh-waterfall-odd-item" v-for="(item, b) in oddProList" :key="b">
                                        <img :src="item.img" @load="onImgLoad" />
                                        <div class="xh-waterfall-text">
                                            <div class="xh-text xh-odd-text">吾尼索尼(SONY)(SONY)吾尼索尼(SONY)(SONY)吾尼索尼</div>
                                            <div class="xh-price-text">
                                                <span class="xh-price-text-s">￥</span>
                                                <span class="xh-price-text-ss">59.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <ul class="imgs-wrapper">
                    <li v-for="(item, index) in content" :key="index" class="imgs-item"><img :src="item.url" @load="onImgLoad" /></li>
                </ul> -->
                <!-- <template slot="pulldown" slot-scope="props">
            <div v-if="props.pullDownRefresh" class="cube-pulldown-wrapper" :style="props.pullDownStyle">
              <div v-if="props.beforePullDown" class="before-trigger" :style="{ paddingTop: props.bubbleY + 'px' }"><span :class="{ rotate: props.bubbleY > 0 }">↓</span></div>
              <div class="after-trigger" v-else>
                <div v-show="props.isPullingDown" class="loading"><cube-loading></cube-loading></div>
                <transition name="success">
                  <div v-show="!props.isPullingDown" class="text-wrapper"><span class="refresh-text">今日新</span></div>
                </transition>
              </div>
            </div>
          </template> -->
            </cube-scroll>
        </div>
    </div>
</template>

<script>
import { getHome } from '@/api'
import mallHeader from '@/components/mall-header/mall-header'
import SupportIco from '@/components/support-ico/support-ico'

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

const imgs = [
    {
        img: 'https://dpubstatic.udache.com/static/dpubimg/7EzIhoEvnG/toutiao_12.JPG'
    },
    {
        img: 'https://dpubstatic.udache.com/static/dpubimg/GR0Piaf5sz/toutiao_21.JPG'
    },
    {
        img: 'https://dpubstatic.udache.com/static/dpubimg/K1JqUN8HSA/toutiao_31.JPG'
    },
    {
        img: 'https://dpubstatic.udache.com/static/dpubimg/K1JqUN8HSA/toutiao_31.JPG'
    }
]
export default {
    data () {
        return {
            mrList: [],
            czList: [],
            phList: [],
            jxList: [],
            rmList: [],
            qjList: imgs.slice(),
            xhList: [],
            msgList: [],
            canList: [],
            fallList: [],
            bannerList: [],
            index: 0,
            swiper: null,
            swiperIndex: 0,
            loadStatus: true,
            options: {
                pullDownRefresh: {
                    threshold: 60,
                    txt: this.$i18n.t('message.hello')
                },
                pullUpLoad: true
            },
            secondStop: 26
        }
    },
    computed: {
        // 计算属性的 getter
        evenProList: function () {
            let a = []
            this.qjList.forEach((item, index) => {
                if (index % 2 === 0) {
                    a.push(this.qjList[index])
                } 
            })
            return a
        },
        oddProList: function () {
            let b = []
            this.qjList.forEach((item, index) => {
                if (index % 2 !== 0) {
                    b.push(this.qjList[index])
                } 
            })
            return b
        }
    },
    mounted () {
        // this.getHome()
        console.log(this.$i18n.t('message.hello'))

        this.loadStatus = false
        this.fallList = this.fallList.concat(this.qjList)
    },
    methods: {
        async getHome () {
            let res = await getHome()
            setTimeout(() => {
                this.loadStatus = false
                if (res.respCode === '00000') {
                    this.msgList = res.msgList
                    this.canList = res.canList
                    this.bannerList = res.bannerList
                    this.mrList = res.specialList[0] || []
                    this.czList = res.specialList[1] || []
                    this.phList = res.specialList[2] || []
                    this.jxList = res.specialList[3] || []
                    this.rmList = res.specialList[4] || []
                    this.qjList = res.specialList[5] || []
                    this.xhList = res.specialList[5] || []

                    this.fallList = this.fallList.concat(this.jxList.pList)

                    this.fallList.forEach((item, index) => {
                        if (index % 2 !== 0) {
                            this.oddProList.push(this.fallList[index])
                        } else {
                            this.evenProList.push(this.fallList[index])
                        }
                    })

                    this.$nextTick(() => {
                        this.onSwiperLoad()
                    })
                }
            }, 1000)
        },
        changePage (current) {
            console.log('当前轮播图序号为:' + current)
        },
        clickHandler (item, index) {
            console.log(item, index)
        },
        onPullingDown () {
            this.oddProList = []
            this.evenProList = []
            // this.swiper.destroy(false)
            setTimeout(() => {
                this.qjList = imgs
                this.$refs.contentScroll.forceUpdate(true)
                // this.getHome()
                // this.$refs.contentScroll.forceUpdate()
            }, 1000)
        },
        onPullingUp () {
            setTimeout(() => {
                this.qjList = this.qjList.concat(imgs)
            }, 1000)
        },
        onImgLoad () {
            console.log(111)
            const contentScroll = this.$refs.contentScroll
            contentScroll.scroll.beforePullDown && contentScroll.refresh()
        },
        onSwiperLoad () {
            this.swiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                loop: true,
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                coverflow: {
                    rotate: 10,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false
                },
                spaceBetween: 50
            })
        }
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
        top 100px
        left 0
        right 0
        bottom 100px
        overflow scroll
        .content-main
            width 100%
            background #FFFFFF
            .swiper-container
                overflow visible !important
                width 670px
                height 360px
                padding 20px 0
                .swiper-wrapper
                    .swiper-slide
                        width 670px
                        img
                            width 100%
                            height 100%
                            border-radius 20px
            .broadcast-container
                width 670px
                height 80px
                line-height 80px
                margin auto
                overflow hidden
                display flex
                align-items center
                justify-content space-between
                .broadcast-slider-item
                    display flex
                    align-items center
                    width 80%
                    height 100%
                    .broadcast
                        margin-right 20px
                    .cube-slide-item
                        float none
                        .slider-text
                            text-overflow ellipsis
                            word-break break-word
                            overflow hidden
                            color #1d1d1d
                .broadcast-more
                    font-size 22px
                    color #1d1d1d
            .can-container
                width 100%
                display flex
                align-items center
                flex-flow wrap
                padding-bottom 30px
                .can-item
                    width 20%
                    display flex
                    align-items center
                    justify-content center
                    flex-direction column
                    padding 15px 0
                    img
                        width 72px
                        height 72px
                        margin-bottom 18px
                    .can-text
                        font-weight bold
            .special-container
                .special-container-items
                    width 670px
                    margin auto
                    display flex
                    align-items center
                    flex-flow wrap
                    box-shadow 0px 0px 20px 0px #ebeaea
                    margin-bottom 20px
                    .special-items
                        width 50%
                        .special-item
                            padding 20px 25px
                            .special-text-block
                                display flex
                                align-items center
                                margin-bottom 14px
                                .support-ico
                                    margin-right 10px
                                .special-text
                                    text-align left
                                    font-size 30px
                                    font-weight bold
                            .special-item-block
                                width 100%
                                display flex
                                align-items center
                                justify-content space-between
                                .special-block-item
                                    width 140px
                                    border-radius 2px
                                    img
                                        width 90px
                                        height 98px
                                    .txt-color-red
                                        color #eb5054
                                        font-weight bold
                                        padding-top 20px
                                    .txt-color-purple
                                        color #eb50ae
                                        font-weight bold
                                        padding-top 20px
                                        padding-bottom 36px
                                    .txt-color-grey
                                        color #8f8f8f
                                        font-size 18px
                                        padding-bottom 18px
                                        text-decoration-line line-through
                                    .txt-color-blue
                                        color #532ee7
                                        font-weight bold
                                        padding-top 18px
                                        padding-bottom 18px
                                    .txt-color-yellow
                                        color #ffac26
                                        font-weight bold
                                        padding-top 18px
                                        padding-bottom 18px
                                .special-block-bg-0
                                    background #f5f7fc
                                    height 206px
                                .special-block-bg-1
                                    background #fcf9f4
                                    height 206px
                                .special-block-bg-2
                                    background #f7fcf5
                                    height 206px
                                .special-block-bg-3
                                    background #f9f4fc
                                    height 206px
            .special-container-jx
                .special-container-jx-item
                    width 690px
                    margin 60px auto 0
                    .jx-title
                        font-size 30px
                        font-weight bold
                        text-align left
                    .jx-banner
                        width 100%
                        height 170px
                        margin 20px 0
                        bg-image('banner')
                        background-size 100% 170px
                        background-repeat no-repeat
                >>>.horizontal-scroll-list-wrap
                    display flex
                    align-items center
                    .cube-scroll-content
                        display inline-block
                    .list-wrapper
                        white-space nowrap
                    .list-item
                        display inline-block
                        padding-right 20px
                        width 180px
                        &:first-child
                            padding-left 30px
                        &:last-child
                            padding-right 0
                        img
                            width 100%
                            height 180px
                            border-radius 4px
                        .jx-text
                            font-size 22px
                            font-weight bold
                            padding-top 10px
                            overflow hidden
                            text-overflow ellipsis
                            white-space nowrap
                        .jx-price
                            color #ee3147
                            text-align left
                            padding-top 20px
                            .font-s
                                font-size 20px
                                font-weight bold
                            .font-ss
                                font-size 28px
                                font-weight bold
            .special-container-rm
                .special-container-rm-item
                    width 690px
                    margin 60px auto 0
                    .rm-title
                        font-size 30px
                        font-weight bold
                        text-align left
                    .rm-banners
                        width 100%
                        display flex
                        align-items center
                        justify-content space-between
                        flex-flow wrap
                        img
                            width 335px
                            height 180px
                            margin 20px 0 0
                            border-radius 8px
            .special-container-qj
                .special-container-qj-item
                    width 690px
                    margin 60px auto 0
                    .qj-title
                        font-size 30px
                        font-weight bold
                        text-align left
                        .qj-title-1
                            font-size 24px
                            color #8f8f8f
                        .qj-title-2
                            font-size 24px
                            color #8f8f8f
                            float right
                    .qj-banners
                        display flex
                        align-items center
                        width 100%
                        height 500px
                        margin 20px 0 0
                        .qj-banner
                            width 330px
                            height 100%
                            bg-image('qjBanner')
                            background-size 330px 100%
                            background-repeat no-repeat
                            border-radius 8px 0 0 8px
                        .qj-pros
                            width 360px
                            height 496px
                            border-top-width 2px
                            border-right-width 2px
                            border-bottom-width 2px
                            border-color #ebebeb
                            border-style solid
                            border-radius 0 8px 8px 0
                            >>>.cube-slide-dots
                                bottom 10px
                                span
                                    width 10px
                                    height 10px
                                    background #cecece
                                    border-radius 100% 100%
                                    margin 0 5px
                                .active
                                    background #ef472a
                                    border-radius 100% 100%
                            .qj-pro
                                padding 0 20px
                                height 33.33%
                                display flex
                                align-items center
                                justify-content space-between
                                border-bottom 2px solid #ebebeb
                                &:last-child
                                    border-bottom 0
                                .qj-pro-text
                                    width 180px
                                    height 120px
                                    text-align left
                                    .qj-pro-text-1
                                        overflow hidden
                                        text-overflow ellipsis
                                        white-space nowrap
                                        font-size 28px
                                        font-weight bold
                                    .qj-pro-text-2
                                        overflow hidden
                                        text-overflow ellipsis
                                        white-space nowrap
                                        padding-top 20px
                                        font-size 22px
                                        color #8f8f8f
                                img
                                    width 120px
                                    height 120px
            .special-container-xh
                .special-container-xh-item
                    width 690px
                    margin 60px auto 0
                    .xh-title
                        font-size 30px
                        font-weight bold
                        text-align left
                    .xh-waterfall-content
                        margin 20px 0
                        display flex
                        justify-content space-between
                        .xh-waterfall-items
                            width 330px
                            .xh-waterfall-item
                                width 100%
                                margin-bottom 20px
                                border-radius 8px
                                box-shadow 0px 0px 20px 0px #ebeaea
                                img
                                    border-radius 8px 8px 0 0
                                .xh-waterfall-text
                                    padding 0 20px
                                    .xh-price-text
                                        color #ee3147
                                        text-align left
                                        position absolute
                                        bottom 25px
                                        .xh-price-text-s
                                            font-size 20px
                                            font-weight bold
                                        .xh-price-text-ss
                                            font-size 28px
                                            font-weight bold
                                    .xh-text
                                        text-align left
                                        display -webkit-box
                                        -webkit-box-orient vertical
                                        -webkit-line-clamp 2
                                        overflow hidden
                                        line-height 140%
                                        font-weight bold
                            .xh-waterfall-even-item
                                &:nth-child(2n+1)
                                    height 480px
                                    position relative
                                    img
                                        width 100%
                                        height 330px
                                    .xh-even-text
                                        padding-top 14px
                                &:nth-child(2n+2)
                                    height 540px
                                    position relative
                                    img
                                        width 100%
                                        height 380px
                                    .xh-even-text
                                        padding-top 20px
                            .xh-waterfall-odd-item
                                position relative
                                &:nth-child(2n+2)
                                    height 480px
                                    img
                                        width 100%
                                        height 330px
                                    .xh-odd-text
                                        padding-top 14px
                                &:nth-child(2n+1)
                                    height 540px
                                    img
                                        width 100%
                                        height 380px
                                    .xh-odd-text
                                        padding-top 20px
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
