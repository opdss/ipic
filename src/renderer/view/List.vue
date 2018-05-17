<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <span><input type="checkbox"> 全选</span>
                <button class="btn btn-success">下载</button>
                <button class="btn btn-success">删除</button>
                <button class="btn btn-success">打包下载</button>
            </div>
        </div>
        <br/>
        <div class="row" v-if="tableData.length > 0">
            <div class="col-xs-4 col-sm-3 col-md-2" v-for="item in tableData">
                <div class="thumbnail">
                    <img :src="item.url" :title="item.size">
                    <div class="img-title">
                        <input type="checkbox" />
                        <span>复制</span>
                        <span>删除</span>
                    </div>
                </div>
            </div>
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
                this.tableData = [
                    {key : 1,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526579812161&di=bf65e9a41ae9f57aa59a45a5a58648e8&imgtype=0&src=http%3A%2F%2Fimg14.artimg.net%2Fgallery%2F2014%2F1106%2F1415250309_310641.JPG',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526579812161&di=bf65e9a41ae9f57aa59a45a5a58648e8&imgtype=0&src=http%3A%2F%2Fimg14.artimg.net%2Fgallery%2F2014%2F1106%2F1415250309_310641.JPG',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 1,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    ];
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style scoped>
    .thumbnail {
        position: relative;
    }

    .thumbnail > img {
        height:160px;
    }
    .img-title {
        position: absolute;
        left: 0px;
        top:0px;
        width: 100%;
        border: 1px solid red;
        padding:3px 5px;
        z-index: 100;
        text-align: justify;
    }
</style>