<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'clickSearch'" :bgClass="'bg-red'"></mall-header>
        <div class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll">
                <div class="search-content">
                    <div class="search-content-part-1">
                        <div class="search-title">
                            <div class="text">历史搜索</div>
                            <support-ico :size="9" :type="8"></support-ico>
                        </div>
                        <div class="search-items">
                            <div v-for="(item, index) in goods" :key="index" class="search-item">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="search-content-part-2">
                        <div class="search-title">
                            <div class="text">热门搜索</div>
                        </div>
                        <div class="search-items">
                            <div v-for="(item, index) in goods" :key="index" class="search-item">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api'
import mallHeader from '@/components/mall-header/mall-header'
import SupportIco from '@/components/support-ico/support-ico'
export default {
    name: 'brands',
    data () {
        return {
            loadStatus: true,
            items: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png',
            goods: []
        }
    },
    mounted () {
        // 获取默认的分类数据
        this.getGoods()
        console.log(this.$i18n.t('message.hello'))
        setTimeout(() => {
            this.loadStatus = false
        }, 1000)
    },
    methods: {
        // 获取分类
        async getGoods () {
            let res = await getGoods()
            this.goods = res.data
        },
    },
    components: {
        mallHeader,
        SupportIco
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
        background #FFFFFF
        .search-content
            padding 0 30px
            .search-content-part-1
                padding 35px 0 25px
                border-bottom 1px solid #ededed
                .search-title
                    display flex
                    align-items center
                    justify-content space-between
                    padding 5px 0
                    .text
                        font-size 28px
                        font-weight bold
                .search-items
                    display flex
                    align-items center
                    flex-flow wrap
                    .search-item
                        margin 15px 30px 15px 0
                        padding 15px 30px
                        background #F7F7F7
                        border-radius 30px
                        text-align center
                        color #1D1D1D
                        font-size 26px
            .search-content-part-2
                padding 35px 0 25px
                .search-title
                    display flex
                    align-items center
                    justify-content space-between
                    padding 5px 0 30px
                    .text
                        font-size 28px
                        font-weight bold
                .search-items
                    display flex
                    align-items center
                    justify-content space-between
                    flex-flow wrap
                    .search-item
                        width 50%
                        margin 30px 0
                        color #1D1D1D
                        text-align left
    >>>.once-load
        position absolute
        left 50%
        >span
            margin auto
            transform translate(-50%, 100%)
.success-enter-active, .success-leave-active
    transition width 0.5s
.success-enter, .success-leave-to
    width 70%
.success-enter-to, .success-leave
    width 100%
</style>
