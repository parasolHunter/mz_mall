<template>
    <div class="balance-main">
        <div class="balance_header">
            <i @click="back" class="cubeic-back"></i>
            <h1>余额</h1>
        </div>
        <div class="balance_content_1">
            <div class="balance_content_1_desc color_grey">账户余额（元）</div>
            <div class="balance_content_1_num color_red">108.00</div>
            <div class="balance_area flex justifyCenter">
                <div class="balance_area_son1">
                    <div class="color_grey marginb_16">可提现</div>
                    <div class="fonts_36 fontw_bold">100.0</div>
                </div>
                <div class="vline"></div>
                <div class="balance_area_son2">
                    <div class="color_grey marginb_16">冻结</div>
                    <div class="fonts_36 fontw_bold">108.0</div>
                </div>
            </div>
            <div class="btnList">
                <cube-button inline primary @click="redirect('draw')">提现</cube-button>
                <cube-button inline outline @click="redirect('recharge')">充值</cube-button>
            </div>
        </div>
        <div class="balance_content_2">
            <div class="balance_content_item flex justifyBetween" @click="redirect('walletDetails')">
                <div class="part_l flex justifyBetween">
                    <img class="desc_icon" src="./22@2x.png" alt="" />
                    <span>钱包明细</span>
                </div>
                <div class="part_r"><img class="href" src="./../set/19@2x.png" alt /></div>
            </div>
            <div class="balance_content_item flex justifyBetween" @click="redirect('rechargeRecords')">
                <div class="part_l flex justifyBetween">
                    <img class="desc_icon" src="./23@2x.png" alt="" />
                    <span>充值记录</span>
                </div>
                <div class="part_r"><img class="href" src="./../set/19@2x.png" alt /></div>
            </div>
            <div class="balance_content_item flex justifyBetween" @click="redirect('drawRecords')">
                <div class="part_l flex justifyBetween">
                    <img class="desc_icon" src="./24@2x.png" alt="" />
                    <span>提现记录</span>
                </div>
                <div class="part_r"><img class="href" src="./../set/19@2x.png" alt /></div>
            </div>
        </div>
    </div>
</template>

<script>
import mallHeader from '@/components/mall-header/mall-header';
export default {
    created() {},
    data() {
        return {};
    },
    mounted() {},
    methods: {
        back () {
            this.$router.back()
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
>>>.cube-btn-primary
    background-color #f4424b
    -webkit-border-radius 34px
>>>.cube-btn-outline
    color #ff6869
@media (min-resolution: 2dppx)
    >>>.cube-btn-outline::after
        border-radius 34px
>>>.cube-btn-outline::after
    border 1PX solid #E1313A
    border-radius 34PX
>>>.cube-btn
    width 260px
    height 68px
    &:first-child
        margin-right 19px
    &:last-child
        margin-left 19px
.marginb_16
    margin-bottom 16px
.fonts_36
    font-size 36px
.fontw_bold
    font-weight bold
.color_grey
    color #8f8f8f
.color_red
    color #ee313a
.balance-main
    .balance_header
        position relative
        z-index 1
        width 100%
        height 378px
        background url('~./20@2x.png') no-repeat center
        background-size cover
        color #FFFFFF
        font-size 36px
        padding 30px 0
        text-align center
        .cubeic-back
            position absolute
            top 30px
            left 30px
    .balance_content_1
        box-sizing border-box
        position relative
        z-index 2
        margin -350px auto 0
        width 704px
        height 436px
        background url('~./21@2x.png') no-repeat center
        background-size cover
        .balance_content_1_desc
            padding-top 46px
            font-size 26px
        .balance_content_1_num
            padding-top 22px
            font-size 62px
            font-weight bold
        .balance_area
            .balance_area_son1
                margin 50px 100px 60px 30px
            .balance_area_son2
                margin 50px 30px 60px 100px
            .vline
                width 1px
                height 61px
                background-color #eef2f5
    .balance_content_2
        margin 20px 30px
        background-color #FFFFFF
        .balance_content_item
            padding 0 30px
            height 120px
            line-height 120px
            img.desc_icon
                display block
                width 34px
                margin-right 20px
            .part_l
                span
                    font-size 30px
            .part_r
                span
                    margin-right 20px
                    &.grey_small
                        color #8f8f8f
                        font-size 24px
                img.avatar
                    display block
                    width 60px
                    margin-right 20px
                img.href
                    display block
                    height 28px
</style>
