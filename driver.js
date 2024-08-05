import { Tree, prettyPrint } from "./tree.js";

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(test.root);
// │           ┌── 6345
// │       ┌── 324
// │   ┌── 67
// │   │   │   ┌── 23
// │   │   └── 9
// └── 8
//     │       ┌── 7
//     │   ┌── 5
//     └── 4
//         │   ┌── 3
//         └── 1

test.deleteItem(7);
prettyPrint(test.root);
// │           ┌── 6345
// │       ┌── 324
// │   ┌── 67
// │   │   │   ┌── 23
// │   │   └── 9
// └── 8
//     │   ┌── 5
//     └── 4
//         │   ┌── 3
//         └── 1

test.deleteItem(324);
prettyPrint(test.root);
// │       ┌── 6345
// │   ┌── 67
// │   │   │   ┌── 23
// │   │   └── 9
// └── 8
//     │   ┌── 5
//     └── 4
//         │   ┌── 3
//         └── 1

test.deleteItem(8);
prettyPrint(test.root);
// │       ┌── 6345
// │   ┌── 67
// │   │   └── 23
// └── 9
//     │   ┌── 5
//     └── 4
//         │   ┌── 3
//         └── 1

let node = test.find(67);
prettyPrint(node);
// │   ┌── 6345
// └── 67
//     └── 23

node = test.find(100); // null

prettyPrint(test.root);

const arr = [];
test.levelOrder((node) => arr.push(node.data));
console.log(arr);
// [9, 4, 67, 1, 5, 23, 6345, 3];

arr.splice(0, arr.length);
test.inOrder((node) => arr.push(node.data));
console.log(arr);
// [1, 3, 4, 5, 9, 23, 67, 6345];

arr.splice(0, arr.length);
test.preOrder((node) => arr.push(node.data));
console.log(arr);
// [9, 4, 1, 3, 5, 67, 23, 6345];

arr.splice(0, arr.length);
test.postOrder((node) => arr.push(node.data));
console.log(arr);
// [3, 1, 5, 4, 23, 6345, 67, 9];

console.log(test.height(test.root)); // 3

node = test.find(1);
console.log(test.depth(node)); // 2

console.log(test.isBalanced()); // true
test.insert(2);
console.log(test.isBalanced()); // false
test.rebalance();
console.log(test.isBalanced()); // true
