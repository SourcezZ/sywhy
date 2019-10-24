<template>
    <div>
        <span>{{ new Date() | dataFormat('yyyy-MM-dd hh:mm:ss') }}</span>
        <br>
        <span>{{ hello }}</span>
    </div>
</template>

<script>
import func2 from '../function/func2'

export default {
    data () {
        return {
            hello: new Date(),
        }
    },
    watch: {
    },
    methods: {
    },
    mounted: function () {
    }
}

</script>