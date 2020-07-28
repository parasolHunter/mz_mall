<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'other'" :bgClass="'bg-white'" title="退换货详情"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else :class="{'bottom100' : status == 2,'mall-scroll-list-wrap content-scroll-list-wrap' : true}" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :options="options">
                <div class="order_box flex justifyBetween">
                    <div class="box_left order_item">{{ status == 1 ? '待收货' : status == 2 ? '待商家退款' : '退款成功' }}</div>
                    <div class="box_right order_item flex">
                        <support-ico :size="30" :type="'time'"></support-ico>
                        <span v-if="status < 3">还剩1天02:22</span>
                    </div>
                </div>
                <div class="order pdall">
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="returns_amt">
                        退款金额：
                        <span class="color_red amt">
                            <i>&yen;</i>
                            <em class="colorSize">199.22</em>
                        </span>
                    </div>
                    <div class="returns_info">
                        <div class="returns_item flex justifyStart">
                            <div>退换类型</div>
                            <div class="color_grey">7天无理由退换</div>
                        </div>
                        <div class="returns_item flex justifyStart">
                            <div>退款原因</div>
                            <div class="color_grey">7天无理由退换</div>
                        </div>
                        <div class="returns_item flex justifyStart">
                            <div>退款说明</div>
                            <div class="color_grey">7天无理由退换</div>
                        </div>
                    </div>
                </div>
                <div class="returns_contain1">
                    <div class="returns_box">
                        <div class="returns_desc">退换凭证</div>
                        <div class="returns_img"><img src="./48@2x.png" alt="" /></div>
                    </div>
                    <div class="returns_box">
                        <div class="returns_item flex justifyStart">
                            <div>售后单号</div>
                            <div>asdadajdlajdl</div>
                        </div>
                        <div class="returns_item flex justifyStart">
                            <div>申请时间</div>
                            <div>2020-03-24 00:00:00</div>
                        </div>
                        <div class="returns_item flex justifyStart" v-if="status == 3">
                            <div>退换时间</div>
                            <div>2020-03-24 00:00:00</div>
                        </div>
                    </div>
                </div>
                <div class="returns_contain2 flex justifyBetween" v-if="status == 1">
                    <div class="returns_item flex justifyCenter">
                        <support-ico :size="31" :type="'revoke'"></support-ico>
                        <span>撤销申请</span>
                    </div>
                    <div class="returns_item flex justifyCenter" @click="redirect('returns', 1, 2)">
                        <support-ico :size="32" :type="'edit'"></support-ico>
                        <span>修改申请</span>
                    </div>
                </div>
                <div class="returns_contain3" v-if="status == 2">
                    <div class="returns_box margint_20 flex justifyBetween">
                        <div class="box_desc">物流公司</div>
                        <div class="box_step flex justifyBetween" @click="showPicker(1, 1)">
                            <span>{{ logisticsLabelSelected }}</span>
                            <support-ico :size="19" :type="'enter'"></support-ico>
                        </div>
                    </div>
                    <div class="returns_box margint_20 flex">
                        <div class="box_desc">物流单号</div>
                        <div class="box_step flex">
                            <cube-input v-model="ordernumber" placeholder="请输入物流单号" type="text" :autofocus="autofocus" :autocomplete="autocomplete"></cube-input>
                        </div>
                    </div>
                </div>
            </cube-scroll>
        </div>
        <div class="apply-btn" @click="handdle_apply" v-if="status == 2">提交申请</div>
        <mall-popup ref="popupWrapper">
            <div slot="slot1">
                <mall-select
                    ref="logistics_mall_select"
                    title="请选择物流公司"
                    :mall_options="logisticsOptions"
                    @endHanddle="endHanddle"
                    :mall_selected_defined="logisticsSelected"
                    @showPicker="showPicker"
                ></mall-select>
            </div>
        </mall-popup>
    </div>
</template>

<script>
import { getGoods } from '@/api';
import mallHeader from '@/components/mall-header/mall-header';
import SupportIco from '@/components/support-ico/support-ico';
import mallPopup from '@/components/mall-popup/mall-popup';
import mallSelect from '@/components/mall-select/mall-select';
let cnt = 1;
export default {
    name: 'shopping',
    data() {
        return {
            ordernumber: '',
            autofocus: false,
            autocomplete: true,
            loadStatus: false,
            indicator: {
                negative: false,
                remain: true
            },
            status: 1,
            note: '',
            noteLength: 100,
            options: {
                // pullDownRefresh: {
                //     threshold: 60,
                //     txt: '更新成功'
                // },
                // pullUpLoad: true
            },
            logisticsSelected: '1',
            logisticsLabelSelected: '请选择退款原因',
            logisticsOptions: [
                {
                    label: '中通',
                    value: '1'
                },
                {
                    label: '申通',
                    value: '2'
                },
                {
                    label: '顺丰',
                    value: '3'
                    // disabled: true
                },
                {
                    label: '邮政',
                    value: '4'
                    // disabled: true
                }
            ],
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
        },
        showPicker(val, dis) {
            if (val === 1) {
                this.$refs.popupWrapper.show(dis);
            } else {
                this.$refs.popupWrapper.hide();
            }
        },
        endHanddle(v, text, selectType) {
            console.log(v, text, selectType);
            if (selectType == '1') {
            } else {
                this.logisticsSelected = v;
                this.logisticsLabelSelected = text;
            }
        },
        handdle_apply() {
            // console.log(this.$refs.reason_mall_select.mall_selected)
        }
    },
    components: {
        mallHeader,
        SupportIco,
        mallPopup,
        mallSelect
    }
};
</script>

<style lang="stylus" scoped>
.bottom100
    bottom 100px !important
.color_grey
    color #8f8f8f
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
        // height 100%
        position absolute
        top 100px
        left 0
        right 0
        bottom 0
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
    height 170px
    background url('./returns_bg.png') no-repeat center
    background-size 100% 100%
    .order_item
        text-align left
        color #fff
    .box_left
        padding-left 112px
        font-size 32px
    .box_right
        padding-right 30px
        span
            margin-left 10px
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
        margin-bottom 30px
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
                    font-size 22px
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
    .returns_amt
        text-align right
        padding-bottom 20px
        .amt
            color #EE3147
            > i
                font-size 22px
            .colorSize
                font-weight bold
                font-size 30px
    .returns_info
        border-top 1PX dashed #EBEBEB
        padding-bottom 30px
        text-align left
        .returns_item
            padding-top 30px
            &>div:first-child
                padding-right 36px
.returns_contain1
    margin-top 20px
    background #FFFFFF
    padding 30px 30px
    .returns_box
        text-align left
        font-size 20px
        .returns_img
            img
                display block
                width 120px
                margin-top 20px
        &:last-child
            padding-top 30px
        .returns_item
            &:nth-child(2),&:nth-child(3)
                padding-top 20px
            &>div:first-child
                padding-right 36px
            &>div:last-child
                color #8f8f8f
.returns_contain2
    margin-top 20px
    background #FFFFFF
    height 88px
    line-height 88px
    .returns_item
        box-sizing border-box
        width 50%
        height 88px
        line-height 88px
        &:first-child
            border-right 1px solid #EBEBEB
        span:last-child
            margin-left 20px
.returns_contain3
    margin-top 20px
    .returns_box
        background #FFFFFF
        padding 30px 30px
        font-size 28px
        &:first-child
            .box_step
                margin-left 30px
                width 79%
        .box_step
            margin-left 10px
            font-size 28px
            color #8F8F8F
            >>>.cube-input::after
                border-color transparent
            >>>.cube-input-field
                flex auto
            >>>.cube-btn
                margin-right 30px
                background #FFFFFF
                color #EE313A
                border-left 2px solid #999
                padding-left 60px
.apply-btn
    position absolute
    bottom 0
    left 50%
    transform translateX(-50%)
    width 100%
    height 88px
    line-height 88px
    color #FFFFFF
    font-size 26px
    font-weight bold
    background #ee3147
</style>
