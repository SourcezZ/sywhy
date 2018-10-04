<template>
    <div>
        <div>
            <div>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="1">主页</el-menu-item>
                    <el-menu-item index="2">走马灯</el-menu-item>
                    <el-menu-item index="3">故事</el-menu-item>
                </el-menu>
            </div>
        </div>
        <div>
            <Library v-if='activeIndex==1'></Library>
            <Light v-if='activeIndex==2'></Light>
            <Story v-if='activeIndex==3'></Story>
        </div>
    </div>
</template>

<script>
    import Library from '../components/Library'
    import Story from '../components/story'
    import Light from '../components/light'
    export default {
        components: { Library, Light, Story },
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