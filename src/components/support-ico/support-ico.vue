<template>
    <span class="support-ico" :class="iconCls"></span>
</template>

<script>
export default {
    name: 'support-ico',
    props: {
        size: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconCls () {
            // const classMap = ['search', 'broadcast', 'scann', 'chat', 'odds', 'shopping', 'live', 'sort', 'delete', 'square', 'rectangle', 'cart', 'red_cart', 'enter']
            return `icon-${this.size} ${this.type}`
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'

.support-ico
    display inline-block
    background-repeat no-repeat
.icon-1
    width 24px
    height 23px
    min-width 24px
    background-size 24px 23px
    &.search
        bg-image('search')
.icon-2
    width 25px
    height 21px
    min-width 25px
    background-size 25px 21px
    &.broadcast
        bg-image('broadcast')
.icon-3
    width 35px
    height 35px
    min-width 35px
    background-size 35px 35px
    &.scann
        bg-image('scann')
.icon-4
    width 37px
    height 37px
    min-width 37px
    background-size 37px 37px
    &.chat
        bg-image('chat')
.icon-5
    width 24px
    height 28px
    min-width 24px
    background-size 24px 28px
    &.odds
        bg-image('odds')
.icon-6
    width 23px
    height 27px
    min-width 23px
    background-size 23px 27px
    &.shopping
        bg-image('shopping')
.icon-7
    width 28px
    height 28px
    min-width 28px
    background-size 28px 28px
    &.live
        bg-image('live')
    &.portrait
        bg-image('portrait')
.icon-8
    width 22px
    height 28px
    min-width 22px
    background-size 22px 28px
    &.sort
        bg-image('sort')
.icon-9
    width 50px
    height 50px
    min-width 50px
    background-size 50px 50px
    &.delete
        bg-image('delete')
.icon-10
    width 32px
    height 33px
    min-width 32px
    background-size 32px 33px
    &.square
        bg-image('square')
.icon-11
    width 32px
    height 33px
    min-width 32px
    background-size 32px 33px
    &.Rectangle
        bg-image('Rectangle')
.icon-12
    width 48px
    height 48px
    min-width 48px
    background-size 48px 48px
    &.cart
        bg-image('cart')
    &.cartccc
        bg-image('cartccc')
.icon-13
    width 78px
    height 78px
    min-width 78px
    background-size 78px 78px
    &.red_cart
        bg-image('red_cart')
.icon-14
    width 29px
    height 25px
    min-width 29px
    background-size 29px 25px
    &.store
        bg-image('store')
.icon-15
    width 34px
    height 34px
    min-width 34px
    background-size 34px 34px
    &.share
        bg-image('share')
.icon-16
    width 40px
    height 8px
    min-width 40px
    background-size 40px 8px
    &.more
        bg-image('more')
.icon-17
    width 41px
    height 36px
    min-width 41px
    background-size 41px 36px
    &.hollow
        bg-image('hollow')
    &.solid
        bg-image('solid')
    &.emptycart
        bg-image('emptycart')
.icon-18
    width 21px
    height 20px
    min-width 21px
    background-size 21px 20px
    &.star
        bg-image('star')
    &.emptystar
        bg-image('emptystar')
.icon-19
    width 17px
    height 28px
    min-width 17px
    background-size 17px 28px
    margin-left 20px
    &.enter
        bg-image('enter')
.icon-20
    width 36px
    height 36px
    min-width 36px
    background-size 36px 36px
    &.choice
        bg-image('choice')
    &.nochoice
        bg-image('nochoice')
.icon-21
    width 69px
    height 69px
    min-width 69px
    background-size 69px 68px
    &.information
        bg-image('information')
    &.community
        bg-image('community')
    &.goodFriend
        bg-image('goodFriend')
    &.evaluate
        bg-image('evaluate')
.icon-22
    width 27px
    height 27px
    min-width 27px
    background-size 27px 27px
    &.addressEdit
        bg-image('address-edit')
.icon-23
    width 23px
    height 28px
    min-width 23px
    background-size 23px 28px
    &.addressDelete
        bg-image('address-delete')
.icon-24
    width 31px
    height 31px
    min-width 31px
    background-size 31px 31px
    &.addressChoice
        bg-image('addressChoice')
    &.addressNoChoice
        bg-image('nochoice')
.icon-25
    width 27px
    height 35px
    min-width 27px
    background-size 27px 35px
    &.position
        bg-image('position')
.icon-26
    width 34px
    height 34px
    min-width 34px
    background-size 34px 34px
    &.goodhollow
        bg-image('goodhollow')
    &.goodsearch
        bg-image('goodsearch')
    &.goodmsg
        bg-image('goodmsg')
    &.goodhome
        bg-image('goodhome')
.icon-27
    width 44px
    height 44px
    min-width 44px
    background-size 44px 44px
    &.address
        bg-image('address')
.icon-28
    width 59px
    height 29px
    min-width 59px
    background-size 59px 29px
    &.defaul
        bg-image('defaul')
.icon-29
    width 100%
    height 4px
    min-width 100%
    background-size 100% 4px
    &.line
        bg-image('line')
.icon-30
    width 26px
    height 26px
    min-width 26px
    background-size 26px 26px
    &.time
        bg-image('time')
.icon-31
    width 27px
    height 27px
    min-width 27px
    background-size 27px 27px
    &.revoke
        bg-image('revoke')
.icon-32
    width 27px
    height 27px
    min-width 27px
    background-size 27px 27px
    &.edit
        bg-image('edit')
</style>
