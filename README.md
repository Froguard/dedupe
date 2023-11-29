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

```ts
/**
 * dedupe simple item list, detect unique by simple value
 * @param {array} list
 */
export default function dedupe<T extends NormalType>(list: T[]): T[];
/**
 * dedupe simple item list, detect unique by function (custom logic)
 * @param {array} list
 */
export default function dedupe<T extends NormalType>(list: T[], getSeed: GetSeedFunc<T>): T[];
/**
 * dedupe object list, detect unique by single key (of object item'props)
 * @param {array} list
 * @param {string} key
 */
export default function dedupe<T extends NormalObject, K extends keyof T>(list: T[], key: K): T[];
/**
 * dedupe object list, detect unique by multiple keys (keyof object)
 * @param {array} list
 * @param {array<string>} keys
 */
export default function dedupe<T extends NormalObject, K extends keyof T>(list: T[], keys: K[]): T[];
/**
 * dedupe object list, detect unique by function (custom logic)
 * @param {array} list
 * @param {function} getSeed
 */
export default function dedupe<T extends NormalObject>(list: T[], getSeed: GetSeedFunc<T>): T[];
```
