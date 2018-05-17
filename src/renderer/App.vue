<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-md-12" style="padding:10px">
        <p class="text-right">
          <button class="btn btn-primary" @click="open('login')">登陆</button>
          <button class="btn btn-success" @click="open('upload')">上传</button>
          <button class="btn btn-info" @click="open('list')">列表</button>
        </p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'ipic',
      methods : {
          open (link) {
              this.$router.push({name:link})
          }
      }
  }
</script>

<style>
  /* CSS */

</style>
