<template>
    <div>
        <div v-if="type == 1" class="noData margint_80">
            <img src="./../../views/my/wallet/noData@2x.png" alt="" />
            <span>{{ text }}</span>
        </div>
        <div v-if="type == 2" class="noData margint_200">
            <img class="no_logistics" src="@/assets/img/no_logistics.png" alt="" />
            <span>{{ text }}</span>
        </div>
        <div v-else class="noData">
            <img src="./../../views/my/wallet/noData@2x.png" alt="" />
            <span>{{ text }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'noData',
    props: {
        type: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: '暂无明细~'
        }
    },
    computed: {}
};
</script>

<style lang="stylus" scoped>
.margint_80
    margin-top 80px !important
.margint_200
    margin-top 200px !important
.margint_240
    margin-top 240px !important
.noData
    margin-top 330px
    img
        display block
        width 170px
        margin 0 auto 50px
        &.no_logistics
            width 448px
            margin 0 auto 30px
    span
        display block
        font-size 30px
        color #8F8F8F
</style>
