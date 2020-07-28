<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'other'" :bgClass="'bg-white'" title="我的订单"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="GoodsList" :options="options" @pulling-down="onPullingDown"
                         @pulling-up="onPullingUp">
                <cube-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler" />
                <no-data v-if="!GoodsList.length" text="您还没有相关订单" type="1"></no-data>

                <div v-if="GoodsList.length > 0 && current == '全部'" class="order pdall"
                     v-for="(item, index) in GoodsList" :key="index">
                    <div class="order_title flex justifyBetween">
                        <p class="flex">
                            <support-ico :size="14" :type="'store'"></support-ico>
                            <span>{{ item.name }}</span>
                            <support-ico :size="19" :type="'enter'"></support-ico>
                        </p>
                        <div class="order_status color_red">等待收货</div>
                    </div>

                    <div v-if="item.foods.length <= 1" class="orderInfo flex-c-spaceb">
                        <div class="flex">
                            <img :src="item.foods[0].image" alt="" />
                            <div class="explain">
                                <div class="desc twol-omitted">{{ item.foods[0].info }}</div>
                                <div class="desc sl-omitted">{{ item.foods[0].style }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="commodity_scroll_nav flex justifyBetween" @click="redirect('order', 1, 1)">
                        <div class="commodity_scroll_nav_content flex">
                            <div class="orderInfo" v-for="(subitem, subindex) in item.foods" :key="subindex"><img
                                :src="subitem.image" alt="" /></div>
                        </div>
                        <span>共{{ item.foods.length }}件商品</span>
                        <support-ico :size="19" :type="'enter'"></support-ico>
                    </div>

                    <div class="settlement">
                        <span>共{{ item.foods.length }}件商品 合计：</span>
                        <span class="money">
                            <i>&yen;</i>
                            <em class="colorSize">{{ item.totalPrice | integerFilter }}</em>
                            <i>.{{ item.totalPrice | decimal2placesFilter }}</i>
                        </span>
                        <span>(含运费{{ item.freight ? item.freight : '0.00' }})</span>
                    </div>
                    <div class="btn_area flex justifyEnd">
                        <div class="func_btn" @click="redirect('logistics')">查看物流</div>
                        <div class="func_btn" @click="showPicker(1, 1, item.totalPrice)">支付</div>
                    </div>
                </div>
                <!-- <div v-if="GoodsList.length > 0 && current == item.type" class="order pdall" v-for="(item, index) in GoodsList" :key="index">
                </div> -->
            </cube-scroll>
        </div>
        <mall-popup ref="popupWrapper">
            <div slot="slot1">
                <mall-payment
                    title="确认付款"
                    :mall_options="paymentOptions"
                    :mall_selected_defined="paymentSelected"
                    :payPrice="payPrice"
                    @selectHanddle="selectHanddle"
                    @showPicker="showPicker"
                ></mall-payment>
            </div>
        </mall-popup>
    </div>
</template>

<script>
import { getGoods } from '@/api'
import mallHeader from '@/components/mall-header/mall-header'
import SupportIco from '@/components/support-ico/support-ico'
import noData from '@/components/noData/noData'
import mallPopup from '@/components/mall-popup/mall-popup'
import mallPayment from '@/components/mall-payment/mall-payment'

let cnt = 1
export default {
    name: 'shopping',
    data () {
        return {
            current: '全部',
            labels: ['全部', '待支付', '待发货', '待收货', '待评价'],
            loadStatus: false,
            options: {
                pullDownRefresh: {
                    threshold: 60,
                    txt: '更新成功'
                },
                pullUpLoad: true
            },
            GoodsList: [],
            payPrice: 0,
            paymentSelected: '1',
            paymentOptions: [
                {
                    label: '账户余额',
                    value: '1',
                    balance: '569.00',
                    src: require('@/assets/img/42@2x.png')
                },
                {
                    label: '支付宝支付',
                    value: '2',
                    src: require('@/assets/img/44@2x.png')
                },
                {
                    label: '微信支付',
                    value: '3',
                    src: require('@/assets/img/43@2x.png')
                    // disabled: true
                }
            ]
        }
    },
    filters: {
        decimal2placesFilter (value) {
            let realVal = ''
            if (!isNaN(value) && value !== '') {
                // 截取当前数据到小数点后两位
                realVal = parseFloat(value).toFixed(2)
                realVal = realVal.split('.')[1]
            } else {
                realVal = '--'
            }
            return realVal
        },
        integerFilter (value) {
            let realVal = ''
            if (!isNaN(value) && value !== '') {
                // 截取当前数据到小数点后两位
                realVal = parseFloat(value).toFixed(2)
                realVal = realVal.split('.')[0]
            } else {
                realVal = '--'
            }
            return realVal
        }
    },
    computed: {},
    created () {

    },
    watch: {
        '$route' (to, from) {
            let nav = to.params.nav
            if (nav == 1) {
                this.current = '待支付'
            } else if (nav == 2) {
                this.current = '待发货'
            } else if (nav == 3) {
                this.current = '待收货'
            } else if (nav == 4) {
                this.current = '待评价'
            } else{
                this.current = '全部'
            }
        }
    },
    mounted () {
        if (this.current == '全部') {
            this.getHome()
            setTimeout(() => {
                this.loadStatus = false
            }, 1000)
        }
    },
    methods: {
        changeHandler (cur) {
            this.current = cur
        },
        async getHome () {
            let res = await getGoods()
            this.GoodsList = res.data
            if (!this.GoodsList) return false
            for (var i in this.GoodsList) {
                if (this.GoodsList[i].type == 2) {
                    this.GoodsList[i].type = '待支付'
                }
                if (this.GoodsList[i].foods <= 1) {
                    this.GoodsList[i].totalPrice = this.GoodsList[i].foods[0].price
                } else {
                    let totalPrice = 0
                    for (var j in this.GoodsList[i].foods) {
                        totalPrice = Number(totalPrice) + Number(this.GoodsList[i].foods[j].price)
                    }
                    this.GoodsList[i].totalPrice = totalPrice
                }
            }
        },
        onPullingDown () {
            setTimeout(() => {
                this.GoodsList = this.GoodsList
                this.$refs.contentScroll.forceUpdate()
            }, 1000)
        },
        onPullingUp () {
            setTimeout(() => {
                this.GoodsList = this.GoodsList.concat(this.GoodsList)
            }, 1000)
        },
        redirect (routeName, ...args) {
            switch (args[0]) {
                case 1:
                    this.$router.push(`/${routeName}/${args[1]}`)
                    break
                default:
                    this.$router.push({ path: `/${routeName}` })
            }
        },
        showPicker (val, dis, totalPrice) {
            if (val === 1) {
                this.$refs.popupWrapper.show(dis)
            } else {
                this.$refs.popupWrapper.hide()
            }
            this.payPrice = totalPrice
        },
        selectHanddle (v) {
            console.log(v)
            this.paymentSelected = v
        }
    },
    components: {
        mallHeader,
        SupportIco,
        noData,
        mallPopup,
        mallPayment
    }
}
</script>

<style lang="stylus" scoped>
    .color_red
        color #EE3147

    i, em
        font-style normal

    .pdall
        padding 30px 30px 0 30px

    .mb-32
        margin-bottom 32px

    .heart
        margin-right 10px

    .store
        margin-right 20px

    .cube-scroll-nav-bar
        border-top 1px solid #EBEBEB

    .mall-scroll-wrapper
        .mall-scroll-list-wrap
            width 100%
            height 100%
            position absolute
            top 100px
            left 0
            right 0
            bottom 100px
            overflow scroll

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

    .orderInfo
        img
            display block
            width 152px
            height 152px
            -webkit-border-radius 4px
            margin-right 20px

    .commodity_scroll_nav
        overflow hidden

        .enter
            margin-left 0

        .commodity_scroll_nav_content
            width 72%
            overflow-x scroll

    .order_title
        font-size 26px
        color #1d1d1d
        margin-bottom 50px

        p span
            font-weight bold

    .order
        background-color white
        margin-top 20px

        .explain
            text-align left

            > .desc
                &:nth-child(2)
                    margin-top 24px
                line-height 140%
                width 100%

        .settlement
            padding-top 60px
            text-align right
            font-size 22px
            border-bottom 1px solid #ebebeb
            padding-bottom 30px

            .money
                > i
                    font-size 20px

                .colorSize
                    font-weight bold
                    font-size 30px

        .btn_area
            height 100px
            line-height 100px
            background transparent

            .func_btn
                width 152px
                height 52px
                line-height 52px
                border 1PX solid #ccc
                border-radius 26px
                -webkit-border-radius 26px
                font-size 26px

                &:last-child
                    border 1PX solid #e34749
                    margin-left 30px
                    color #EE3147
</style>
