export default (injectName: string): any => (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
    target[propertyKey] = injectName

    // 加入一个标注变量
    if (!target['_injectDecorator__injectVariables']){
        target['_injectDecorator__injectVariables'] = [propertyKey]
    }else{
        target['_injectDecorator__injectVariables'].push(propertyKey)
    }

    return descriptor
}