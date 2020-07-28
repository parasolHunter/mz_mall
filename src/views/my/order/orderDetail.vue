<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'other'" :bgClass="'bg-white'" title="订单详情"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="GoodsList" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <div class="order_box">
                    <div class="box_left">
                        <div class="order_item">待收货</div>
                        <div class="order_item">订单号：4535463527361</div>
                    </div>
                </div>
                <div class="shipping_address_contain">
                    <div class="receiver flex justifyStart">
                        <support-ico :size="25" :type="'position'"></support-ico>
                        <p>
                            <span>邓小姐</span>
                            <em>1351213435</em>
                        </p>
                    </div>
                    <div class="box_right flex justifyBetween">
                        <div class="shipping_address">广东省深圳市南山区科智东路108号爱上了打了就打了的煎熬了讯美科技广场1701</div>
                        <div class="logisticsBtn">物流信息</div>
                    </div>
                </div>
                <div class="order pdall">
                    <div class="order_title flex justifyBetween">
                        <p class="flex">
                            <support-ico :size="14" :type="'store'"></support-ico>
                            <span>{{ GoodsList[0].name }}</span>
                            <support-ico :size="19" :type="'enter'"></support-ico>
                        </p>
                    </div>

                    <div class="orderInfo flex-c-spaceb" v-for="(item, index) in GoodsList[0].foods" :key="index">
                        <div class="flex">
                            <img :src="item.image" alt="" />
                            <div class="explain">
                                <div class="desc twol-omitted">{{ item.info }}</div>
                                <div class="desc sl-omitted">{{ item.style }}</div>
                                <div class="btn_area flex justifyBetween">
                                    <span class="price">
                                        <i>&yen;</i>
                                        <em class="colorSize">{{ item.price | integerFilter }}</em>
                                        <i>.{{ item.price | decimal2placesFilter }}</i>
                                    </span>
                                    <div class="func_btn" @click="redirect('returns', 1, 2)">申请退款</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justifyBetween">
                        <div>配送方式</div>
                        <div class="flex">
                            <span>配送 免邮</span>
                            <support-ico :size="19" :type="'enter'"></support-ico>
                        </div>
                    </div>
                    <div class="demo"><cube-textarea v-model="note" placeholder="选填,请先和商家协商一致" indicator="indicator" :maxlength="noteLength"></cube-textarea></div>
                    <div class="settlement">
                        <div class="settlement_item">
                            <span>共{{ GoodsList[0].foods.length }}件 合计：</span>
                            <span class="money">
                                <i>&yen;</i>
                                <em class="colorSize">{{ GoodsList[0].totalPrice | integerFilter }}</em>
                                <i>.{{ GoodsList[0].totalPrice | decimal2placesFilter }}</i>
                            </span>
                        </div>
                        <div class="settlement_item">
                            <span>(含运费{{ GoodsList[0].freight ? GoodsList[0].freight : '0.00' }})</span>
                        </div>
                    </div>
                </div>
                <div class="payment flex justifyBetween">
                    <span>支付方式</span>
                    <span>余额支付</span>
                </div>
                <div class="timeInfo">
                    <div>支付时间：2020-03-24 00:00:00</div>
                    <div>完成时间：2020-03-24 00:00:00</div>
                </div>
                <div class="pay-btn">确定</div>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api';
import mallHeader from '@/components/mall-header/mall-header';
import SupportIco from '@/components/support-ico/support-ico';
let cnt = 1;
export default {
    name: 'shopping',
    data() {
        return {
            loadStatus: false,
            indicator: {
                negative: false,
                remain: true
            },
            note: '',
            noteLength: 100,
            options: {
                pullDownRefresh: {
                    threshold: 60,
                    txt: '更新成功'
                },
                pullUpLoad: true
            },
            GoodsList: [
                {
                    name: '美赞官方旗舰店',
                    type: 2,
                    freight: '0.00',
                    totalPrice: 0,
                    foods: [
                        {
                            icon: 'http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114',
                            image: 'http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/750/h/750',
                            price: '59.50',
                            info: '空调变KFR-26GW大1匹变频冷暖壁挂式空调G系列G755',
                            style: '白色，8GB+128GB'
                        },
                        {
                            name: '皮蛋瘦肉粥',
                            price: 12.5,
                            oldPrice: '8',
                            description: '咸粥',
                            sellCount: 229,
                            rating: 100,
                            info: '一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足',
                            style: '白色，8GB+128GB',
                            ratings: [
                                {
                                    username: '3******c',
                                    rateTime: 1469281964000,
                                    rateType: 0,
                                    text: '很喜欢的粥',
                                    avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                                },
                                {
                                    username: '2******3',
                                    rateTime: 1469271264000,
                                    rateType: 0,
                                    text: '',
                                    avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                                },
                                {
                                    username: '3******b',
                                    rateTime: 1469261964000,
                                    rateType: 1,
                                    text: '',
                                    avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                                }
                            ],
                            icon: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114',
                            image: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750'
                        }
                    ]
                }
            ]
        };
    },
    filters: {
        decimal2placesFilter(value) {
            let realVal = '';
            if (!isNaN(value) && value !== '') {
                // 截取当前数据到小数点后两位
                realVal = parseFloat(value).toFixed(2);
                realVal = realVal.split('.')[1];
            } else {
                realVal = '--';
            }
            return realVal;
        },
        integerFilter(value) {
            let realVal = '';
            if (!isNaN(value) && value !== '') {
                // 截取当前数据到小数点后两位
                realVal = parseFloat(value).toFixed(2);
                realVal = realVal.split('.')[0];
            } else {
                realVal = '--';
            }
            return realVal;
        }
    },
    computed: {},
    created() {
        let totalPrice = 0;
        for (var j in this.GoodsList[0].foods) {
            totalPrice = Number(totalPrice) + Number(this.GoodsList[0].foods[j].price);
        }
        this.GoodsList[0].totalPrice = totalPrice;
    },
    mounted() {
        // this.getHome();
        // setTimeout(() => {
        //     this.loadStatus = false;
        // }, 1000);
    },
    methods: {
        async getHome() {
            let res = await getGoods();
            this.GoodsList = res.data;
            if (!this.GoodsList) return false;
        },
        onPullingDown() {
            setTimeout(() => {
                // this.GoodsList = this.GoodsList;
                this.$refs.contentScroll.forceUpdate();
            }, 1000);
        },
        onPullingUp() {
            setTimeout(() => {
                // this.GoodsList = this.GoodsList.concat(this.GoodsList);
            }, 1000);
        },
        redirect(routeName, ...args) {
            switch (args[0]) {
                case 1:
                    this.$router.push(`/${routeName}/${args[1]}`);
                    break;
                default:
                    this.$router.push({ path: `/${routeName}` });
            }
        }
    },
    components: {
        mallHeader,
        SupportIco
    }
};
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
.order_box
    width 100%
    height 220px
    background url('./status_bg.png') no-repeat center
    background-size 100% 100%
    .box_left
        text-align left
        color #fcfdff
        padding-left 112px
        padding-top 40px
        .order_item
            padding-top 20px
            &:first-child
                font-size 30px
.shipping_address_contain
    margin-top 20px
    background #FFFFFF
    text-align left
    padding 26px 30px
    .receiver
        p
            padding-left 20px
            em
                padding-left 20px
    .box_right
        .shipping_address
            width 70%
            padding 20px 0 10px 46px
            line-height 1.4
        .logisticsBtn
            margin-left 20px
.order
    background-color white
    margin-top 20px
    .order_title
        font-size 26px
        color #1d1d1d
        margin-bottom 30px
        p span
            font-weight bold
    .orderInfo
        margin-bottom 40px
        img
            display block
            width 152px
            height 152px
            -webkit-border-radius 4px
            margin-right 30px
        .explain
            text-align left
            > .desc
                line-height 140%
                &:nth-child(1)
                    width 100%
                &:nth-child(2)
                    margin-top 20px
                    display inline-block
                    border-radius 19px
                    background-color #f8f8f8
                    padding 8px 20px
                    box-sizing border-box
                    color #8f8f8f
            .btn_area
                margin-top 20px
                .price
                    color #ee3147
                    > i
                        font-size 28px
                    .colorSize
                        font-weight bold
                        font-size 46px
                .func_btn
                    width 140px
                    height 48px
                    line-height 48px
                    text-align center
                    border 1PX solid #1D1D1D
                    border-radius 24px
                    -webkit-border-radius 24px
                    font-size 24px
    .demo
        position relative
        margin-top 20px
        .cube-textarea-wrapper
            margin-left 140px
            width 80%
            &::before
                content '订单备注'
                position absolute
                left -140px
                top 20px
            &::after
                border none
    .settlement
        padding-top 20px
        text-align right
        font-size 22px
        padding-bottom 30px
        .settlement_item
            .money
                color #EE3147
                > i
                    font-size 20px
                .colorSize
                    font-weight bold
                    font-size 30px
            &:last-child
                padding-top 20px
.payment
    padding 0 30px
    margin-top 20px
    height 88px
    line-height 88px
    background #FFFFFF
    font-size 23px
.pay-btn
    width 80%
    height 80px
    line-height 80px
    margin 0 auto
    color #FFFFFF
    font-size 26px
    font-weight bold
    background #ee3147
    border-radius 50px
    margin-top 100px
    margin-bottom 30px
.timeInfo
    text-align left
    font-size 20px
    color #8f8f8f
    padding 0 30px
    &>div
        padding-top 20px
</style>
