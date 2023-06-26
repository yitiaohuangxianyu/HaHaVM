// PromiseRejectionEvent对象
PromiseRejectionEvent = function PromiseRejectionEvent(){
    debugger;
    return hahavm.toolsFunc.throwError("TypeError", "Failed to construct 'PromiseRejectionEvent': 2 arguments required, but only 0 present.")
}
hahavm.toolsFunc.safeProto(PromiseRejectionEvent, "PromiseRejectionEvent");
Object.setPrototypeOf(PromiseRejectionEvent.prototype, Event.prototype);
hahavm.toolsFunc.defineProperty(PromiseRejectionEvent.prototype, "promise", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, PromiseRejectionEvent.prototype, "PromiseRejectionEvent", "promise_get", arguments)}, set:undefined});
hahavm.toolsFunc.defineProperty(PromiseRejectionEvent.prototype, "reason", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, PromiseRejectionEvent.prototype, "PromiseRejectionEvent", "reason_get", arguments)}, set:undefined});
