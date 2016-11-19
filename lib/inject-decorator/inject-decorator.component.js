"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function () {
    for (var _len = arguments.length, injectNames = Array(_len), _key = 0; _key < _len; _key++) {
        injectNames[_key] = arguments[_key];
    }

    return function (target, propertyKey, descriptor) {
        target['_injectDecorator__onInject'] = {
            method: descriptor.value,
            injectNames: injectNames
        };
        return { injectNames: injectNames, target: target, propertyKey: propertyKey };
    };
};