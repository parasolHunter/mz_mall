<template>
    <div class="my-main">
        <div class="my-header-content">
            <div class="userinfo-content flex justifyBetween">
                <div class="avatar flex">
                    <img class="" src="./avatar.png" alt />
                    <span v-if="!isLogin">
                        <a href="">登录</a>
                        /
                        <a href="">注册</a>
                    </span>
                    <span v-if="isLogin" @click="redirect('set')">彩色的云</span>
                </div>
                <div class="sign-box flex justifyCenter">
                    <img src="./2@2x.png" alt />
                    <span @click="redirect('signin')">签到</span>
                </div>
            </div>

            <div class="wallet-content flex justifySpace">
                <div class="wallet-box flex justifyBetween" @click="redirect('balance')">
                    <img src="./5@2x.png" alt="" />
                    <div class="flex flexColumn">
                        <span>0.00</span>
                        <span>余额</span>
                    </div>
                </div>
                <div class="vline"></div>
                <div class="wallet-box flex justifyBetween">
                    <img src="./4@2x.png" alt="" />
                    <div class="flex flexColumn">
                        <span>0.00</span>
                        <span>积分</span>
                    </div>
                </div>
            </div>

            <div class="order-navbar">
                <div class="order-navbar-title flex justifyBetween">
                    <div>商城订单</div>
                    <div @click="redirect('orders/-1')">全部订单></div>
                </div>
                <div class="flex justifySpace">
                    <div class="order-nav" @click="redirect('orders/1')">
                        <div class="badge">2</div>
                        <img src="./6@2x.png" alt="" />
                        <span>待付款</span>
                    </div>
                    <div class="order-nav" @click="redirect('orders/2')">
                        <div class="badge">1</div>
                        <img src="./7@2x.png" alt="" />
                        <span>待发货</span>
                    </div>
                    <div class="order-nav" @click="redirect('orders/3')">
                        <div class="badge">3</div>
                        <img src="./8@2x.png" alt="" />
                        <span>待收货</span>
                    </div>
                    <div class="order-nav"  @click="redirect('orders/4')">
                        <div class="badge">6</div>
                        <img src="./9@2x.png" alt="" />
                        <span>待评价</span>
                    </div>
                    <div class="order-nav" @click="redirect('returnsList')">
                        <div class="badge">7</div>
                        <img src="./10@2x.png" alt="" />
                        <span>退款/售后</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="invite-content"><div class="inviteBg" @click="redirect('Invitation')"></div></div>
        <div class="tool-content">
            <div class="tool-content-title flex">
                <img src="./16@2x.png" alt="" />
                <span>我的工具</span>
            </div>
            <div class="tool-content-box flex justifySpace">
                <div class="tool-nav" @click="redirect('collection')">
                    <img src="./12@2x.png" alt="" />
                    <span>我的收藏</span>
                </div>
                <div class="tool-nav" @click="redirect('address')">
                    <img src="./13@2x.png" alt="" />
                    <span>收货地址</span>
                </div>
                <div class="tool-nav">
                    <img src="./14@2x.png" alt="" />
                    <span>联系客服</span>
                </div>
                <div class="tool-nav"  @click="redirect('systemSet')">
                    <img src="./15@2x.png" alt="" />
                    <span>设置</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api';
import mallHeader from '@/components/mall-header/mall-header';
// import Swiper from 'swiper'
// import 'swiper/dist/css/swiper.min.css'
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
];
let cnt = 1;
export default {
    created() {},
    data() {
        return {
            content: imgs.slice(),
            index: 0,
            swiperIndex: 0,
            loadStatus: false,
            isLogin: true,
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
        };
    },
    mounted() {
        this.getGoods();
        console.log(this.$i18n.t('message.hello'));
        setTimeout(() => {
            this.loadStatus = false;
        }, 1000);
    },
    methods: {
        async getGoods() {
            let res = await getGoods();
        },
        onPullingDown() {
            setTimeout(() => {
                this.content.unshift(imgs[cnt++ % 3]);
                this.$refs.contentScroll.forceUpdate();
            }, 1000);
        },
        onPullingUp() {
            setTimeout(() => {
                this.content = this.content.concat(imgs);
            }, 1000);
        },
        onImgLoad() {
            const contentScroll = this.$refs.contentScroll;
            contentScroll.scroll.beforePullDown && contentScroll.refresh();
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
        mallHeader
    }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'

.my-main
    .my-header-content
        width 100%
        height 516px
        background url('~./banner@2x.png') no-repeat center
        background-size 100% 100%
        .userinfo-content
            padding 120px 46px 0 48px
            .avatar
                img
                    display block
                    width 120px
                    height 119px
                    margin-right 20px
                span
                    font-size 30px
                    color #fff
                a
                    color #FFFFFF
            .sign-box
                width 128px
                height 58px
                background url('~./3@2x.png') no-repeat center
                background-size 100% 100%
                img
                    display block
                    width 30px
                    margin-right 10px
                span
                    font-size 26px
                    color #EE3147
        .wallet-content
            padding 74px 80px 40px 80px
            .wallet-box
                img
                    display block
                    height 47px
                    margin-right 26px
                div
                    color #FFFFFF
                    span
                        font-size 32px
                        padding-bottom 10px
                        &:last-child
                            font-size 22px
            .vline
                width 1px
                height 61px
                background-color #eef2f5
        .order-navbar
            margin 0 auto
            width 700px
            height 228px
            background #FFFFFF
            .order-navbar-title
                padding 0 34px
                height 88px
                div:first-child
                    font-size 28px
                    font-weight bold
                    &:last-child
                        color #f1f1f1
            .order-nav
                position relative
                .badge
                    position absolute
                    top 30px
                    right 2px
                    width 24px
                    height 24px
                    background #ff4c4c
                    border-radius 50%
                    -webkit-border-radius 50%
                    -moz-border-radius 50%
                    color #FFFFFF
                img
                    display block
                    height 35px
                    margin 40px auto 16px auto
                span
                    color #333
                    font-size 22px
                    font-weight bold
    .invite-content
        margin 170px 0 30px
        .inviteBg
            margin 0 auto
            width 700px
            height 140px
            background url('~./11@2x.png') no-repeat center
            background-size cover
    .tool-content
        .tool-content-title
            img
                display block
                height 27px
                margin-left 25px
                margin-right 16px
            span
                font-size 36px
                font-weight bold
        .tool-content-box
            margin 20px auto 0
            width 700px
            height 190px
            background #FFFFFF
            .tool-nav
                img
                    display block
                    height 53px
                    margin 0 auto 16px auto
                span
                    color #333
                    font-size 22px
                    font-weight bold
</style>
