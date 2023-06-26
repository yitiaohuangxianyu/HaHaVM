// window对象
// 删除浏览器中不存在的对象
delete global;
delete Buffer;
delete process;
delete GLOBAL;
delete root;
delete VMError;
delete ldObj;
delete globalThis[Symbol.toStringTag];
delete WindowProperties;
delete module;  // 我自己添加的, 这也算是nodejs的一个检测点; 浏览器里面是没有module的
window = globalThis;
Object.setPrototypeOf(window, Window.prototype);



hahavm.toolsFunc.defineProperty(window, "atob", {configurable:true, enumerable:true, writable:true,
    value:function atob(str){
        return hahavm.toolsFunc.base64.base64decode(str);
    }
});
hahavm.toolsFunc.defineProperty(window, "btoa", {
    configurable:true,
    enumerable:true,
    writable:true,
    value:function btoa(str){
        return hahavm.toolsFunc.base64.base64encode(str);
    }
});
hahavm.toolsFunc.defineProperty(window, "name", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, window, "window", "name_get", arguments, '')}, set:function (){return hahavm.toolsFunc.dispatch(this, window, "window", "name_set", arguments)}});

hahavm.toolsFunc.defineProperty(window, "location", {configurable: false});
hahavm.toolsFunc.defineProperty(window, "top", {configurable:false, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, window, "window", "top_get", arguments)}, set:undefined});
hahavm.toolsFunc.defineProperty(window, "self", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, window, "window", "self_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, window, "window", "self_set", arguments)}});
hahavm.toolsFunc.defineProperty(window, "setTimeout", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, window, "window", "setTimeout", arguments)}});
hahavm.toolsFunc.defineProperty(window, "clearTimeout", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, window, "window", "clearTimeout", arguments)}});
hahavm.toolsFunc.defineProperty(window, "prompt", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, window, "window", "prompt", arguments)}});
hahavm.toolsFunc.defineProperty(window, "getComputedStyle", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, window, "window", "getComputedStyle", arguments)}});
hahavm.toolsFunc.defineProperty(window, "open", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, window, "window", "open", arguments)}});
hahavm.toolsFunc.defineProperty(window, "queueMicrotask", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, window, "window", "queueMicrotask", arguments)}});
hahavm.toolsFunc.defineProperty(window, "MutationObserver", {configurable:true, enumerable:false, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, window, "window", "MutationObserver", arguments)}});
hahavm.toolsFunc.defineProperty(window, "WebKitMutationObserver", {configurable:true, enumerable:false, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, window, "window", "WebKitMutationObserver", arguments)}});


eval = hahavm.toolsFunc.hook(eval, undefined, false, function (){},function (){});