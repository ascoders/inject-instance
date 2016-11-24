"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function () {
    for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
    }

    var classMap = new Map();
    var instanceMap = new Map();
    classes.forEach(function (eachClass) {
        if (classMap.has(eachClass.name)) {
            throw "duplicate className: " + eachClass.name;
        }
        classMap.set(eachClass.name, eachClass);
    });
    classMap.forEach(function (eachClass) {
        instanceMap.set(eachClass.name, new eachClass());
    });
    instanceMap.forEach(function (eachInstance, key) {
        var injectInstances = [];
        var instanceClass = classMap.get(key);
        eachInstance['_injectDecorator__injectVariables'] && eachInstance['_injectDecorator__injectVariables'].forEach(function (injectVariableKey) {
            if (!instanceMap.get(eachInstance[injectVariableKey])) {
                throw 'injectName: ' + eachInstance[injectVariableKey] + ' not found!';
            }
            eachInstance[injectVariableKey] = instanceMap.get(eachInstance[injectVariableKey]);
        });
        delete eachInstance['_injectDecorator__injectVariables'];
    });
    return instanceMap;
};