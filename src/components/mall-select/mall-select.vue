<template>
    <div class="pay-wrapper-container">
        <div class="pay-wrapper-title">
            <i @click="closeMask" class="cubeic-close"></i>
            <span>{{ title }}</span>
        </div>
        <div class="pay-wrapper-content">
            <cube-radio-group>
                <cube-radio v-for="(option, index) in mall_options" :key="index" position="right" :hollow-style="true" :option="option" v-model="mall_selected">
                    <div class="optionInfo flex" @click.stop="changeHanddle(index)">
                        <em>{{ option.label }}</em>
                        <span class="balance">{{ option.balance ? '&yen;' + option.balance : '' }}</span>
                    </div>
                </cube-radio>
            </cube-radio-group>
        </div>
        <div class="pay-btn" @click="confirm">确定</div>
    </div>
</template>

<script>
export default {
    name: 'mallSelect',
    props: {
        title: {
            type: String,
            default: ''
        },
        mall_selected_defined: {
            type: String,
            default: ''
        },
        mall_options: {
            type: Array,
            default: ''
        },
        selectType: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            mall_selected: this.mall_selected_defined ? this.mall_selected_defined : '1',
            text_selected: this.mall_options ? this.mall_options[0].label : ''
        };
    },
    methods: {
        closeMask() {
            this.$emit('showPicker');
        },
        changeHanddle(index) {
            this.text_selected = this.mall_options[index].label;
            console.log('current_label', this.text_selected);
        },
        confirm() {
            this.closeMask();
            this.$emit('endHanddle', this.mall_selected, this.text_selected, this.selectType);
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.pay-wrapper-container
    height 788px
    padding 0 30px
    overflow hidden
    position relative
    .pay-wrapper-title
        width 100%
        height 88px
        line-height 88px
        font-size 30px
        position relative
        border-bottom 1px solid #ebebeb
        i
            position absolute
            top 0
            left 0
            font-size 46px
            color #8f8f8f
    .pay-wrapper-content
        >>>.border-top-1px::before
            border-top none
        >>>.cube-radio-wrap
            padding 0 0
        >>>.cube-radio
            padding 0
            .optionInfo
                width 100%
                padding 30px 0
                position relative
                z-index 9
            &:first-child>label
                -webkit-justify-content space-between
            &:last-child .border-bottom-1px::after
                border-bottom none
            .cube-radio-ui
                margin-right 16px
                &::before
                    color #8f8f8f
                    border-radius 50%
                    transform scale(1.8)
        >>>.cube-radio-hollow.cube-radio_selected .cube-radio-ui
            background-color #ee3147
            &::before
                background transparent
                transform scale(1.8)
                color transparent
            i
                color #EE3147
                font-style normal
                transform scale(2)
                -webkit-transition all 0.2s
                transition all 0.2s
                &:before
                    content '\E617'
                    position absolute
                    top 0
                    left 0
                    width auto
                    height auto
                    border-color #EE3147
                    background-color #FFFFFF
                    transform none
                    @media (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)
                        transform scale(1.18)
        em
            font-style normal
            font-size 26px
    .pay-btn
        position absolute
        bottom 0
        left 0
        width 100%
        height 88px
        line-height 88px
        color #FFFFFF
        font-size 26px
        font-weight bold
        background #ee3147
</style>
