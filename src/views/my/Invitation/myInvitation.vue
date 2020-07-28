<template>
    <div class="Invitation">
        <div class="mall-scroll-wrapper content-scroll-wrapper">
            <div class="mall-header">
                <div class="other-header">
                    <h1>我的邀请</h1>
                    <i @click="back" class="cubeic-back"></i>
                </div>
            </div>
            <div class="Invitation-main">
                <div class="InvitationAward">
                    <div>
                        <p class="InvitationAward-number">10</p>
                        <p>已邀请(人)</p>
                    </div>
                    <div class="InvitationAward-line">
                        <p class="InvitationAward-number">200</p>
                        <p>活动奖励(员)</p>
                    </div>
                </div>
            </div>
            <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
            <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap " ref="scrollWrapper">
                    <cube-scroll ref="contentScroll" :options="options">
                <div class="list">
                    <div class="list-main">
                        <div v-for="item,index in list" :key="index">
                            <img :src="item.icon" alt="">
                            <span>{{item.name}}</span>
                            <p>{{item.time}}</p>
                        </div>
                    </div>
                </div>
                    </cube-scroll>
            </div>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api'


export default {
    data () {
        return {
            loadStatus: false,
            options:{},
            list:[]
        }
    },
    created(){

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

    },
    components: {
    }
}
</script>

<style lang="stylus" scoped>
    .Invitation
        width 100%
        height 100%
        background url('~@/assets/img/my/myInvitation.png') no-repeat center
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

    .list
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
            background-color #fff
            padding 0 20px
            box-sizing border-box
            div
                height 98px
                line-height 98px
                border-bottom  2px dashed #ebebeb
                font-size 30px
                vertical-align middle
                position relative
                padding-left 52px
                img,span
                    float left
                img
                    width 42px
                    height 42px
                    border-radius 21px
                    position absolute
                    left 0
                    top 50%
                    margin-top  -21px

                p
                    float right
                    font-size 22px
                    color #8f8f8f
    .Invitation-main
        padding 120px 80px 0
        -webkit-box-sizing: border-box
        -moz-box-sizing: border-box
        box-sizing: border-box
        .InvitationAward
            display  flex
            div
                flex 1
                color #fff
                font-size 32px
                .InvitationAward-number
                    font-size 62px
                    margin-bottom 30px
            .InvitationAward-line
                position relative
            .InvitationAward-line::before
                content ""
                position absolute
                width 1px
                height 80px
                bottom 0px
                left 0px
                border 1px dashed rgba(255,255,255,0.4)
    .success-enter-active, .success-leave-active

        transition width 0.5s

    .success-enter, .success-leave-to
        width 70%

    .success-enter-to, .success-leave
        width 100%
</style>
