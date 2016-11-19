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
        instanceClass.inject.forEach(function (injectName) {
            if (!instanceMap.get(injectName)) {
                throw 'injectName: ' + injectName + ' not found!';
            }
            injectInstances.push(instanceMap.get(injectName));
        });
        try {
            eachInstance.onInject.apply(eachInstance, injectInstances);
        } catch (error) {
            throw 'class ' + key + ' has no method onInject!';
        }
    });
    return instanceMap;
};