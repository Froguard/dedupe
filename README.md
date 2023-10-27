# free-dedupe

> De-duplicate (Uniqueify) a arrays with custom logic

## install

```sh
npm i -S free-dedupe
# yarn add free-dedupe
```

## usage

### 1.commonjs

```js
const dedupe = require('free-dedupe').default;

console.log(dedupe([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4]));  // 1,2,3,4
```

> don't forget the `.default` !!!

### 2.typescript/esnext

```ts
import dedupe from 'free-dedupe';

console.log(dedupe([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4]));  // 1,2,3,4
```

### 3.custom logic to detect for duplicates

```ts
import dedupe from 'free-dedupe';

console.log(
    dedupe(
        [ {id:1, name:'Tom'}, {id:2, name:'Tom'}, {id:3, name:'Joe'} ], 
        (item: any) => item.id
    )
); // Tom(id=1), Tom(id=2), Joe(id=3)


console.log(
    dedupe(
        [ {id:1, name:'Tom'}, {id:2, name:'Tom'}, {id:3, name:'Joe'} ], 
        [ 'id' ] // 'id'
    )
); // Tom(id=1), Tom(id=2), Joe(id=3)
```

## API

#### `dedupe(array: any[], getSeed: string | string[] | ((item:any,index,arr:any[]) => any))`

- array: list of element
- getSeed: 
    - a function whit you custom detect duplicate logic, eg: `function cb(ele,idx,list) { ... return xxx; }`
    - a obj key or key list, (key: string| symbol | number ), eg: `'k1'`, `['k1', 'k2', ...]`