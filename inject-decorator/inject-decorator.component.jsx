"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function () {
    var injectNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        injectNames[_i - 0] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        target['_injectDecorator__onInject'] = {
            method: descriptor.value,
            injectNames: injectNames
        };
        return { injectNames: injectNames, target: target, propertyKey: propertyKey };
    };
};
