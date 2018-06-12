<template>
    <div>
        <!--<div class="row">
            <div class="col-md-12">
                <span><input type="checkbox" :checked="checkPic.length == tableData.length" @click="checkAll"> 全选</span>
                <button class="btn btn-success">下载</button>
                <button class="btn btn-success">删除</button>
            </div>
        </div>
        <br/>-->

        <!--列表展示-->
        <div class="row" v-if="tableData.length > 0">
            <div class="col-xs-4 col-sm-3 col-md-2" v-for="(item, index) in tableData">
                <div class="thumbnail">
                    <img :src="item.url" :title="item.size" @click="showPic(index)">
                    <label class="img-title">
                        <!--<input type="checkbox" :checked="oneOf(item.key, checkPic)" @click="checkOne(item.key)"/>-->
                        <span class="glyphicon glyphicon-copy act-icon" title="复制图片地址" @click="copy($event, item)"></span>
                        <span class="glyphicon glyphicon-trash act-icon" title="删除该图片" @click="remove($event, item)"></span>
                    </label>
                </div>
            </div>
        </div>

        <!-- 大图展示 -->
        <div class="row popContainer" v-if="show">
                <div class="col-md-1 col-xs-1 navi-pic prev-pic" @click="playPic($event, 0)">&#60;</div>
                <div class="col-md-10  col-xs-10 div-pic" @click="show=false">
                    <img :src="tableData[currentIndex].url" class="show-pic">
                </div>
                <div class="col-md-1 col-xs-1 navi-pic next-pic" @click="playPic($event, 1)">&#62;</div>
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
        data() {
            return {
                tableData: [],
                //checkPic : [],
                picDB : DB('pic'),
                show:false,
                currentIndex : 0,
            }
        },
        methods: {
            getData(){
                this.tableData = this.picDB.all()
            },
            //展示
            showPic(index){
                this.show = true;
                this.currentIndex = index;
            },
            //单选
            /*checkOne(key) {
                if (!oneOf(key, this.checkPic)) {
                    this.checkPic.push(key);
                } else {
                    let idx = this.checkPic.indexOf(key);
                    if (idx > -1) {
                        this.checkPic.splice(idx, 1);
                    }
                }
            },*/
            //全选
            /*checkAll() {
                if(this.checkPic.length == this.tableData.length) {
                    this.checkPic = [];
                } else {
                    this.checkPic = [];
                    var _this = this;
                    this.tableData.forEach(function (item, index) {
                        _this.checkPic.push(item.key);
                    })
                }
            },*/
            /*oneOf(key, lit) {
                return oneOf(key, lit);
            },*/
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
                //远程删除
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
            /*removeMany(e) {
                e.preventDefault();
            },*/
            playPic(e, type){
                var idx = type ? this.currentIndex+1 : this.currentIndex-1;
                if (idx < 0 || idx>=this.tableData.length) {
                    swal('没有更多图片了！');
                    return false;
                }
                this.currentIndex = idx;
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
    div.popContainer{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        z-index: 999;
    }
    .div-pic {
        height:100%;
        padding: 1%;
        text-align: center
    }
    .navi-pic{
        padding-top: 20%;
        height: 100%;
        font-size: 48px;
        color: white;
        cursor: pointer;
    }
    .navi-pic:hover{
        color: red;
    }
    .prev-pic{
        text-align: right;
    }
    .next-pic{
        text-align: left;
    }
    .show-pic{
        max-width: 100%;
        height: 100%;
    }
</style>