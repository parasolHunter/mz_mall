<template>
    <div class="set-main">
        <mall-header :type="'other'" :bgClass="'bg-white'" title="安全设置"></mall-header>
        <div class="set_content">
            <div class="set_content_item flex justifyBetween" @click="redirect('editPwd/1')">
                <span>登录密码</span>
                <div class="part_r"><img class="href" src="./19@2x.png" alt /></div>
            </div>
            <div class="set_content_item flex justifyBetween" @click="redirect('editPwd/2')">
                <span>支付密码</span>
                <div class="part_r"><img class="href" src="./19@2x.png" alt /></div>
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
.set-main
    .set_content
        margin 20px 0
        background-color #FFFFFF
        .set_content_item
            padding 0 30px
            height 88px
            line-height 88px
            border 1px solid #F8F8F8
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
