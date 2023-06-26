// PluginArray对象
PluginArray = function PluginArray(){return hahavm.toolsFunc.throwError("TypeError", "Illegal constructor")}
hahavm.toolsFunc.safeProto(PluginArray, "PluginArray");
hahavm.toolsFunc.defineProperty(PluginArray.prototype, "length", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, PluginArray.prototype, "PluginArray", "length_get", arguments)}, set:undefined});
hahavm.toolsFunc.defineProperty(PluginArray.prototype, "item", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, PluginArray.prototype, "PluginArray", "item", arguments)}});
hahavm.toolsFunc.defineProperty(PluginArray.prototype, "namedItem", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, PluginArray.prototype, "PluginArray", "namedItem", arguments)}});
hahavm.toolsFunc.defineProperty(PluginArray.prototype, "refresh", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, PluginArray.prototype, "PluginArray", "refresh", arguments)}});
