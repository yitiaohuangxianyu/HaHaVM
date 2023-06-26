// MessageChannel对象
MessageChannel = function MessageChannel(){}
hahavm.toolsFunc.safeProto(MessageChannel, "MessageChannel");
hahavm.toolsFunc.defineProperty(MessageChannel.prototype, "port1", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, MessageChannel.prototype, "MessageChannel", "port1_get", arguments)}, set:undefined});
hahavm.toolsFunc.defineProperty(MessageChannel.prototype, "port2", {configurable:true, enumerable:true, get:function (){return hahavm.toolsFunc.dispatch(this, MessageChannel.prototype, "MessageChannel", "port2_get", arguments)}, set:undefined});
