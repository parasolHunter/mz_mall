<template>
    <div class="pwd-main">
        <mall-header :type="'other'" :bgClass="'bg-white'" :title="pwdType == 1 ? '修改登录密码' : '修改支付密码'"></mall-header>
        <div class="pwd_contain">
            <div class="phoneTip">
                <span>短信将发送至绑定手机号</span>
                <span class="color_red">13189078469</span>
            </div>
            <div class="pwd_item">
                <cube-input
                    v-model="pwd"
                    :placeholder="pwdType == 1 ? '请输入新密码' : '请输入6位数字密码'"
                    type="password"
                    :autofocus="autofocus"
                    :autocomplete="autocomplete"
                    :eye="eye"
                ></cube-input>
            </div>
            <div class="pwd_item">
                <cube-input
                    v-model="cpwd"
                    :placeholder="pwdType == 1 ? '请确认新密码' : '请确认支付密码'"
                    type="password"
                    :autofocus="autofocus"
                    :autocomplete="autocomplete"
                    :eye="eye"
                ></cube-input>
            </div>
            <div class="pwd_item item_code flex justifyBetween">
                <cube-input v-model="code" placeholder="请输入短信验证码" maxlength="4" :autofocus="autofocus" :autocomplete="autocomplete"></cube-input>
                <div class="sendCode">
                  <mall-Code :textColor="'red'"></mall-Code>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mallHeader from '@/components/mall-header/mall-header';
import mallCode from '@/components/mall-code/mall-code'

export default {
    created() {},
    data() {
        return {
            pwdType: this.$route.params.pwdType,
            pwd: '',
            cpwd: '',
            code: '',
            clearable: {
                visible: true,
                blurHidden: true
            },
            autofocus: false,
            autocomplete: true,
            eye: {
                open: false,
                reverse: false
            }
        };
    },
    watch: {
        value(newV) {
            if (newV.length > 10) {
                newV = newV.slice(0, 10);
                this.$nextTick(() => {
                    this.value = newV;
                });
            }
        }
    },
    mounted() {},
    methods: {},
    components: {
        mallHeader,
        mallCode
    }
};
</script>

<style lang="stylus" scoped>
/* 修改提示文字的颜色 */
.item_code
    >>>.cube-input::after
        border-color transparent
    >>>.cube-input-field
        flex auto
    >>>.cube-btn
        margin-right 30px
        background #FFFFFF
        color #EE313A
        border-left 2px solid #999
        padding-left 60px
.color_red
    color #ee313a
.pwd-main
    .pwd_contain
        .phoneTip
            height 74px
            line-height 74px
            text-align left
            padding-left 30px
            span
                margin-right 10px
        .pwd_item
            text-align left
            background #FFFFFF
            >>>.cube-input-field
                padding 30px
            .sendCode
                padding 0 30px
                width 180px
</style>
