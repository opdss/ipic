<template>
    <div>
        <div>
            iPic账号
        </div>
        <div>
            七牛云账号
        </div>
        <div>
            腾讯云账号
        </div>
        <button class="alt" @click="open('login')">登陆</button>
        <button class="alt" @click="open('upload')">上传</button>
        <button class="alt" @click="open('list')">列表</button>
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