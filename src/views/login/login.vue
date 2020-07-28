<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <div class="mall-header">
            <i class="cubeic-close" @click="back"></i>
            <span @click="other">{{otherWays?'账户密码登录':'短信验证码登录'}}</span>
        </div>
        <div class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :options="options">
                <div class="bd">
                    <img class="logo" src="./logo.png" alt="">
                    <template v-if="otherWays">
                        <cube-input v-model="phoneMailbox" :autofocus="autofocus" placeholder="请输入手机号码"></cube-input>
                        <cube-validator v-model="valid.phone" :model="phoneMailbox" :rules="rules.phone"
                        ></cube-validator>
                        <div class="shortMessage">
                            <cube-input v-model="code" :autofocus="autofocus" placeholder="请输入短信验证码"></cube-input>
                            <cube-validator v-model="valid.code" :model="code" :rules="rules.code"
                            ></cube-validator>
                            <div class="sendCode">
                                <mall-Code :textColor="'red'" actionType="D" :phoneMailbox="phoneMailbox"></mall-Code>
                            </div>
                        </div>
                    </template>
                    <template v-if="!otherWays">
                        <cube-input v-model="phoneMailbox" :autofocus="autofocus" placeholder="请输入手机号码"></cube-input>
                        <div class="shortMessage">
                            <cube-input v-model="Password" :autofocus="autofocus" placeholder="请输入密码"></cube-input>
                        </div>
                    </template>
                    <cube-button  @click="submit"  :disabled="!disabled" :class="{'active':disabled}" >登录</cube-button>
                    <p class="tips">未注册用户验证后自动登录</p>
                    <div class="otherLogin">
                        <i></i>
                        <span>其他登录方式</span>
                        <i></i>
                    </div>
                    <div class="payment">
                        <div class="weChat">
                            <cube-button @click="showClose('微信','MZ')"><img src="./WeChat@2x.png" alt="">
                            </cube-button>
                        </div>
                        <div class="alipay">
                            <cube-button @click="showClose('支付宝','MZ')"><img src="./Alipay@2x.png" alt="">
                            </cube-button>
                        </div>
                    </div>
                    <p class="Explain">登录表明已阅读并接受<span>用户协议</span>和<span>隐私政策</span></p>
                </div>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
import { SMSlanding } from '@/api'
import mallHeader from '@/components/mall-header/mall-header'
import mallCode from '@/components/mall-code/mall-code'
import mallPopup from '@/components/mall-popup/mall-popup'

export default {
    data () {
        return {
            options: {},
            autofocus: false,
            otherWays: true,
            Password: '',
            code: '',
            phoneMailbox: '13100000001',
            valid: {
                phone: '',
            },
            rules: {
                phone: {
                    required: true,
                    type: 'tel',
                    custom: (val) => {
                        return val.length >= 11
                    }
                },
                code: {
                    required: true,
                    type: 'number',
                    custom: (val) => {
                        return val.length == 6
                    }
                },
            },
        }
    },
    mounted () {
        console.log(this.$i18n.t('message.hello'))
        setTimeout(() => {
            this.loadStatus = false
        }, 1000)
    },
    methods: {
        async submit () {
            if (this.otherWays) {
                SMSlanding({
                    phoneMailbox: this.phoneMailbox,
                    code: this.code
                }).then(response => {
                    this.$router.push({ path: "home" });
                }).catch(err => {
                    console.log(err)
                })
            } else {
                let data = {
                    phoneMailbox: this.phoneMailbox,
                    Password: this.Password
                }
                let res = await SMSlanding(data)
            }

        },
        showClose (item, to) {
            this.dialog = this.$createDialog({
                type: 'confirm',
                title: to + '想要打开' + item,
                confirmBtn: {
                    text: '确定',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                },
                cancelBtn: {
                    text: '取消',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                },
                onConfirm: () => {

                },
                onCancel: () => {

                }
            }).show()
        },
        payment (item) {
            console.log(item)
        },
        back () {
            this.$router.back()
        },
        other () {
            this.otherWays = !this.otherWays
            this.phoneMailbox = ''
            this.Password = ''
            this.code = ''
        }
    },
    components: {
        mallHeader,
        mallPopup,
        mallCode
    },
    computed: {
        disabled () {
            if ((this.phoneMailbox && this.Password) || (this.phoneMailbox && this.code.length == 6)) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .mall-scroll-wrapper
        .mall-scroll-list-wrap
            width 100%
            position absolute
            top 100px
            left 0
            right 0
            bottom 0
            overflow scroll

            .imageList {
                overflow-x: auto;
                overflow-y: hidden;
                height: 180px;
                white-space: nowrap;

                img {
                    width 300px
                    height 200px
                    margin-right: 10px;
                }
            }

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


    >>> .cube-input, >>> .cube-input_active
        background none
        outline none
        border-bottom 1px solid #ebebeb

        &::-webkit-input-placeholder
            color #8f8f8f

        &::after
            border-color: transparent

    >>> .cube-input-field
        padding-left 0
        font-size 27px


    .login
        height 100%
        width 100%
        background-color: #fff;

    .mall-header
        display flex
        justify-content space-between
        align-items center
        padding 0 20px
        height 100px
        line-height 100px
        box-sizing border-box
        font-size 24px

        >>> .cubeic-close
            font-size 40px

        span
            font-size 28px

    .bd
        width 630px
        margin auto
        font-size 27px

        .logo
            width 120px
            height 120px
            display block
            margin 66px auto 106px

        input
            width 100%
            padding-bottom 30px

        .shortMessage
            display flex
            justify-content space-between
            align-items center
            border-bottom 1px solid #ebebeb
            margin-top 80px

            .cube-input
                flex 1
                border none

            .sendCode
                width 170px
                height 100%


    >>>.cube-btn
        width 100%
        height 88px
        line-height 88px
        border-radius 44px
        background-color #dc3f44
        margin 140px 0 30px
        color #fff
        font-size 30px
        opacity 0.6
        padding 0
    .active
        opacity 1

    .tips
        color: #b6b6b6

    .otherLogin
        margin-top 180px
        color #b6b6b6
        display flex
        align-items center

        span
            margin 0 14px

        i
            display inline-block
            width 220px
            height 1px
            background-color #b6b6b6

    .payment
        display flex
        justify-content space-between
        margin-top 40px

        div
            width 220px
            height 64px

            >>> .cube-btn
                background-color transparent
                position absolute
                width 64px
                height 64px
                right 0
                margin 0
                padding 0
                border 1px solid transparent
                outline none

            img
                position absolute
                width 64px
                height 64px
                right 0
                top 0

        .weChat, .alipay .cube-btn
            position relative

        .alipay .cube-btn img
            left 0


    .Explain
        margin-top 50px
        color #b6b6b6

        span
            color: #5b8edb

    >>> .cube-dialog-btn_highlight
        color #dc3f44
</style>
