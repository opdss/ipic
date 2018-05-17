<template>
    <div class="row">
        <p class="text-right">
            <button class="btn btn-primary" @click="open('login')">登陆</button>
            <button class="btn btn-success" @click="open('upload')">上传</button>
            <button class="btn btn-info" @click="open('list')">列表</button>
        </p>
        <div class="col-md-12">

            <div>
                iPic账号
            </div>
            <div>
                七牛云账号
            </div>
            <div>
                腾讯云账号
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        methods: {
            open (link) {
                this.$router.push({name:link})
            }
        }
    }
</script>

<style scoped>

</style>