<template>
    <div>
        <div class="fl"></div>
        <div class="row image-div">
            <div class="col-md-12">
                <img :src="src" style="width: 100%;height: 100%;"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bigPic",
        props : {
            src : {
                default : ''
            }
        },
    }
</script>

<style scoped>
    .fl {
        background: black;
        opacity : 0.3;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 500;
        top: 0px;
        left: 0px;

    }
    .image-div {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 5% 10%;
        z-index: 1000;
        top: 0px;
        left: 0px;
    }
</style>