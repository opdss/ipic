
var fs=require('fs');
let configDir = remote.app.getPath('userData');
console.log(configDir);
let cfgFile = configDir + '/account_tencet.cfg';
fs.writeFileSync(cfgFile, JSON.stringify(this.tencet), 'utf8');
e.preventDefault();

console