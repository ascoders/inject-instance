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
    // 遍历这个类的注入实例类名
    if (eachInstance['_injectDecorator__injectVariables']) {
      eachInstance['_injectDecorator__injectVariables'].forEach((injectVariableKey: string) => {
        const className = eachInstance.__proto__[injectVariableKey];
        if (!instanceMap.get(className)) {
          throw Error(`injectName: ${className} not found!`);
        }

        // 把注入名改成实际注入对象
        eachInstance[injectVariableKey] = instanceMap.get(className);
      });
    }

    // 删除这个临时变量
    delete eachInstance['_injectDecorator__injectVariables'];
  });

    return instanceMap
}
