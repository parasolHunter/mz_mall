<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'other'" :title="'收货地址'" :bgClass="'bg-white'"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="addressList" :options="options"
                         @pulling-up="onPullingUp">
                <div class="address" v-for="item,index in addressList" :key="index">
                    <div class="address_info flex justifyBetween"><p>{{item.name}}</p>
                        <p>{{item.phone}}</p></div>
                    <div class="text">
                        {{item.info}}
                    </div>
                    <div class="flex justifyBetween modify">
                        <div class="default flex" @click="">
                            <support-ico :size="24" :type="item.check?'addressChoice':'addressNoChoice'"></support-ico>
                            <p class='ml16'>默认地址</p>
                        </div>
                        <div class="delete_edit flex justifyBetween">
                            <div class="edit flex"  @click="redirect('aeAddress/editAddress')">
                                <support-ico :size="22" :type="'addressEdit'"></support-ico>
                                <p >编辑</p>
                            </div>
                            <div class="Delete flex" @click="Delete">
                                <support-ico :size="23" :type="'addressDelete'"></support-ico>
                                <p>删除</p>
                            </div>
                        </div>
                    </div>
                </div>
            </cube-scroll>
        </div>
        <div class="submit" @click="redirect('aeAddress/addAddress')"> 新增地址</div>
    </div>
</template>

<script>
import { getAddress } from '@/api'
import mallHeader from '@/components/mall-header/mall-header'
import SupportIco from '@/components/support-ico/support-ico'

export default {
    data () {
        return {
            content: [],
            index: 0,
            swiperIndex: 0,
            loadStatus: false,
            options: {
                pullDownRefresh: {
                    threshold: 60,
                    txt: this.$i18n.t('message.hello')
                },
                pullUpLoad: true
            },
            addressList:[],
            secondStop: 26
        }
    },
    mounted () {
        this.getAddress()
        console.log(this.$i18n.t('message.hello'))
        setTimeout(() => {
            this.loadStatus = false

        }, 1000)
    },
    methods: {
        async getAddress () {
            let res = await getAddress()
            this.addressList = res.data
        },

        onPullingDown () {
            setTimeout(() => {
                this.addressList.unshift(this.addressList)
                this.$refs.contentScroll.forceUpdate()
            }, 1000)
        },
        onPullingUp () {
            setTimeout(() => {
                this.addressList = this.addressList.concat(this.addressList)
            }, 1000)
        },
        onImgLoad () {
            const contentScroll = this.$refs.contentScroll
            contentScroll.scroll.beforePullDown && contentScroll.refresh()
        },
        Delete () {

        },
        edit () {

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
        SupportIco
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
            bottom 100px
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

    .address
        margin-top 10px
        padding 30px 30px 0
        box-sizing border-box
        background-color #ffffff

        .address_info
            font-size 28px

        .text
            text-align left
            color #8f8f8f
            font-size 24px
            line-height 150%
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 2
            -webkit-box-orient vertical
            margin 24px 0 22px

        .modify
            height 82px
        .ml16
            margin-left 16px

        .edit p, .Delete p
            margin-left 20px

        .Delete
            margin-left 66px
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
    .success-enter-active, .success-leave-active
        transition width 0.5s

    .success-enter, .success-leave-to
        width 70%

    .success-enter-to, .success-leave
        width 100%
</style>
