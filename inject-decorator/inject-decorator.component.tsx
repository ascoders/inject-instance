export default (...injectNames: Array<string>): any => (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
    target['_injectDecorator__onInject'] = {
        method: descriptor.value,
        injectNames: injectNames
    }
    return {injectNames, target, propertyKey}
}