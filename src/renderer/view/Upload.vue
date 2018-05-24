<template>
    <div class="row">
        <div class="col-md-12">
            <upload-cloud ref="uploadAvatar"
                          :format="['jpg','jpeg','png','gif','bmp']"
            >
                <p>
                    <span class="glyphicon glyphicon-cloud-upload" style="font-size: 48px;color:#31b0d5"></span>
                    <br/>
                    <br/>
                    <span style="font-size: 16px">点击或将文件拖拽到这里上传</span>
                </p>
            </upload-cloud>
        </div>
    </div>
</template>

<script>
    import COS from 'cos-js-sdk-v5'
    import uploadCloud from '../components/upload/uploadCloud'

    export default {
        components: {
            uploadCloud
        },
        methods: {
            upload : function () {
                var cos = new COS(
                    {
                        SecretId: 'AKIDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                        SecretKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                        // 可选参数
                        FileParallelLimit: 3,    // 控制文件上传并发数
                        ChunkParallelLimit: 3,   // 控制单个文件下分片上传并发数
                        ProgressInterval: 1000,  // 控制上传的 onProgress 回调的间隔
                    }
                );
            }
        }
    }
</script>

<style scoped>

</style>