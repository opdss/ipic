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
    const {remote} = require('electron');
    import Queue from '../libs/fileQueue';

    export default {
        name: "login",
        data(){
            return {
                tencet : {
                    SecretId : '',
                    SecretKey : '',
                    Bucket : '',
                    Region : ''
                }
            }
        },
        methods: {
            tencetSave (e) {
                var q = Queue('test');
                q.push({"a":1});
                console.log(q);
                console.log(q.all());
                var q1 = Queue('test');
                q1.push({"a":1});
                //q1.clear();
                console.log(q1);
                console.log(q1.all());
                /*var fs=require('fs');
                let configDir = remote.app.getPath('userData');
                console.log(configDir);
                let cfgFile = configDir + '/account_tencet.cfg';
                fs.writeFileSync(cfgFile, JSON.stringify(this.tencet), 'utf8');*/
                e.preventDefault();
            }
        }
    }
</script>

<style scoped>

</style>