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
                        <div class="thumbnail"><img :src="item['result']"></div>
                    </div>
                    <div class="col-md-9 col-sm-9 col-xs-9">
                        <div>
                            上传成功
                        </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="'width:'+item.process.percent*100+'%;'">
                                <!--{{item.process.percent*100}}%-->
                                {{item.process.loaded}}/{{item.process.total}} -- {{item.process.speed}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {oneOf, MD5} from '../../libs/utils';
    import Up from '../cloud/tencet';
    import swal from 'sweetalert';


    export default {
        name: "uploadCloud",
        data(){
          return {
              upList : [],
              keys : [],
          }
        },
        methods: {
            handleChange(e) {
                console.log(e);
                console.log(e.target);
                this.uploadFiles(e.target.files)
            },
            onDrop (e) {
                this.dragOver = false;
                this.uploadFiles(e.dataTransfer.files);
            },
            handleClick(e) {
                this.$refs.input.click();
                /*var fileElem = document.getElementById("upload-cloud-input");
                if (fileElem) {
                    fileElem.click();
                }*/
            },
            uploadFiles(files) {
                for (var i=0;i<files.length; i++) {
                    var file = files[i]

                    let uid = MD5(file.path);
                    if (oneOf(uid, this.keys)) {
                        alert(file.name + '已经上传');
                        continue;
                    }

                    var fix = this.getFixByType(file.type)
                    if (fix == '') {
                        alert(file.name + '文件类型不支持');
                        continue;
                    }
                    file.uid = uid;

                    const obj = {
                        file : file,
                        succ : 0,
                        uid : uid,
                        key : uid + '.' + fix,
                        process : {loaded: 0, total: 0, speed: 0, percent: 0 },
                        result : ''
                    }

                    this.upList.unshift(obj)
                    this.keys.unshift(uid)

                    let reader = new FileReader();//新建一个FileReader
                    reader.readAsDataURL(file);//读取文件
                    reader.onload = function() {
                        obj.result = this.result;
                    }

                    Up.upload(obj.key, obj.file, function (res) {
                        obj.process = res;
                    }, function (err, data) {
                        if (err) {
                            obj.succ = -1;
                        } else {
                            obj.succ = 1;
                        }
                    })
                }

            },
            readImgFile(file){
                let img = '';
                let reader = new FileReader();//新建一个FileReader
                reader.readAsDataURL(file);//读取文件
                reader.onload = function() {
                    img = this.result;
                }
                return img;
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

    .upload-cloud-input {
        display: none;
    }
</style>