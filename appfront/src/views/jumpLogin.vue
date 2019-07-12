<template>
</template>
<script>
export default {
    data () {
        return {
            hello: new Date(),
            hehe: 2
        }
    },
    mounted: function () {
        this.$router.push({ name: '首页', params: { index: this.$route.params.index } })
    }
}
</script>
