<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'back'" :title="'积分'" :bgClass="'bg-f23b44'">-->
            <i class="text" @click="redirect('IntegralDetails')">积分明细</i>
        </mall-header>
        <div class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :options="options">
                <div class="my-header-content">
                    <div class="userinfo-content flex justifyBetween">
                        <div class="avatar flex">
                            <img class="" src="../avatar.png" alt />
                            <span>彩色的云</span>
                        </div>
                        <div class="sign-box flex justifyCenter">
                            <img src="../2@2x.png" alt />
                            <span @click="showSlot=true">马上签到</span>
                        </div>
                    </div>
                </div>
                <div class="signIn">
                    <p class="Check-in">已签到 <span>9天</span></p>
                    <p class="explain">累计签到10、15、20天可获得额外积分</p>
                    <div class="days flex justifyBetween ">
                        <div>
                            <div class="numberBg"><span>+30</span></div>
                            <p class="opacity1">今天</p>
                        </div>
                        <div>
                            <div class="iSnumberBg"><span>+30</span></div>
                            <p>3.26</p>
                        </div>
                        <div>
                            <div class="iSnumberBg"><span>+30</span></div>
                            <p>3.27</p>
                        </div>
                        <div>
                            <div class="iSnumberBg"><span>+30</span></div>
                            <p class=''>3.27</p>
                        </div>
                        <div>
                            <div class="iSnumberBg"><span>+30</span></div>
                            <p>3.27</p>
                        </div>
                        <div>
                            <div class="iSnumberBg"><span>+30</span></div>
                            <p>3.27</p>
                        </div>
                        <div>
                            <div class="iSnumberBg"><span>+30</span></div>
                            <p>3.27</p>
                        </div>
                    </div>
                </div>
                <div class="earnPoints">
                    <div class="earnPoints-main">
                        <div class="integral flex justifyBetween"><span>赚积分</span> <span>积分商城></span></div>
                        <div class="title">新手任务</div>
                        <div class="tasks flex justifyBetween margin0">
                            <div class="flex">
                                <support-ico :size="21" :type="'information'"></support-ico>
                                <div class="info">
                                    <p>完善基础信息</p>
                                    <p>完善个人资料</p>
                                </div>
                            </div>
                            <div class="flex">
                                <p class="number">+1000</p>
                                <!--                        <div class="toFinish">去完成</div>-->
                                <div class="Finish">已完成</div>
                            </div>
                        </div>
                        <div class="bd"></div>
                        <div class="title">每日任务</div>
                        <div class="tasks flex justifyBetween">
                            <div class="flex">
                                <support-ico :size="21" :type="'community'"></support-ico>
                                <div class="info">
                                    <p>社区内容分享</p>
                                    <p>发布动态</p>
                                </div>
                            </div>
                            <div class="flex">
                                <p class="number">+1000</p>
                                <div class="toFinish">去完成</div>
                                <!--                        <div class="Finish">已完成</div>-->
                            </div>
                        </div>
                        <div class="tasks flex justifyBetween">
                            <div class="flex">
                                <support-ico :size="21" :type="'goodFriend'"></support-ico>
                                <div class="info">
                                    <p>邀请好友注册</p>
                                    <p>分享注册邀请到朋友圈</p>
                                </div>
                            </div>
                            <div class="flex">
                                <p class="number">+1000</p>
                                <div class="toFinish">去完成</div>
                                <!--                        <div class="Finish">已完成</div>-->
                            </div>
                        </div>
                        <div class="tasks flex justifyBetween">
                            <div class="flex">
                                <support-ico :size="21" :type="'evaluate'"></support-ico>
                                <div class="info">
                                    <p>评价商品</p>
                                    <p>完成商品评价</p>
                                </div>
                            </div>
                            <div class="flex">
                                <p class="number">+1000</p>
                                <div class="toFinish">去完成</div>
                                <!--                        <div class="Finish">已完成</div>-->
                            </div>
                        </div>
                    </div>
                </div>
            </cube-scroll>
        </div>
        <mallElasticFrame v-if="showSlot" :number="number" @isDisplay="isDisplay"></mallElasticFrame>

    </div>
</template>

<script>
import mallHeader from '@/components/mall-header/mall-header'
import SupportIco from '@/components/support-ico/support-ico'
import mallElasticFrame from '@/components/mall-elasticFrame/mall-elasticFrame'

export default {
    data () {
        return {
            options: {},
            number: 30,
            showSlot:false
        }
    },
    mounted () {

    },
    methods: {
        isDisplay (val) {
            this.showSlot = val
        },
        redirect(routeName, type) {
            switch (type) {
                default:
                    //默认块
                    this.$router.push({ path: `/${routeName}` });
            }
        }
    },
    components: {
        mallHeader,
        SupportIco,
        mallElasticFrame,
    }
}
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/mixin'

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

    .my-title
        position relative
        height 207px

        p
            padding-top 180px
            font-size 34px

        .my-title-img
            position absolute
            height 415px
            left 50%
            margin-left -207px
            bottom 0
            width 415px
            background url('~@/assets/img/my/success@2x.png') no-repeat center
            background-size 100% 100%
            z-index 99999999999

    .my-content
        text-align center
        color #ee3147

    .text
        font-size 24px

    .my-header-content
        width 100%
        height 378px
        background url('~@/assets/img/my/signIn@2x.png') no-repeat center
        background-size 100% 100%

        .userinfo-content
            padding 120px 46px 0 48px

            .avatar
                img
                    display block
                    width 120px
                    height 119px
                    margin-right 20px

                span
                    font-size 30px
                    color #fff

                a
                    color #FFFFFF

            .sign-box
                width 188px
                height 58px
                background-color: #ffead1;
                border-radius 29px

                img
                    display block
                    width 30px
                    margin-right 10px

                span
                    font-size 26px
                    color #EE3147

    .signIn
        padding 0 30px
        box-sizing border-box
        text-align left

        .Check-in
            font-size 34px
            margin-top 40px

            span
                color #ee313a

        .explain
            margin-top 20px
            font-size 22px

        .days
            padding 20px 0 40px

            p
                text-align center
                margin-top 20px
                opacity 0.4

            .numberBg
                width 73px
                height 77px
                background url('~@/assets/img/my/numberBg@2x.png') no-repeat center
                background-size 100% 100%
                position relative!important

                span
                    position absolute
                    top 45%
                    left 16%
                    color #ed7a12

            .iSnumberBg
                margin-top 11px
                width 65px
                height 64px
                line-height 64px
                text-align center
                border-radius 32px
                background-color #ffd76b
                color #ed7a12
                opacity 0.4

                span
                    display inline-block
                    width 65px
                    height 64px
                    line-height 64px

            .opacity1
                opacity 1
                color #ed7a12

    .earnPoints
        padding 30px
        box-sizing border-box

        .bd
            width 100%
            height 1px
            background-color: #ededed;
            margin 30px 0

        .integral
            font-size 34px
            font-weight bold
            margin-bottom 54px

            > span:last-child
                color #8f8f8f
                font-size 24px

        .title
            text-align left
            font-size 28px
            margin-bottom 28px

        .earnPoints-main
            padding 30px
            box-sizing border-box
            box-shadow 1px 0px 0px 4px #f7f9fc
            border-radius 8px

            .tasks
                margin-bottom 60px

                .info
                    margin-left 20px
                    font-size 28px
                    text-align left

                    p:last-child
                        font-size 18px
                        color #8f8f8f
                        padding-top 10px
                        box-sizing border-box

                .number
                    color: #ee313a
                    font-size 18px
                    margin-right 36px
                &:last-child
                    margin-bottom 0

            .toFinish, .Finish
                width 112px
                height 54px
                line-height 54px
                border-radius 4px
                color: #fff
                background-color #ee313a

            .Finish
                background-color #dedede

            .margin0
                margin 0
</style>

