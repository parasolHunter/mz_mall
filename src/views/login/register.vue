<template>
    <div class="register">
        <div class="mall-scroll-wrapper content-scroll-wrapper">
            <div class="mall-header">
                <div class="other-header">
                    <h1>注册</h1>
                    <i @click="back" class="cubeic-back"></i>
                </div>
            </div>
            <div class="logo">
                <img src="./registerLogo.png" alt="">
                <p class="title">MZ</p>
                <p>综合购物社交生活平台</p>
            </div>
            <div class="register-list">
                <div class="list-main">
                    <cube-input placeholder="输入手机号"></cube-input>
                    <div class="code">
                        <cube-input placeholder="请输入短信验证码"></cube-input>
                        <cube-validator v-model="Message":rules="rules.Message"
                        ></cube-validator>
                        <div class="sendCode">
                            <mall-Code></mall-Code>
                        </div>
                    </div>
                    <div class="submit">
                        立即注册
                    </div>
                </div>
            </div>
            <div class="openApp">
                <div class="openApp-logo">
                    <img src="./downlogo.png" alt="">
                </div>
                <div class="open" @click="goToWeibo">
                    打开APP
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api'
import mallCode from '@/components/mall-code/mall-code'

export default {
    data () {
        return {
            loadStatus: false,
            options: {},
            list: [],
            Message:'',
            rules: {
                Message: {
                    required: true,
                    type: 'number',
                    custom: (val) => {
                        return val.length == 6
                    }
                },
            },
        }
    },
    created () {

    },
    mounted () {
        console.log(this.$i18n.t('message.hello'))
        setTimeout(() => {
            this.getGoods()
            this.loadStatus = false
        }, 1000)
    },
    methods: {
        async getGoods () {
            let res = await getGoods()
            this.list = res.data
        },
        back () {
            this.$router.back()
        },

        goToWeibo () {
            let u = navigator.userAgent
            let isAndroid = u.indexOf('Android') > -1 //安卓终端
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
            if (isAndroid) {
                // 安卓weibo的scheme协议跳转
                window.location.href = 'sinaweibo://userinfo?uid=3177804914'
                setTimeout(function () {
                    let hidden =
                        window.document.hidden ||
                        window.document.mozHidden ||
                        window.document.msHidden ||
                        window.document.webkitHidden
                    if (typeof hidden == 'undefined' || hidden == false) {
                        alert(hidden)
                        // window.location.href = "http://192.168.1.119:8090/login";
                    }
                }, 2000)
            }
            // IOS下的scheme协议跳转
            if (isIOS) {
                window.location.href = 'sinaweibo://splash'
                setTimeout(function () {
                    let hidden =
                        window.document.hidden ||
                        window.document.mozHidden ||
                        window.document.msHidden ||
                        window.document.webkitHidden
                    if (typeof hidden == 'undefined' || hidden == false) {
                        alert(hidden)
                        // window.location.href = "http://192.168.1.119:8090/login";
                    }
                }, 2000)
            }
        },

    },
    components: {
        mallCode
    }
}
</script>

<style lang="stylus" scoped>
    .register
        width 100%
        height 100%
        background url('registerBg.png') no-repeat center
        background-size 100% 100%

    .mall-header
        height 60px
        padding 20px 30px

        .other-header
            position relative
            line-height 60px
            height 60px
            font-size 36px
            color #fff

            h1
                text-align center

            .cubeic-back
                position absolute
                top 0
                left 0

            .text
                font-style normal
                position absolute
                top 0
                right 0
                font-size 28px

    .mall-scroll-wrapper
        .mall-scroll-list-wrap
            width 100%
            position absolute
            top 430px
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

    .logo
        margin-top 66px
        margin-bottom 80px
        color #f6e281
        font-size 40px

        .title
            margin-bottom 20px

        img
            width 138px
            height 127px
            margin-bottom 64px

    .openApp
        height 98px
        width 100%
        background-color rgba(255, 255, 255, 0.14)
        position fixed
        left 0
        bottom 0
        display flex
        justify-content space-between
        align-items center
        padding 0 30px
        box-sizing border-box

        img
            width 105px
            height 49px

        .open
            width 148px
            height 48px
            line-height 48px
            text-align center
            color #FFFFFF
            border-radius 24px
            border 2px solid rgba(255, 255, 255, 0.13)
            background-color rgba(255, 255, 255, 0.13)

    .register-list
        width 680px
        min-height 400px
        margin 0 auto
        background-color #ffa63d
        border-radius 12px
        padding 20px
        box-sizing border-box

        .list-main
            width 100%
            min-height 400px
            border-radius 12px
            background-color #fffeff
            padding 66px 0 68px

            box-sizing border-box

            >>> .cube-input
                width 516px
                height 86px
                background-color #f3f5fc
                margin 0 auto
                border-radius 8px

            .code
                width 516px
                display flex
                justify-content space-between
                margin 16px auto

                >>> .cube-input
                    width 330px
                    margin 0

                .sendCode
                    width 174px
                    height 86px
                    background-color #f6454e
                    border-radius 8px

            .submit
                width 540px
                height 88px
                line-height 88px
                border-radius 44px
                background-color #f6454e
                margin 64px auto 0
                color #fff
                font-size 30px

    .success-enter-active, .success-leave-active

        transition width 0.5s

    .success-enter, .success-leave-to
        width 70%

    .success-enter-to, .success-leave
        width 100%
</style>
