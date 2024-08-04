import { Node } from "./node.js";

class Tree {
  #root;
  constructor(array) {
    this.#root = this.buildTree(array);
  }

  buildTree(array) {
    const uniq = [...new Set(array)];
    uniq.sort((a, b) => (a > b ? 1 : -1));
    return this.#buildTreeRecur(uniq, 0, uniq.length - 1);
  }

  #buildTreeRecur(array, start, end) {
    if (start > end) {
      return null;
    }
    const middle = Math.floor((start + end) / 2);
    const root = Node(array[middle]);
    root.left = this.#buildTreeRecur(array, start, middle - 1);
    root.right = this.#buildTreeRecur(array, middle + 1, end);
    return root;
  }

  get root() {
    return this.#root;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

export { Tree, prettyPrint };
