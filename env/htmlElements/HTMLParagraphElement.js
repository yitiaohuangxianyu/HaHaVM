// HTMLParagraphElement对象
HTMLParagraphElement = function HTMLParagraphElement(){return hahavm.toolsFunc.throwError("TypeError", "Illegal constructor")}
hahavm.toolsFunc.safeProto(HTMLParagraphElement, "HTMLParagraphElement");
Object.setPrototypeOf(HTMLParagraphElement.prototype, HTMLElement.prototype);
hahavm.toolsFunc.defineProperty(HTMLParagraphElement.prototype, "align", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, HTMLParagraphElement.prototype, "HTMLParagraphElement", "align_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, HTMLParagraphElement.prototype, "HTMLParagraphElement", "align_set", arguments)}});
