import * as React from 'react'
import {observer} from 'mobx-react'

import {default as injectInstance, inject} from '../index'

class A {
    @inject('B') private b: any
    public name = 'aaa'

    say() {
        console.log('A inject B instance', this.b.name)
    }
}

class B {
    @inject('A') private a: A
    public name = 'bbb'

    say() {
        console.log('B inject A instance', this.a.name)
    }
}

@observer
export default class Demo extends React.Component <any, any> {
    static title = '基本用法'
    static description = ``

    render() {
        const instances1 = injectInstance(A, B)
        instances1.get('A').say()
        instances1.get('B').say()
        instances1.get('A').name = 'c'
        instances1.get('B').say()

        const instances2 = injectInstance(A, B)
        instances2.get('A').say()
        instances2.get('B').say()

        return (
            <div>打开控制台看效果</div>
        )
    }
}
                