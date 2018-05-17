<template>

    <div class="row">
        <p class="text-right">
            <button class="btn btn-primary" @click="open('login')">登陆</button>
            <button class="btn btn-success" @click="open('upload')">上传</button>
            <button class="btn btn-info" @click="open('list')">列表</button>
        </p>
        <div class="col-md-12" v-if="tableData.length > 0">
            <table class="table table-hover">
                <thead>
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>预览图</td>
                    <td>地址</td>
                    <td>上传时间</td>
                    <td>大小</td>
                    <td>仓库</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in tableData">
                    <td><input type="checkbox" :value="item.key"/></td>
                    <td><img :src="item.url"></td>
                    <td>{{item.url}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.size}}</td>
                    <td>1</td>
                    <td>删除</td>
                </tr>
                <tr v-for="item in tableData">
                    <td><input type="checkbox" :value="item.key"/></td>
                    <td><img src="" alt=""></td>
                    <td>{{item.url}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.size}}</td>
                    <td>1</td>
                    <td>删除</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            getData(){
                this.tableData = [{
                    key : 1,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'
                }];
            },
            open(link) {
                this.$router.push({name: link})
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style scoped>
</style>