<template>
    <div class="address-main ">
        <mall-header :type="'other'" :bgClass="'bg-white'" :title="addressType == 'addAddress' ? '添加收货地址' : '修改收货地址'"></mall-header>
        <div  class="mall-scroll-list-wrap content-scroll-list-wrap" ref="scrollWrapper">
                <div class="address_contain">
                    <div class="address_item flex">
                        <span>收货人</span>
                        <cube-input
                            v-model="name"
                            :placeholder="addressType == 'addAddress' ? '请填写姓名' : '请填写姓名'"
                            type="text"
                        ></cube-input>
                    </div>
                    <div class="address_item flex">
                        <span>联系电话</span>
                        <cube-input
                            v-model="phone"
                            :placeholder="addressType == 'addAddress' ? '请填写联系电话' : '请填写联系电话'"
                            type="text"
                        ></cube-input>
                    </div>
                    <div class="address_item flex">
                        <span @click="showAddressPicker">收货人</span>
                        <div @click="showAddressPicker" class="flex">
                            <input type="text" placeholder="请选择省、市、区" v-model="addressName" disabled="disabled">
                            <img src="@/assets/img/my/enter@2x.png" alt="">
                        </div>
                    </div>
                    <cube-textarea
                        v-model="textarea"
                        :placeholder="placeholder"
                        :maxlength="maxlength"
                        :autofocus="false"
                    ></cube-textarea>
                    <div class="address_default flex justifyBetween">
                        <span>设为默认地址</span>
                        <cube-switch v-model="open"></cube-switch>
                    </div>
                </div>
        </div>
        <div class="submit">保存</div>
    </div>
</template>

<script>
import mallHeader from '@/components/mall-header/mall-header'
import { provinceList, cityList, areaList } from '@/common/plugins/area.js'
import SupportIco from '@/components/support-ico/support-ico'

const addressData = provinceList
addressData.forEach(province => {
    province.children = cityList[province.value]
    province.children.forEach(city => {
        city.children = areaList[city.value]
    })
})
export default {
    created () {
    },
    data () {
        return {
            name: '',
            phone: '',
            addressName: '',
            textarea: '',
            placeholder: '请填写详细地址(街道、楼牌号等)',
            maxlength: 100,
            open: false,
        }
    },
    watch: {

    },
    mounted () {
        this.addressPicker = this.$createCascadePicker({
            title: '地址',
            data: addressData,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
        })
    },
    methods: {
        showAddressPicker () {
            this.addressPicker.show()
        },
        selectHandle (selectedVal, selectedIndex, selectedText) {
            this.addressName = selectedText
        },
    },
    computed:{
        addressType(){
            return  this.$route.params.addressType
        }
    },
    components: {
        mallHeader,
        SupportIco
    }
}
</script>

<style lang="stylus" scoped>
    >>> .cube-input, >>> .cube-input_active, input
        background none
        outline none
        border-bottom 1px solid #ebebeb

        &::-webkit-input-placeholder
            color #8f8f8f

        &::after
            border-color: transparent

    .color_red
        color #ee313a

    .address-main
        .address_contain
            margin-top 10px
            .address_item
                padding-left 30px
                background #FFFFFF
                height 88px

                span
                    display inline-block
                    width 120px
                    height 100%
                    line-height 88px
                    text-align left
                    border-bottom 1px solid #ebebeb
                    font-size 30px

                >>> .cube-input, >>> .cube-input-field
                    flex 1
                    height 100%
                    font-size 30px

                >>> .cube-input-field
                    padding-left 90px

                > div
                    flex 1
                    height 100%
                    border-bottom 1px solid #ebebeb
                    box-sizing border-box

                    input
                        height 100%
                        width 100%
                        text-align right

                    img
                        display block
                        width 17px
                        height 28px
                        margin 0 20px

            >>> .cube-textarea, >>> .cube-textarea-wrapper
                height 180px
                border none
                outline 0

            >>> .cube-textarea
                padding-left 30px

            .address_default
                height 88px
                line-height 88px
                padding 0 30px
                background-color #fff
                margin-top 10px
                font-size 30px
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
