<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'other'" :bgClass="'bg-white'" title="物流信息"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="logisticsInfo" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <div class="order pdall" v-if="GoodsList[1].foods.length <= 1">
                    <div class="order_title flex justifyBetween">
                        <div>订单编号： 001fgwwaewe00</div>
                        <div class="order_status color_red">已发货</div>
                    </div>
                    <div class="orderInfo">
                        <div class="flex justifyStart">
                            <img :src="GoodsList[0].foods[0].image" alt="" />
                            <div class="explain">
                                <div class="desc twol-omitted">{{ GoodsList[0].foods[0].info }}</div>
                                <!-- <div class="desc sl-omitted">{{ GoodsList[0].foods[0].style }}</div> -->
                                <div class="desc date">2020-03-17 12:12:12</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="order pdall">
                    <div class="order_title flex justifyBetween">
                        <div>2020-03-17 12:12:12</div>
                        <div class="order_status color_red">已签收</div>
                    </div>
                    <cube-scroll ref="scroll" :data="GoodsList[1].foods" direction="horizontal">
                        <div class="orderInfo space_nowrap"><img v-for="(item, subindex) in GoodsList[1].foods" :key="subindex" :src="item.image" alt="" /></div>
                    </cube-scroll>
                    <div class="settlement">
                        <span>共{{ GoodsList[1].foods.length }}件商品 合计：</span>
                        <span class="money">
                            <i>&yen;</i>
                            <em class="colorSize">{{ GoodsList[1].totalPrice | integerFilter }}</em>
                            <i>.{{ GoodsList[1].totalPrice | decimal2placesFilter }}</i>
                        </span>
                        <span>(含运费{{ GoodsList[1].freight ? GoodsList[1].freight : '0.00' }})</span>
                    </div>
                </div>
                <div class="shipping_address_contain">
                    <div class="shipping_address flex justifyStart">
                        <support-ico :size="25" :type="'position'"></support-ico>
                        <p>广东省深圳市南山区科智东路108号讯美科技广场1701</p>
                    </div>
                    <div class="logisticsName">中通快递：1351213435</div>
                </div>
                <no-data v-if="!logisticsInfo.length" text="暂无物流信息" type="2"></no-data>
                <div class="logistics_contain" v-else>
                    <div class="logistics_title">物流跟踪</div>
                    <div class="logistics_content">
                        <div class="logistics_item flex justifyStart" v-for="(item, index) in logisticsInfo" :key="index">
                            <div class="date flex flexColumn">
                                <div>{{ item.date.split(' ')[0] }}</div>
                                <div>{{ item.date.split(' ')[1] }}</div>
                            </div>
                            <span :class="{ end: index == 0 }"></span>
                            <div :class="{ logistics_item_text: true, end: index == 0 }">{{ item.text }}</div>
                        </div>
                    </div>
                </div>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
import mallHeader from '@/components/mall-header/mall-header';
import SupportIco from '@/components/support-ico/support-ico';
import noData from '@/components/noData/noData';
let cnt = 1;
export default {
    data() {
        return {
            loadStatus: false,
            options: {
                pullDownRefresh: {
                    threshold: 60,
                    txt: '更新成功'
                },
                pullUpLoad: true
            },
            logisticsInfo: [
                { date: '03-21 19:48', text: '本人签收' },
                { date: '03-21 12:48', text: '派送中，深圳南山区派件员，罗达正在派件' },
                { date: '03-21 10:14', text: '到深圳南山区，粤海第一仓库' },
                { date: '03-20 16:23', text: '深圳龙岗转运中心，正发往深圳南山区' },
                { date: '03-19 18:08', text: '浙江省滨海新区第39仓库' },
                { date: '03-19 14:55', text: '已发货' }
            ],
            GoodsList: [
                {
                    name: '美赞官方旗舰店',
                    type: 2,
                    freight: '0.00',
                    foods: [
                        {
                            icon: 'http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114',
                            image: 'http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/750/h/750',
                            price: '2030.45',
                            info: '空调变KFR-26GW大1匹变频冷暖壁挂式空调G系列G755',
                            style: '银色 智能操作'
                        }
                    ]
                },
                {
                    name: '热销榜',
                    type: -1,
                    freight: '0.00',
                    totalPrice: 0,
                    foods: [
                        {
                            name: '皮蛋瘦肉粥',
                            price: 12.5,
                            oldPrice: '8',
                            description: '咸粥',
                            sellCount: 229,
                            rating: 100,
                            info: '一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足',
                            style: '银色 智能操作',
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
                        },
                        {
                            name: '扁豆焖面',
                            price: 14,
                            oldPrice: '',
                            description: '',
                            sellCount: 188,
                            rating: 96,
                            style: '银色 智能操作',
                            ratings: [
                                {
                                    username: '3******c',
                                    rateTime: 1469281964000,
                                    rateType: 0,
                                    text: '',
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
                            info: '空调变KFR-26GW大1匹变频冷暖壁挂式空调',
                            icon: 'http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114',
                            image: 'http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750'
                        },
                        {
                            name: '招牌猪肉白菜锅贴/10个',
                            price: 17,
                            oldPrice: '',
                            description: '',
                            sellCount: 101,
                            rating: 78,
                            info: '',
                            ratings: [
                                {
                                    username: '3******c',
                                    rateTime: 1469281964000,
                                    rateType: 1,
                                    text: '不脆,不好吃',
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
                                    rateType: 0,
                                    text: '',
                                    avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                                }
                            ],
                            icon: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
                            image: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750'
                        },
                        {
                            name: '南瓜粥',
                            price: 9,
                            oldPrice: '',
                            description: '甜粥',
                            sellCount: 91,
                            rating: 100,
                            ratings: [
                                {
                                    username: '3******c',
                                    rateTime: 1469281964000,
                                    rateType: 0,
                                    text: '',
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
                                    rateType: 0,
                                    text: '',
                                    avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                                }
                            ],
                            icon: 'http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114',
                            image: 'http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750'
                        },
                        {
                            name: '红豆薏米美肤粥',
                            price: 12,
                            oldPrice: '',
                            description: '甜粥',
                            sellCount: 86,
                            rating: 100,
                            info: '',
                            ratings: [
                                {
                                    username: '3******c',
                                    rateTime: 1469281964000,
                                    rateType: 0,
                                    text: '',
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
                                    rateType: 0,
                                    text: '',
                                    avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                                }
                            ],
                            icon: 'http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114',
                            image: 'http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750'
                        },
                        {
                            name: '八宝酱菜',
                            price: 4,
                            oldPrice: '',
                            description: '',
                            sellCount: 84,
                            rating: 100,
                            info: '',
                            ratings: [
                                {
                                    username: '3******c',
                                    rateTime: 1469281964000,
                                    rateType: 0,
                                    text: '',
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
                                    rateType: 0,
                                    text: '',
                                    avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                                }
                            ],
                            icon: 'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114',
                            image: 'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750'
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
        for (var j in this.GoodsList[1].foods) {
            totalPrice = Number(totalPrice) + Number(this.GoodsList[1].foods[j].price);
        }
        this.GoodsList[1].totalPrice = totalPrice;
    },
    mounted() {},
    methods: {
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
        redirect(routeName, type) {
            switch (type) {
                default:
                    //默认块
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
.space_nowrap
    white-space nowrap
.color_red
    color #EE3147
i, em
    font-style normal
.pdall
    padding 20px 30px
.mb-32
    margin-bottom 32px
.heart
    margin-right 10px
.store
    margin-right 20px
>>>.cube-scroll-nav-bar
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
.commodity_scroll_nav
    overflow hidden
    .enter
        margin-left 0
    .commodity_scroll_nav_content
        width 100%
        overflow-x scroll
.order
    background-color white
    margin-top 20px
    .order_title
        color #8F8F8F
        margin-bottom 20px
        p span
            font-weight bold
    .orderInfo
        padding-top 8px
        img
            display inline-block
            width 120px
            height 120px
            -webkit-border-radius 4px
            margin-right 20px
        .explain
            text-align left
            width 65%
            > .desc
                width 100%
                line-height 140%
                &:nth-child(2)
                    margin-top 10px
                    line-height 140%
                &.date
                    margin-top 10px
                    color #8f8f8f
        >>>.cube-scroll-content
            display inline-block
    .settlement
        padding-top 10px
        text-align right
        font-size 22px
        padding-bottom 10px
        .money
            > i
                font-size 20px
            .colorSize
                font-weight bold
                font-size 30px
.shipping_address_contain
    margin-top 20px
    background #FFFFFF
    text-align left
    padding 30px 30px
    .shipping_address
        span
            padding-right 18px
    .logisticsName
        padding 24px 0 6px 42px
.logistics_contain
    margin-top 20px
    text-align left
    background #FFFFFF
    .logistics_title
        padding 30px 30px
        font-size 30px
        font-weight bold
        border-bottom 1px solid #EBEBEB
    .logistics_content
        padding 44px 30px
        .logistics_item
            margin-bottom 85px
            .date
                margin-right 20px
                color #AAAAAA
                font-size 20px
                &>div:nth-child(2)
                    padding-top 10px
            span
                position relative
                width 32px
                height 32px
                color #ddd
                background-color #ddd
                border-radius 50%
                &.end
                   background-color #EE3147
                   &::before
                    content ''
                    position absolute
                    top 8px
                    left 8px
                    display block
                    width 16px
                    height 16px
                    border-radius 50%
                    background-color #ffa5af
                &::after
                    content ''
                    position absolute
                    top 32px
                    left 16px
                    display block
                    width 1px
                    height 110px
                    background #ddd
            &:last-child
                margin-bottom 40px
                span::after
                    height 0px
            .logistics_item_text
                font-size 28px
                color #8f8f8f
                margin-left 28px
                &.end
                    color #EE3147
</style>
