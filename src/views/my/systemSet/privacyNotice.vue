<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'other'" :title="'隐私声明'" :bgClass="'bg-white'"></mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :options="options">

            </cube-scroll>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api'
import mallHeader from '@/components/mall-header/mall-header'
export default {
    data () {
        return {
            loadStatus: false,
            options: {

            },
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

    },
    components: {
        mallHeader
    }
}
</script>

<style lang="stylus" scoped>
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
</style>
