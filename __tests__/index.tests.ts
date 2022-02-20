
import dedupe from '../index';
describe('dedupe:', () => {
    it('[1,1,2,3] => [1,2,3]', () => expect(dedupe([1,1,2,3])).toEqual([1,2,3]));
});