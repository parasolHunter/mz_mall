<template>
    <div class="bind-main">
        <mall-header :type="'other'" :bgClass="'bg-white'" title="绑定账户"></mall-header>
        <div class="bind_contain">
            <div class="bind-tip">请绑定本人真实姓名支付宝账号，错误账号将无法收到提现金额</div>
            <div class="bind_item">
                <div class="input-desc">真实姓名</div>
                <div class="input-amt">
                    <cube-input
                        v-model="uname"
                        placeholder="请输入您的真实姓名"
                        type="text"
                        :autofocus="autofocus"
                        :autocomplete="autocomplete"
                        :clearable="clearable"
                    ></cube-input>
                </div>
            </div>
            <div class="bind_item">
                <div class="input-desc paddingt_80">支付宝账号</div>
                <div class="input-amt">
                    <cube-input
                        v-model="account"
                        placeholder="请输入您的支付宝账号"
                        type="text"
                        :autofocus="autofocus"
                        :autocomplete="autocomplete"
                        :clearable="clearable"
                    ></cube-input>
                </div>
            </div>
            <cube-button :primary="lockStatus" :disabled="!lockStatus">绑定</cube-button>
        </div>
    </div>
</template>

<script>
import mallHeader from '@/components/mall-header/mall-header';
export default {
    created() {},
    data() {
        return {
            uname: '',
            account: '',
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
    methods: {},
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
    padding 30px 0

.paddingt_80
    padding-top 80px !important
.color_red
    color #ee313a

.bind-main
    background-color #FFFFFF
    height 100%
    .bind_contain
        .bind-tip
            background #f88996
            font-size 22px
            color #fff
            padding 30px 30px
            line-height 40px
            @media (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)
                text-align left
        .bind_item
            text-align left
            background #FFFFFF
            padding 0 40px
            .input-desc
                padding 60px 0 10px
                font-size 34px
</style>
