<template>
    <div class="recharge-main">
        <mall-header :type="'other'" :bgClass="'bg-white'" title="充值"></mall-header>
        <div class="recharge_contain">
            <div class="recharge_item">
                <div class="input-desc">充值金额</div>
                <cube-checker v-model="checkerList" :options="options" type="radio">
                    <cube-checker-item :class="{ 'cube-checker-item_active': item.value == checkerList[index] }" v-for="item,index in options" :key="item.value" :option="item">
                        <span>{{ item.text }}</span>
                    </cube-checker-item>
                </cube-checker>
            </div>
            <cube-button :primary="lockStatus" :disabled="!lockStatus">确认支付 &yen; 15</cube-button>
        </div>
    </div>
</template>

<script>
import mallHeader from '@/components/mall-header/mall-header';
export default {
    created() {},
    data() {
        return {
            checkerList: [15],
            options: [
                {
                    value: 15,
                    text: '15元'
                },
                {
                    value: 50,
                    text: '50元'
                },
                {
                    value: 100,
                    text: '100元'
                },
                {
                    value: 200,
                    text: '200元'
                },
                {
                    value: 500,
                    text: '500元'
                },
                {
                    value: 1000,
                    text: '1000元'
                }
            ],
            lockStatus: true
        };
    },
    watch: {
        amt(newV) {
            if (newV.length > 8) {
                newV = newV.slice(0, 8);
                this.$nextTick(() => {
                    this.amt = newV;
                });
            }
        }
    },
    mounted() {
    },
    methods: {},
    components: {
        mallHeader
    }
};
</script>

<style lang="stylus" scoped>
// btn
>>>.cube-btn_disabled
    background #ffaeb7
    // &::after
    // border-radius 44PX
>>>.cube-btn-primary
    background-color #EE313A
    // -webkit-border-radius 44px
>>>.cube-btn-outline
    color #ff6869
>>>.cube-btn
    padding 30px 0
    position absolute
    bottom 0
// checker
>>>.cube-checker-item_active
    color #fff !important
    background #EE313A !important
    position relative
    >>>&::after
        border 1PX solid #EE313A !important
>>>.cube-checker
    display -webkit-box
    display -ms-flexbox
    display -webkit-flex
    display flex
    -webkit-box-pack center
    -ms-flex-pack center
    -webkit-box-align center
    -ms-flex-align center
    -webkit-align-items center
    align-items center
    -webkit-justify-content space-around
    justify-content space-around
    -webkit-flex-wrap wrap
    -webkit-box-lines multiple
    -moz-flex-wrap wrap
    flex-wrap wrap
>>>.cube-checker-item
    width 199px
    height 110px
    line-height 110px
    padding 0
    margin-top 20px
    color #8f8f8f
    font-size 34px
    border 1PX solid #ebebeb
    margin-right 0
// 自定义样式
.paddingt_80
    padding-top 80px !important
.color_red
    color #ee313a
.recharge-main
    background-color #FFFFFF
    height 100%
    .recharge_contain
        .recharge_item
            text-align left
            background #FFFFFF
            padding 0 40px
            .input-desc
                padding 40px 0 46px
                font-size 34px
</style>
