<template>
    <div>
        <div class="row upload-cloud" @click="handleClick" @drop.prevent="onDrop">
            <div class="col-md-12">
                <input ref="input" class="upload-cloud-input" type="file" multiple @change="handleChange">
                <slot></slot>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-12" v-for="item in upList">
                <div class="row">
                    <div class="col-md-3 col-sm-3 col-xs-3">
                        <div class="thumbnail text-center"><img :src="item['result']" style="height: 124px"></div>
                    </div>
                    <div class="col-md-9 col-sm-9 col-xs-9">
                        <div v-if="item.succ == 1">
                            <p class="well">
                                上传成功！
                                <button class="btn btn-success" @click="copy($event, item)">复制地址</button>
                                <button class="btn btn-success" @click="remove($event, item)">删除</button>
                            </p>
                        </div>
                        <div v-if="item.succ == -1">
                            上传失败
                        </div>
                        <div v-if="item.succ == 0">
                            正在上传：已上传{{item.process.loaded}}/{{item.process.total}} -- 上传速度{{item.process.speed}}/s
                        </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="'width:'+item.process.percent*100+'%;'">
                                {{item.process.percent*100}}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {oneOf, MD5, fmtSize, removeArrByField, fmtTime} from '../../libs/utils';
    import Cloud from '../cloud';
    import swal from 'sweetalert';
    import fileDB from '../../libs/fileDB'


    export default {
        name: "uploadCloud",
        data(){
          return {
              upList : [],
              keys : [],
              picDB : fileDB('pic'),
              type : false
          }
        },
        methods: {
            handleChange(e) {
                this.uploadFiles(e.target.files)
            },
            onDrop (e) {
                this.uploadFiles(e.dataTransfer.files);
            },
            handleClick(e) {
                this.$refs.input.click();
            },
            uploadFiles(files) {
                for (var i=0;i<files.length; i++) {
                    var file = files[i]

                    let uid = MD5(file.path);
                    if (oneOf(uid, this.keys)) {
                        swal(file.name + '已经上传');
                        continue;
                    }

                    var fix = this.getFixByType(file.type)
                    if (fix == '') {
                        swal(file.name + '文件类型不支持');
                        continue;
                    }
                    file.uid = uid;

                    const obj = {
                        file : file,
                        succ : 0,
                        uid : uid,
                        key : uid + '.' + fix,
                        url : '',
                        process : {loaded: 0, total: 0, speed: 0, percent: 0 },
                        result : '',
                        _id : ''
                    }

                    //放入上传列表
                    this.upList.unshift(obj)
                    this.keys.unshift(uid)

                    let reader = new FileReader();//新建一个FileReader
                    reader.readAsDataURL(file);//读取文件
                    reader.onload = function() {
                        obj.result = this.result; //读取图片在列表展示
                    }

                    var _this = this;
                    //上传云
                    Cloud.upload(obj.key, obj.file, function (res) {
                        //格式化一下数字
                        obj.process = {
                            loaded : fmtSize(res.loaded),
                            total : fmtSize(res.total),
                            speed : fmtSize(res.speed),
                            percent : res.percent
                        };
                    }, function (err, data) {
                        console.log('upload result');
                        console.log(err, data);
                        if (err) {
                            obj.succ = -1;
                        } else {
                            obj.url = Cloud.config.domain + obj.key;
                            obj.succ = 1;
                            const dbFile = {
                                'url' : obj.url,
                                'key' : obj.key,
                                'size' : fmtSize(obj.file.size),
                                'createTime' : fmtTime()
                            }
                            //成功后插入到数据库
                            obj._id = _this.picDB.unshift(dbFile);
                        }
                    })
                }

            },

            copy(e, item){
                const clipboard = require('electron').clipboard;
                clipboard.writeText(item.url);
                swal("复制成功！");
                e.preventDefault();
            },
            remove(e, item){
                //删除云数据
                var _this = this;
                Cloud.delete(item.url, function (err, data) {
                    console.log('delete result ' + item.url);
                    console.log(err, data);
                    if (!err) {
                        //删除数据库
                        _this.picDB.remove(item._id);
                        //移除当前列表
                        _this.upList = removeArrByField(_this.upList, '_id', item._id);
                        swal("删除成功！");
                    }
                })
                e.preventDefault();
            },
            //根据文件类型获取后缀
            getFixByType(type) {
                const  Mimes = {
                    'jpg' :	['image/jpeg', 'image/pjpeg', ],
                    'png' : ['image/png',  'image/x-png'],
                    'gif' : ['image/gif'],
                    'ico' : ['image/x-icon', 'image/x-ico', 'image/vnd.microsoft.icon'],
                    'bmp' : ['image/bmp', 'image/x-bmp', 'image/x-bitmap', 'image/x-xbitmap', 'image/x-win-bitmap', 'image/x-windows-bmp', 'image/ms-bmp', 'image/x-ms-bmp', 'application/bmp', 'application/x-bmp', 'application/x-win-bitmap'],
                }
                var fix = '';
                for (let _fix in Mimes) {
                    if (oneOf(type, Mimes[_fix])) {
                        fix = _fix;
                        break;
                    }
                }
                return fix;
            }
        }
    }
</script>

<style scoped>
    .upload-cloud {
        padding: 60px 20px;
        margin: 20px 0px;
        border: 2px dashed #DCDCDC;
        border-radius: 3px;
        text-align: center;
    }

    .upload-cloud-over {
        border: 2px dashed #2e6da4;
    }

    .upload-cloud-input {
        display: none;
    }
</style>