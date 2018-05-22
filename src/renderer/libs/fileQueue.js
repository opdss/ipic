
//path.sep
//返回对应平台下的文件夹分隔符，win下为'\'，*nix下为'/'

var objs = {};

var fs=require('fs');
var path=require('path');
var {remote} = require('electron');

const Queue = function (file) {

    if (objs[file]) {
        return objs[file];
    }

    let obj =  new Object();

    obj.QUEUE_FILE = remote.app.getPath('userData')+path.sep+file+'.queue';
    var DATA = null;
    obj.id = Math.random();

    //将一个或多个元素插入数组的末尾（入栈）。
    obj.push = function(data){
        let arr = this._read();
        let res = arr.push(data);
        this._wirte(arr);
        return res;
    }
    //增加数组的第一个元素（入栈）。
    obj.unshift = function (data) {
        let arr = this._read();
        let res = arr.unshift(data);
        this._wirte(arr);
        return res;
    }

    //删除数组的第一个元素（出栈）。
    obj.shift = function () {
        let arr = this._read();
        let res = arr.shift();
        this._wirte(arr);
        return res;
    }
    //删除数组的最后一个元素（出栈）。
    obj.pop = function () {
        let arr = this._read();
        let res = arr.pop();
        this._wirte(arr);
        return res;
    }

    obj.limit = function(offset, number) {
        let arr = this._read();
        number = number || 10;
        return arr.slice(offset, offset+number)
    }

    obj.clear = function () {
        this._wirte([]);
    }

    obj.count = function () {
        return this._read().length;
    }

    obj.all = function () {
        return this._read();
    }

    obj._read = function () {
        if (DATA == null) {
            DATA = new Array();
            if (fs.existsSync(this.QUEUE_FILE)) {
                let res = fs.readFileSync(this.QUEUE_FILE);
                if (res && res != '[]') {
                    DATA = JSON.parse(res);
                }
            }
        }
        return DATA;
    }

    obj._wirte = function (data) {
        DATA = data;
        fs.writeFileSync(this.QUEUE_FILE, JSON.stringify(data), 'utf8');
    }

    objs[file] = obj;
    return obj;

}

export default Queue;