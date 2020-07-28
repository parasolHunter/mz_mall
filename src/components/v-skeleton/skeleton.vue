<template>
  <section>
    <div class='sk-cube-grid'>
      <div class='sk-cube sk-cube-1'></div>
      <div class='sk-cube sk-cube-2'></div>
      <div class='sk-cube sk-cube-3'></div>
      <div class='sk-cube sk-cube-4'></div>
      <div class='sk-cube sk-cube-5'></div>
      <div class='sk-cube sk-cube-6'></div>
      <div class='sk-cube sk-cube-7'></div>
      <div class='sk-cube sk-cube-8'></div>
      <div class='sk-cube sk-cube-9'></div>
    </div>
  </section>

</template>

<script>
export default {
    name: 'skeleton'
}
</script>

<style lang="stylus" scoped>
section
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  .sk-cube-grid
    width 100px
    height 100px
    position absolute
    top 50%
    margin-top -40px
    left 50%
    margin-left -40px
    .sk-cube
      width 33%
      height 33%
      background-color #409EFF
      float left
      -webkit-animation sk-cube-grid-scale-delay 1.3s infinite ease-in-out
      animation sk-cube-grid-scale-delay 1.3s infinite ease-in-out
    .sk-cube-1
      -webkit-animation-delay 0.2s
      animation-delay 0.2s
    .sk-cube-2
      -webkit-animation-delay 0.3s
      animation-delay 0.3s
    .sk-cube-3
      -webkit-animation-delay 0.4s
      animation-delay 0.4s
    .sk-cube-4
      -webkit-animation-delay 0.1s
      animation-delay 0.1s
    .sk-cube-5
      -webkit-animation-delay 0.2s
      animation-delay 0.2s
    .sk-cube-6
      -webkit-animation-delay 0.3s
      animation-delay 0.3s
    .sk-cube-7
      -webkit-animation-delay 0s
      animation-delay 0s
    .sk-cube-8
      -webkit-animation-delay 0.1s
      animation-delay 0.1s
    .sk-cube-9
      -webkit-animation-delay 0.2s
      animation-delay 0.2s
@keyframes sk-cube-grid-scale-delay
  0%, 70%, 100%
    -webkit-transform scale3D(1, 1, 1)
    transform scale3D(1, 1, 1)
  35%
    -webkit-transform scale3D(0, 0, 1)
    transform scale3D(0, 0, 1)
@keyframes sk-cube-grid-scale-delay
  0%, 70%, 100%
    -webkit-transform scale3D(1, 1, 1)
    transform scale3D(1, 1, 1)
  35%
    -webkit-transform scale3D(0, 0, 1)
    transform scale3D(0, 0, 1)
</style>
