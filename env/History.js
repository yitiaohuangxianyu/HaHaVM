// History对象
History = function History(){return hahavm.toolsFunc.throwError("TypeError", "Illegal constructor")}
hahavm.toolsFunc.safeProto(History, "History");
hahavm.toolsFunc.defineProperty(History.prototype, "length", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, History.prototype, "History", "length_get", arguments)}, set:undefined});
hahavm.toolsFunc.defineProperty(History.prototype, "scrollRestoration", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, History.prototype, "History", "scrollRestoration_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, History.prototype, "History", "scrollRestoration_set", arguments)}});
hahavm.toolsFunc.defineProperty(History.prototype, "state", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, History.prototype, "History", "state_get", arguments)}, set:undefined});
hahavm.toolsFunc.defineProperty(History.prototype, "back", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, History.prototype, "History", "back", arguments)}});
hahavm.toolsFunc.defineProperty(History.prototype, "forward", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, History.prototype, "History", "forward", arguments)}});
hahavm.toolsFunc.defineProperty(History.prototype, "go", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, History.prototype, "History", "go", arguments)}});
hahavm.toolsFunc.defineProperty(History.prototype, "pushState", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, History.prototype, "History", "pushState", arguments)}});
hahavm.toolsFunc.defineProperty(History.prototype, "replaceState", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, History.prototype, "History", "replaceState", arguments)}});
// history对象
history = {}
Object.setPrototypeOf(history, History.prototype);