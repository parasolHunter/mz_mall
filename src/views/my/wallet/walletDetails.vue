<template>
    <div class="records-main">
        <div :class="{'body_white': content.length > 0, 'mall-scroll-wrapper content-scroll-wrapper' : true}">
            <mall-header :type="'other'" :bgClass="'bg-white'" title="钱包明细"></mall-header>
            <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
            <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
                <cube-scroll ref="contentScroll" :data="content" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                    <ul class="records-wrapper">
                        <li v-for="(item, index) in content" :key="index" class="records-item flex justifyBetween">
                            <div class="item_l">
                                <div>{{ item.type }}</div>
                                <div>{{ item.date }}</div>
                                <div>备注：{{ item.remark }}</div>
                            </div>
                            <div :class="{ color_red: item.amty == 0, item_r: true }">{{ item.amty == 0 ? '+' : '-' }}{{ item.amt }}</div>
                        </li>
                    </ul>
                    <no-data v-if="content.length <= 0"></no-data>
                    <div class="allDatas" v-if="content.length > 0 && lastPage">已加载全部数据</div>
                </cube-scroll>
            </div>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api';
import mallHeader from '@/components/mall-header/mall-header';
import noData from '@/components/noData/noData';
let cnt = 1;
export default {
    created() {},
    data() {
        return {
            lastPage: false,
            content: [
                {
                    type: '充值',
                    date: '2020-03-18 00:00',
                    remark: '订单号 AASSJFHALKFH',
                    amty: '0',
                    amt: '10000.0'
                },
                {
                    type: '提现',
                    date: '2020-03-18 00:00',
                    remark: '订单号 AASSJFHALKFH',
                    amty: '1',
                    amt: '10000.0'
                }
            ],
            items: [
                {
                    type: '商城消费',
                    date: '2020-03-18 00:00',
                    remark: '订单号 AASSJFHALKFH',
                    amty: '1',
                    amt: '10000.0'
                },
                {
                    type: '邀请会员奖励',
                    date: '2020-03-18 00:00',
                    remark: '订单号 AASSJFHALKFH',
                    amty: '0',
                    amt: '10000.0'
                }
            ],
            loadStatus: false,
            options: {
                pullDownRefresh: {
                    threshold: 60,
                    txt: '更新成功'
                },
                pullUpLoad: true
            },
            secondStop: 26
        };
    },
    watch: {},
    mounted() {
        // this.getGoods();
        // setTimeout(() => {
        //     this.loadStatus = false;
        // }, 1000);
    },
    methods: {
        async getGoods() {
            let res = await getGoods();
        },
        onPullingDown() {
            setTimeout(() => {
                this.content.unshift(this.items[cnt++ % 2]);
                this.$refs.contentScroll.forceUpdate();
            }, 1000);
        },
        onPullingUp() {
            setTimeout(() => {
                this.content = this.content.concat(this.items);
            }, 1000);
        },
        onImgLoad() {
            const contentScroll = this.$refs.contentScroll;
            contentScroll.scroll.beforePullDown && contentScroll.refresh();
        }
    },
    components: {
        mallHeader,
        noData
    }
};
</script>

<style lang="stylus" scoped>
.body_white
    background #FFFFFF !important
.color_red
    color #EE313A
.allDatas
    color #8f8f8f
    padding 40px 30px
.records-main
    height 100%
    .mall-scroll-wrapper
        height 100%
        .mall-scroll-list-wrap
            width 100%
            height 100%
            position absolute
            top 100px
            left 0
            right 0
            bottom 100px
            overflow scroll
        >>>.once-load
            position absolute
            left 50%
            >span
                margin auto
                transform translate(-50%, 100%)
        .records-wrapper
            border-top 1px solid #ebebeb
            background #FFFFFF
            li
                border-bottom 1px solid #ebebeb
                padding 30px 30px
                .item_l
                    text-align left
                    div
                        &:first-child
                            font-size 30px
                            padding-bottom 16px
                        &:nth-child(2)
                            color #8f8f8f
                            padding-bottom 20px
                        &:nth-child(3)
                            color #8f8f8f
                .item_r
                    font-size 30px
// .cube-pulldown-wrapper
// text-align center
// .before-trigger
// height auto
// font-size 30px
// align-self flex-end
// span
// display inline-block
// line-height 1
// transition all 0.3s
// color #666
// padding 15px 0
// &.rotate
// transform rotate(180deg)
// .after-trigger
// flex 1
// margin 0
// .text-wrapper
// margin 0 auto
// margin-top 14px
// padding 5px 0
// color #498ec2
// .cube-loading-spinners
// margin auto
.success-enter-active, .success-leave-active
    transition width 0.5s
.success-enter, .success-leave-to
    width 70%
.success-enter-to, .success-leave
    width 100%
</style>
