<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'back'" :title="'确认订单'" :bgClass="'bg-red'"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="GoodsList" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <div class="addressWrapper">
                    <div class="addressContent">
                        <div class="address-part">
                            <support-ico :size="27" :type="'address'"></support-ico>
                            <div class="address-part-text">
                                <div class="address-part-text-item">
                                    <span class="address-part-text-ss">陈胜</span>
                                    <span>1862123132</span>
                                    <support-ico :size="28" :type="'defaul'"></support-ico>
                                </div>
                                <div class="address-part-text-s">陈胜陈胜陈胜陈胜陈胜陈胜陈胜陈胜陈胜陈胜陈胜陈胜</div>
                            </div>
                        </div>
                        <i class="cubeic-arrow"></i>
                    </div>
                    <div class="addressLine"><support-ico :size="29" :type="'line'"></support-ico></div>
                </div>
                <div class="order pdall" v-for="(item, index) in GoodsList" :key="index">
                    <div class="flex-c-s mb-32">
                        <p class="title">
                            <support-ico :size="14" :type="'store'"></support-ico>
                            {{ item.name }}
                        </p>
                    </div>
                    <div class="orderInfo flex-c-spaceb" v-for="(subitem, subindex) in item.foods" :key="subindex">
                        <div class="flex-c-spaceb"><img :src="subitem.image" alt="" /></div>
                        <div class="explain">
                            <p class="title">{{ subitem.info }}</p>
                            <div>
                                <div class="colorSize">红色,8GB+128GB</div>
                                <div class="flex-c-spaceb">
                                    <p>
                                        <i>¥</i>
                                        <span class="money">{{ subitem.price }}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-c-spaceb mb-32">
                        <div>配送方式</div>
                        <div class="flex-c-s">
                            <div class="ml-10">配送</div>
                            <div class="ml-10">免邮</div>
                            <i class="ml-10 cubeic-arrow"></i>
                        </div>
                    </div>
                    <div class="flex-c-spaceb mb-32 remark">
                        <div>订单备注</div>
                        <div class="remarkInput">
                            <input type="text" class="" placeholder="选填,请先和商家协商一致">
                        </div>
                    </div>
                    <div class="price">
                        <div class="color-s">共1件</div>
                        <div class="ml-10">合计：</div>
                        <div>
                            <i class="color-ss">¥</i>
                            <span class="color-sss">{{ getTotal.totalPrice }}</span>
                        </div>
                    </div>
                </div>
            </cube-scroll>
            <div class="submitShopping">
                <div class="price">
                    <div>共1件</div>
                    <div class="ml-10">合计:</div>
                    <div class="money">¥{{ getTotal.totalPrice }}</div>
                    <div class="submit" @click="showPicker(1, 1, getTotal.totalPrice)">提交订单</div>
                </div>
            </div>
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
import mallPopup from '@/components/mall-popup/mall-popup';
import mallPayment from '@/components/mall-payment/mall-payment';

export default {
    name: 'comfirmed',
    data () {
        return {
            index: 0,
            swiperIndex: 0,
            loadStatus: false,
            options: {
                pullDownRefresh: {
                    threshold: 60,
                    txt: this.$i18n.t('message.hello')
                },
                pullUpLoad: true
            },
            secondStop: 26,
            GoodsList: [],
            recommendList: [],
            checkedAll: false, // 控制是否全选
            checked: [],
            totalPrice: 0,
            totalNum: 0,
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
    computed: {
        // 获取总价和产品总件数
        getTotal: function () {
            // 获取productList中select为true的数据。
            var _proList = []
            this.totalPrice = 0
            this.totalNum = 0
            this.GoodsList.forEach(item => {
                item.foods.forEach(citem => {
                    if (citem.checked) {
                        _proList.push(citem)
                    }
                })
            })
            _proList.forEach(item => {
                this.totalPrice += parseInt(item.price) * parseInt(item.sellCount)
                this.totalNum += parseInt(item.sellCount)
            })
            return { totalNum: this.totalNum, totalPrice: this.totalPrice }
        }
    },
    mounted () {
        this.getHome()
        console.log(this.$i18n.t('message.hello'))
        setTimeout(() => {
            this.loadStatus = false
        }, 1000)
    },
    methods: {
        async getHome () {
            let res = await getGoods()
            this.GoodsList = res.data
            this.recommendList = res.data
            if (!this.GoodsList) return false
            this.GoodsList.forEach(item => {
                this.$set(item, 'checked', false)
                if (item.foods) {
                    item.foods.forEach(citem => {
                        this.$set(citem, 'checked', false)
                    })
                }
            })
        },
        edit (val) {
            // if (this.GoodsList) {
            this.isDelete = val
            // } else {
            // this.isDelete = false
            // }
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
        onImgLoad () {
            const contentScroll = this.$refs.contentScroll
            contentScroll.scroll.beforePullDown && contentScroll.refresh()
        },
        showPicker(val, dis, totalPrice) {
            if (val === 1) {
                this.$refs.popupWrapper.show(dis);
            } else {
                this.$refs.popupWrapper.hide();
            }
            this.payPrice = totalPrice;
        },
        selectHanddle(v) {
            console.log(v);
            this.paymentSelected = v;
        },
        checkAll () {
            this.totalPrice = 0
            this.totalNum = 0
            this.checked = []
            if (!this.GoodsList) this.checkedAll = false
            this.GoodsList.forEach(item => {
                item.checked = this.checkedAll
                if (item.foods) {
                    item.foods.forEach(citem => {
                        citem.checked = this.checkedAll
                        if (this.checkedAll) {
                            this.totalPrice += parseInt(citem.price) * parseInt(citem.sellCount)
                            this.totalNum += parseInt(citem.sellCount)
                            this.checked.push(citem.id)
                        }
                    })
                }
            })
        },
        // 商家全选
        _checkAll (val, index) {
            val.foods.forEach(item => {
                item.checked = val.checked
            })
            if (this.GoodsList.every(item => item.checked)) {
                this.checkedAll = true
                this.price = 0
                this.count = 0
                this.checked = []
            } else {
                this.checkedAll = false
            }
        },
        // 商品选择框
        handleCheck (item, index) {
            var check = []
            this.GoodsList.forEach((items, index) => {
                if (items.foods) {
                    var bool = items.foods.every(citem => citem.checked)
                    if (bool) {
                        items.checked = true
                    } else {
                        items.checked = false
                    }
                    check.push(bool)
                }
            })
            if (check.indexOf(false) === -1) {
                this.checkedAll = true
            } else {
                this.checkedAll = false
            }
        }
    },
    components: {
        mallHeader,
        SupportIco,
        mallPopup,
        mallPayment
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
        bottom 100px
        overflow scroll
        .addressWrapper
            padding 60px 30px
            background-color #FFFFFF
            margin-bottom 18px
            position relative
            .addressLine
                position absolute
                bottom 0
                width 100%
            .addressContent
                width 100%
                display flex
                align-items center
                justify-content space-between
                .address-part
                    display flex
                    align-items center
                    text-align left
                    width 80%
                    .support-ico
                        margin-right 28px
                    .address-part-text-s
                        padding-top 20px
                        line-height 140%
                    .address-part-text-ss
                        font-size 27px
                        font-weight bold
                        padding-right 20px
                    .address-part-text
                        .address-part-text-item
                            display flex
                            align-items center
                            .support-ico
                                margin-left 10px
                .cubeic-arrow
                    font-size 32px
                    color #1d1d1d
                    font-weight normal
        .order
            background-color #FFFFFF
            margin-bottom 18px
            .explain
                width 100%
                height 200px
                text-align left
                display flex
                flex-direction column
                justify-content space-between
                > .title
                    margin 0
                    line-height 140%
                    width 100%
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical
                .sub, .add, .number
                    width 40px
                    height 40px
                    line-height 40px
                    text-align center
                    background-color #f8f8f8
                .number
                    margin 0 4px
                .colorSize
                    display inline-block
                    border-radius 19px
                    background-color #f8f8f8
                    padding 8px 20px
                    box-sizing border-box
                    margin-bottom 30px
                    color #8f8f8f
                .originalPrice
                    margin-left 10px
                    text-decoration line-through
                    color #8f8f8f
                .money
                    color #ee3147
                    font-size 36px
                    font-weight bold
                    text-align left
            .title
                font-size 26px
            .orderInfo
                margin-bottom 38px
                img
                    width 200px
                    height 200px
                    border-radius 10px
                    margin-right 28px
            .cubeic-arrow
                font-size 32px
                color #1d1d1d
                font-weight normal
            .remark
                width 100%
                .remarkText
                    width 18%
                    min-width 18%
                .remarkInput
                    width 82%
                    background red
                    input
                        width 100%
                        border none
                        outline none
                        &::-webkit-input-placeholder
                            color #b6b6b6
            .price
                display flex
                align-items center
                justify-content flex-end
                .color-s
                    color #8f8f8f
                .color-ss
                    color #ee3147
                .color-sss
                    color #ee3147
                    font-size 30px
                    font-weight bold
   .submitShopping
        height 100px
        width 100%
        z-index 23
        background-color #fff
        display flex
        align-items center
        justify-content flex-end
        padding 0 20px 0 48px
        box-sizing border-box
        position fixed
        left 0
        bottom 0
        .price
            display flex
            align-items center
            > p
                color #1d1d1d
            .money
                margin-left 10px
                color #ee3147
                font-size 36px
                font-weight bold
                > i
                    font-weight bold
                    margin 2px
            .submit
                padding 0 40px
                height 76px
                line-height 76px
                text-align center
                background-color #ee3147
                font-size 28px
                border-radius 38px
                color #fff
                margin-left 48px
    i
        font-style normal
        font-weight bold
        font-size 24px
        margin-right 5px
        color #ee3147
    .pdall
        padding 40px 30px
    .flex-c-s
        display flex
        align-items center
        justify-content flex-start
    .flex-c-spaceb
        display flex
        align-items center
        justify-content space-between
    .mb-32
        margin-bottom 32px
    .ml-10
        margin-left 10px
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
</style>
