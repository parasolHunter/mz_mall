<template>
    <div class="draw-main">
        <mall-header :type="'other'" :bgClass="'bg-white'" title="提现"></mall-header>
        <div class="draw_contain">
            <div class="draw_item">
                <div class="input-desc">提现金额</div>
                <div class="input-amt">
                    <cube-input v-model="amt" placeholder="" type="number" :autofocus="autofocus" :autocomplete="autocomplete" :clearable="clearable"></cube-input>
                </div>
                <div class="input-balance flex justifyBetween">
                    <p>可提现金额（元）：0.00</p>
                    <span>全部提现</span>
                </div>
            </div>
            <div class="draw_item">
                <div class="input-desc">提现至以下账户</div>
                <div class="bind-account flex justifyBetween" v-if="!lockStatus">
                    <p>未绑定账户</p>
                    <span>去绑定</span>
                </div>
                <div class="bind-account flex justifyBetween" v-if="lockStatus" @click="redirect('bindAccount')">
                    <div class="flex">
                        <img class="payment" src="./69@2x.png" alt="" />
                        <div>
                            <span>陈**</span>
                            <span>1321****4545</span>
                        </div>
                    </div>
                    <img class="href" src="./../set/19@2x.png" alt />
                </div>
            </div>
            <cube-button :primary="lockStatus" :disabled="!lockStatus">确认提现</cube-button>
        </div>
    </div>
</template>

<script>
import mallHeader from '@/components/mall-header/mall-header';
export default {
    created() {},
    data() {
        return {
            amt: '',
            clearable: {
                visible: true,
                blurHidden: true
            },
            lockStatus: true,
            autofocus: false,
            autocomplete: true,
            eye: {
                open: false,
                reverse: false
            }
        };
    },
    watch: {
        amt(newV) {
            if (newV.length > 8) {
                newV = newV.slice(0, 8);
                this.$nextTick(() => {
                    this.amt = newV;
                });
            }
        }
    },
    mounted() {},
    methods: {
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
>>>.cube-btn_disabled
    background #ffaeb7
    &::after
        border-radius 44PX
>>>.cube-btn-primary
    background-color #EE313A
    -webkit-border-radius 44px
>>>.cube-btn-outline
    color #ff6869
>>>.cube-btn
    width 80%
    padding 30px 0
    margin 520px auto 30px
    border-radius 44PX
>>>.cube-input::after
    border-color transparent
    border-bottom 1PX solid #ebebeb
>>>.cube-input-field
    flex auto
>>>.cube-input-field
    padding 30px
.color_red
    color #ee313a
.draw-main
    background-color #FFFFFF
    height 100%
    .draw_contain
        .draw_item
            text-align left
            background #FFFFFF
            padding 0 30px
            .input-desc
                padding 40px 0 54px
                font-size 34px
            .input-amt
                >>>.cube-input::before
                    content '￥'
                    font-size 34px
                    font-weight bold
            .input-balance
                padding 20px 0 80px
            .bind-account
                padding 16px 0 26px
                border-bottom 1px solid #ebebeb
                span
                    display block
                    &:first-child
                        margin-bottom 10px
                img.payment
                    display block
                    width 60px
                    margin-right 20px
                img.href
                    display block
                    height 28px
</style>
