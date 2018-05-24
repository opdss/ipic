/**
 * @link https://cloud.tencent.com/document/product/436/12260
 */

import COS from 'cos-js-sdk-v5';
import Cfg from '../../libs/config';
import {typeOf} from '../../libs/utils';
var fs = require('fs');

var config = Cfg('cloud').get('tencet');


/*

var os = require('os');
var platform = os.platform();
var createFile = function (filepath, size, callback) {
    var cb = function (err) {
        callback && callback();
    };
    if (fs.existsSync(filepath)) {
        cb('file existed.');
    } else {
        var cmd;
        switch (platform) {
            case 'win32':
                cmd = 'fsutil file createnew ' + filepath + ' ' + size;
                break;
            case 'darwin':
            case 'linux':
                cmd = 'dd if=/dev/zero of=' + filepath + ' count=1 bs=' + size;
                break;
        }
        var exec = require('child_process').exec;
        exec(cmd, function (err, stdout, stderr) {
            cb(err);
        });
    }
};
*/


console.log(config);
config = {}
const cos = new COS({
    SecretId: config['SecretId'] || 'AKIDBBxa2FZwRhiX7SFMxJSMJ6mFZkhSsTfk',
    SecretKey: config['SecretKey'] || '55rPiARTHuKWWHrEMUUHp9LF0ZzCD2fA',
    FileParallelLimit: 3,// 	同一个实例下上传的文件并发数，默认值 3 	Number 	否
    ChunkParallelLimit: 8, // 	同一个上传文件的分片并发数，默认值 3 	Number 	否
    ChunkSize: 1024 * 1024, //	分片上传时，每片的大小字节数，默认值 1048576 (1MB) 	Number 	否
    ProgressInterval: 1000, // 上传进度的回调方法 onProgress 的回调频率，单位 ms ，默认值 1000
});

function _errFunc(err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
}

function upload(key, file, onProgress, errFunc) {
    cos.putObject({
        Bucket: config['Bucket'] || 'img-1256134197', /* 必须 */
        Region: config['Region'] || 'ap-guangzhou', /* 必须 */
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
    }, errFunc || _errFunc);
}

/**
 * 当keys为数组时，认为批量删除
 * @param keys
 */
function del(keys, errFunc) {
    if (typeOf(keys) == 'array') {
        var objs = [];
        for (key in keys) {
            objs.push({Key:key});
        }
        console.log(objs);
        cos.deleteMultipleObject({
            Bucket: config['Bucket'] || 'img-1256134197', /* 必须 */
            Region: config['Region'] || 'ap-guangzhou', /* 必须 */
            //Quiet : 'BOOLEAN_VALUE',                        /* 非必须 */
            Objects :  objs
        }, errFunc || _errFunc);
    } else {
        cos.deleteObject({
            Bucket: config['Bucket'] || 'img-1256134197', /* 必须 */
            Region: config['Region'] || 'ap-guangzhou', /* 必须 */
            Key: key,
        }, errFunc || _errFunc);
    }
}


export default {
    upload: upload,
    delete: del,
}