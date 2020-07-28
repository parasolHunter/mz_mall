<template>
    <div class="input-div">
        <div @click="getCode()" class="code-btn" :disabled="!show" :class="textColor">
            <span v-show="show">获取验证码</span>
            <span v-show="!show" class="count">重新发送({{count}})</span>
        </div>
    </div>
</template>

<script>
import { sendCode } from '@/api'

export default {
    props: {
        textColor: {
            type: String,
            default: ''
        },
        actionType: {
            type: String,
            default: '' //P-找回密码 U-修改密码 D-获取验证码
        },
        phoneMailbox: {
            type: [String, Number],
            default: ''
        },
    },
    data () {
        return {
            TIME_COUNT: 60,//验证码倒计时60s
            count: '',
            show: true
        }
    },
    computed: {},
    mounted () {
    },
    methods: {
        // 验证码倒计时60s

        getCode () {
            if (!this.timer && this.phoneMailbox && this.actionType) {
                sendCode({
                    mobilePhone: this.phoneMailbox,
                    actionType: this.actionType
                }).then(response => {
                    if (response.respCode == '00000') {
                        this.count = this.TIME_COUNT
                        this.show = false
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= this.TIME_COUNT) {
                                this.count--
                            } else {
                                this.show = true
                                clearInterval(this.timer)
                                this.timer = null
                            }
                        }, 1000)
                    } else {
                        console.log(response.respMsg)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    },
    components: {}
}
</script>

<style lang="stylus" scoped>
    .input-div
        width 100%
        height 100%
        font-size 27px

        .code-btn
            width 100%
            height 100%
            display flex
            align-items center
            justify-content center
            color #FFFFFF

            span
                text-align center

        .red
            border-left 1px solid #efefef
            color #dc3f44

            span
                display inline-block
                text-align right
                height 30px
                width 100%
                line-height 30px

</style>
