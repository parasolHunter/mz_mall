<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'other'" :bgClass="'bg-white'" title="积分详情"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="content" :options="options" @pulling-down="onPullingDown"
                         @pulling-up="onPullingUp">
                <div class="cumulative">
                    <p class="margin-bottom2">积分余额 <span class="cumulative-balance">232000</span></p>
                    <p>累计已获得积分 <span>10000</span></p>
                </div>
                <div class="Integral-list">
                        <p class="margin-bottom2">签到奖励积分</p>
                        <p><span>2019-01-01</span><span>+1000.00</span></p>
                </div>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api'
import mallHeader from '@/components/mall-header/mall-header'

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
            secondStop: 26
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
            background-color #fff
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

    .margin-bottom2
        margin-bottom 20px
    .Integral-list
        height 140px
        padding 40px 20px 30px
        box-sizing border-box
        text-align left
        border-bottom 1px solid #e5e5e5
        font-size 30px
        p span:first-child
         font-size 24px
         color #8f8f8f
         float left
        p span:last-child
         float right
    .cumulative
        width 100%
        height 220px
        background url("./Integraldetails.png") no-repeat center;
        background-size 100% 100%;
        padding 60px 30px
        box-sizing border-box
        text-align left
        color #fff

        .cumulative-balance
            font-size 50px

    .success-enter-active, .success-leave-active
        transition width 0.5s

    .success-enter, .success-leave-to
        width 70%

    .success-enter-to, .success-leave
        width 100%
</style>
