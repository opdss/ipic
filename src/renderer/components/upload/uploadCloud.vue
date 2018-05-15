<template>
    <div class="upload-cloud" @click="handleClick" @drop.prevent="onDrop">
        <input ref="input" class="upload-cloud-input" type="file" multiple @change="handleChange">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "uploadCloud",

        methods: {
            handleChange(e) {
                console.log(e);
                this.uploadFiles(e.target.file)
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
            }
        }
    }
</script>

<style scoped>
    .upload-cloud {
        width: auto;
        height: 200px;
        padding: 80px 20px;
        margin: 20px;
        border: 2px dashed #DCDCDC;
        border-radius: 10px;
        text-align: center;

    }

    .upload-cloud-input {
        display: none;
    }
</style>