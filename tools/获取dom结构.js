var hahavm = {};
hahavm.memory = {};
hahavm.memory.nodeCount = 0;


// 获取一个自增的ID
function getNodeUID(){
    if(hahavm.memory.nodeUID === undefined){
        hahavm.memory.nodeUID = 0;
    }
    hahavm.memory.nodeUID += 1;
    return `node_${hahavm.memory.nodeUID}`;
}

// 获取属性code
function setAttrCode(node, nodeUID) {
    let code = "";
    try {
        let attrs = node.getAttributeNames();
        for (let i = 0; i < attrs.length; i++) {
            let attrVal = node.getAttribute(attrs[i]);
            if (typeof attrVal !== "string") {
                debugger;
                continue;
            }
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, \`${attrs[i]}\`, \`${attrVal}\`);\r\n`;
        }
    } catch(e) {
        console.log(`获取节点属性报错: ${e.message}`);
    }
    return code;
}

// 创建HTMLElement代码
function createHTMLElementScript(tagName, nodeUID) {
    let code = "";
    tagName = tagName.toLowerCase();
    switch (tagName){
        case "div":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLDivElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "meta":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLMetaElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "head":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLHeadElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "input":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLInputElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "a":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLAnchorElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "canvas":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLCanvasElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "body":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLBodyElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "html":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLHtmlElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "span":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLSpanElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "script":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLScriptElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "iframe":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLIFrameElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "style":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLStyleElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "li":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLLIElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "ul":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLUListElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;
            
        case "img":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLImageElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;

        case "link":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLLinkElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;

        case "p":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLParagraphElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;

        case "map":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLMapElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;

        case "textarea":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLTextAreaElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;

        case "form":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLFormElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;

        case "title":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLTitleElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;

        case "area":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLAreaElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;

        case "h1":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLHeadingElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;

        case "h2":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLHeadingElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;

        case "h3":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLHeadingElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;

        case "label":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLLabelElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;

        case "button":
            code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID},HTMLButtonElement, "Document_createElement_${tagName}")\r\n`;
            code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", "${nodeUID}");\r\n`;
            code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
            break;

        default:
            console.log(`Document_createElement_${tagName}未实现`);
            break;
    }

    return code;
}

    

// 递归获取HTML结构
function dfsHTML(node, parentUID){
    let nodeUID = getNodeUID();
    let code = `\r\n`;
    
    // 判断当前节点类型, 获取属性, 创建对应脚本代码 -> 脚本来创建对应类型节点
    if (node instanceof Text) {
        code += `// 节点${nodeUID} - ${Object.prototype.toString.call(node)} 对象\r\n`;
        code += `var ${nodeUID} = {};\r\n`;
        
        // 创建Text节点
        code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID}, Text, "textNode");\r\n`;
        code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", '${nodeUID}');\r\n`;
        code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
    } else if (node instanceof Comment) {
        code += `// 节点${nodeUID} - ${Object.prototype.toString.call(node)} 对象\r\n`;
        code += `var ${nodeUID} = {};\r\n`;

        // 创建Comment节点
        code += `${nodeUID} = hahavm.toolsFunc.createProxyObj(${nodeUID}, Comment, "Comment");\r\n`;
        code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "nodeUID", '${nodeUID}');\r\n`;
        code += `hahavm.memory.node["${nodeUID}"] = ${nodeUID};\r\n`;
    } else if (node instanceof HTMLElement) {
        code += `// 节点${nodeUID} - ${Object.prototype.toString.call(node)} 对象\r\n`;
        code += `var ${nodeUID} = {};\r\n`;
        
        // 创建html tag节点
        let tag = node.tagName;
        code += createHTMLElementScript(tag, nodeUID);
    } 

    // 去除未实现原型链的节点code, 最后该nodeUID的指向是空的
    if (code.indexOf('createProxyObj') === -1){
        console.log(`未实现 ${Object.prototype.toString.call(node)} 节点类型`);
        code = '';
        return {code, nodeUID};
    }
    
    // 设置 parentUID 属性
    code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "parentUID", '${parentUID}');\r\n`;
    
    // 获取属性code
    code += setAttrCode(node, nodeUID);

    // 遍历每个child 节点, 然后递归调用本函数, 设置childNodesUID属性
    let childrenCode = [];
    let childNodes = node.childNodes;
    if (childNodes.length > 0) {
        code += `var ${nodeUID}_childrenUID = [];\r\n`;
        for (let i = 0; i < childNodes.length; i++) {
            // 返回每个child 节点的唯一id, 用作childNodes数组用
            let child = dfsHTML(childNodes[i], nodeUID);
            code += `${nodeUID}_childrenUID.push('${child.nodeUID}');\r\n`;
            childrenCode.push(child.code);
        }
        code += `hahavm.toolsFunc.setProtoArr.call(${nodeUID}, "childrenUID", ${nodeUID}_childrenUID);\r\n`;
    }

    // 加上children节点的code
    for (let i = 0; i < childrenCode.length; i++) {
        code += childrenCode[i];
    }

    hahavm.memory.nodeCount += 1;
    // 返回本节点 nodeUID
    return {code, nodeUID};
}


// 运行深度优先遍历, 获取HTML结构

let result = dfsHTML(document.documentElement);
console.log(`总共 ${hahavm.memory.nodeCount} 个节点`);
console.log(result.code);
copy(result.code);