<template>
    <div id="app">
        <div>
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand">&nbsp;&nbsp;iPic&nbsp;&nbsp;</a>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li :class="currentTab == 'upload' ? 'active' : ''"><a @click="open('upload')">开始上传</a></li>
                            <li :class="currentTab == 'login' ? 'active' : ''"><a @click="open('login')">腾讯云设置</a></li>
                            <li :class="currentTab == 'tuku' ? 'active' : ''"><a @click="open('tuku')">图库</a></li>
                            <!--<li><a @click="open('tuku')">系统设置</a></li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                   aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="#">One more separated link</a></li>
                                </ul>
                            </li>-->
                        </ul>

                        <ul class="nav navbar-nav navbar-right">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">关于iPic <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a >关于iPic</a></li>
                                    <li><a>建议</a></li>
                                    <li><a>打赏</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div><!-- /.navbar-collapse -->
                </div><!-- /.container-fluid -->
            </nav>
        </div>
        <div class="container-fluid">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ipic',
        data() {
            return {
                currentTab : 'upload',
            }
        },
        methods: {
            open (link) {
                this.currentTab = link;
                this.$router.push({name: link})
            }
        }
    }
</script>

<style>

</style>
