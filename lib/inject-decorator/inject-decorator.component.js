"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (injectName) {
    return function (target, propertyKey, descriptor) {
        target[propertyKey] = injectName;
        if (!target['_injectDecorator__injectVariables']) {
            target['_injectDecorator__injectVariables'] = propertyKey;
        } else {
            target['_injectDecorator__injectVariables'].push(propertyKey);
        }
        return descriptor;
    };
};