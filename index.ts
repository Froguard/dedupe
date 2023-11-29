/// <reference types="./index.d.ts"> 

// normal define
export type NormalType = string | boolean | symbol | number | bigint | null | undefined;
export type NormalObjectKey = string | symbol | number;
export type NormalObject = Record<NormalObjectKey, any>;

// getFeed is function
export type GetSeedFunc<ItemT = any> = (item: ItemT, index?: number, arr?: ItemT[]) => any;
// getFeed is key | keys
export type GetSeedkey = NormalObjectKey[] | NormalObjectKey;
// getFeed is combine type
export type UniqGetSeed<ItemT> = ItemT extends NormalType ? GetSeedFunc<ItemT> : GetSeedFunc<ItemT> | GetSeedkey;

// overload defines:
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

// implement：
/**
 * dedupe a list, and return another new list
 * @param {array<T>} list
 * @param {function|string|number|symbol|Array<string|number|symbol>} getSeed
 * @returns {array<T>}
 * @example
 *   // 1. Primary simple type element list
 *   const list1 = [1,1,1,2,2,2,3,3,3];
 *   const listNew1 = dedupe(list); // [1,2,3]
 *
 *   const list2 = ['a', 'a', 'b', 'b', 'c', 'c'];
 *   const listNew2 = dedupe(list); // ['a', 'b', 'c']
 *
 *   // 2. Object element list
 *   const list3 = [
 *    { key: 1, data: 'xxx' },
 *    { key: 1, data: 'xxx23d' },
 *    { key: 2, data: 'xxx' },
 *    { key: 2, data: 'xxx23d' },
 *    { key: 3, data: 'xxx' },
 *    { key: 3, data: 'xxx23d' },
 *   ];
 *   const listNew3 = dedupe(list3, 'key');
 *   // equivalent to: dedupe(list3, ['key']);
 *   // equivalent to: dedupe(list3, (ele) => ele.key);
 *   console.log(listNew3); // [
 *    { key: 1, data: 'xxx' },
 *    { key: 2, data: 'xxx' },
 *    { key: 3, data: 'xxx' },
 *   ];
 */
export default function dedupe<ItemT = any>(list: ItemT[], getSeed?: UniqGetSeed<ItemT>) {
  let _getSeedFn: GetSeedFunc<ItemT> = null;
  // detect getSeed type
  const typeOfGetSeed = Object.prototype.toString.call(getSeed).slice(8, -1).toLowerCase();
  switch (typeOfGetSeed) {
    // 1. ItemT is NormalObject
    // 1.1. getSeed is NormalObjectKey && ItemT is NormalObject
    case 'string':
    case 'symbol':
    case 'number': {
      _getSeedFn = (item: ItemT) => (item as NormalObject)?.[getSeed as NormalObjectKey];
      break;
    }
    // 1.2. getSeed is NormalObjectKey[] && ItemT is NormalObject
    case 'array': {
      _getSeedFn = (item: ItemT) =>
        (getSeed as NormalObjectKey[]).map(k => `${String(k)}=${(item as NormalObject)?.[k]}`).join('&');
      break;
    }
    // 2. getSeed is a function
    case 'function': {
      _getSeedFn = getSeed as GetSeedFunc<ItemT>;
      break;
    }
    // 3. getSeed is nill (null|undefined, not passed in args)
    default: {
      _getSeedFn = (item: ItemT) => item;
      break;
    }
  }
  // main dedupe logic
  const tmp = new Set<any>();
  return list.filter((it, idx, listRaw) => {
    const seed = _getSeedFn(it, idx, listRaw);
    return !tmp.has(seed) && tmp.add(seed); // set.has is faster than arr.includes
  });
}