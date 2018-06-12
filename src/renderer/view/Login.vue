<template>
    <div class="row">
        <div class="col-md-6 col-md-offset-3">

            <div>
                <h3 class="text-center">腾讯云账户</h3>
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="SecretId" class="col-sm-2 control-label">SecretId</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="SecretId" v-model="tencet.SecretId" placeholder="SecretId">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="SecretKey" class="col-sm-2 control-label">SecretKey</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="SecretKey" v-model="tencet.SecretKey" placeholder="SecretKey">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="Bucket" class="col-sm-2 control-label">Bucket</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="Bucket" v-model="tencet.Bucket" placeholder="Bucket">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="Region" class="col-sm-2 control-label">Region</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="Region" v-model="tencet.Region" placeholder="Region">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="domain" class="col-sm-2 control-label">绑定域名</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="domain" v-model="tencet.domain" placeholder="domain">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <button type="submit" class="btn btn-success col-sm-12" @click="tencetSave">OK</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Cfg from '../libs/config';
    import swal from 'sweetalert';

    export default {
        name: "login",
        data(){
            return {
                tencet : {
                    SecretId : '',
                    SecretKey : '',
                    Bucket : '',
                    Region : '',
                    domain : '',
                }
            }
        },
        methods: {
            tencetSave (e) {
                Cfg('cloud').set('tencet', this.tencet)
                swal('保存成功！');
                e.preventDefault();
            }
        },
        created() {
            var cfg = Cfg('cloud').get('tencet')
            if (cfg) {
                this.tencet = cfg
            }
        }
    }
</script>

<style scoped>

</style>