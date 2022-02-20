import dedupe from './index';

console.log(dedupe([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4]));  // 1,2,3,4

console.log(dedupe([ {id:1, name:'Tom'}, {id:2, name:'Tom'}, {id:3, name:'Joe'} ], (item: any) => item.id)); // Tom(id=1), Tom(id=2), Joe(id=3)