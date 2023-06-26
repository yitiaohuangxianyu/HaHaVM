// 添加目标网站代码, 自己改动的加密函数调用, 同步的, 异步的 - 配置
const fs = require("fs");

function getCode(name, type){
    try{
        return fs.readFileSync(`./user/${name}/${type}.js`) + "\r\n";
    }catch (e){
        console.log(`./user/${name}/${type}.js不存在`);
        return "";
    }
}
module.exports = {
    getCode
}
