<template>
    <div style="position: relative">
        <div class="row">
            <div class="col-md-12">
                <span><input type="checkbox" :checked="checkPic.length == tableData.length" @click="checkAll"> 全选</span>
                <button class="btn btn-success">下载</button>
                <button class="btn btn-success">删除</button>
                <button class="btn btn-success">下载</button>
            </div>
        </div>
        <br/>
        <div class="row" v-if="tableData.length > 0">
            <div class="col-xs-4 col-sm-3 col-md-2" v-for="(item, index) in tableData">
                <div class="thumbnail">
                    <img :src="item.url" :title="item.size" @click="showPic(item)">
                    <label class="img-title">
                        <input type="checkbox" :checked="oneOf(item.key, checkPic)" @click="checkOne(item.key)"/>
                        <span class="glyphicon glyphicon-copy act-icon" title="复制图片地址" @click="copy($event, item)"></span>
                        <span class="glyphicon glyphicon-trash act-icon" title="删除该图片" @click="remove($event, item)"></span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {oneOf, removeArrByField} from '../libs/utils';
    import DB from '../libs/fileDB';
    import swal from 'sweetalert';
    import Cloud from '../components/cloud';

    export default {
        name: "tuku",
        components : {
            //bigPic
        },
        data() {
            return {
                tableData: [],
                checkPic : [],
                picDB : DB('pic')
            }
        },
        methods: {
            getData(){
                this.tableData = this.picDB.all()
            },
            //展示
            showPic(item){
                $('document').append('<div>gawegawe</div>');
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
            copy(e,item) {
                const clipboard = require('electron').clipboard;
                clipboard.writeText(item.url);
                swal("复制成功！")
                e.preventDefault();
            },
            //删除
            remove(e, item) {
                var _this = this;
                Cloud.delete(item.key, function (err, data) {
                    if (!err) {
                        //删除数据库
                        _this.picDB.remove(item._id);
                        //移除当前列表
                        _this.tableData = removeArrByField(_this.tableData, '_id', item._id);
                    }
                });
                e.preventDefault();
            },
            removeMany(e) {
                e.preventDefault();
            },
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