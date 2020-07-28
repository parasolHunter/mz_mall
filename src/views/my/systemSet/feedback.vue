<template>
    <div class="feedback-main ">
        <mall-header :type="'other'" :bgClass="'bg-white'" :title="'意见反馈'"></mall-header>
        <div class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <div class="feedback_contain">
                <textarea
                    v-model="textarea"
                    :placeholder="placeholder"
                    :maxlength="maxlength"
                    :autofocus="false"
                ></textarea>
                <div class="upload">
                    <div class="bt"></div>
                    <cube-upload
                        ref="upload"
                        v-model="files"
                        :max = "max"
                        :action="action"
                        :simultaneous-uploads="1"
                        :process-file="processFile"
                        @file-submitted="fileSubmitted">
                        <div class="clear-fix">
                            <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"  ></cube-upload-file>
                            <cube-upload-btn :multiple="false">
                                <div class="text">
                                    <p>上传凭证</p>
                                    <p>(最多3张)</p>
                                </div>
                            </cube-upload-btn>
                        </div>
                    </cube-upload>
                </div>
            </div>
        </div>
        <div class="submit">保存</div>
    </div>
</template>

<script>
import mallHeader from '@/components/mall-header/mall-header'
import compress from '@/common/plugins/image'
export default {
    created () {
    },
    data () {
        return {
            name: '',
            phone: '',
            addressName: '',
            textarea: '',
            placeholder: '请输入您的建议或反馈',
            maxlength: 100,
            action: {
                target: '//jsonplaceholder.typicode.com/photos/',
                prop: 'base64Value'
            },
            max: 3,
            files: [],
        }
    },
    watch: {},
    mounted () {

    },
    methods: {
        processFile(file, next) {
            compress(file, {
                compress: {
                    width: 1600,
                    height: 1600,
                    quality: 0.5
                }
            }, next)
        },
        fileSubmitted(file) {
            file.base64Value = file.file.base64
        },
    },
    computed: {},
    components: {
        mallHeader
    }
}
</script>

<style lang="stylus" scoped>
    >>>.clear-fix
         display flex
         text-align left
    >>>.cube-upload-file ,>>>.cube-upload-file_success,>>>.cube-upload-file_error
        display inline-block
        width 160px
        margin-bottom 10px
        margin-right 20px
        border-radius 8px

    >>> .cube-upload-btn
        align-self flex-start
        width 160px
        height 160px
        background url("~@/assets/img/upload.png") no-repeat center 100% / 100%
        .text
            text-align center
            padding-top 90px
            color #b9b9b9
            line-height 110%


    .feedback-main
        .feedback_contain
            margin-top 10px
            padding 30px
            box-sizing border-box
            background-color #fff

            textarea
                width 100%
                height 310px
                outline none
                resize none
                border none
                color #8f8f8f
                font-size 30px
                font-family 'PingFang SC'

            .upload
                .bt
                    width 100%
                    height 2px
                    background-color #d4d4d4
                    margin-bottom 30px

    .submit
        position absolute
        left 0
        bottom 0
        height 100px
        line-height 100px
        width 100%
        color #FFFFFF
        text-align center
        background-color #ee313a
        font-size 36px

    .mall-scroll-wrapper
        .mall-scroll-list-wrap
            width 100%
            position absolute
            top 100px
            left 0
            right 0
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
</style>
