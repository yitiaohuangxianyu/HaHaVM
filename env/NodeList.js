// NodeList对象
NodeList = function NodeList(){return hahavm.toolsFunc.throwError("TypeError", "Illegal constructor")}
hahavm.toolsFunc.safeProto(NodeList, "NodeList");
hahavm.toolsFunc.defineProperty(NodeList.prototype, "entries", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, NodeList.prototype, "NodeList", "entries", arguments)}});
hahavm.toolsFunc.defineProperty(NodeList.prototype, "keys", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, NodeList.prototype, "NodeList", "keys", arguments)}});
hahavm.toolsFunc.defineProperty(NodeList.prototype, "values", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, NodeList.prototype, "NodeList", "values", arguments)}});
hahavm.toolsFunc.defineProperty(NodeList.prototype, "forEach", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, NodeList.prototype, "NodeList", "forEach", arguments)}});
hahavm.toolsFunc.defineProperty(NodeList.prototype, "length", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, NodeList.prototype, "NodeList", "length_get", arguments)}, set:undefined});
hahavm.toolsFunc.defineProperty(NodeList.prototype, "item", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, NodeList.prototype, "NodeList", "item", arguments)}});
