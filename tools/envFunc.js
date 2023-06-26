// 浏览器接口具体的实现
!function (){
    hahavm.envFunc.Document_all_get = function Document_all_get(){
        let all = hahavm.memory.globalVar.all;
        Object.setPrototypeOf(all, HTMLAllCollection.prototype);
        return all;
    }
    hahavm.envFunc.Event_timeStamp_get = function Event_timeStamp_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "timeStamp");
    }
    hahavm.envFunc.MouseEvent_clientY_get = function MouseEvent_clientY_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "clientY");
    }
    hahavm.envFunc.MouseEvent_clientX_get = function MouseEvent_clientX_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "clientX");
    }

    // EventTarget 原型链
    hahavm.envFunc.EventTarget_addEventListener = function EventTarget_addEventListener(){
        let type = arguments[0];
        let listener = arguments[1];
        let options = arguments[2];
        let event = {
            "self": this,
            "type": type,
            "listener":listener,
            "options":options
        }
        if(hahavm.memory.asyncEvent.listener === undefined){
            hahavm.memory.asyncEvent.listener = {};
        }
        if(hahavm.memory.asyncEvent.listener[type] === undefined){
           hahavm.memory.asyncEvent.listener[type] = [];
        }
        hahavm.memory.asyncEvent.listener[type].push(event);
    }
    hahavm.envFunc.EventTarget_dispatchEvent = function EventTarget_dispatchEvent(){
        debugger;
    }

    // navigator的BatteryManager 原型链
    hahavm.envFunc.BatteryManager_level_get = function BatteryManager_level_get(){
        return 1;
    }
    hahavm.envFunc.BatteryManager_chargingTime_get = function BatteryManager_chargingTime_get(){
        return 0;
    }
    hahavm.envFunc.BatteryManager_charging_get = function BatteryManager_charging_get(){
        return true;
    }
    hahavm.envFunc.Navigator_getBattery = function Navigator_getBattery(){
        let batteryManager = {};
        batteryManager = hahavm.toolsFunc.createProxyObj(batteryManager, BatteryManager, "batteryManager");
        let obj = {
            "then":function (callBack){
                let _callBack = callBack;
                callBack = function (){
                    return _callBack(batteryManager);
                }
                if(hahavm.memory.asyncEvent.promise === undefined){
                    hahavm.memory.asyncEvent.promise = [];
                }
                hahavm.memory.asyncEvent.promise.push(callBack);
            }
        }
        return obj;
    }
    
    hahavm.envFunc.XMLHttpRequest_open = function XMLHttpRequest_open(){
        // 浏览器接口
        let method = arguments[0];
        let url = arguments[1];
        return url;
    }

    // HTMLElement 原型链
    hahavm.envFunc.HTMLElement_offsetHeight_get = function HTMLElement_offsetHeight_get(){
        debugger;
        let fontFamily = this.style.fontFamily;
        if(hahavm.memory.globalVar.fontList.indexOf(fontFamily) !== -1){// 能够识别的字体, 暂时这样
            return 666;
        }else{ // 无法识别的字体
            return 999;
        }
    }
    hahavm.envFunc.HTMLElement_offsetWidth_get = function HTMLElement_offsetWidth_get(){
        let fontFamily = this.style.fontFamily;
        if(hahavm.memory.globalVar.fontList.indexOf(fontFamily) !== -1){// 能够识别的字体, 暂时这样
            return 1666;
        }else{ // 无法识别的字体
            return 1999;
        }
    }
    hahavm.envFunc.HTMLElement_accessKey_set = function HTMLElement_accessKey_set(){
        let keyString = arguments[0];
        if (typeof keyString === 'string') {
            hahavm.toolsFunc.setProtoArr.call(this, "accessKey", keyString);
        }
    }
    hahavm.envFunc.HTMLElement_accessKey_get = function HTMLElement_accessKey_get(){
        let keyString = hahavm.toolsFunc.getProtoArr.call(this, "accessKey");
        if (typeof keyString === 'undefined') {
            return '';
        }
        return keyString;
    }
    hahavm.envFunc.HTMLElement_innerText_set = function HTMLElement_innerText_set(){
        let innerText = arguments[0];
        if (typeof innerText === 'string') {
            hahavm.toolsFunc.setProtoArr.call(this, "innerText", innerText);
        }
    }
    hahavm.envFunc.HTMLElement_innerText_get = function HTMLElement_innerText_get(){
        let innerText = hahavm.toolsFunc.getProtoArr.call(this, "innerText");
        if (typeof innerText === 'undefined') {
            return '';
        }
        return innerText;
    }
    hahavm.envFunc.HTMLElement_onload_get = function HTMLElement_onload_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "onload");
    }
    hahavm.envFunc.HTMLElement_onload_set = function HTMLElement_onload_set(){
        // onload事件属于宏任务 - MacroTask
        let type = "load";
        let listener = arguments[0];
        // 对应加上load事件回调函数 - listener
        EventTarget.prototype.addEventListener.call(this, type, listener);
        // 设置onload属性的值为listner函数
        hahavm.toolsFunc.setProtoArr.call(this, "onload", listener);
    }

    // Element 原型链
    hahavm.envFunc.Element_children_get = function Element_children_get(){
        let childrenUID = hahavm.toolsFunc.getProtoArr.call(this, "childrenUID");
        let collection = [];
        for (let i = 0; i < childrenUID.length; i++) {
            let element = hahavm.memory.node[childrenUID[i]];
            if (element instanceof Element) {
                collection.push(element);
            }
        }
        collection = hahavm.toolsFunc.createProxyObj(collection, HTMLCollection, "collection");
        return collection;
    }
    hahavm.envFunc.Element_id_get = function Element_id_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "id");
    }
    hahavm.envFunc.Element_id_set = function Element_id_set(){
        let value = arguments[0];
        hahavm.toolsFunc.setProtoArr.call(this, "id", value);
    }
    hahavm.envFunc.Element_setAttribute = function Element_setAttribute(key, value){
        // 注意 key要转变成小写
        key = key.toLowerCase();
        if (key === "href") {
            // 如果设置的属性是href，估计大概率是<a>标签的, 或者是window.location.href,
            // 所以需要特殊处理
            let url = value;
            if(url.indexOf("http") === -1){
                url = location.protocol + "//" + location.hostname + url;
            }
            let jsonUrl = hahavm.toolsFunc.parseUrl(url);
            hahavm.toolsFunc.setProtoArr.call(this, "origin", jsonUrl["origin"]);
            hahavm.toolsFunc.setProtoArr.call(this, "protocol", jsonUrl["protocol"]);
            hahavm.toolsFunc.setProtoArr.call(this, "host", jsonUrl["host"]);
            hahavm.toolsFunc.setProtoArr.call(this, "hostname", jsonUrl["hostname"]);
            hahavm.toolsFunc.setProtoArr.call(this, "port", jsonUrl["port"]);
            hahavm.toolsFunc.setProtoArr.call(this, "pathname", jsonUrl["pathname"]);
            hahavm.toolsFunc.setProtoArr.call(this, "search", jsonUrl["search"]);
            hahavm.toolsFunc.setProtoArr.call(this, "hash", jsonUrl["hash"]);
            hahavm.toolsFunc.setProtoArr.call(this, "href", jsonUrl["href"]);
        } else if (typeof value === "boolean") {
            // bool值要变成字符串
            hahavm.toolsFunc.setProtoArr.call(this, key, String(value));
        } else {
            // 其他的属性, 先暂时直接设置吧
            hahavm.toolsFunc.setProtoArr.call(this, key, value);
        }
    }
    hahavm.envFunc.Element_append = function Element_append(){
        let element = arguments[0];
        let nodeUID = hahavm.toolsFunc.getProtoArr.call(element, "nodeUID");
        let childrenUID = hahavm.toolsFunc.getProtoArr.call(this, "childrenUID");
        if (typeof childrenUID === "undefined") {
            childrenUID = [];
        }
        childrenUID.push(nodeUID);
        hahavm.toolsFunc.setProtoArr.call(this, "childrenUID", childrenUID);
    }
    hahavm.envFunc.Element_innerHTML_get = function Element_innerHTML_get(){
        // 暂时如此, 以后需要改
        debugger;
        let nodeUID = hahavm.toolsFunc.getProtoArr.call(this, "nodeUID");
        return hahavm.memory.innerHTML[nodeUID];
    }
    // 这个需要改哦。。。因为作者写的时候里面固定了, 本不应该的
    // hahavm.envFunc.Element_innerHTML_set = function Element_innerHTML_set(){
    //     let htmlStr = arguments[0];
    //     // <span lang="zh" style="font-family:mmll;font-size:160px">fontTest</span>
    //     let style = {
    //         "font-size":"160px",
    //         "font-family":"mmll",
    //         "fontFamily":"mmll"
    //     };
    //     style = hahavm.toolsFunc.createProxyObj(style,CSSStyleDeclaration, "style");
    //     let tagJson = {
    //         "type": "span",
    //         "prop":{
    //             "lang":"zh",
    //             "style":style,
    //             "textContent":"fontTest"
    //         }
    //     }
    //     let span = document.createElement(tagJson["type"]);
    //     for (const key in tagJson["prop"]) {
    //         hahavm.toolsFunc.setProtoArr.call(span, key, tagJson["prop"][key]);
    //     }
    //     let collection = [];
    //     collection.push(span);
    //     collection = hahavm.toolsFunc.createProxyObj(collection, HTMLCollection, "collection");
    //     hahavm.toolsFunc.setProtoArr.call(this, "children", collection);
    // }
    
    // Node 原型链
    hahavm.envFunc.Node_appendChild = function Node_appendChild(){
        let childNode = arguments[0];
        let childUID = hahavm.toolsFunc.getProtoArr.call(childNode, "nodeUID");

        let childrenUID = hahavm.toolsFunc.getProtoArr.call(this, "childrenUID");
        if (typeof childrenUID === "undefined") {
            childrenUID = [];
        }
        childrenUID.push(childUID);
        hahavm.toolsFunc.setProtoArr.call(this, "childrenUID", childrenUID);

        // 如果childNode是已经有parentNode的，那就需要从原始parentNode删除
        let originParentUID = hahavm.toolsFunc.getProtoArr.call(childNode, "parentUID");
        if (typeof originParentUID !== "undefined") {
            let originParent = hahavm.memory.node[originParentUID];
            let oriChildrenUID = hahavm.toolsFunc.getProtoArr.call(originParent, "childrenUID");
            let index = oriChildrenUID.indexOf(childUID);
            oriChildrenUID.splice(index, 1);  // 删除child nodeUID
            hahavm.toolsFunc.setProtoArr.call(originParent, "childrenUID");
        }
        
        // 给node更改成新的parentUID
        let newParentUID = hahavm.toolsFunc.getProtoArr.call(this, "nodeUID");
        hahavm.toolsFunc.setProtoArr.call(childNode, "parentUID");

        return childNode;
    }
    hahavm.envFunc.Node_childNodes_get = function Node_childNodes_get(){
        let childrenUID = hahavm.toolsFunc.getProtoArr.call(this, "childrenUID");
        let nodeList = []
        for (let i = 0; i < childrenUID.length; i++) {
            let node = hahavm.memory.node[childrenUID[i]];
            if (node instanceof Node) {
                nodeList.push(node);
            }
        }
        return hahavm.toolsFunc.createProxyObj(nodeList, NodeList, `Node_childNodes_get`);
    }
    hahavm.envFunc.Node_removeChild = function Node_removeChild(){
        let childNode = arguments[0];
        let childNodeUID = hahavm.toolsFunc.getProtoArr.call(childNode, "nodeUID");
        let childrenUID = hahavm.toolsFunc.getProtoArr.call(this, "childrenUID");
        let index = childrenUID.indexOf(childNodeUID);
        childrenUID.splice(index, 1);  // 删除child nodeUID
        hahavm.toolsFunc.setProtoArr.call(this, "childrenUID")
    }
    hahavm.envFunc.Node_parentNode_get = function Node_parentNode_get(){
        let parentUID = hahavm.toolsFunc.getProtoArr.call(this, "parentUID");
        return hahavm.memory.node[parentUID];
    }
    hahavm.envFunc.Node_textContent_get = function Node_textContent_get(){
        let textContent = hahavm.toolsFunc.getProtoArr.call(this, "textContent");
        if (typeof textContent === 'undefined') {
            return '';
        }
        return textContent;
    }
    hahavm.envFunc.Node_textContent_set = function Node_textContent_set(){
        let textContent = arguments[0];
        if (typeof textContent === 'string') {
            hahavm.toolsFunc.setProtoArr.call(this, "textContent", textContent);
        }
    }

    hahavm.envFunc.WebGLRenderingContext_canvas_get = function WebGLRenderingContext_canvas_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "canvas");
    }
    hahavm.envFunc.WebGLRenderingContext_createProgram = function WebGLRenderingContext_createProgram(){
        let program = {};
        program = hahavm.toolsFunc.createProxyObj(program, WebGLProgram, "program");
        return program;
    }
    hahavm.envFunc.WebGLRenderingContext_createBuffer = function WebGLRenderingContext_createBuffer(){
        let buffer = {};
        buffer = hahavm.toolsFunc.createProxyObj(buffer, WebGLBuffer, "buffer");
        return buffer;
    }
    hahavm.envFunc.HTMLCanvasElement_toDataURL = function HTMLCanvasElement_toDataURL(){
        let type = hahavm.toolsFunc.getProtoArr.call(this, "type");
        if(type === "2d"){
            return hahavm.memory.globalVar.canvas_2d;
        }else if(type === "webgl"){
            return hahavm.memory.globalVar.canvas_webgl;
        }
    }
    hahavm.envFunc.HTMLCanvasElement_getContext = function HTMLCanvasElement_getContext(){
        let type = arguments[0];
        let context = {};
        switch (type){
            case "2d":
                context = hahavm.toolsFunc.createProxyObj(context, CanvasRenderingContext2D, "context_2d");
                hahavm.toolsFunc.setProtoArr.call(context, "canvas", this);
                hahavm.toolsFunc.setProtoArr.call(this, "type", type);
                break;
            case "webgl":
                context = hahavm.toolsFunc.createProxyObj(context, WebGLRenderingContext, "context_webgl");
                hahavm.toolsFunc.setProtoArr.call(context, "canvas", this);
                hahavm.toolsFunc.setProtoArr.call(this, "type", type);
                break;
            default:
                console.log(`HTMLCanvasElement_getContext_${type}未实现`);
                break;
        }
        return context;
    }
    hahavm.envFunc.HTMLElement_style_get = function HTMLElement_style_get(){
        let style = hahavm.toolsFunc.getProtoArr.call(this, "style");
        if(style === undefined){
            style = hahavm.toolsFunc.createProxyObj({}, CSSStyleDeclaration, "style");
            hahavm.toolsFunc.setProtoArr.call(this, "style", style);
        }
        return style;
    }
    hahavm.envFunc.HTMLCanvasElement_width_set = function HTMLCanvasElement_width_set(){

    }
    hahavm.envFunc.HTMLCanvasElement_height_set = function HTMLCanvasElement_height_set(){

    }
    hahavm.envFunc.MimeTypeArray_namedItem = function MimeTypeArray_namedItem(){
        let name = arguments[0];
        return this[name];
    }
    hahavm.envFunc.MimeTypeArray_item = function MimeTypeArray_item(){
        let index = arguments[0];
        return this[index];
    }
    hahavm.envFunc.Plugin_namedItem = function Plugin_namedItem(){
        let name = arguments[0];
        return this[name];
    }
    hahavm.envFunc.Plugin_item = function Plugin_item(){
        let index = arguments[0];
        return this[index];
    }
    hahavm.envFunc.PluginArray_namedItem = function PluginArray_namedItem(){
        let name = arguments[0];
        return this[name];
    }
    hahavm.envFunc.PluginArray_item = function PluginArray_item(){
        let index = arguments[0];
        return this[index];
    }
    hahavm.envFunc.Navigator_mimeTypes_get = function Navigator_mimeTypes_get(){
        return hahavm.memory.globalVar.mimeTypeArray;
    }
    hahavm.envFunc.Navigator_geolocation_get = function Navigator_geolocation_get(){
        return geolocation;
    }
    hahavm.envFunc.MimeType_suffixes_get = function MimeType_suffixes_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "suffixes");
    }
    hahavm.envFunc.MimeType_enabledPlugin_get = function MimeType_enabledPlugin_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "enabledPlugin");
    }
    hahavm.envFunc.MimeType_description_get = function MimeType_description_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "description");
    }
    hahavm.envFunc.Plugin_length_get = function Plugin_length_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "length");
    }
    hahavm.envFunc.Plugin_filename_get = function Plugin_filename_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "filename");
    }
    hahavm.envFunc.Plugin_description_get = function Plugin_description_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "description");
    }
    hahavm.envFunc.Plugin_name_get = function Plugin_name_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "name");
    }
    hahavm.envFunc.PluginArray_length_get = function PluginArray_length_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "length");
    }
    hahavm.envFunc.MimeType_type_get = function MimeType_type_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "type");
    }
    hahavm.envFunc.MimeTypeArray_length_get = function MimeTypeArray_length_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "length");
    }
    hahavm.envFunc.Navigator_plugins_get = function Navigator_plugins_get(){
        return hahavm.memory.globalVar.pluginArray;
    }

    // <a>标签 原型链
    hahavm.envFunc.HTMLAnchorElement_origin_get = function HTMLAnchorElement_origin_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "origin");
    }
    hahavm.envFunc.HTMLAnchorElement_protocol_get = function HTMLAnchorElement_protocol_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "protocol");
    }
    hahavm.envFunc.HTMLAnchorElement_host_get = function HTMLAnchorElement_host_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "host");
    }
    hahavm.envFunc.HTMLAnchorElement_hostname_get = function HTMLAnchorElement_hostname_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "hostname");
    }
    hahavm.envFunc.HTMLAnchorElement_port_get = function HTMLAnchorElement_port_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "port");
    }
    hahavm.envFunc.HTMLAnchorElement_pathname_get = function HTMLAnchorElement_pathname_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "pathname");
    }
    hahavm.envFunc.HTMLAnchorElement_search_get = function HTMLAnchorElement_search_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "search");
    }
    hahavm.envFunc.HTMLAnchorElement_hash_get = function HTMLAnchorElement_hash_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "hash");
    }
    hahavm.envFunc.HTMLAnchorElement_href_get = function HTMLAnchorElement_href_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "href");
    }
    hahavm.envFunc.HTMLAnchorElement_href_set = function HTMLAnchorElement_href_set(){
        let url = arguments[0];
        if(url.indexOf("http") === -1){
            url = location.protocol + "//" + location.hostname + url;
        }
        let jsonUrl = hahavm.toolsFunc.parseUrl(url);
        hahavm.toolsFunc.setProtoArr.call(this, "origin", jsonUrl["origin"]);
        hahavm.toolsFunc.setProtoArr.call(this, "protocol", jsonUrl["protocol"]);
        hahavm.toolsFunc.setProtoArr.call(this, "host", jsonUrl["host"]);
        hahavm.toolsFunc.setProtoArr.call(this, "hostname", jsonUrl["hostname"]);
        hahavm.toolsFunc.setProtoArr.call(this, "port", jsonUrl["port"]);
        hahavm.toolsFunc.setProtoArr.call(this, "pathname", jsonUrl["pathname"]);
        hahavm.toolsFunc.setProtoArr.call(this, "search", jsonUrl["search"]);
        hahavm.toolsFunc.setProtoArr.call(this, "hash", jsonUrl["hash"]);
        hahavm.toolsFunc.setProtoArr.call(this, "href", jsonUrl["href"]);
    }

    // location 原型链
    hahavm.envFunc.location_hostname_get = function location_hostname_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "hostname");
    }
    hahavm.envFunc.location_hostname_set = function location_hostname_set(){
        let value = arguments[0];
        return hahavm.toolsFunc.setProtoArr.call(this, "hostname", value);
    }
    hahavm.envFunc.location_protocol_get = function location_protocol_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "protocol");
    }
    hahavm.envFunc.location_protocol_set = function location_protocol_set(){
        let value = arguments[0];
        return hahavm.toolsFunc.setProtoArr.call(this, "protocol", value);
    }
    hahavm.envFunc.location_search_get = function location_search_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "search");
    }
    hahavm.envFunc.location_search_set = function location_search_set(){
        let value = arguments[0];
        return hahavm.toolsFunc.setProtoArr.call(this, "search", value);
    }
    hahavm.envFunc.location_port_get = function location_port_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "port");
    }
    hahavm.envFunc.location_port_set = function location_port_set(){
        let value = arguments[0];
        return hahavm.toolsFunc.setProtoArr.call(this, "port", value);
    }
    hahavm.envFunc.location_pathname_get = function location_pathname_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "pathname");
    }
    hahavm.envFunc.location_pathname_set = function location_pathname_set(){
        let value = arguments[0];
        return hahavm.toolsFunc.setProtoArr.call(this, "pathname", value);
    }
    hahavm.envFunc.location_host_get = function location_host_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "host");
    }
    hahavm.envFunc.location_host_set = function location_host_set(){
        let value = arguments[0];
        return hahavm.toolsFunc.setProtoArr.call(this, "host", value);
    }
    hahavm.envFunc.location_hash_get = function location_hash_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "hash");
    }
    hahavm.envFunc.location_hash_set = function location_hash_set(){
        let value = arguments[0];
        return hahavm.toolsFunc.setProtoArr.call(this, "hash", value);
    }
    hahavm.envFunc.location_href_get = function location_href_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "href");
    }
    hahavm.envFunc.location_href_set = function location_href_set(){
        // 暂时先这样实现，估计真实的样子，跟 HTMLAnchorElement_href_set() 一样
        let value = arguments[0];
        return hahavm.toolsFunc.setProtoArr.call(this, "href", value);
    }

    // html <input> 标签原型链
    hahavm.envFunc.HTMLInputElement_value_get = function HTMLInputElement_value_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "value");
    }
    hahavm.envFunc.HTMLInputElement_value_set = function HTMLInputElement_value_set(){
        let value = arguments[0];
        hahavm.toolsFunc.setProtoArr.call(this, "value", value);
    }
    hahavm.envFunc.HTMLInputElement_name_get = function HTMLInputElement_name_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "name");
    }
    hahavm.envFunc.HTMLInputElement_name_set = function HTMLInputElement_name_set(){
        let value = arguments[0];
        hahavm.toolsFunc.setProtoArr.call(this, "name", value);
    }
    hahavm.envFunc.HTMLInputElement_type_get = function HTMLInputElement_type_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "type");
    }
    hahavm.envFunc.HTMLInputElement_type_set = function HTMLInputElement_type_set(){
        let value = arguments[0];
        hahavm.toolsFunc.setProtoArr.call(this, "type", value);
    }
    

    hahavm.envFunc.HTMLMetaElement_content_get = function HTMLMetaElement_content_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "content");
    }
    hahavm.envFunc.HTMLMetaElement_content_set = function HTMLMetaElement_content_set(){
        let value = arguments[0];
        return hahavm.toolsFunc.setProtoArr.call(this, "content", value);
    }
    hahavm.envFunc.HTMLDivElement_align_get = function HTMLDivElement_align_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "align");
    }
    hahavm.envFunc.HTMLDivElement_align_set = function HTMLDivElement_align_set(){
        let value = arguments[0];
        return hahavm.toolsFunc.setProtoArr.call(this, "align", value);
    }

    // html <iframe> 标签原型链
    hahavm.envFunc.HTMLIFrameElement_width_get = function HTMLIFrameElement_width_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "width");
    }
    hahavm.envFunc.HTMLIFrameElement_width_set = function HTMLIFrameElement_width_set(){
        let value = arguments[0];
        return hahavm.toolsFunc.setProtoArr.call(this, "width", value);
    }
    hahavm.envFunc.HTMLIFrameElement_height_get = function HTMLIFrameElement_height_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "height");
    }
    hahavm.envFunc.HTMLIFrameElement_height_set = function HTMLIFrameElement_height_set(){
        let value = arguments[0];
        return hahavm.toolsFunc.setProtoArr.call(this, "height", value);
    }

    // html <script> 标签原型链
    hahavm.envFunc.HTMLScriptElement_src_get = function HTMLScriptElement_src_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "src");
    }
    hahavm.envFunc.HTMLScriptElement_src_set = function HTMLScriptElement_src_set(){
        let value = arguments[0];
        // 判断url格式是否有缺少, 然后补全
        let url = "";
        if(value.indexOf("http") === -1){
            url += location.protocol;
        } else if (value.indexOf("//") === -1) {
            url += "//";
        }
        url += value;
        return hahavm.toolsFunc.setProtoArr.call(this, "src", url);
    }

    hahavm.envFunc.Storage_setItem = function Storage_setItem(){
        let keyName = arguments[0];
        let keyValue = arguments[1];
        this[keyName] = keyValue;
    }
    hahavm.envFunc.Storage_getItem = function Storage_getItem(){
        let key = arguments[0];
        if(key in this){
            return this[key];
        }
        return null;
    }
    hahavm.envFunc.Storage_removeItem = function Storage_removeItem(){
        let key = arguments[0];
        delete this[key];
    }
    hahavm.envFunc.Storage_key = function Storage_key(){
        let index = arguments[0];
        let i = 0;
        for (const key in this) {
            if(i === index){
                return key;
            }
            i++;
        }
        return null;
    }
    hahavm.envFunc.Storage_clear = function Storage_clear(){
        for (const key in this) {
            delete this[key];
        }
    }
    hahavm.envFunc.Storage_length_get = function Storage_length_get(){
        let i = 0;
        for (const key in Object.getOwnPropertyDescriptors(this)) {
            i++;
        }
        return i;
    }

    // Document 原型链
    hahavm.envFunc.Document_body_get = function Document_body_get(){
        let collection = hahavm.toolsFunc.getCollection('[object HTMLBodyElement]');
        return collection[0];
    }
    hahavm.envFunc.Document_head_get = function Document_head_get(){
        let collection = hahavm.toolsFunc.getCollection('[object HTMLHeadElement]');
        return collection[0];
    }
    hahavm.envFunc.Document_createEvent = function Document_createEvent(){
        debugger;
    }
    hahavm.envFunc.Document_dis
    hahavm.envFunc.Document_createElement = function Document_createElement(){
        let tagName = arguments[0].toLowerCase();
        let options = arguments[1];
        let nodeUID;
        let tag = {};
        switch (tagName){
            case "div":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLDivElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "meta":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLMetaElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "head":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLHeadElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "input":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLInputElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "a":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLAnchorElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "canvas":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLCanvasElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "body":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLBodyElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "html":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLHtmlElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "span":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLSpanElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "script":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLScriptElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "iframe":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLIFrameElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "style":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLStyleElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "li":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLLIElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "ul":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLUListElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "img":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLImageElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "link":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLLinkElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "p":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLParagraphElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "map":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLMapElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "textarea":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLTextAreaElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "form":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLFormElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "title":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLTitleElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "area":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLAreaElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "h1":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLHeadingElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "h2":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLHeadingElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "h3":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLHeadingElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
                break;
            case "label":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLLabelElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
            case "button":
                tag = hahavm.toolsFunc.createProxyObj(tag,HTMLButtonElement,`Document_createElement_${tagName}`);
                nodeUID = hahavm.toolsFunc.getNodeUID();
                hahavm.toolsFunc.setProtoArr.call(tag, "nodeUID", nodeUID);
                hahavm.memory.node[nodeUID] = tag;
            default:
                console.log(`Document_createElement_${tagName}未实现`);
                break;
        }
        return tag;
    }
    hahavm.envFunc.Document_getElementsByTagName = function Document_getElementsByTagName(){
        let tagName = arguments[0].toLowerCase();
        let collection = [];
        switch (tagName){
            case "meta":
                collection = hahavm.toolsFunc.getCollection('[object HTMLMetaElement]');
                collection = hahavm.toolsFunc.createProxyObj(collection, HTMLCollection, `Document_getElementsByTagName_${tagName}`)
                break;
            case "body":
                collection = hahavm.toolsFunc.getCollection('[object HTMLBodyElement]');
                collection = hahavm.toolsFunc.createProxyObj(collection, HTMLCollection, `Document_getElementsByTagName_${tagName}`);
                break;
            default:
                console.log(`Document_getElementsByTagName_${tagName}未实现`);
                break;
        }
        return collection;
    }
    hahavm.envFunc.Document_getElementsByName = function Document_getElementsByName(){
        let nameAttr = arguments[0].toLowerCase();
        let nodeList = [];
        nodeList = hahavm.toolsFunc.getNodeList(nameAttr);
        nodeList = hahavm.toolsFunc.createProxyObj(nodeList, NodeList, `Document_getElementsByName_${nameAttr}`);
        return nodeList;
    }
    hahavm.envFunc.Document_documentElement_get = function Document_documentElement_get(){
        let collection = hahavm.toolsFunc.getCollection('[object HTMLHtmlElement]');
        return collection[0];
    }
    hahavm.envFunc.Document_write = function Document_write(){
        let tagStr = arguments[0];
        // 解析标签字符串
        // '<input type="hidden" id="test" name="inputTag" value="666">'
        let tagJson = hahavm.toolsFunc.getTagJson(tagStr);
        let tag = document.createElement(tagJson.type);
        for(const key in tagJson.prop){
            tag[key] = tagJson.prop[key];
            if(tag[key] === undefined){
                hahavm.toolsFunc.setProtoArr.call(tag, key, tagJson.prop[key]);
            }
        }
    }
    hahavm.envFunc.Document_getElementById = function Document_getElementById(){
        let id = arguments[0];
        let tags = Object.values(hahavm.memory.node);
        for (let i = 0; i <tags.length; i++) {
            if(tags[i].id === id){
                return tags[i];
            }
        }
        return null;
    }
    hahavm.envFunc.Document_cookie_get = function Document_cookie_get(){
        let jsonCookie = hahavm.memory.globalVar.jsonCookie;
        let tempCookie = "";
        for(const key in jsonCookie){
            if(key === ""){
                tempCookie += `${jsonCookie[key]}; `;
            }else{
                tempCookie += `${key}=${jsonCookie[key]}; `;
            }
        }
        return tempCookie;
    }
    hahavm.envFunc.Document_cookie_set = function Document_cookie_set(){
        let cookieValue = arguments[0];
        let index = cookieValue.indexOf(";");
        if(index !== -1){
            cookieValue = cookieValue.substring(0, index);
        }
        if(cookieValue.indexOf("=") === -1){
            hahavm.memory.globalVar.jsonCookie[""] = cookieValue.trim();
        }else{
            let item = cookieValue.split("=");
            let k = item[0].trim();
            let v = item[1].trim();
            hahavm.memory.globalVar.jsonCookie[k] = v;
        }
    }
    hahavm.envFunc.Document_readyState_get = function Document_readyState_get(){
        // readyState可以返回三种状态 -> 'loading', 'interactive', 'complete'
        // 我们先暂时就固定返回'complete'
        return "complete";
    }
    hahavm.envFunc.Document_domain_get = function Document_domain_get(){
        return hahavm.toolsFunc.getProtoArr.call(this, "domain");
    }
    hahavm.envFunc.Document_domain_set = function Document_domain_set(){
        let value = arguments[0];
        return hahavm.toolsFunc.setProtoArr.call(this, "domain", value);
    }
    hahavm.envFunc.Document_scripts_get = function Document_scripts_get(){
        let collection = [];
        // for循环，把每个<script>push进入collection
        let tags = Object.values(hahavm.memory.node);
        for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            if (hahavm.toolsFunc.getType(tag).indexOf("HTMLScriptElement") !== -1) {
                collection.push(tag);
            }
        }
        collection = hahavm.toolsFunc.createProxyObj(collection, HTMLCollection, "collection");
        return collection;
    }
    hahavm.envFunc.Document_createTextNode = function Document_createTextNode(){
        let value = arguments[0];
        if (typeof value === "string") {
            let textNode = {}
            let nodeUID = hahavm.toolsFunc.getNodeUID();
            textNode = hahavm.toolsFunc.createProxyObj(textNode, Text, "textNode");
            hahavm.toolsFunc.setProtoArr.call(textNode, "nodeUID", nodeUID);
            hahavm.toolsFunc.setProtoArr.call(textNode, "wholeText", value);
            return textNode;
        }
    }
    hahavm.envFunc.document_location_get = function document_location_get(){
        return location;
    }

    // 小window 原型链
    hahavm.envFunc.window_top_get = function window_top_get(){
        return window;
    }
    hahavm.envFunc.window_self_get = function window_self_get(){
        return window;
    }
    hahavm.envFunc.window_name_get = function window_name_get(){
        debugger;
        return hahavm.toolsFunc.getProtoArr.call(this, "name");
    }
    hahavm.envFunc.window_name_set = function window_name_set(){
        debugger;
        let value = arguments[0];
        hahavm.toolsFunc.setProtoArr.call(this, "name", value);
    }
    hahavm.envFunc.window_setTimeout = function window_setTimeout(){
        // setTimeout属于宏任务 - MacroTask
        let func = arguments[0];
        let delay = arguments[1] || 0;
        let length = arguments.length;

        if (length > 2) {
            debugger;
        }
        let args = [];
        for(let i = 2; i < length; i++){
            args.push(arguments[i]);
        }

        let type = 1;
        if(typeof func !== "function"){
            type = 0;
        }
        hahavm.memory.globalVar.timeoutID += 1;
        let event = {
            "callback":func,
            "delay":delay,
            "args":args,
            "type":type, // 1代表函数，0代表是字符串代码,eval(code);
            "timeoutID": hahavm.memory.globalVar.timeoutID
        }

        if(hahavm.memory.asyncEvent.setTimeout === undefined){
            hahavm.memory.asyncEvent.setTimeout = [];
        }
        hahavm.memory.asyncEvent.setTimeout.push(event);
        return hahavm.memory.globalVar.timeoutID;
    }
    hahavm.envFunc.window_clearTimeout = function window_clearTimeout(){
        let timeoutID = arguments[0];
        for(let i = 0; i< hahavm.memory.asyncEvent.setTimeout.length;i++){
            let event = hahavm.memory.asyncEvent.setTimeout[i];
            if(event.timeoutID === timeoutID){
                delete hahavm.memory.asyncEvent.setTimeout[i];
            }
        }
    }
    hahavm.envFunc.window_queueMicrotask = function window_queueMicrotask(){
        debugger;
    }
}();
