// HTMLHeadingElement对象
HTMLHeadingElement = function HTMLHeadingElement(){return hahavm.toolsFunc.throwError("TypeError", "Illegal constructor")}
hahavm.toolsFunc.safeProto(HTMLHeadingElement, "HTMLHeadingElement");
Object.setPrototypeOf(HTMLHeadingElement.prototype, HTMLElement.prototype);
hahavm.toolsFunc.defineProperty(HTMLHeadingElement.prototype, "align", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, HTMLHeadingElement.prototype, "HTMLHeadingElement", "align_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, HTMLHeadingElement.prototype, "HTMLHeadingElement", "align_set", arguments)}});
