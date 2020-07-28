<template>
    <div>
        <div class="pay-wrapper-container">
            <div class="pay-wrapper-title">
                <i @click="closeMask" class="cubeic-close"></i>
                <span>{{ title }}</span>
            </div>
            <div class="pay-wrapper-content">
                <div class="money">
                    <i>&yen;</i>
                    <em class="colorSize">{{ payPrice | integerFilter }}</em>
                    <i>.{{ payPrice | decimal2placesFilter }}</i>
                </div>
                <cube-radio-group>
                    <cube-radio v-for="(option, index) in mall_options" :key="index" position="right" :hollow-style="true" :option="option" v-model="mall_selected">
                        <div class="flex">
                            <img class="pay_icon" :src="option.src" />
                            <em>{{ option.label }}</em>
                            <span class="balance">{{ option.balance ? '&yen;' + option.balance : '' }}</span>
                        </div>
                        <router-link class="recharge_btn" v-if="option.value == 1" to="recharge">充值</router-link>
                    </cube-radio>
                </cube-radio-group>
            </div>
            <div class="pay-btn" @click="confirm">确定</div>
        </div>
        <vpay ref="pays"
            v-model="payShow"
            @close="close"
            @forget="forget"
            @input-end="inputEnd"
        ></vpay>
    </div>
</template>

<script>
export default {
    name: 'mallSelect',
    props: {
        title: {
            type: String,
            default: ''
        },
        payPrice: {
            type: Number,
            default: 0
        },
        mall_selected_defined: {
            type: String,
            default: ''
        },
        mall_options: {
            type: Array,
            default: null
        }
    },
    filters: {
        decimal2placesFilter (value) {
            let realVal = ''
            if (!isNaN(value) && value !== '') {
                // 截取当前数据到小数点后两位
                realVal = parseFloat(value).toFixed(2)
                realVal = realVal.split('.')[1]
            } else {
                realVal = '--'
            }
            return realVal
        },
        integerFilter (value) {
            let realVal = ''
            if (!isNaN(value) && value !== '') {
                // 截取当前数据到小数点后两位
                realVal = parseFloat(value).toFixed(2)
                realVal = realVal.split('.')[0]
            } else {
                realVal = '--'
            }
            return realVal
        }
    },
    data () {
        return {
            mall_selected: this.mall_selected_defined ? this.mall_selected_defined : '1',
            payShow: false
        }
    },
    methods: {
        closeMask () {
            this.$emit('showPicker')
        },
        confirm () {
            this.$emit('selectHanddle', this.mall_selected)
            if (this.mall_selected === '1') {
                this.payShow = true
            } else {
                this.closeMask()
            }
        },
        close () {
            this.payShow = false
        },
        forget () {
            this.$router.push('/editPwd/2')
        },
        inputEnd (t) {
            var _this = this
            setTimeout(function () {
                t === '111111' ? _this.$refs.pays.$success().then(function (t) {
                    // _this.$router.push('/editPwd/2')
                }) : _this.$refs.pays.$fail()
            }, 1e3)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
i, em
    font-style normal
.pay-wrapper-container
    height 690px
    padding 0 30px 40px
    overflow hidden
    .pay-wrapper-title
        width 100%
        height 88px
        line-height 88px
        font-size 30px
        position relative
        border-bottom 1px solid #ebebeb
        i
            position absolute
            top 0
            left 0
            font-size 46px
            color #8f8f8f
    .pay-wrapper-content
        >>>.border-top-1px::before
            border-top none
        >>>.cube-radio-wrap
            padding 30px 0
        >>>.border-bottom-1px::after
            border-bottom none
        >>>.cube-radio
            &:first-child>label
                -webkit-justify-content space-between
            .cube-radio-ui
                &::before
                    color #8f8f8f
                    border-radius 50%
                    transform scale(1.8)
        >>>.cube-radio-hollow.cube-radio_selected .cube-radio-ui
            background-color #ee3147
            &::before
                background transparent
                transform scale(1.8)
                color transparent
            i
                color #EE3147
                font-style normal
                transform scale(2)
                -webkit-transition all 0.2s
                transition all 0.2s
                &:before
                    content '\E617'
                    position absolute
                    top 0
                    left 0
                    width auto
                    height auto
                    border-color #EE3147
                    background-color #FFFFFF
                    transform none
        .money
            padding 54px 0 30px
            > i
                font-size 40px
                font-weight bold
            .colorSize
                font-size 73px
                font-weight bold
        .pay_icon
            display block
            width 44px
            margin-right 20px
        .balance
            font-size 23px
            margin-left 10px
        .recharge_btn
            position absolute
            z-index 9
            right 60px
            width 90px
            height 42px
            line-height 42px
            background #EE3147
            -webkit-border-radius 6px
            color #FFFFFF
            text-align center
            justify-content flex-end
        em
            font-size 26px
    .pay-btn
        width 100%
        height 80px
        line-height 80px
        color #FFFFFF
        font-size 26px
        font-weight bold
        background #ee3147
        border-radius 50px
        margin-top 60px
</style>
