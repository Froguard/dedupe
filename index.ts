/**
 * dedupe
 * @param {array} arr
 * @param {function} getSeed
 * @param {function} deal
 * @return {array}
 */
 export default function dedupe<T = any>(arr: T[], getSeed?: (a: T, i?: number, arr?: T[]) => any) {
    let tmp: T[] = [];
    let getSeedFn = typeof getSeed === 'function' ? getSeed : (a: T) => a;
    return arr.filter((a: T, i?: number, arr?: T[]) => {
        let seed = getSeedFn(a);
        return !tmp.includes(seed) && tmp.push(seed);
    });
}