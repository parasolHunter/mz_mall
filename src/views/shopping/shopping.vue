<template>
    <div class="mall-scroll-wrapper content-scroll-wrapper">
        <mall-header :type="'noback'" :title="'购物车'" :bgClass="'bg-red'">
            <i class="text" style="font-size: 16px" @click="isDelete=!isDelete">{{isDelete?'完成':' 编辑'}}</i>
        </mall-header>
        <cube-loading v-if="loadStatus" :size="40" class="once-load"></cube-loading>
        <div v-else class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll ref="contentScroll" :data="GoodsList" :options="options" @pulling-down="onPullingDown"
                         @pulling-up="onPullingUp">
                <div v-if="!GoodsList.length">
                    <div class="nodata">
                        <img src="./nodata.png" alt="">
                        <p>购物车还是空的，去商城逛逛吧></p>
                    </div>
                    <div class="recommend">
                        <p class="flex-c-s"><i class="heart"></i>为你推荐</p>
                        <div class="list" v-if=" recommendList[0] && recommendList[0].foods.length>0">
                            <div  v-for="(item, index) in recommendList[0].foods" :key="index">
                                <img :src="item.image" alt="">
                                <p class="info">{{item.info}}</p>
                                <p><span class="money"><i>¥</i>{{item.price}}<i>.00</i></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="order pdall" v-for="(item, index) in GoodsList" :key="index">
                    <div class="flex-c-s mb-32">
                        <i :class="item.checked?'choice':'nochoice'" @change="_checkAll(item, index)"></i>
                        <input type="checkbox" v-model="item.checked" @change="_checkAll(item, index)">
                        <p class="title">
                            <support-ico :size="14" :type="'store'"></support-ico>
                            {{item.name}}</p>
                    </div>
                    <div class="orderInfo flex-c-spaceb" v-for="(subitem, subindex) in item.foods" :key="subindex">
                        <div class="flex-c-spaceb">
                            <i :class="subitem.checked?'choice':'nochoice'"></i>
                            <input type="checkbox" v-model="subitem.checked" @change="handleCheck()">
                            <img :src="subitem.image" alt="">
                        </div>
                        <div class="explain">
                            <p class="title">
                                {{subitem.info}}</p>
                            <div>
                                <div class="colorSize">红色,8GB+128GB</div>
                                <div class="flex-c-spaceb">
                                    <p><span class="money"><i>¥</i>{{subitem.price}}</span>
                                        <span v-if="subitem.oldPrice"
                                              class="originalPrice">¥{{subitem.oldPrice}}</span>
                                    </p>
                                    <div class="flex-c-s">
                                        <div class="sub" @click="subitem.sellCount--">-</div>
                                        <div class="number">{{subitem.sellCount}}</div>
                                        <div class="add" @click="subitem.sellCount++">+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </cube-scroll>
            <div v-if="GoodsList.length && !isDelete" class="submitShopping">
                <div class="all">
                    <i :class="checkedAll?'choice':'nochoice'" style="margin-right: 10px"></i>
                    <input type="checkbox" v-model="checkedAll" @change="checkAll">
                    <span>全选</span></div>
                <div class="price">
                    <p><span>合计:</span><span class="money"><i>¥</i>{{getTotal.totalPrice}}<i>.00</i></span></p>
                    <div class="submit">去结算({{getTotal.totalNum}})</div>
                </div>
            </div>
            <div v-if="GoodsList.length && isDelete" class="submitShopping">
                <div class="all">
                    <i :class="checkedAll?'choice':'nochoice'" style="margin-right: 10px"></i>
                    <input type="checkbox" v-model="checkedAll" @change="checkAll">
                    <span>全选</span>
                </div>
                <div class="delete">
                    <div class="submit"  @click="showClose">删除</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api'
import mallHeader from '@/components/mall-header/mall-header'
import SupportIco from '@/components/support-ico/support-ico'


let cnt = 1
export default {
    name: 'shopping',
    data () {
        return {
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
            secondStop: 26,
            GoodsList: [],
            recommendList: [],
            checkedAll: false, //控制是否全选
            checked: [],
            totalPrice: 0,
            totalNum: 0,
            isDelete: false
        }
    },
    computed: {
        //获取总价和产品总件数
        getTotal: function () {
            //获取productList中select为true的数据。
            var _proList = []
            this.totalPrice = 0
            this.totalNum = 0
            this.GoodsList.forEach(item => {
                item.foods.forEach(citem => {
                    if (citem.checked) {
                        _proList.push(citem)
                    }
                })
            })
            _proList.forEach(item => {
                this.totalPrice += parseInt(item.price) * parseInt(item.sellCount)
                this.totalNum += parseInt(item.sellCount)
            })
            return { totalNum: this.totalNum, totalPrice: this.totalPrice }
        }
    },
    mounted () {
        this.getHome()
        console.log(this.$i18n.t('message.hello'))
        setTimeout(() => {
            this.loadStatus = false
        }, 1000)

    },
    methods: {
        async getHome () {
            let res = await getGoods()
            this.GoodsList = res.data
            this.recommendList = res.data
            if (!this.GoodsList) return false
            this.GoodsList.forEach(item => {
                this.$set(item, 'checked', false)
                if (item.foods) {
                    item.foods.forEach((citem) => {
                        this.$set(citem, 'checked', false)
                    })
                }
            })
        },
        edit (val) {
            // if (this.GoodsList) {
                this.isDelete = val
            // } else {
                // this.isDelete = false
            // }
        },
        showClose () {
            this.dialog = this.$createDialog({
                type: 'confirm',
                title: '删除商品',
                confirmBtn: {
                    text: '确定',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                },
                cancelBtn: {
                    text: '取消',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                },
                onConfirm: () => {
                    this.GoodsList = []
                },
                onCancel: () => {

                }
            }).show()
        },
        onPullingDown () {
            setTimeout(() => {
                this.GoodsList = this.GoodsList
                this.$refs.contentScroll.forceUpdate()
            }, 1000)
        },
        onPullingUp () {
            setTimeout(() => {
                this.GoodsList = this.GoodsList.concat(this.GoodsList)
            }, 1000)
        },
        onImgLoad () {
            const contentScroll = this.$refs.contentScroll
            contentScroll.scroll.beforePullDown && contentScroll.refresh()
        },
        checkAll () {
            this.totalPrice = 0
            this.totalNum = 0
            this.checked = []
            if (!this.GoodsList) this.checkedAll = false
            this.GoodsList.forEach(item => {
                item.checked = this.checkedAll
                if (item.foods) {
                    item.foods.forEach(citem => {
                        citem.checked = this.checkedAll
                        if (this.checkedAll) {
                            this.totalPrice += parseInt(citem.price) * parseInt(citem.sellCount)
                            this.totalNum += parseInt(citem.sellCount)
                            this.checked.push(citem.id)
                        }
                    })
                }
            })
        },
        //商家全选
        _checkAll (val, index) {
            val.foods.forEach(item => {
                item.checked = val.checked
            })
            if (this.GoodsList.every(item => item.checked)) {
                this.checkedAll = true
                this.price = 0
                this.count = 0
                this.checked = []
            } else {
                this.checkedAll = false
            }

        },
        //商品选择框
        handleCheck () {
            var check = []
            this.GoodsList.forEach((items, index) => {
                if (items.foods ) {
                    var bool = items.foods.every(citem => citem.checked)    //every 每一项返回为true结果为true
                    if (bool) {
                        items.checked = true
                    } else {
                        items.checked = false
                    }
                    check.push(bool)
                }
            })
        },
    },
    components: {
        mallHeader,
        SupportIco
    }
}
</script>


<style lang="stylus" scoped>
    i
        font-style normal

    input
        position absolute
        width 38px
        height 38px
        left 30px
        opacity: 0;
        border-radius 14px
        background-color transparent

    .pdall
        padding 56px 30px

    .flex-c-s
        display flex
        align-items center
        justify-content flex-start

    .flex-c-spaceb
        display flex
        align-items center
        justify-content space-between

    .mb-32
        margin-bottom 32px

    .choice, .nochoice
        display inline-block
        width 38px
        height 38px
        background url("choice.png") no-repeat center
        background-size 100% 100%

    .nochoice
        background url("nochoice.png") no-repeat center
        background-size 100% 100%

    .heart
        display inline-block
        width 33px
        height 33px
        background url("heart.png") no-repeat center
        background-size 100% 100%
        margin-right 10px

    .nodata
        display inline-block
        width 100%
        height 460px
        background-color: #fff;

        img
            width 282px
            height 220px
            padding 60px 0

        p
            color: #8f8f8f
            font-size 28px


    .recommend
        padding 20px

        .list
            display flex
            justify-content space-between
            flex-wrap wrap
            margin-top 20px

            div
                width 350px
                text-align left
                background-color: #fff;
                border-radius 8px
                padding-bottom 20px
                box-sizing border-box
                margin-bottom 10px

                img
                    border-radius 8px 8px 0 0
                    display block
                    height 350px
                    width 100%

                p
                    padding 0 10px
                    box-sizing border-box
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical
                    line-height 140%

                .info
                    font-size 28px
                    margin 10px 0 20px 0

                .money
                    color #ee3147
                    font-size 36px
                    font-weight bold

                    > i
                        font-weight bold
                        margin 2px

    .store
        display inline-block
        width 29px
        height 25px
        background url("./store.png") no-repeat center
        background-size 100% 100%
        margin-right 20px

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

    .order
        background-color white
        margin-top 20px

        .explain
            width 100%
            height 200px
            text-align left
            display flex
            flex-direction column
            justify-content space-between

            > .title
                margin 0
                line-height 140%
                width 100%
                overflow hidden
                text-overflow ellipsis
                display -webkit-box
                -webkit-line-clamp 2
                -webkit-box-orient vertical

            .sub, .add, .number
                width 40px
                height 40px
                line-height 40px
                text-align center
                background-color #f8f8f8

            .number
                margin 0 4px

            .colorSize
                display inline-block
                border-radius 19px
                background-color #f8f8f8
                padding 8px 20px
                box-sizing border-box
                margin-bottom 30px
                color #8f8f8f

            .originalPrice
                margin-left 10px
                text-decoration line-through
                color #8f8f8f

            .money
                color #ee3147
                font-size 36px
                font-weight bold

                > i
                    font-size 24px
                    font-weight bold
                    margin 2px

    .title
        margin-left 36px
        font-size 26px
        color #1d1d1d

    .orderInfo
        margin-bottom 38px

        img
            width 200px
            height 200px
            border-radius 10px
            margin-left 36px
            margin-right 28px

    .submitShopping
        height 100px
        width 100%
        z-index 23
        background-color: #fff
        display flex
        align-items center
        justify-content space-between
        padding 0 20px 0 48px
        box-sizing border-box
        position fixed
        left 0
        bottom 100px

    .all
        font-size 22px
        display flex
        align-items center

    .price
        display flex
        align-items center
        justify-content space-between

        > p
            color #1d1d1d

        .money
            margin-left 10px
            color #ee3147
            font-size 36px
            font-weight bold

            > i
                font-weight bold
                margin 2px

        .submit
            padding 0 40px
            height 76px
            line-height 76px
            text-align center
            background-color: #ee3147;
            font-size 28px
            border-radius 38px
            color #fff
            margin-left 48px

    .delete
        width 206px
        height 76px
        line-height 76px
        text-align center
        background-color: #ee3147;
        font-size 28px
        border-radius 38px
        color #fff
        margin-left 48px
    .success-enter-active, .success-leave-active
        transition width 0.5s

    .success-enter, .success-leave-to
        width 70%

    .success-enter-to, .success-leave
        width 100%
</style>
