// HTMLLabelElement对象
HTMLLabelElement = function HTMLLabelElement(){return hahavm.toolsFunc.throwError("TypeError", "Illegal constructor")}
hahavm.toolsFunc.safeProto(HTMLLabelElement, "HTMLLabelElement");
Object.setPrototypeOf(HTMLLabelElement.prototype, HTMLElement.prototype);
hahavm.toolsFunc.defineProperty(HTMLLabelElement.prototype, "form", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, HTMLLabelElement.prototype, "HTMLLabelElement", "form_get", arguments)}, set:undefined});
hahavm.toolsFunc.defineProperty(HTMLLabelElement.prototype, "htmlFor", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, HTMLLabelElement.prototype, "HTMLLabelElement", "htmlFor_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, HTMLLabelElement.prototype, "HTMLLabelElement", "htmlFor_set", arguments)}});
hahavm.toolsFunc.defineProperty(HTMLLabelElement.prototype, "control", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, HTMLLabelElement.prototype, "HTMLLabelElement", "control_get", arguments)}, set:undefined});
