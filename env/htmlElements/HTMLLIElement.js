// HTMLLIElement对象
HTMLLIElement = function HTMLLIElement(){return hahavm.toolsFunc.throwError("TypeError", "Illegal constructor")}
hahavm.toolsFunc.safeProto(HTMLLIElement, "HTMLLIElement");
Object.setPrototypeOf(HTMLLIElement.prototype, HTMLElement.prototype);
hahavm.toolsFunc.defineProperty(HTMLLIElement.prototype, "value", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, HTMLLIElement.prototype, "HTMLLIElement", "value_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, HTMLLIElement.prototype, "HTMLLIElement", "value_set", arguments)}});
hahavm.toolsFunc.defineProperty(HTMLLIElement.prototype, "type", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, HTMLLIElement.prototype, "HTMLLIElement", "type_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, HTMLLIElement.prototype, "HTMLLIElement", "type_set", arguments)}});
