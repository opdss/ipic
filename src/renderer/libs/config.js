import {typeOf} from "./utils";

var cfgs = {};

const defObj = function (file) {

    if (cfgs[file]) {
        return cfgs[file];
    }

    const {remote} = require('electron');
    const fs = require('fs');
    const path = require('path');
    const configDir = remote.app.getPath('userData');
    const cfgFile = configDir + path.sep + file + '.cfg';

    var _cfg = {}

    const funcSet = function (key, data) {
        if (typeOf(key) == 'object' && !data) {
            _cfg = key;
        } else if(typeOf(key) == 'string' && data) {
            _cfg[key] = data;
        } else {
            return false;
        }
        return fs.writeFileSync(cfgFile, JSON.stringify(_cfg), 'utf8');
    }

    const funcGet = function (key, def = null) {
        return key ? (_cfg[key] || def) : _cfg;
    }

    if (fs.existsSync(cfgFile)) {
        let res = fs.readFileSync(cfgFile);
        _cfg = JSON.parse(res);
    }

    cfgs[file] = {
        CFG_FILE : cfgFile,
        get : funcGet,
        set : funcSet
    }

    return cfgs[file];
}


export default defObj