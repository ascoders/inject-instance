"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function () {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i - 0] = arguments[_i];
    }
    var classMap = new Map();
    var instanceMap = new Map();
    classes.forEach(function (eachClass) {
        if (classMap.has(eachClass.name)) {
            throw "duplicate className: " + eachClass.name;
        }
        classMap.set(eachClass.name, eachClass);
    });
    // 遍历所有用到的类
    classMap.forEach(function (eachClass) {
        // 实例化
        instanceMap.set(eachClass.name, new eachClass());
    });
    // 遍历所有实例
    instanceMap.forEach(function (eachInstance, key) {
        // 保存此实例注入的实例
        var injectInstances = [];
        // 找到该实例的类
        var instanceClass = classMap.get(key);
        // 遍历这个类的注入实例类名
        eachInstance['_injectDecorator__onInject'] && eachInstance['_injectDecorator__onInject'].injectNames && eachInstance['_injectDecorator__onInject'].injectNames.forEach(function (injectName) {
            if (!instanceMap.get(injectName)) {
                throw 'injectName: ' + injectName + ' not found!';
            }
            injectInstances.push(instanceMap.get(injectName));
        });
        try {
            (_a = eachInstance['_injectDecorator__onInject'].method).call.apply(_a, [eachInstance].concat(injectInstances));
        }
        catch (error) {
            throw 'class ' + key + ' has no method _injectDecorator__onInject!';
        }
        var _a;
    });
    return instanceMap;
};
