export default (...classes: Array<any>) => {
    const classMap = new Map<string, any>()
    const instanceMap = new Map<string, any>()

    classes.forEach(eachClass => {
        if (classMap.has(eachClass.name)) {
            throw `duplicate className: ${eachClass.name}`
        }
        classMap.set(eachClass.name, eachClass)
    })

    // 遍历所有用到的类
    classMap.forEach((eachClass: any) => {
        // 实例化
        instanceMap.set(eachClass.name, new eachClass())
    })

    // 遍历所有实例
    instanceMap.forEach((eachInstance: any, key: string) => {
        // 保存此实例注入的实例
        const injectInstances: Array<any> = []
        // 找到该实例的类
        const instanceClass = classMap.get(key)
        // 遍历这个类的注入实例类名
        eachInstance['_injectDecorator__injectVariables'] && eachInstance['_injectDecorator__injectVariables'].forEach((injectVariableKey: string) => {
            if (!instanceMap.get(eachInstance[injectVariableKey])) {
                throw 'injectName: ' + eachInstance[injectVariableKey] + ' not found!'
            }

            // 把注入名改成实际注入对象
            eachInstance[injectVariableKey] = instanceMap.get(eachInstance[injectVariableKey])
        })
        // 删除这个临时变量
        delete eachInstance['_injectDecorator__injectVariables']
    })

    return instanceMap
}