// Promise对象
Promise = function Promise(){
    debugger;
    if (arguments.length < 1) {
        return hahavm.toolsFunc.throwError("TypeError", "Promise resolver undefined is not a function");
    }

    // 把new 出的promise实例对象先绑在 Promise.resolve函数, 和Promise.reject函数上,
    // 以供Promise.resolve, Promise.reject函数内的处理
    hahavm.toolsFunc.setProtoArr.call(Promise.resolve, "self", this);
    hahavm.toolsFunc.setProtoArr.call(Promise.reject, "self", this);
    let executor = arguments[0];
    let result = executor(Promise.resolve, Promise.reject);
    return result;
}
hahavm.toolsFunc.safeProto(Promise, "Promise");
hahavm.toolsFunc.defineProperty(Promise, "all", {configurable:true, enumerable:false, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, Promise, "Promise", "all", arguments)}});
hahavm.toolsFunc.defineProperty(Promise, "allSettled", {configurable:true, enumerable:false, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, Promise, "Promise", "allSettled", arguments)}});
hahavm.toolsFunc.defineProperty(Promise, "any", {configurable:true, enumerable:false, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, Promise, "Promise", "any", arguments)}});
hahavm.toolsFunc.defineProperty(Promise, "race", {configurable:true, enumerable:false, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, Promise, "Promise", "race", arguments)}});
hahavm.toolsFunc.defineProperty(Promise, "resolve", {configurable:true, enumerable:false, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, Promise, "Promise", "resolve", arguments)}});
hahavm.toolsFunc.defineProperty(Promise, "reject", {configurable:true, enumerable:false, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, Promise, "Promise", "reject", arguments)}});
hahavm.toolsFunc.defineProperty(Promise.prototype, "then", {configurable:true, enumerable:false, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, Promise.prototype, "Promise", "then", arguments)}});
hahavm.toolsFunc.defineProperty(Promise.prototype, "catch", {configurable:true, enumerable:false, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, Promise.prototype, "Promise", "catch", arguments)}});
hahavm.toolsFunc.defineProperty(Promise.prototype, "finally", {configurable:true, enumerable:false, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, Promise.prototype, "Promise", "finally", arguments)}});
