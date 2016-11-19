## Getting Started

### Installation

```bash
npm i inject-instance --save
```

### Basic Usage

create `A.ts`:

```typescript
import {inject} from 'inject-instance'
import A from './A'

export default class B {
    private a: A
    public name = 'bbb'

    @inject('A') onInject(a: A) {
        this.a = a
    }

    say() {
        console.log('B inject A instance', this.a.name)
    }
}
```

create `B.ts`

```typescript
import {inject} from 'inject-instance'
import B from './B'

export default class A {
    private b: B
    public name = 'aaa'

    // any method with decorator 'inject' will be executed at the initial time
    @inject('B') otherMethod(b: B) {
        this.b = b
    }

    say() {
        console.log('A inject B instance', this.b.name)
    }
}
```

create `main.ts`

```typescript
import injectInstance from 'inject-instance'

const instances1 = injectInstance(A, B)
instances1.get('A').say()
instances1.get('B').say()
instances1.get('A').name = 'c'
instances1.get('B').say()
// A inject B instance bbb
// B inject A instance aaa
// B inject A instance c

const instances2 = injectInstance(A, B)
instances2.get('A').say()
instances2.get('B').say()
// A inject B instance bbb
// B inject A instance aaa
```