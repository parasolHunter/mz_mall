<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'back'" :bgClass="'bg-red'">
            <cube-tab-bar v-model="selectedLabel" show-slider :use-transition="disabled" ref="tabNav" :data="tabLabels"></cube-tab-bar>
            <div class="header-icon-main">
                <div class="header-icon">
                    <support-ico :size="15" :type="'share'"></support-ico>
                    <div @click="showNav"><support-ico :size="16" :type="'more'" class="ml-30"></support-ico></div>
                </div>
            </div>
        </mall-header>
        <mall-nav ref="navWrapper"></mall-nav>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap">
            <div class="tab-slide-container">
                <cube-slide
                    ref="slide"
                    :loop="loop"
                    :initial-index="initialIndex"
                    :auto-play="autoPlay"
                    :show-dots="showDots"
                    :options="slideOptions"
                    @scroll="scroll"
                    @change="changePage"
                >
                    <!-- 商品 -->
                    <cube-slide-item>
                        <cube-scroll :options="scrollOptions" ref="contentScroll" @pulling-down="onPullingDown">
                            <div class="good-slide-content">
                                <div class="good-slide-swiper">
                                    <cube-slide :data="items" :show-dots="false" :options="swiperOptions" @scroll="swiperScroll" @change="changeSwiper" />
                                    <div class="swiper-page">
                                        <div class="swiper-page-text">{{ currentIndex }}/{{ items.length }}</div>
                                    </div>
                                </div>
                                <div class="good-slide-title-content">
                                    <div class="good-slide-title">
                                        <div>
                                            <span class="good-slide-title-s-1">￥</span>
                                            <span class="good-slide-title-ss">59</span>
                                            <span class="good-slide-title-s-2">80</span>
                                        </div>
                                        <div class="good-slide-title-sss">皮蛋瘦皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥肉粥</div>
                                    </div>
                                </div>
                                <div class="good-slide-choose-content">
                                    <div class="good-slide-choose-items">
                                        <div class="good-slide-choose-item">
                                            <div>规格数量选择</div>
                                            <i class="cubeic-arrow"></i>
                                        </div>
                                        <div class="good-slide-choose-item">
                                            <div>
                                                <span>不支持7天无理由退换货</span>
                                                <span class="ml-40">满88包邮</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="good-slide-comment-content">
                                    <router-link :to="{ path: '/good/1/comments' }" class="good-slide-comment-title-content">
                                        <div class="good-slide-comment-title">
                                            <div class="good-slide-comment-title-s">用户评价（10）</div>
                                            <div class="good-slide-comment-title-ss">
                                                <span>查看106条评价</span>
                                                <i class="cubeic-arrow"></i>
                                            </div>
                                        </div>
                                    </router-link>
                                    <div class="good-slide-comment-items">
                                        <div class="good-slide-comment-item" v-for="(item, index) in items" :key="index" @load="onImgLoad">
                                            <div class="good-slide-comment-item-message">
                                                <div class="good-slide-comment-item-message-title">
                                                    <support-ico :size="7" :type="'portrait'"></support-ico>
                                                    <div class="message-title-text">aq123456</div>
                                                    <div class="message-title-star">
                                                        <support-ico :size="18" :type="'star'"></support-ico>
                                                        <support-ico :size="18" :type="'star'"></support-ico>
                                                        <support-ico :size="18" :type="'star'"></support-ico>
                                                        <support-ico :size="18" :type="'star'"></support-ico>
                                                        <support-ico :size="18" :type="'emptystar'"></support-ico>
                                                    </div>
                                                </div>
                                                <div class="good-slide-comment-item-message-sku">
                                                    <span>2019-10-20</span>
                                                    <span>尺码:S</span>
                                                    <span>颜色:红色</span>
                                                </div>
                                                <div class="good-slide-comment-item-message-msg">
                                                    皮蛋瘦皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮皮蛋瘦皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥肉粥蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥皮蛋瘦肉粥肉粥
                                                </div>
                                            </div>

                                            <div class="good-slide-comment-item-imgs">
                                                <div class="good-slide-comment-item-swiper">
                                                    <cube-slide ref="slide" :stopPropagation="true" :show-dots="false">
                                                        <cube-scroll ref="scroll" direction="horizontal" class="horizontal-scroll-list-wrap">
                                                            <ul class="list-wrapper">
                                                                <li v-for="(item, index) in items" :key="index" class="list-item" @click="handleImgsClick(index)">
                                                                    <img :src="item.image" />
                                                                </li>
                                                            </ul>
                                                        </cube-scroll>
                                                    </cube-slide>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </cube-scroll>
                    </cube-slide-item>
                    <!-- 详情 -->
                    <cube-slide-item>
                        <cube-scroll>
                            <div class="detail-slide-content">
                                <div class="detail-slide-title">
                                    <div class="line"></div>
                                    <div class="text">商品详情</div>
                                    <div class="line"></div>
                                </div>
                                <div class="detail-slide-msg" @load="onImgLoad">
                                    <img :src="image" alt="" />
                                    <img :src="goods.icon" alt="" />
                                    <img :src="image" alt="" />
                                </div>
                            </div>
                        </cube-scroll>
                    </cube-slide-item>
                </cube-slide>
            </div>
        </div>

        <div class="goods-footer-container">
            <div class="goods-footer-content">
                <div class="goods-footer-part-1">
                    <div class="goods-footer-part-1-item">
                        <support-ico :size="17" :type="'hollow'"></support-ico>
                        <!-- <support-ico :size="17" :type="'solid'"></support-ico> -->
                        <div class="goods-footer-text-s">收藏</div>
                    </div>
                    <div class="goods-footer-part-1-item">
                        <support-ico :size="17" :type="'emptycart'"></support-ico>
                        <div class="goods-footer-text-s">购物车</div>
                    </div>
                </div>
                <div class="goods-footer-part-2">
                    <div @click="showPicker(1, 1)" class="goods-footer-part-2-item">立即购买</div>
                    <div @click="showPicker(1, 1)" class="goods-footer-part-2-item">加入购物车</div>
                </div>
            </div>
        </div>

        <mall-popup ref="popupWrapper">
            <div slot="slot1">
                <div class="sku-wrapper-container">
                    <div class="sku-wrapper-content">
                        <cube-scroll>
                            <cube-swipe>
                                <transition-group name="swipe">
                                    <div class="swipe-item-wrapper" :key="initialSkuIndex">
                                        <cube-swipe-item ref="swipeItem">
                                            <div class="sku-part-1">
                                                <div class="sku-part-1-item-1">
                                                    <img :src="image" alt="" />
                                                    <div class="sku-part-1-text">
                                                        <div>
                                                            <span class="sku-part-1-text-ss">￥</span>
                                                            <span class="sku-part-1-text-sss">500</span>
                                                        </div>
                                                        <div class="sku-part-1-text-s">库存:100件</div>
                                                    </div>
                                                </div>
                                                <i @click="showPicker(0)" class="sku-part-1-item-2 cubeic-close"></i>
                                            </div>
                                            <div class="sku-part-2">
                                                <div class="sku-part-2-text">颜色</div>
                                                <div class="sku-part-2-items">
                                                    <div @click="chooseSku(0, 0)" class="sku-part-2-item" :class="{ 'sku-part-2-item-active': colorIndex === 0 }">白色</div>
                                                    <div @click="chooseSku(0, 1)" class="sku-part-2-item" :class="{ 'sku-part-2-item-active': colorIndex === 1 }">红色</div>
                                                    <div @click="chooseSku(0, 2)" class="sku-part-2-item" :class="{ 'sku-part-2-item-active': colorIndex === 2 }">香槟色</div>
                                                </div>
                                            </div>
                                            <div class="sku-part-3">
                                                <div class="sku-part-3-text">规格</div>
                                                <div class="sku-part-3-items">
                                                    <div @click="chooseSku(1, 0)" class="sku-part-3-item" :class="{ 'sku-part-3-item-active': specIndex === 0 }">8GB+128GB</div>
                                                    <div @click="chooseSku(1, 1)" class="sku-part-3-item" :class="{ 'sku-part-3-item-active': specIndex === 1 }">8GB+128GB</div>
                                                    <div @click="chooseSku(1, 2)" class="sku-part-3-item" :class="{ 'sku-part-3-item-active': specIndex === 2 }">香槟色</div>
                                                    <div class="sku-part-3-item">香槟色</div>
                                                    <div class="sku-part-3-item">香槟色</div>
                                                    <div class="sku-part-3-item">香槟色</div>
                                                    <div class="sku-part-3-item">香槟色</div>
                                                    <div class="sku-part-3-item">香槟色</div>
                                                    <div class="sku-part-3-item">香槟色</div>
                                                    <div class="sku-part-3-item">香槟色</div>
                                                    <div class="sku-part-3-item">香槟色</div>
                                                    <div class="sku-part-3-item">香槟色</div>
                                                    <div class="sku-part-3-item">香槟色</div>
                                                    <div class="sku-part-3-item">香槟色</div>
                                                </div>
                                            </div>
                                            <div class="sku-part-4">
                                                <div class="sku-part-4-text">数量</div>
                                                <div class="sku-part-4-items">
                                                    <div @click="skuAdd(0)" class="sku-part-4-item">-</div>
                                                    <div class="sku-part-4-item-num">{{ skuNum }}</div>
                                                    <div @click="skuAdd(1)" class="sku-part-4-item">+</div>
                                                </div>
                                            </div>
                                        </cube-swipe-item>
                                    </div>
                                </transition-group>
                            </cube-swipe>
                        </cube-scroll>
                    </div>
                    <div class="sku-btn">确定</div>
                </div>
            </div>
        </mall-popup>
    </div>
</template>

<script>
import { getGoods } from '@/api';
import mallHeader from '@/components/mall-header/mall-header';
import SupportIco from '@/components/support-ico/support-ico';
import mallPopup from '@/components/mall-popup/mall-popup';
import mallNav from '@/components/mall-nav/mall-nav';
import { findIndex } from '@/common/plugins/util';
export default {
    data() {
        return {
            loadStatus: true,
            imgs: [],
            image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3978382133,2176310874&fm=27&gp=0.jpg',
            items: [
                {
                    url: 'http://www.didichuxing.com/',
                    image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3978382133,2176310874&fm=27&gp=0.jpg'
                },
                {
                    url: 'http://www.didichuxing.com/',
                    image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3978382133,2176310874&fm=27&gp=0.jpg'
                },
                {
                    url: 'http://www.didichuxing.com/',
                    image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3978382133,2176310874&fm=27&gp=0.jpg'
                }
            ],
            current: '快车',
            labels: ['快车', '小巴', '专车', '顺风车', '代驾', '公交', '自驾租车', '豪华车', '二手车', '出租车'],
            options: {
                // pullDownRefresh: {
                //     threshold: 60,
                //     txt: this.$i18n.t('message.hello')
                // }
            },
            goods: [],
            secondStop: 26,
            selectedLabel: '商品',
            disabled: true,
            tabLabels: [
                {
                    label: '商品'
                },
                {
                    label: '详情'
                }
            ],
            loop: false,
            autoPlay: false,
            showDots: false,
            colorIndex: 0,
            specIndex: 0,
            skuNum: 1,
            initialSkuIndex: 0, // 无特殊作用
            currentIndex: 1,
            initialImgIndex: 0,
            isNav: false,
            swiperX: 0,
            slideOptions: {
                listenScroll: true,
                probeType: 3
                /* lock y-direction when scrolling horizontally and  vertically at the same time */
                // directionLockThreshold: 0
            },
            scrollOptions: {
                /* lock x-direction when scrolling horizontally and  vertically at the same time */
                directionLockThreshold: 0,
                pullDownRefresh: {
                    threshold: 60,
                    txt: this.$i18n.t('message.hello')
                }
            },
            swiperOptions: {
                stopPropagation: true,
                listenScroll: true,
                probeType: 3
            }
        };
    },
    mounted() {
        this.getGoods();
        console.log(this.$i18n.t('message.hello'));
        setTimeout(() => {
            this.loadStatus = false;
        }, 1000);
    },
    computed: {
        initialIndex() {
            let index = 0;
            index = findIndex(this.tabLabels, item => item.label === this.selectedLabel);
            return index;
        }
    },
    methods: {
        async getGoods() {
            let res = await getGoods();
            this.goods = res.data[0].foods[0];
            this.items.forEach(item => {
                this.imgs.push(item.image);
            });
        },
        changePage(current) {
            this.selectedLabel = this.tabLabels[current].label;
        },
        handleImgsClick(index) {
            this.initialImgIndex = index;
            const params = {
                $props: {
                    imgs: this.imgs,
                    initialIndex: 'initialImgIndex', // 响应式数据的key名
                    loop: false
                },
                $events: {
                    change: i => {
                        // 必须更新 initialIndex
                        this.initialImgIndex = i;
                    }
                }
            };
            this.$createImagePreview({ ...params }).show();
        },
        changeSwiper(current) {
            this.currentIndex = current + 1;
        },
        scroll(pos) {
            const x = Math.abs(pos.x);
            const tabItemWidth = this.$refs.tabNav.$el.clientWidth;
            const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
            const deltaX = (x / slideScrollerWidth) * tabItemWidth;
            this.$refs.tabNav.setSliderTransform(deltaX);
        },
        swiperScroll(pos) {
            const x = Math.abs(pos.y);
            console.log(x);
        },
        onPullingDown() {
            setTimeout(() => {
                this.$refs.contentScroll.forceUpdate(true);
            }, 1000);
        },
        onImgLoad() {
            const contentScroll = this.$refs.contentScroll;
            contentScroll.scroll.beforePullDown && contentScroll.refresh();
        },
        skuAdd(val) {
            if (val === 0) {
                if (this.skuNum > 1) {
                    this.skuNum--;
                }
            } else if (val === 1) {
                this.skuNum++;
            }
        },
        chooseSku(type, index) {
            if (type === 0) {
                this.colorIndex = index;
            } else if (type === 1) {
                this.specIndex = index;
            }
        },
        showPicker(val, dis) {
            if (val === 1) {
                this.$refs.popupWrapper.show(dis);
            } else {
                this.$refs.popupWrapper.hide();
            }
        },
        showNav() {
            if (!this.$refs.navWrapper.isVisible) {
                this.$refs.navWrapper.show();
            } else {
                this.$refs.navWrapper.hide();
            }
        }
    },
    components: {
        mallHeader,
        SupportIco,
        mallPopup,
        mallNav
    }
};
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
        .tab-slide-container
            height 100%
            >>>.good-slide-content
                position relative
                .good-slide-swiper
                    position relative
                    .swiper-page
                        position absolute
                        bottom 30px
                        right 20px
                        border-radius 50px
                        padding 10px 20px
                        background rgba(0, 0, 0, 0.4)
                        display flex
                        align-items center
                        justify-content center
                        .swiper-page-text
                            color #FFFFFF
                    img
                        width 100%
                        height 750px
                .good-slide-title-content
                    margin-bottom 10px
                    background #FFFFFF
                    padding 30px
                    text-align left
                    .good-slide-title
                        width 100%
                        .good-slide-title-s-1
                            font-size 32px
                            font-weight bold
                            color #ee3147
                        .good-slide-title-s-2
                            font-size 32px
                            font-weight bold
                            color #8f8f8f
                            margin-left 20px
                            text-decoration line-through
                        .good-slide-title-ss
                            font-size 60px
                            font-weight bold
                            color #ee3147
                        .good-slide-title-sss
                            font-size 40px
                            font-weight bold
                            padding-top 30px
                            line-height 140%
                            color #1d1d1d
                            width 100%
                            overflow hidden
                            text-overflow ellipsis
                            display -webkit-box
                            -webkit-line-clamp 2
                            line-clamp 2
                            -webkit-box-orient vertical
                            white-space pre-wrap
                .good-slide-choose-content
                    background #FFFFFF
                    margin-bottom 20px
                    .good-slide-choose-items
                        padding 0 30px
                        .good-slide-choose-item
                            height 80px
                            color #8F8F8F
                            display flex
                            align-items center
                            justify-content space-between
                            &:first-child
                                border-bottom 1px solid #ebebeb
                            .ml-40
                                margin-left 40px
                .good-slide-comment-content
                    background #FFFFFF
                    margin-bottom 20px
                    .good-slide-comment-title-content
                        padding 0 30px
                        display block
                        .good-slide-comment-title
                            height 80px
                            display flex
                            align-items center
                            justify-content space-between
                            border-bottom 1px solid #ebebeb
                            .good-slide-comment-title-s
                                position relative
                                &:before
                                    content ''
                                    position absolute
                                    width 6px
                                    height 22px
                                    background #dc352c
                                    left -12px
                            .good-slide-comment-title-ss
                                font-size 20px
                                color #8F8F8F
                                i
                                    padding-left 10px
                    .good-slide-comment-items
                        background #FFFFFF
                        .good-slide-comment-item
                            padding-bottom 40px
                            .good-slide-comment-item-message
                                padding 0 30px
                                .good-slide-comment-item-message-title
                                    padding 20px 0
                                    display flex
                                    align-items center
                                    .message-title-text
                                        padding 0 20px 0 10px
                                    .message-title-star
                                        .support-ico
                                            padding 0 2px
                                .good-slide-comment-item-message-sku
                                    color #b6b6b6
                                    font-size 20px
                                    text-align left
                                    span
                                        &:first-child
                                            padding-right 20px
                                .good-slide-comment-item-message-msg
                                    margin 18px 0
                                    width 100%
                                    text-align left
                                    overflow hidden
                                    text-overflow ellipsis
                                    display -webkit-box
                                    -webkit-line-clamp 2
                                    line-clamp 2
                                    -webkit-box-orient vertical
                                    line-height 140%
                                    white-space pre-wrap
                        .good-slide-comment-item-imgs
                            img
                                width 300px
                                height 180px
            >>>.detail-slide-content
                width 100%
                .detail-slide-title
                    padding 22px
                    background #F8F8F8
                    display flex
                    align-items center
                    justify-content center
                    .line
                        width 32px
                        height 2px
                        background #8F8F8F
                    .text
                        color #8F8F8F
                        padding 0 20px
                .detail-slide-msg
                    img
                        width 100%
                        display block
            >>>.horizontal-scroll-list-wrap
                display flex
                align-items center
            .cube-scroll-content
                display inline-block
            .list-wrapper
                white-space nowrap
            .list-item
                display inline-block
                padding-right 10px
                &:first-child
                    padding-left 30px
                &:last-child
                    padding-right 0
            img
                width 100%
    .header-icon-main
        position absolute
        right 0
        top 0
        .header-icon
            height 60px
            display flex
            align-items center
            .ml-30
                margin-left 30px
            div
                display flex
    .goods-footer-container
        width 100%
        height 100px
        position fixed
        bottom 0
        background #FFFFFF
        border-top 1px solid #ebebeb
        .goods-footer-content
            padding 10px 18px 10px 30px
            display flex
            align-items center
            justify-content space-between
            .goods-footer-part-1
                display flex
                align-items center
                .goods-footer-part-1-item
                    display flex
                    align-items center
                    justify-content center
                    flex-direction column
                    padding 10px 0
                    &:first-child
                        margin-right 55px
            .goods-footer-part-2
                display flex
                align-items center
                .goods-footer-part-2-item
                    width 206px
                    height 80px
                    line-height 80px
                    text-align center
                    margin-left 20px
                    border-radius 38px
                    color #FFFFFF
                    font-size 28px
                    &:first-child
                        background-image linear-gradient(to right, #fe9330, #ffbb28)
                    &:last-child
                        background-image linear-gradient(to right, #ee303a, #f5314d)
        .goods-footer-text-s
            font-size 18px
            padding-top 8px
    .sku-wrapper-container
        height 890px
        padding 30px 30px 40px
        .sku-wrapper-content
            height 790px
            .sku-part-1
                display flex
                align-items flex-start
                justify-content space-between
                .sku-part-1-item-1
                    display flex
                    align-items flex-end
                    img
                        width 200px
                        height 200px
                        margin-right 28px
                    .sku-part-1-text
                        text-align left
                        .sku-part-1-text-s
                            color #8F8F8F
                            padding-top 20px
                        .sku-part-1-text-ss
                            color #ee3147
                            font-weight bold
                            font-size 28px
                        .sku-part-1-text-sss
                            color #ee3147
                            font-weight bold
                            font-size 46px
                .sku-part-1-item-2
                    font-size 46px
                    color #8f8f8f
            .sku-part-2
                padding 30px 0
                .sku-part-2-text
                    font-size 26px
                    font-weight bold
                    text-align left
                    padding-bottom 5px
                .sku-part-2-items
                    display flex
                    align-items center
                    flex-flow wrap
                    .sku-part-2-item
                        padding 20px 34px
                        border-radius 40px
                        background #f8f8f8
                        border 2px solid #f8f8f8
                        font-size 26px
                        margin-right 20px
                        margin-top 25px
                    .sku-part-2-item-active
                        background rgba(238, 49, 71, 0.06)
                        border 2px solid #ee3147
                        color #ee3147
            .sku-part-3
                padding 30px 0
                .sku-part-3-text
                    font-size 26px
                    font-weight bold
                    text-align left
                    padding-bottom 5px
                .sku-part-3-items
                    display flex
                    align-items center
                    flex-flow wrap
                    .sku-part-3-item
                        padding 20px 34px
                        border-radius 40px
                        background #f8f8f8
                        border 2px solid #f8f8f8
                        font-size 28px
                        margin-right 20px
                        margin-top 25px
                    .sku-part-3-item-active
                        background rgba(238, 49, 71, 0.06)
                        border 2px solid #ee3147
                        color #ee3147
            .sku-part-4
                padding 30px 0
                display flex
                align-items center
                justify-content space-between
                .sku-part-4-text
                    font-size 26px
                    font-weight bold
                    text-align left
                .sku-part-4-items
                    display flex
                    align-items center
                    .sku-part-4-item
                        width 68px
                        height 68px
                        line-height 68px
                        border-radius 8px
                        background #f8f8f8
                        font-size 28px
                        font-weight bold
                    .sku-part-4-item-num
                        height 68px
                        line-height 68px
                        border-radius 8px
                        background #f8f8f8
                        font-size 28px
                        font-weight bold
                        padding 0 30px
                        margin 0 10px
        .sku-btn
            width 100%
            height 80px
            line-height 80px
            color #FFFFFF
            font-size 26px
            font-weight bold
            background #ee3147
            border-radius 50px
            margin-top 20px
    >>>.cube-tab-bar
        height 60px
        .cube-tab
            flex none
            margin 0 30px
            color #FFFFFF
            font-size 30px
        .cube-tab-bar-slider
            height 4px
            background #FFFFFF
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
