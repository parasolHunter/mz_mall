<template>
    <div class="login">
        <mall-header :type="'back'" :bgClass="'bg-white'"></mall-header>
        <div class="title">绑定手机</div>
        <div class="bd">
            <cube-input v-model="userName" :autofocus="autofocus" placeholder="请输入手机号码"></cube-input>
            <div class="shortMessage">
                <cube-input v-model="Message" :autofocus="autofocus" placeholder="请输入短信验证码"></cube-input>
                <div class="sendCode">
                    <mall-Code :textColor="'red'" actionType="D"  :phoneMailbox="userName"></mall-Code>
                </div>

            </div>
            <div class="submit">
                下一步
            </div>
        </div>
    </div>
</template>

<script>
import mallCode from '@/components/mall-code/mall-code'
import mallHeader from '@/components/mall-header/mall-header'

export default {
    data () {
        return {
            autofocus: false,
            userName: '',
            Message: '',
        }
    },
    mounted () {

    },
    methods: {
        showClose (item) {
            this.$createDialog({
                type: 'alert',
                icon: 'cubeic-alert',
                showClose: true,
                title: 'MZ想要打开' + item,
            }).show()
        },
        other () {
            this.otherWays = !this.otherWays
            this.userName = ''
            this.password = ''
            this.Message = ''
        }
    },
    components: {
        mallHeader,
        mallCode
    }
}
</script>

<style lang="stylus" scoped>
    >>> .cubeic-back
        color #000

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

    .title
        padding 0 20px
        text-align left
        font-size 50px
        margin 30px 0 200px

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

    .submit
        width 100%
        height 88px
        line-height 88px
        border-radius 44px
        background-color #dc3f44
        margin 140px 0 30px
        color #fff
        font-size 30px


</style>
