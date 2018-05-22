<template>
    <div>
        <div class="row upload-cloud" @click="handleClick" @drop.prevent="onDrop">
            <div class="col-md-12">
                <input ref="input" class="upload-cloud-input" type="file" multiple @change="handleChange">
                <slot></slot>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="row">
                    <div class="col-md-3 col-sm-3 col-xs-3">
                        <div class="thumbnail"><img src="http://img.istimer.com/0.jpg"></div>
                    </div>
                    <div class="col-md-9 col-sm-9 col-xs-9">
                        <div>
                            上传成功，复制地址
                        </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em;">
                                0%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import COS from 'cos-js-sdk-v5';
    export default {
        name: "uploadCloud",

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
                console.log(files);
                /**
                 *
                 secret_id = AKIDBBxa2FZwRhiX7SFMxJSMJ6mFZkhSsTfk
                 secret_key = 55rPiARTHuKWWHrEMUUHp9LF0ZzCD2fA
                 bucket = bak-1256134197
                 region = ap-guangzhou

                 * @type {*|COS}
                 */
                var cos = new COS({
                    SecretId: 'AKIDBBxa2FZwRhiX7SFMxJSMJ6mFZkhSsTfk',
                    SecretKey: '55rPiARTHuKWWHrEMUUHp9LF0ZzCD2fA',
                    FileParallelLimit: 6,// 	同一个实例下上传的文件并发数，默认值 3 	Number 	否
                    ChunkParallelLimit : 6, // 	同一个上传文件的分片并发数，默认值 3 	Number 	否
                    ChunkSize :  1048576, //	分片上传时，每片的大小字节数，默认值 1048576 (1MB) 	Number 	否
                    ProgressInterval : 1000, // 上传进度的回调方法 onProgress 的回调频率，单位 ms ，默认值 1000
                });
                console.log(files[0]);
                cos.putObject({
                    Bucket: 'img-1256134197', /* 必须 */
                    Region: 'ap-guangzhou',    /* 必须 */
                    Key: 'test.jpg',              /* 必须 */
                    //StorageClass: 'STANDARD',
                    Body: files[0], // 上传文件对象
                    onProgress: function(progressData) {
                        console.log(JSON.stringify(progressData));
                    }
                }, function(err, data) {
                    console.log(err || data);
                });
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