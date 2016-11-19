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
        eachInstance['_injectDecorator__onInject'].injectNames.forEach((injectName: string) => {
            if (!instanceMap.get(injectName)) {
                throw 'injectName: ' + injectName + ' not found!'
            }
            injectInstances.push(instanceMap.get(injectName))
        })

        try {
            eachInstance['_injectDecorator__onInject'].method.call(eachInstance, ...injectInstances)
        } catch (error) {
            throw 'class ' + key + ' has no method _injectDecorator__onInject!'
        }
    })

    return instanceMap
}