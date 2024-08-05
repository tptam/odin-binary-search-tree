import { Tree, prettyPrint } from "./tree.js";

// Create a binary search tree from an array of random numbers < 100.
// You can create a function that returns an array of random numbers
// every time you call it if you wish.

const randomArray = (n, max) => {
  const array = [];
  for (let i = 0; i < n; i++) {
    array[i] = Math.floor(Math.random() * (max + 1));
  }
  return array;
};

const array = randomArray(5, 100);
const tree = new Tree(array);

console.log(`Tree is created from array ${array}.`);
prettyPrint(tree.root);

// Confirm that the tree is balanced by calling isBalanced.
console.log(`This tree is ${tree.isBalanced() ? "" : "not "}balanced.`);

// Print out all elements in level, pre, post, and in order.
const levelOrder = [];
tree.levelOrder((node) => levelOrder.push(node.data));
const preOrder = [];
tree.preOrder((node) => preOrder.push(node.data));
const postOrder = [];
tree.postOrder((node) => postOrder.push(node.data));
const inOrder = [];
tree.inOrder((node) => inOrder.push(node.data));

console.table({ levelOrder, preOrder, postOrder, inOrder });

// Unbalance the tree by adding several numbers > 100.
const array2 = randomArray(10, 100);
array2.forEach((data) => tree.insert(data));
console.log("");
console.log(`Numbers are inserted from array ${array2}.`);

// Confirm that the tree is unbalanced by calling isBalanced.
console.log(`Now this tree is ${tree.isBalanced() ? "" : "not "}balanced.`);
prettyPrint(tree.root);

// Balance the tree by calling rebalance.
tree.rebalance();

// Confirm that the tree is balanced by calling isBalanced.
console.log("");
console.log("Rebalance done.");
console.log(`Now this tree is ${tree.isBalanced() ? "" : "not "}balanced.`);
prettyPrint(tree.root);

// Print out all elements in level, pre, post, and in order.
levelOrder.splice(0, levelOrder.length);
preOrder.splice(0, preOrder.length);
postOrder.splice(0, postOrder.length);
inOrder.splice(0, inOrder.length);

tree.levelOrder((node) => levelOrder.push(node.data));
tree.preOrder((node) => preOrder.push(node.data));
tree.postOrder((node) => postOrder.push(node.data));
tree.inOrder((node) => inOrder.push(node.data));

console.table({ levelOrder, preOrder, postOrder, inOrder });
