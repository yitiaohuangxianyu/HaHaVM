// 插件功能相关
!function (){
    // 创建pluginArray
    hahavm.toolsFunc.createPluginArray = function createPluginArray(){
        let pluginArray = {};
        pluginArray = hahavm.toolsFunc.createProxyObj(pluginArray, PluginArray, "pluginArray");
        hahavm.toolsFunc.setProtoArr.call(pluginArray, "length", 0);
        return pluginArray;
    }
    // 添加Plugin
    hahavm.toolsFunc.addPlugin = function addPlugin(plugin){
        let pluginArray = hahavm.memory.globalVar.pluginArray;
        if(pluginArray === undefined){
            pluginArray = hahavm.toolsFunc.createPluginArray();
        }
        let index = pluginArray.length;
        pluginArray[index] = plugin;
        Object.defineProperty(pluginArray, plugin.name, {value: plugin, writable: false, enumerable: false, configurable: true});
        hahavm.toolsFunc.setProtoArr.call(pluginArray, "length", index+1);
        hahavm.memory.globalVar.pluginArray = pluginArray;
        return pluginArray;
    }
    // 创建MimeTypeArray对象
    hahavm.toolsFunc.createMimeTypeArray = function createMimeTypeArray(){
        let mimeTypeArray = {};
        mimeTypeArray = hahavm.toolsFunc.createProxyObj(mimeTypeArray, MimeTypeArray, "mimeTypeArray");
        hahavm.toolsFunc.setProtoArr.call(mimeTypeArray, "length", 0);
        return mimeTypeArray;
    }
    // 添加MimeType
    hahavm.toolsFunc.addMimeType = function addMimeType(mimeType){
        let mimeTypeArray = hahavm.memory.globalVar.mimeTypeArray;
        if(mimeTypeArray === undefined){
            mimeTypeArray = hahavm.toolsFunc.createMimeTypeArray();
        }
        let index = mimeTypeArray.length;
        let flag = true;
        for(let i=0;i<index;i++){
            if(mimeTypeArray[i].type === mimeType.type){
                flag = false;
            }
        }
        if(flag){
            mimeTypeArray[index] = mimeType;
            Object.defineProperty(mimeTypeArray, mimeType.type, {value: mimeType, writable: false, enumerable: false, configurable: true});
            hahavm.toolsFunc.setProtoArr.call(mimeTypeArray, "length", index+1);
        }
        hahavm.memory.globalVar.mimeTypeArray = mimeTypeArray;
        return mimeTypeArray;
    }

    // 创建MimeType
    hahavm.toolsFunc.createMimeType = function createMimeType(mimeTypeJson, plugin){
        let mimeType = {};
        hahavm.toolsFunc.createProxyObj(mimeType, MimeType, "mimeType");
        hahavm.toolsFunc.setProtoArr.call(mimeType, "description", mimeTypeJson.description);
        hahavm.toolsFunc.setProtoArr.call(mimeType, "suffixes", mimeTypeJson.suffixes);
        hahavm.toolsFunc.setProtoArr.call(mimeType, "type", mimeTypeJson.type);
        hahavm.toolsFunc.setProtoArr.call(mimeType, "enabledPlugin", plugin);
        hahavm.toolsFunc.addMimeType(mimeType);
        return mimeType;
    }

    // 创建plugin
    hahavm.toolsFunc.createPlugin = function createPlugin(data){
        let mimeTypes = data.mimeTypes;
        let plugin = {};
        plugin = hahavm.toolsFunc.createProxyObj(plugin, Plugin, "plugin");
        hahavm.toolsFunc.setProtoArr.call(plugin, "description", data.description);
        hahavm.toolsFunc.setProtoArr.call(plugin, "filename", data.filename);
        hahavm.toolsFunc.setProtoArr.call(plugin, "name", data.name);
        hahavm.toolsFunc.setProtoArr.call(plugin, "length", mimeTypes.length);
        for(let i=0; i<mimeTypes.length; i++){
            let mimeType = hahavm.toolsFunc.createMimeType(mimeTypes[i], plugin);
            plugin[i] = mimeType;
            Object.defineProperty(plugin, mimeTypes[i].type, {value: mimeType, writable: false, enumerable: false, configurable: true});
        }
        hahavm.toolsFunc.addPlugin(plugin);
        return plugin;
    }

    // 解析URL属性
    hahavm.toolsFunc.parseUrl = function parseUrl(str) {
        if (!parseUrl || !parseUrl.options) {
            parseUrl.options = {
                strictMode: false,
                key: ["href", "protocol", "host", "userInfo", "user", "password", "hostname", "port", "relative", "pathname", "directory", "file", "search", "hash"],
                q: {
                    name: "queryKey",
                    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                },
                parser: {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                }
            };
        }
        if (!str) {
            return '';
        }
        var o = parseUrl.options,
            m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
            urlJson = {},
            i = 14;
        while (i--) urlJson[o.key[i]] = m[i] || "";
        urlJson[o.q.name] = {};
        urlJson[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
            if ($1) urlJson[o.q.name][$1] = $2;
        });
        delete  urlJson["queryKey"];
        delete  urlJson["userInfo"];
        delete  urlJson["user"];
        delete  urlJson["password"];
        delete  urlJson["relative"];
        delete  urlJson["directory"];
        delete  urlJson["file"];
        urlJson["protocol"] += ":";
        urlJson["origin"] = urlJson["protocol"] + "//" + urlJson["host"];
        urlJson["search"] = urlJson["search"] && "?" + urlJson["search"];
        urlJson["hash"] = urlJson["hash"] && "#" + urlJson["hash"];
        return urlJson;
    }

    // 单标签字符串解析
    hahavm.toolsFunc.getTagJson = function getTagJson(tagStr){
        let arrList = tagStr.match("<(.*?)>")[1].split(" ");
        let tagJson = {};
        tagJson["type"] = arrList[0];
        tagJson["prop"] = {};
        for(let i=1;i<arrList.length;i++){
            let item = arrList[i].split("=");
            let key = item[0];
            let value = item[1].replaceAll("\"","").replaceAll("'","");
            tagJson["prop"][key] = value;
        }
        return tagJson;
    }


    hahavm.toolsFunc.getCollection = function getCollection(type){
        let collection = [];
        let tags = Object.values(hahavm.memory.node);
        for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            if(hahavm.toolsFunc.getType(tag) === type){
                collection.push(tag);
            }
        }
        return collection;
    }

    hahavm.toolsFunc.getNodeList = function getNodeList(name){
        let nodeList = [];
        for (let i = 0; i < hahavm.memory.tag.length; i++) {
            let tag = hahavm.memory.tag[i];
            // 这里要通过getProtoArr来获取name属性
            if (hahavm.toolsFunc.getProtoArr.call(tag, "name") === name){
                nodeList.push(tag);
            }
        }
        return nodeList;
    }
    
    // 获取原型对象上自身属性值
    hahavm.toolsFunc.getProtoArr = function getProtoArr(key){
        return this[hahavm.memory.symbolData] && this[hahavm.memory.symbolData][key];
    }
     // 设置原型对象上自身属性值
    hahavm.toolsFunc.setProtoArr = function setProtoArr(key, value){
        if(!(hahavm.memory.symbolData in this)){
            Object.defineProperty(this, hahavm.memory.symbolData, {
                enumerable:false,
                configurable:false,
                writable:true,
                value:{}
            });
        }
        this[hahavm.memory.symbolData][key] = value;
    }

    // 获取一个自增的ID
    hahavm.toolsFunc.getID = function getID(){
        if(hahavm.memory.ID === undefined){
            hahavm.memory.ID = 0;
        }
        hahavm.memory.ID += 1;
        return hahavm.memory.ID;
    }

    // 获取一个node节点的自增ID
    hahavm.toolsFunc.getNodeUID = function getNodeUID(){
        if(hahavm.memory.nodeUID === undefined){
            hahavm.memory.nodeUID = 0;
        }
        hahavm.memory.nodeUID += 1;
        return `node_${hahavm.memory.nodeUID}`;
    }

    // 代理原型对象 - 代理功能作废, 仅剩 设定obj对象原型 功能
    hahavm.toolsFunc.createProxyObj = function createProxyObj(obj, proto, name){
        // name 参数作废
        Object.setPrototypeOf(obj,proto.prototype);
        return obj;
    }
    // hook 插件
    hahavm.toolsFunc.hook = function hook(func, funcInfo, isDebug, onEnter, onLeave, isExec){
        // func ： 原函数，需要hook的函数
        // funcInfo: 是一个对象，objName，funcName属性
        // isDebug: 布尔类型, 是否进行调试，关键点定位，回溯调用栈
        // onEnter：函数， 原函数执行前执行的函数，改原函数入参，或者输出入参
        // onLeave： 函数，原函数执行完之后执行的函数，改原函数的返回值，或者输出原函数的返回值
        // isExec ： 布尔， 是否执行原函数，比如无限debuuger函数
        if(typeof func !== 'function'){
            return func;
        }
        if(funcInfo === undefined){
            funcInfo = {};
            funcInfo.objName = "globalThis";
            funcInfo.funcName = func.name || '';
        }
        if(isDebug === undefined){
            isDebug = false;
        }
        if(!onEnter){
            onEnter = function (obj){
                console.log(`{hook|${funcInfo.objName}[${funcInfo.funcName}]正在调用，参数是${JSON.stringify(obj.args)}}`);
            }
        }
        if(!onLeave){
            onLeave = function (obj){
                console.log(`{hook|${funcInfo.objName}[${funcInfo.funcName}]正在调用，返回值是[${obj.result}}]`);
            }
        }
        if(isExec === undefined){
            isExec = true;
        }
        // 替换的函数
        let hookFunc = function (){
            if(isDebug){
                debugger;
            }
            let obj = {};
            obj.args = [];
            for (let i=0;i<arguments.length;i++){
                obj.args[i] = arguments[i];
            }
            // 原函数执行前
            onEnter.call(this, obj); // onEnter(obj);
            // 原函数正在执行
            let result;
            if(isExec){
                result = func.apply(this, obj.args);
            }
            obj.result = result;
            // 原函数执行后
            onLeave.call(this, obj); // onLeave(obj);
            // 返回结果
            return obj.result;
        }
        // hook 后的函数进行native
        hahavm.toolsFunc.setNative(hookFunc, funcInfo.funcName);
        hahavm.toolsFunc.reNameFunc(hookFunc, funcInfo.funcName);
        return hookFunc;
    }
    // hook 对象的属性，本质是替换属性描述符
    hahavm.toolsFunc.hookObj = function hookObj(obj, objName, propName, isDebug){
        // obj :需要hook的对象
        // objName: hook对象的名字
        // propName： 需要hook的对象属性名
        // isDubug: 是否需要debugger
        let oldDescriptor = Object.getOwnPropertyDescriptor(obj, propName);
        let newDescriptor = {};
        if(!oldDescriptor.configurable){ // 如果是不可配置的，直接返回
            return;
        }
        // 必须有的属性描述
        newDescriptor.configurable = true;
        newDescriptor.enumerable = oldDescriptor.enumerable;
        if(oldDescriptor.hasOwnProperty("writable")){
            newDescriptor.writable = oldDescriptor.writable;
        }
        if(oldDescriptor.hasOwnProperty("value")){
            let value = oldDescriptor.value;
            if(typeof value !== "function"){
                return;
            }
            let funcInfo = {
                "objName": objName,
                "funcName": propName
            }
            newDescriptor.value = hahavm.toolsFunc.hook(value,funcInfo ,isDebug);
        }
        if(oldDescriptor.hasOwnProperty("get")){
            let get = oldDescriptor.get;
            let funcInfo = {
                "objName": objName,
                "funcName": `get ${propName}`
            }
            newDescriptor.get = hahavm.toolsFunc.hook(get,funcInfo ,isDebug);
        }
        if(oldDescriptor.hasOwnProperty("set")){
            let set = oldDescriptor.set;
            let funcInfo = {
                "objName": objName,
                "funcName": `set ${propName}`
            }
            newDescriptor.set = hahavm.toolsFunc.hook(set,funcInfo ,isDebug);
        }
        Object.defineProperty(obj, propName, newDescriptor);
    }
    // hook 原型对象的所有属性
    hahavm.toolsFunc.hookProto = function hookProto(proto, isDebug){
        // proto :函数原型
        // isDebug: 是否debugger
        let protoObj = proto.prototype;
        let name = proto.name;
        for(const prop in Object.getOwnPropertyDescriptors(protoObj)){
            hahavm.toolsFunc.hookObj(protoObj, `${name}.prototype`, prop, isDebug);
        }
        console.log(`hook ${name}.prototype`);
    }
    // 获取对象类型
    hahavm.toolsFunc.getType = function getType(obj){
        return Object.prototype.toString.call(obj);
    }



    // envFunc函数分发器
    hahavm.toolsFunc.dispatch = function dispatch(self, obj, objName, funcName, argList, defaultValue){
        let name = `${objName}_${funcName}`; // EventTarget_addEventListener
        if(Object.getOwnPropertyDescriptor(obj, "constructor") !== undefined){
            if(Object.getOwnPropertyDescriptor(self, "constructor") !== undefined){
                // self 不是实例对象
                return hahavm.toolsFunc.throwError('TypeError', 'Illegal invocation');
            }
        }
        try{
            // 在dispatch()函数里输出属性方法调用日志, 替代proxy代理的功能
            console.log(`调用${name}属性/方法`);
            return hahavm.envFunc[name].apply(self, argList);
        }catch (e){
            if(defaultValue === undefined){
                console.log(`[${name}]正在执行，错误信息: ${e.message}`);
            }
            return defaultValue;
        }
    }
    // 定义对象属性defineProperty
    hahavm.toolsFunc.defineProperty = function defineProperty(obj, prop, oldDescriptor){
        let newDescriptor = {};
        newDescriptor.configurable = oldDescriptor.configurable;
        newDescriptor.enumerable = oldDescriptor.enumerable;
        if(oldDescriptor.hasOwnProperty("writable")){
            newDescriptor.writable = oldDescriptor.writable;
        }
        if(oldDescriptor.hasOwnProperty("value")){
            let value = oldDescriptor.value;
            if(typeof value === "function"){
                hahavm.toolsFunc.safeFunc(value, prop);
            }
            newDescriptor.value = value;
        }
        if(oldDescriptor.hasOwnProperty("get")){
            let get = oldDescriptor.get;
            if(typeof get === "function"){
                hahavm.toolsFunc.safeFunc(get, `get ${prop}`);
            }
            newDescriptor.get = get;
        }
        if(oldDescriptor.hasOwnProperty("set")){
            let set = oldDescriptor.set;
            if(typeof set === "function"){
                hahavm.toolsFunc.safeFunc(set, `set ${prop}`);
            }
            newDescriptor.set = set;
        }
        Object.defineProperty(obj, prop, newDescriptor);
    }
    // 函数native化
    !function(){
        // 拿原始toString()函数暂存起来
        const $toString = Function.prototype.toString;
        // 函数$callTostring的意思是 - 当调用它的时候就相当于调用原始toStirng()函数
        const $callTostring = Function.prototype.call.bind($toString);
        // 一个存东西的地方 - memoryMap, 是整个所有代码的全局变量
        const memoryMap = new Map();
        // 新的toString()函数 - myToString, 目的是调用它的时候返回合适的toString()方法, 防止toString()值检测
        const myToString = function toString(){
            return typeof this === 'function' && memoryMap.get(this) || $callTostring(this);
        }
        // 改造原始的Function.prototype.toString()方法, 
        Object.defineProperty(Function.prototype, "toString", {enumerable: false, configurable: true, writable: true, value: myToString});
        // set_native()函数用于toString()方法的保护, 从memoryMap里拿对应的toString()值。
        // set_native()配合myToString()使用
        function set_native(obj, value){
            memoryMap.set(obj, value);
        }
        // 保护Function.prototype.toString方法，或者叫native化
        set_native(Function.prototype.toString, "function toString() { [native code] }");
        // 保护func的toString方法，或者叫native化
        hahavm.toolsFunc.setNative = function setNative(func, funcname){
            Object.defineProperty(func,"name",{value: funcname || func.name || '', writable: false, enumerable: false, configurable: true});
            set_native(func, `function ${funcname || func.name || ''}() { [native code] }`);
        }
    }();
    
    // 对象重命名
    hahavm.toolsFunc.reNameObj = function reNameObj(obj, name){
        Object.defineProperty(obj.prototype, Symbol.toStringTag, {
            configurable:true,
            enumerable:false,
            value:name,
            writable:false
        });
    }
    // 函数重命名
    hahavm.toolsFunc.reNameFunc = function reNameFunc(func, name){
        Object.defineProperty(func, "name", {
            configurable:true,
            enumerable:false,
            writable:false,
            value:name
        });
    }
    // 函数保护方法
    hahavm.toolsFunc.safeFunc = function safeFunc(func, name){
        hahavm.toolsFunc.setNative(func, name);
        hahavm.toolsFunc.reNameFunc(func, name);
    }
    // 原型保护方法
    hahavm.toolsFunc.safeProto = function safeProto(obj, name){
        hahavm.toolsFunc.setNative(obj, name);
        hahavm.toolsFunc.reNameObj(obj, name);
    }
    // 抛错函数
    hahavm.toolsFunc.throwError = function throwError(name, message){
        let e = new Error();
        e.name = name;
        e.message = message;
        e.stack = `${name}: ${message}\n    at snippet://`;
        throw e;
    }
    // base64编码解码
    hahavm.toolsFunc.base64 = {};
    hahavm.toolsFunc.base64.base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    hahavm.toolsFunc.base64.base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    hahavm.toolsFunc.base64.base64encode = function base64encode(str) {
      var out, i, len;
      var c1, c2, c3;

      len = str.length;
      i = 0;
      out = "";
      while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
          out += hahavm.toolsFunc.base64.base64EncodeChars.charAt(c1 >> 2);
          out += hahavm.toolsFunc.base64.base64EncodeChars.charAt((c1 & 0x3) << 4);
          out += "==";
          break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
          out += hahavm.toolsFunc.base64.base64EncodeChars.charAt(c1 >> 2);
          out += hahavm.toolsFunc.base64.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
          out += hahavm.toolsFunc.base64.base64EncodeChars.charAt((c2 & 0xF) << 2);
          out += "=";
          break;
        }
        c3 = str.charCodeAt(i++);
        out += hahavm.toolsFunc.base64.base64EncodeChars.charAt(c1 >> 2);
        out += hahavm.toolsFunc.base64.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += hahavm.toolsFunc.base64.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += hahavm.toolsFunc.base64.base64EncodeChars.charAt(c3 & 0x3F);
      }
      return out;
    }
    hahavm.toolsFunc.base64.base64decode = function base64decode(str) {
      var c1, c2, c3, c4;
      var i, len, out;

      len = str.length;
      i = 0;
      out = "";
      while (i < len) {
        /* c1 */
        do {
          c1 = hahavm.toolsFunc.base64.base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
          break;

        /* c2 */
        do {
          c2 = hahavm.toolsFunc.base64.base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
          break;

        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        /* c3 */
        do {
          c3 = str.charCodeAt(i++) & 0xff;
          if (c3 == 61)
            return out;
          c3 = hahavm.toolsFunc.base64.base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
          break;

        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        /* c4 */
        do {
          c4 = str.charCodeAt(i++) & 0xff;
          if (c4 == 61)
            return out;
          c4 = hahavm.toolsFunc.base64.base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
          break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
      }
      return out;
    }

}();