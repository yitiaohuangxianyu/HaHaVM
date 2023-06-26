// Geolocation对象
Geolocation = function Geolocation(){return hahavm.toolsFunc.throwError("TypeError", "Illegal constructor")}
hahavm.toolsFunc.safeProto(Geolocation, "Geolocation");
hahavm.toolsFunc.defineProperty(Geolocation.prototype, "clearWatch", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, Geolocation.prototype, "Geolocation", "clearWatch", arguments)}});
hahavm.toolsFunc.defineProperty(Geolocation.prototype, "getCurrentPosition", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, Geolocation.prototype, "Geolocation", "getCurrentPosition", arguments)}});
hahavm.toolsFunc.defineProperty(Geolocation.prototype, "watchPosition", {configurable:true, enumerable:true, writable:true, value:function (){return hahavm.toolsFunc.dispatch(this, Geolocation.prototype, "Geolocation", "watchPosition", arguments)}});
// geolocation对象
geolocation = {}
Object.setPrototypeOf(geolocation, Geolocation.prototype);