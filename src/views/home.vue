<template>
    <div class="home-main">
        <router-view></router-view>
        <mall-footer></mall-footer>
    </div>
</template>

<script>
import mallFooter from '@/components/mall-footer/mall-footer'
export default {
    name: 'home',
    components: {
        mallFooter
    }
}
</script>

<style lang="stylus" scope>

</style>
