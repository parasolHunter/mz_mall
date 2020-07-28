<template>
    <div class="app-footer">
        <cube-tab-bar v-model="selectedLabelDefault" :value="selectedLabelDefault" :data="tabs" @click="clickHandler" @change="changeHandler"></cube-tab-bar>
    </div>
</template>

<script>
import { Locale } from 'cube-ui'
export default {
    mixins: [Locale.localeMixin],
    name: 'v-footer',
    data () {
        return {
            selectedLabelDefault: 'home',
            tabs: [
                {
                    label: '首页',
                    value: 'home',
                    icon: 'iconfont icon-shouye'
                },
                {
                    label: '分类',
                    value: 'itemize',
                    icon: 'iconfont icon-shouye'
                },
                {
                    label: '购物车',
                    value: 'shopping',
                    icon: 'iconfont icon-shouye'
                },
                {
                    label: '个人',
                    value: 'my',
                    icon: 'iconfont icon-shouye'
                }
            ]
        }
    },
    methods: {
        clickHandler (val) {
            this.$router.push({ path: `/${val}` })
        },
        changeHandler (label) {
            // if you clicked different tab, this methods can be emitted
        }
    },
    watch: {
        $route (to, from) {
            console.log(to)
            this.selectedLabelDefault = to.name
            console.log(this.selectedLabelDefault)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.app-footer
    position fixed
    left 0
    right 0
    bottom 0
    height 100px
    font-size 12px
    border-top 1px solid #ededed
    background #fff
    >>>.cube-tab
        >i
            font-size 40px
        >div
            margin-top 10px
</style>
