<template>
    <div class="Invitation">
        <div class="mall-scroll-wrapper content-scroll-wrapper">
            <div class="mall-header">
                <div class="other-header">
                    <h1>邀请有礼</h1>
                    <i @click="back" class="cubeic-back"></i>
                    <i class="text" @click="redirect('myInvitation')">我的邀请</i>
                </div>
            </div>
            <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
            <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
                <cube-scroll ref="contentScroll" :options="options">
                    <div class="Invitation-main">
                        <div class="Invitation-bg">
                            <img src="@/assets/img/my/InvitationBg.png" alt="">
                            <div class="Invitation-text-qr">
                                <div class="Invitation-text">
                                    <p>彩色的云邀请你加入MZ综合购物社交生活平台</p>
                                </div>
                                <div class="Invitation-qr">
                                    <img src="@/assets/img/my/InvitationBg.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="Invitation-Img">
                            <cube-upload
                                ref="upload"
                                v-model="files"
                                :max="max"
                                :action="action"
                                :simultaneous-uploads="1"
                                :process-file="processFile"
                                @file-submitted="fileSubmitted">
                                <div class="clear-fix">
                                    <cube-upload-file v-for="(file, i) in files" :file="file"
                                                      :key="i"></cube-upload-file>
                                    <cube-upload-btn :multiple="false">
                                        <div class="text"></div>
                                    </cube-upload-btn>
                                </div>
                            </cube-upload>
                        </div>
                        <div class="Invitation-btn" @click="showPicker(1,1)">
                            邀请好友加入
                        </div>
                    </div>
                </cube-scroll>
            </div>
            <mall-popup ref="popupWrapper">
                <div class="share" slot="slot1">
                    <div class="share-to">
                        <i></i>
                        <span>分享到</span>
                        <i></i>
                    </div>
                    <div class="share-type">
                        <div>
                            <img src="@/assets/img/my/wechat.png" alt="">
                            <p>微信</p>
                        </div>
                        <div>
                            <img src="@/assets/img/my/WechatMoments.png" alt="">
                            <p>朋友圈</p>
                        </div>
                        <div>
                            <img src="@/assets/img/my/link.png" alt="">
                            <p>复制链接</p>
                        </div>
                    </div>
                    <div class="share-cancel" @click="showPicker(0)">取消</div>
                </div>
            </mall-popup>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api'
import compress from '@/common/plugins/image'
import mallPopup from '@/components/mall-popup/mall-popup'

export default {
    data () {
        return {
            loadStatus: false,
            options: {},
            action: {
                target: '//jsonplaceholder.typicode.com/photos/',
                prop: 'base64Value'
            },
            max: 3,
            files: [],
        }
    },
    mounted () {
        this.getGoods()
        console.log(this.$i18n.t('message.hello'))
        setTimeout(() => {
            this.loadStatus = false
        }, 1000)
    },
    methods: {
        async getGoods () {
            let res = await getGoods()
        },
        back () {
            this.$router.back()
        },
        processFile (file, next) {
            compress(file, {
                compress: {
                    width: 1600,
                    height: 1600,
                    quality: 0.5
                }
            }, next)
        },
        fileSubmitted (file) {
            file.base64Value = file.file.base64
            console.log(this.files)

        },
        showPicker (val,dis) {
            if (val === 1) {
                this.$refs.popupWrapper.show(dis)
            } else {
                this.$refs.popupWrapper.hide()
            }
        },
        redirect (routeName, type) {
            switch (type) {
                default:
                    //默认块
                    this.$router.push({ path: `/${routeName}` })
            }
        }
    },
    components: {
        mallPopup
    }
}
</script>

<style lang="stylus" scoped>
    >>> .clear-fix
        display flex
        text-align left

    >>> .cube-upload-file, >>> .cube-upload-file_success, >>> .cube-upload-file_error
        display inline-block
        width 160px
        margin-bottom 10px
        margin-right 20px
        border-radius 8px

    >>> .cube-upload-file-state, >>> .cube-upload-file_stat, >>> .cube-upload-file-def
        width 120px
        height 120px

    >>> .cube-upload-btn
        align-self flex-start
        width 120px
        height 120px
        background url('~@/assets/img/InvitationUpload.png') no-repeat center
        background-size 100% 100%

    .Invitation
        width 100%
        height 100%
        background url('~@/assets/img/my/bgImg.png') no-repeat center
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

    .Invitation-main
        padding 60px 80px 0
        -webkit-box-sizing: border-box
        -moz-box-sizing: border-box
        box-sizing: border-box

        .Invitation-bg
            width 100%
            height 834px
            border-radius 8px
            background-color: #fff
            margin-bottom 62px

            img
                display block
                width 100%
                height 706px
                border-radius 8px 8px 0 0;

            .Invitation-text-qr
                display flex
                justify-content space-between
                padding 30px

                .Invitation-text
                    width 60%
                    text-align left
                    line-height 140%
                    font-size 26px

                .Invitation-qr
                    width 74px
                    height 74px

                    img
                        width 100%
                        height 100%

        .Invitation-Img
            display flex

        .Invitation-btn
            width 500px
            height 88px
            line-height 88px
            color #fff
            text-align center
            margin 0 auto
            border-radius 44px
            margin-top 62px
            background linear-gradient(#ff9743, #fbd872);
            font-size 30px

    .share
        height 300px
        padding 30px 80px 10px
        font-size 28px

        .share-to
            display flex
            justify-content center
            align-items center
            margin-bottom 30px

            span
                margin 0 20px

            i
                display inline-block
                width 30px
                height 2px
                background-color: #b6b6b6

        .share-type
            display flex
            justify-content space-between
            align-items center
            border-bottom 1px solid #ededed
            padding-bottom 30px
            margin-bottom 30px

            img
                width 100px
                height 100px
                margin-bottom 20px

    .success-enter-active, .success-leave-active

        transition width 0.5s

    .success-enter, .success-leave-to
        width 70%

    .success-enter-to, .success-leave
        width 100%
</style>
