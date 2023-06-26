// HTMLMapElement对象
HTMLMapElement = function HTMLMapElement(){return hahavm.toolsFunc.throwError("TypeError", "Illegal constructor")}
hahavm.toolsFunc.safeProto(HTMLMapElement, "HTMLMapElement");
Object.setPrototypeOf(HTMLMapElement.prototype, HTMLElement.prototype);
hahavm.toolsFunc.defineProperty(HTMLMapElement.prototype, "name", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, HTMLMapElement.prototype, "HTMLMapElement", "name_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, HTMLMapElement.prototype, "HTMLMapElement", "name_set", arguments)}});
hahavm.toolsFunc.defineProperty(HTMLMapElement.prototype, "areas", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, HTMLMapElement.prototype, "HTMLMapElement", "areas_get", arguments)}, set:undefined});
