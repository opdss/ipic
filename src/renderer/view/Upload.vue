<template>
    <div class="row">
        <p class="text-right">
            <button class="btn btn-primary" @click="open('login')">登陆</button>
            <button class="btn btn-success" @click="open('upload')">上传</button>
            <button class="btn btn-info" @click="open('list')">列表</button>
        </p>
        <div class="col-md-12">
            <upload-cloud ref="uploadAvatar"
                          :format="['jpg','jpeg','png','gif','bmp']"
            >
                <p>点击或将文件拖拽到这里上传</p>
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
            open (link) {
                this.$router.push({name:link})
            },
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