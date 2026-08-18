import { describe, it, expect } from '@jest/globals';

import dedupe from '../index';

describe('dedupe', () => {
    it('去重基础值数组', () => {
        expect(dedupe([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4])).toEqual([1, 2, 3, 4]);
    });

    it('去重字符串数组', () => {
        expect(dedupe(['a', 'a', 'b', 'b', 'c', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('按单个 key 去重对象列表', () => {
        const list = [
            { id: 1, name: 'Tom' },
            { id: 1, name: 'Tom2' },
            { id: 2, name: 'Joe' },
        ];

        expect(dedupe(list, 'id')).toEqual([
            { id: 1, name: 'Tom' },
            { id: 2, name: 'Joe' },
        ]);
    });

    it('按多 key 去重对象列表', () => {
        const list = [
            { id: 1, name: 'Tom', city: 'BJ' },
            { id: 1, name: 'Tom', city: 'SH' },
            { id: 1, name: 'Amy', city: 'HZ' },
        ];

        expect(dedupe(list, ['id', 'name'])).toEqual([
            { id: 1, name: 'Tom', city: 'BJ' },
            { id: 1, name: 'Amy', city: 'HZ' },
        ]);
    });

    it('按自定义函数去重', () => {
        const list = [
            { id: 1, name: 'Tom' },
            { id: 2, name: 'tom' },
            { id: 3, name: 'Joe' },
        ];

        expect(dedupe(list, (item) => item.name.toLowerCase())).toEqual([
            { id: 1, name: 'Tom' },
            { id: 3, name: 'Joe' },
        ]);
    });
});
