// 全局对象配置
debugger;
hahavm = {
    "toolsFunc":{},//功能函数相关，插件
    "envFunc":{},// 具体环境实现相关
    "config":{}, // 配置相关
    "memory":{}, // 内存
}
hahavm.config.print = true; // 是否输出日志
hahavm.memory.symbolData = Symbol("data");// 用来保存当前对象上的原型属性
hahavm.memory.node = {};  // 内存, 存储tag标签, 和Text, SVG等原型链上是Node的对象; 形式: {nodeUID: node}
hahavm.memory.asyncEvent = {};// 异步事件
hahavm.memory.globalVar = {};// 存取全局变量
hahavm.memory.nodeUID = 2800;  // 随时修改 - 这里要注意，每次逆向项目, 随着脱dom结构的最后一个nodeUID而修改值
hahavm.memory.innerHTML = {};  // 内存, 存储需要的node节点的innerHTML内容; 形式: {nodeUID: innerHTML string}
hahavm.memory.globalVar.jsonCookie = {};// json格式的cookie
hahavm.memory.globalVar.fontList = ["SimHei", "SimSun", "NSimSun", "FangSong", "KaiTi"]; // 浏览器能够识别的字体
hahavm.memory.globalVar.timeoutID = 0; // 目前只是给setTimeout用的, 未来可能还有更多用处吧
hahavm.memory.globalVar.all = new ldObj(); // 应对document.all检测
