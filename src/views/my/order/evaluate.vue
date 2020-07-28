<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'other'" :bgClass="'bg-white'" title="评价"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :options="options">
                <div class="pdall">
                    <div class="flex justifyStart evaluate">
                        <img class="evaluate_img" src="http://img1.imgtn.bdimg.com/it/u=2101635011,307975130&fm=26&gp=0.jpg" alt="">
                        <div class="evaluate_info ">
                            评论下你的商品吧评论下你的商品吧评论下你的商品吧评论下你的商品吧评论下你的商品吧评论下你的商品吧评论下你的商品吧评论下你的商品吧
                            评论下你的商品吧评论下你的商品吧评论下你的商品吧评论下你的商品吧评论下你的商品吧评论下你的商品吧评论下你的商品吧评论下
                        </div>
                    </div>
                    <div class="evaluate_score">
                        <div @click="Escore(index)" v-for="item,index  in scoreList" :key="index">
                            <img v-if="scoreActive==index" :src="item.Aurl" alt="">
                            <img v-else :src="item.url" alt="">
                            <span :class="scoreActive==index? 'color_red':''">{{item.name}}</span></div>
                    </div>
                    <div class="evaluate_box margint_20 ">
                        <div class="remark_textArea">
                            <cube-textarea v-model="remark" placeholder="评论下你的商品吧" indicator="indicator"
                                           :maxlength="remarkLength"></cube-textarea>
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
                    </div>
                    <div class="margint_20 ">
                        <div class="evaluate_box ">
                            <div class="evaluate_shop">
                                店铺评分
                            </div>
                        </div>
                        <div class="evaluate_box flex justifyStart">
                            <div class="box_desc">描述相符</div>
                            <div class="box_score flex">
                                <score @score="score3"></score>
                            </div>
                        </div>
                        <div class="evaluate_box flex justifyStart">
                            <div class="box_desc">物流服务</div>
                            <div class="box_score flex">
                                <score @score="score2"></score>
                            </div>
                        </div>
                        <div class="evaluate_box flex justifyStart">
                            <div class="box_desc">服务态度</div>
                            <div class="box_score flex">
                                <score @score="score1"></score>
                            </div>
                        </div>
                    </div>
                </div>
            </cube-scroll>
        </div>
        <!--        <div class="apply-btn" @click="handdle_apply">发表评价</div>-->
        <div class="apply-btn">发表评价</div>
    </div>
</template>

<script>

import mallHeader from '@/components/mall-header/mall-header'
import SupportIco from '@/components/support-ico/support-ico'
import score from './score.vue'


export default {
    name: 'shopping',
    data () {
        return {
            loadStatus: false,
            count: 1,
            remark: '',
            remarkLength: 200,
            indicator: {
                negative: false,
                remain: true
            },
            options: {},
            action: {
                target: '//jsonplaceholder.typicode.com/photos/',
                prop: 'base64Value'
            },
            max: 3,
            files: [],
            service:0,
            logistics:0,
            describe:0,
            serviceNum: [],
            scoreActive: -1,
            scoreList:[{url:require("./good.png"),Aurl:require("./Sgood.png"),name:'好评'},{url:require("./commonly.png"),Aurl:require("./Scommonly.png"),name:'中评'},{url:require("./difference.png"),Aurl:require("./Sdifference.png"),name:'差评'}]
        }
    },
    filters: {},
    watch: {},
    computed: {
    },
    created () {

    },

    mounted () {

    },
    methods: {
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
        },
        Escore(index){
            this.scoreActive=index
        },
        score3(val){
            console.log(val)
        },
        score2(val){
            console.log(val)
        },
        score1(val){
            console.log(val)
        }
    },
    components: {
        mallHeader,
        SupportIco,
        score
    }
}
</script>

<style lang="stylus" scoped>
    .color_red
        color #EE3147

    i, em
        font-style normal

    .margint_20
        margin-top 20px

    .pdall
        padding 20px 0

    .mb-32
        margin-bottom 32px

    .heart
        margin-right 10px

    .store
        margin-right 20px

    .text-left
        text-align left

    .cube-scroll-nav-bar
        border-top 1px solid #EBEBEB

    .mall-scroll-wrapper
        .mall-scroll-list-wrap
            width 100%
            position absolute
            top 100px
            left 0
            right 0
            bottom 100px
            overflow scroll

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
     .evaluate
         padding 30px
         -webkit-box-sizing: border-box
         -moz-box-sizing: border-box
         box-sizing: border-box
         background-color: #fff;
         align-items flex-start
        .evaluate_info
            text-align left
            line-height 120%
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 4
            -webkit-box-orient vertical
        .evaluate_img
            width 120px
            height 120px
            border-radius 8px
            margin-right 18px
    .evaluate_score
         height 100px
         width 100%
         background #FFFFFF
         border-top 1px solid #e5e5e5
         display flex
         align-items center
         justify-content space-around
         div
            display flex
            align-items center
            img
                 width 40px
                 height 40px
                 margin-right 20px
    .evaluate_box
        background #FFFFFF
        padding 30px 30px
        font-size 28px

        .box_score
            margin-left 70px

            .icon-18
                margin-right 30px

        .evaluate_shop
            padding-left 10px
            text-align left
            height 30px
            line-height 30px
            border-radius 2px 0 2px 0
            border-left 4px solid #ff4343
            font-size 30px


    .remark_textArea
        background #FFFFFF
        position relative

        .cube-textarea-wrapper
            width 100%

            &::after
                border none

    .apply-btn
        position absolute
        bottom 0
        left 50%
        transform translateX(-50%)
        width 100%
        height 88px
        line-height 88px
        color #FFFFFF
        font-size 26px
        font-weight bold
        background #ee3147


    >>> .clear-fix
        display flex
        text-align left

    >>> .cube-upload-file, >>> .cube-upload-file_success, >>> .cube-upload-file_error
        display inline-block
        width 120px
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
</style>
