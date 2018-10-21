<template>
    <div>
        <Light></Light>
        <div class='div'>
            <el-menu :default-active="activeIndex" @select="handleSelect" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <el-menu-item index="1">主页</el-menu-item>
                <el-menu-item index="2">走马灯</el-menu-item>
                <el-menu-item index="3">书籍</el-menu-item>
                <el-menu-item index="4">图库</el-menu-item>                
            </el-menu>
        </div>
        <div>
            <Story v-if='activeIndex==1'></Story>
            <Light v-if='activeIndex==2'></Light>
            <Library v-if='activeIndex==3'></Library>
            <Picture v-if='activeIndex==4'></Picture>
        </div>
    </div>
</template>

<script>
    import Library from '../components/Library'
    import Story from '../components/story'
    import Light from '../components/light'
    import Picture from '../components/upLoad'    
    export default {
        components: { Library, Light, Story, Picture },
        data() {
            return {
                user: null,
                activeIndex: '1',
                bookList: [],
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key
                console.log(key, keyPath);
            },
            fetchData() {
                this.$http.get('./../../static/json/data.json').then((response) => {
                    console.log(response.data.data);
                })
            },
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
    }
</script>
<style>
    .el-menu {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .div {
        display: flex;
        justify-content: center;
    }
</style>