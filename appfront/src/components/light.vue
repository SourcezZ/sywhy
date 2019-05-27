<!-- 走马灯组件 -->
<template>
    <div style="text-align:center">
        <div>
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item>
                    <img class="img" src="../light/1.jpg">
                </el-carousel-item>

                <el-carousel-item>
                    <img class="img" src="../light/2.jpg">
                </el-carousel-item>

                <el-carousel-item>
                    <img class="img" src="../light/3.jpg">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
        }

    }        
</script>
<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .img {
        width: 100%;
        height: auto;
        max-width: 100%;
        display: block;
    }
</style>