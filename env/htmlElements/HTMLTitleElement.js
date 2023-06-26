// HTMLTitleElement对象
HTMLTitleElement = function HTMLTitleElement(){return hahavm.toolsFunc.throwError("TypeError", "Illegal constructor")}
hahavm.toolsFunc.safeProto(HTMLTitleElement, "HTMLTitleElement");
Object.setPrototypeOf(HTMLTitleElement.prototype, HTMLElement.prototype);
hahavm.toolsFunc.defineProperty(HTMLTitleElement.prototype, "text", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, HTMLTitleElement.prototype, "HTMLTitleElement", "text_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, HTMLTitleElement.prototype, "HTMLTitleElement", "text_set", arguments)}});
