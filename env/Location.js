// Location对象
Location = function Location(){return hahavm.toolsFunc.throwError("TypeError", "Illegal constructor")}
hahavm.toolsFunc.safeProto(Location, "Location");
// location对象
location = {}
Object.setPrototypeOf(location, Location.prototype);
hahavm.toolsFunc.defineProperty(location, "valueOf", {configurable:false, enumerable:false, writable:false, value:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "valueOf", arguments)}});
hahavm.toolsFunc.defineProperty(location, "ancestorOrigins", {configurable:false, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "ancestorOrigins_get", arguments)}, set:undefined});
hahavm.toolsFunc.defineProperty(location, "href", {configurable:false, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "href_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "href_set", arguments)}});
hahavm.toolsFunc.defineProperty(location, "origin", {configurable:false, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "origin_get", arguments)}, set:undefined});
hahavm.toolsFunc.defineProperty(location, "protocol", {configurable:false, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "protocol_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "protocol_set", arguments)}});
hahavm.toolsFunc.defineProperty(location, "host", {configurable:false, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "host_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "host_set", arguments)}});
hahavm.toolsFunc.defineProperty(location, "hostname", {configurable:false, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "hostname_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "hostname_set", arguments)}});
hahavm.toolsFunc.defineProperty(location, "port", {configurable:false, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "port_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "port_set", arguments)}});
hahavm.toolsFunc.defineProperty(location, "pathname", {configurable:false, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "pathname_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "pathname_set", arguments)}});
hahavm.toolsFunc.defineProperty(location, "search", {configurable:false, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "search_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "search_set", arguments)}});
hahavm.toolsFunc.defineProperty(location, "hash", {configurable:false, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "hash_get", arguments)}, set:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "hash_set", arguments)}});
hahavm.toolsFunc.defineProperty(location, "assign", {configurable:false, enumerable:true, writable:false, value:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "assign", arguments)}});
hahavm.toolsFunc.defineProperty(location, "reload", {configurable:false, enumerable:true, writable:false, value:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "reload", arguments)}});
hahavm.toolsFunc.defineProperty(location, "replace", {configurable:false, enumerable:true, writable:false, value:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "replace", arguments)}});
hahavm.toolsFunc.defineProperty(location, "toString", {configurable:false, enumerable:true, writable:false, value:function (){return hahavm.toolsFunc.dispatch(this, location, "location", "toString", arguments)}});
