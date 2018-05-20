<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <span><input type="checkbox" :checked="checkPic.length == tableData.length" @click="checkAll"> 全选</span>
                <button class="btn btn-success">下载</button>
                <button class="btn btn-success">删除</button>
                <button class="btn btn-success">打包下载</button>
            </div>
        </div>
        <br/>
        <div class="row" v-if="tableData.length > 0">
            <div class="col-xs-4 col-sm-3 col-md-2" v-for="item in tableData">
                <div class="thumbnail">
                    <img :src="item.url" :title="item.size" @click="showPic(item)">
                    <label class="img-title">
                        <input type="checkbox" :checked="oneOf(item.key, checkPic)" @click="checkOne(item.key)"/>
                        <span class="glyphicon glyphicon-copy act-icon" title="复制图片地址" @click="copy($event, item.url)"></span>
                        <span class="glyphicon glyphicon-trash act-icon" title="删除该图片" @click="remove($event, item.url)"></span>
                    </label>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {oneOf} from '../libs/utils';
    export default {
        name: "list",
        data() {
            return {
                tableData: [],
                checkPic : [],
            }
        },
        methods: {
            getData(){
                this.tableData = [
                    {key : 1,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 2,
                    url : 'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 3,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 4,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 5,
                    url : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526579812161&di=bf65e9a41ae9f57aa59a45a5a58648e8&imgtype=0&src=http%3A%2F%2Fimg14.artimg.net%2Fgallery%2F2014%2F1106%2F1415250309_310641.JPG',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 6,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 7,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 8,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 9,
                    url : 'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 10,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 11,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 12,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 13,
                    url : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526579812161&di=bf65e9a41ae9f57aa59a45a5a58648e8&imgtype=0&src=http%3A%2F%2Fimg14.artimg.net%2Fgallery%2F2014%2F1106%2F1415250309_310641.JPG',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 14,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    {key : 15,
                    url : 'http://img.istimer.com/0.jpg',
                    createTime : '2018-07-18 12:12:33',
                    size:'123Kb'},
                    ];
            },
            //展示
            showPic(item){
                alert('准备展示这个地址：'+item.url);
                console.log(item);
            },
            //单选
            checkOne(key) {
                if (!oneOf(key, this.checkPic)) {
                    this.checkPic.push(key);
                } else {
                    let idx = this.checkPic.indexOf(key);
                    if (idx > -1) {
                        this.checkPic.splice(idx, 1);
                    }
                }
            },
            //全选
            checkAll() {
                if(this.checkPic.length == this.tableData.length) {
                    this.checkPic = [];
                } else {
                    this.checkPic = [];
                    var _this = this;
                    this.tableData.forEach(function (item, index) {
                        _this.checkPic.push(item.key);
                    })
                }
            },
            oneOf(key, lit) {
                return oneOf(key, lit);
            },
            //复制地址
            copy(e,data) {
                const clipboard = require('electron').clipboard;
                clipboard.writeText(data);
                alert('复制成功！');
                e.preventDefault();
            },
            //删除
            remove(e, item) {
                alert('准备删除这个地址：'+ item.url);
                e.preventDefault();
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
        padding:3px 5px;
        z-index: 100;
        text-align: justify;
        background: black;
        opacity:0.5;
        color: #fff;
    }
    .act-icon{
        display: inline-block;
        float: right;
        margin: 3px;
        cursor: pointer;
    }
    .act-icon:hover{
        color: #2e6da4;
    }
</style>