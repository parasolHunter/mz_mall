<template>
    <div class="score">
        <div v-for="(itemClass,index) in itemClasses" @click="stars(index)"
             :class="itemClass" track-by="index"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            score: 0
        }
    },
    filters: {},
    watch: {},
    computed: { //计算属性
        itemClasses () {
            let result = [] // 返回的是一个数组,用来遍历输出星星
            let score = Math.floor(this.score * 2) / 2 // 计算所有星星的数量
            let hasDecimal = score % 1 !== 0 // 非整数星星判断
            let integer = Math.floor(score) // 整数星星判断
            for (let i = 0; i < integer; i++) { // 整数星星使用on
                result.push('on') // 一个整数星星就push一个CLS_ON到数组
            }
            while (result.length < 5) {// 余下的用无星星补全,使用off
                result.push('off')
            }
            return result
        }
    },
    created () {
    },

    mounted () {
    },
    methods: {
        stars: function (index) {
            this.score = index + 1
            this.$emit('score',this.score)
        }
    },
    components: {}

}
</script>

<style lang="stylus" scoped>
    .score
         display flex
    .off
        width 34px
        height 34px
        background url("./on.png") no-repeat center;
        background-size 100% 100%
        margin-right 20px
    .on
        width 34px
        height 34px
        background url("./off.png") no-repeat center;
        background-size 100% 100%
        margin-right 20px
</style>
