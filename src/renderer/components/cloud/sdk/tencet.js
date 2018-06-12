/**
 * @link https://cloud.tencent.com/document/product/436/12260
 */

import COS from 'cos-js-sdk-v5';
import Cfg from '../../../libs/config';
import {typeOf} from '../../../libs/utils';

var config = Cfg('cloud').get('tencet');

console.log(config);

if (config['domain'].substr(-1) != '/') {
    config['domain'] = config['domain'] + '/';
}

const cos = new COS({
    //SecretId: config['SecretId'] || 'AKIDBBxa2FZwRhiX7SFMxJSMJ6mFZkhSsTfk',
    SecretId: config['SecretId'],
    //SecretKey: config['SecretKey'] || '55rPiARTHuKWWHrEMUUHp9LF0ZzCD2fA',
    SecretKey: config['SecretKey'],
    FileParallelLimit: 3,// 	同一个实例下上传的文件并发数，默认值 3 	Number 	否
    ChunkParallelLimit: 8, // 	同一个上传文件的分片并发数，默认值 3 	Number 	否
    ChunkSize: 1024 * 1024, //	分片上传时，每片的大小字节数，默认值 1048576 (1MB) 	Number 	否
    ProgressInterval: 1000, // 上传进度的回调方法 onProgress 的回调频率，单位 ms ，默认值 1000
});

function _finishFunc(err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
}

function upload(key, file, onProgress, finishFunc) {
    cos.putObject({
        //Bucket: config['Bucket'] || 'img-1256134197', /* 必须 */
        Bucket: config['Bucket'], /* 必须 */
        //Region: config['Region'] || 'ap-guangzhou', /* 必须 */
        Region: config['Region'], /* 必须 */
        Key: key, /* 必须 */
        //StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        TaskReady: function (tid) {
            console.log(tid)
            //TaskId = tid;
        },
        onProgress: function (progressData) {
            console.log('tencet -- upload');
            onProgress ? onProgress(progressData) : console.log(progressData);
        }
    }, finishFunc || _finishFunc);
}

/**
 * 当keys为数组时，认为批量删除
 * @param keys
 */
function del(keys, finishFunc) {
    if (typeOf(keys) == 'array') {
        var objs = [];
        for (key in keys) {
            objs.push({Key:key});
        }
        console.log(objs);
        cos.deleteMultipleObject({
            //Bucket: config['Bucket'] || 'img-1256134197', /* 必须 */
            Bucket: config['Bucket'], /* 必须 */
            //Region: config['Region'] || 'ap-guangzhou', /* 必须 */
            Region: config['Region'], /* 必须 */
            //Quiet : 'BOOLEAN_VALUE',                        /* 非必须 */
            Objects :  objs
        }, finishFunc || _finishFunc);
    } else {
        cos.deleteObject({
            //Bucket: config['Bucket'] || 'img-1256134197', /* 必须 */
            Bucket: config['Bucket'], /* 必须 */
            //Region: config['Region'] || 'ap-guangzhou', /* 必须 */
            Region: config['Region'], /* 必须 */
            Key: keys,
        }, finishFunc || _finishFunc);
    }
}


export default {
    upload: upload,
    delete: del,
    config : config
}