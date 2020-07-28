<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'other'" :bgClass="'bg-white'" title="退换货列表"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="GoodsList" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <div class="order" v-for="(item, index) in GoodsList[0].foods" :key="index">
                    <div class="order_title flex justifyBetween">
                        <span>{{ item.initTime }}</span>
                        <span>待商家处理</span>
                    </div>
                    <div class="orderInfo flex-c-spaceb">
                        <div class="flex">
                            <img :src="item.image" alt="" />
                            <div class="explain">
                                <div class="desc twol-omitted">{{ item.info }}</div>
                                <div class="desc sl-omitted">{{ item.style }}</div>
                                <div class="desc flex justifyBetween">
                                    <span class="price">
                                        <i>&yen;</i>
                                        <em class="colorSize">{{ item.price | integerFilter }}</em>
                                        <i>.{{ item.price | decimal2placesFilter }}</i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="func_area flex justifyBetween">
                        <div>还剩1天02:22</div>
                        <div class="func_btn" @click="redirect('returnsDetail', 1, 2)">查看详情</div>
                    </div>
                </div>
                <no-data v-if="GoodsList[0].foods.length <= 0"></no-data>
                <div class="allDatas" v-if="GoodsList[0].foods.length > 0 && lastPage">已加载全部数据</div>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api';
import mallHeader from '@/components/mall-header/mall-header';
import SupportIco from '@/components/support-ico/support-ico';
import noData from '@/components/noData/noData';
let cnt = 1;
export default {
    name: 'shopping',
    data() {
        return {
            lastPage: false,
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
                            style: '白色，8GB+128GB',
                            initTime: '2020-03-24'
                        },
                        {
                            icon: 'http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114',
                            image: 'http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/750/h/750',
                            price: '59.50',
                            info: '空调变KFR-26GW大1匹变频冷暖壁挂式空调G系列G755',
                            style: '白色，8GB+128GB',
                            initTime: '2020-03-24'
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
                            initTime: '2020-03-24',
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
        SupportIco,
        noData
    }
};
</script>

<style lang="stylus" scoped>
.allDatas
    color #8f8f8f
    padding 40px 30px
.color_red
    color #EE3147
i, em
    font-style normal
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
    margin-top 10px
    .order_title
        color #8F8F8F
        padding 30px 30px
        span
            &:last-child
                color #EE313A
    .orderInfo
        padding 0 30px 30px 30px
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
                    margin-top 10px
                    display inline-block
                    border-radius 19px
                    background-color #f8f8f8
                    padding 8px 20px
                    box-sizing border-box
                    color #8f8f8f
                    font-size 20px
                .price
                    margin-top 20px
                    color #ee3147
                    > i
                        font-size 26px
                    .colorSize
                        font-weight bold
                        font-size 34px
    .func_area
        border-top 1px solid #EBEBEB
        height 88px
        line-height 88px
        padding 0 30px
        div:first-child
            color #EE313A
        .func_btn
            width 140px
            height 48px
            line-height 48px
            text-align center
            border 1PX solid #1D1D1D
            border-radius 24px
            -webkit-border-radius 24px
            font-size 24px
</style>
