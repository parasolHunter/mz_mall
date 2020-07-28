<template>
    <jump-page type="form-def" title="详情页面标题">
        <div slot="content">详情页面内容.</div>
    </jump-page>
</template>

<script>
import jumpPage from '@/components/v-jump-page/jump-page'
export default {
    name: 'pageDetails',
    data () {
        return {}
    },
    components: {
        jumpPage
    }
}
</script>

<style lang="stylus" scoped></style>
