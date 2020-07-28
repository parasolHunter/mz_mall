<template>
    <div class="scroll-wrapper">
        <div class="demo">
            <div class="title">horizontal Demo</div>
            <cube-scroll ref="scroll" :data="items" direction="horizontal" class="horizontal-scroll-list-wrap">
                <ul class="list-wrapper">
                    <li v-for="item in items" class="list-item">{{ item }}</li>
                </ul>
            </cube-scroll>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
const _data = [
  '😀 😁 😂 🤣 😃 🙃 ',
  '👈🏻  scroll 👉🏻 '
]
export default {
  data() {
    return {
      items: _data
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.horizontal-scroll-list-wrap
    border 1px solid rgba(0, 0, 0, 0.1)
    border-radius 5px
    .cube-scroll-content
        display inline-block
    .list-wrapper
        padding 0 10px
        line-height 60px
        white-space nowrap
    .list-item
        display inline-block
</style>
