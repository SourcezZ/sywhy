<template>
    <div>
        <div class="line"></div>
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
        <el-button v-on:click='fetchData'>hello</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user:null,
                activeIndex2 : '',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            fetchData(){                            
                    this.$http.get('./../../static/json/data.json').then((response)=>{   
                    console.log(response.data.data);
                })
            },
        },
        created () {
            this.fetchData()
        },
        watch:{
            '$route':'fetchData'
        },
    }
</script>