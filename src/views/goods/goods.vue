<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'back'" :title="'商品列表'" :bgClass="'bg-red'">
            <div @click="changeTransshape" class="transshape">
                <support-ico v-if="!transshape" :size="10" :type="'square'"></support-ico>
                <support-ico v-else :size="11" :type="'Rectangle'"></support-ico>
            </div>
        </mall-header>
        <div class="goods-nav">
            <div @click="sort(0)" class="nav-text" :class="{'nav-text-active':sortType === 0}">默认</div>
            <div @click="sort(1)" class="nav-text" :class="{'nav-text-active':sortType === 1}">销量</div>
            <div @click="sort(2)" class="nav-text" :class="{'nav-text-active':sortType === 2}">
                <div class="nav-text-s">价格</div>
                <div class="nav-text-ss">
                    <div class="nav-sj-1" :class="{'nav-sj-1-active':upDown === 0}"></div>
                    <div class="nav-sj-2" :class="{'nav-sj-2-active':upDown === 1}"></div>
                </div>
            </div>
        </div>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="goods" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <transition name="fade">
                    <div v-if="!transshape" class="goods-content-grid">
                        <div class="goods-items">
                            <div  @click.stop="action(0)" class="goods-item" v-for="(item, index) in goods" :key="index">
                                <img :src="item.icon" alt="">
                                <div class="goods-text">
                                    <div class="goods-text-title">{{item.name}}</div>
                                    <div class="goods-text-tag">
                                        <div class="goods-text-tag-content">
                                            <div class="goods-text-tag-item">9.0英寸</div>
                                            <div class="goods-text-tag-item">RTX2080</div>
                                        </div>
                                    </div>
                                    <div class="goods-text-price">
                                        <div class="goods-text-price-content">
                                            <div class="goods-text-price-item">
                                                <div>
                                                    <span class="goods-text-price-s">￥</span>
                                                    <span class="goods-text-price-ss">{{item.price}}</span>
                                                </div>
                                                <div class="goods-text-price-sss">用户好评700+</div>
                                            </div>
                                            <div @click.stop="action(1)">
                                                <support-ico :size="12" :type="'cart'"></support-ico>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="goods-content-flow">
                        <div class="goods-items">
                            <div @click.stop="action(0)" class="goods-item" v-for="(item, index) in goods" :key="index">
                                <div class="flow-img">
                                    <img :src="item.icon" alt="">
                                </div>
                                <div class="goods-text">
                                    <div class="goods-text-title">{{item.name}}</div>
                                    <div class="goods-text-tag">
                                        <div class="goods-text-tag-content">
                                            <div class="goods-text-tag-item">9.0英寸</div>
                                            <div class="goods-text-tag-item">RTX2080</div>
                                        </div>
                                    </div>
                                    <div class="goods-text-price">
                                        <div class="goods-text-price-content">
                                            <div class="goods-text-price-item">
                                                <div>
                                                    <span class="goods-text-price-s">￥</span>
                                                    <span class="goods-text-price-ss">{{item.price}}</span>
                                                </div>
                                                <div class="goods-text-price-sss">用户好评700+</div>
                                            </div>
                                            <div @click.stop="action(1)">
                                                <support-ico :size="12" :type="'cart'"></support-ico>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </cube-scroll>
        </div>
        <div class="to-shopping" @click.stop="action(2)">
            <support-ico :size="13" :type="'red_cart'"></support-ico>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api'
import mallHeader from '@/components/mall-header/mall-header'
import SupportIco from '@/components/support-ico/support-ico'
export default {
    name: 'goods',
    data () {
        return {
            loadStatus: true,
            items: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png',
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
        },
        changeTransshape () {
            this.transshape = !this.transshape
            this.$refs.contentScroll.scrollTo(0, this.secondStop)
            this.$refs.contentScroll.refresh()
        },
        sort (val) {
            this.sortType = val
            if (val === 2) {
                console.log(this.upDown)
                if (this.upDown === -1 || this.upDown === 1) {
                    this.upDown = 0
                } else {
                    this.upDown = 1
                }
            } else {
                this.upDown = -1
            }
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
        SupportIco
    }
}
</script>

<style lang="stylus" scoped>
.mall-scroll-wrapper
    .transshape
        width 32px
        height 33px
        position absolute
        right 0
        top 5px
    .goods-nav
        height 70px
        line-height 70px
        background #FFFFFF
        padding 0 50px
        display flex
        align-items center
        justify-content space-between
        .nav-text-active
            color #dc352c
        .nav-text
            font-size 26px
            display flex
            font-weight bold
            .nav-text-s
                font-size 26px
                font-weight bold
            .nav-text-ss
                margin-left 5px
                display flex
                align-items center
                justify-content center
                flex-direction column
                .nav-sj-1
                    width 0
                    height 0
                    border-left 7px solid transparent
                    border-right 7px solid transparent
                    border-bottom 8px solid #8f8f8f
                .nav-sj-1-active
                    border-bottom 8px solid #dc352c
                .nav-sj-2
                    width 0
                    height 0
                    border-left 7px solid transparent
                    border-right 7px solid transparent
                    border-top 8px solid #8f8f8f
                    margin-top 2px
                .nav-sj-2-active
                    border-top 8px solid #dc352c
    .mall-scroll-list-wrap
        width 100%
        position absolute
        top 170px
        left 0
        right 0
        bottom 0
        overflow scroll
        .goods-content-grid
            padding 0 20px 10px
            .goods-items
                display flex
                align-items center
                justify-content space-between
                flex-flow wrap
                .goods-item
                    width 350px
                    height 610px
                    border-radius 8px
                    position relative
                    background #FFFFFF
                    margin-top 10px
                    img
                        width 100%
                        height 350px
                        border-radius 8px 8px 0 0
                    .goods-text
                        .goods-text-title
                            padding 24px 20px 0
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
                            bottom 115px
                            width 100%
                            .goods-text-tag-content
                                display flex
                                align-items center
                                padding 0 20px
                                overflow hidden
                                .goods-text-tag-item
                                    padding 5px 15px
                                    margin-right 10px
                                    border-radius 14px
                                    background #F7F7F7
                                    color #8F8F8F
                                    font-size 20px
                        .goods-text-price
                            position absolute
                            bottom 21px
                            width 100%
                            .goods-text-price-content
                                display flex
                                align-items flex-end
                                justify-content space-between
                                padding 0 20px
                                .goods-text-price-item
                                    text-align left
                                    .goods-text-price-s
                                        color #ee3147
                                        font-weight bold
                                    .goods-text-price-ss
                                        color #ee3147
                                        font-size 38px
                                        font-weight bold
                                    .goods-text-price-sss
                                        color #8f8f8f
                                        font-size 20px
                                        padding-top 12px
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
                                    .goods-text-price-sss
                                        color #8f8f8f
                                        font-size 20px
                                        padding-top 12px
    .to-shopping
        position absolute
        bottom 120px
        z-index 99
        right 30px
    >>>.once-load
        position absolute
        left 50%
        >span
            margin auto
            transform translate(-50%, 100%)
.fade-enter-active, .fade-leave-active {
    transition opacity .3s
}
.fade-enter, .fade-leave-active {
    opacity 0
}
.success-enter-active, .success-leave-active
    transition width 0.5s
.success-enter, .success-leave-to
    width 70%
.success-enter-to, .success-leave
    width 100%
</style>
