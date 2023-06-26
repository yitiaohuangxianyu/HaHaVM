// HTMLDocument对象
HTMLDocument = function HTMLDocument(){return hahavm.toolsFunc.throwError("TypeError", "Illegal constructor")}
hahavm.toolsFunc.safeProto(HTMLDocument, "HTMLDocument");
Object.setPrototypeOf(HTMLDocument.prototype, Document.prototype);
// document对象
document = {}
Object.setPrototypeOf(document, HTMLDocument.prototype);
hahavm.toolsFunc.defineProperty(document, "location", {configurable:false, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, document, "document", "location_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, document, "document", "location_set", arguments)}});
