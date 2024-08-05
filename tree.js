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

  has(data) {
    let current = this.#root;
    while (current !== null) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  insert(data) {
    let current = this.#root;
    while (current !== null) {
      if (data === current.data) {
        return;
      }
      if (data < current.data) {
        if (current.left === null) {
          current.left = new Node(data);
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = new Node(data);
          return;
        }
        current = current.right;
      }
    }
    // The tree is empty
    current = new Node(data);
  }

  deleteItem(data) {
    let current = this.#root;
    let parent = null;
    let isLeft = false;
    while (current !== null) {
      if (current.data === data) {
        this.#deleteNode(parent, current, isLeft);
        return;
      }
      parent = current;
      if (data < current.data) {
        current = current.left;
        isLeft = true;
      } else {
        current = current.right;
        isLeft = false;
      }
    }
  }

  find(value) {
    let current = this.#root;
    while (current !== null) {
      if (value === current.data) {
        return current;
      }
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("No function is provided as callback");
    }
    const discovered = [this.#root];
    while (discovered.length > 0) {
      let current = discovered.shift();
      if (current !== null) {
        callback(current);
        discovered.push(current.left);
        discovered.push(current.right);
      }
    }
  }

  levelOrderRecur(callback, discovered = [this.#root]) {
    if (typeof callback !== "function") {
      throw new Error("No function is provided as callback");
    }
    if (discovered.length === 0) {
      return;
    } else {
      let current = discovered.shift();
      if (current !== null) {
        callback(current);
        discovered.push(current.left);
        discovered.push(current.right);
      }
      this.levelOrderRecur(callback, discovered);
    }
  }

  inOrder(callback, current = this.#root) {
    if (typeof callback !== "function") {
      throw new Error("No function is provided as callback");
    }
    if (current === null) {
      return;
    } else {
      this.inOrder(callback, current.left);
      callback(current);
      this.inOrder(callback, current.right);
    }
  }

  preOrder(callback, current = this.#root) {
    if (typeof callback !== "function") {
      throw new Error("No function is provided as callback");
    }
    if (current === null) {
      return;
    } else {
      callback(current);
      this.preOrder(callback, current.left);
      this.preOrder(callback, current.right);
    }
  }

  postOrder(callback, current = this.#root) {
    if (typeof callback !== "function") {
      throw new Error("No function is provided as callback");
    }
    if (current === null) {
      return;
    } else {
      this.postOrder(callback, current.left);
      this.postOrder(callback, current.right);
      callback(current);
    }
  }

  #deleteNode(parent, current, isLeft) {
    if (current.left === null) {
      // Deleting a leaf node falls under this case
      // because it is the same as making parent point to null,
      // which the both children are.
      this.#deleteNodeWithChild(parent, isLeft, current.right);
    } else if (current.right === null) {
      this.#deleteNodeWithChild(parent, isLeft, current.left);
    } else {
      this.#deleteNodeWithChildren(current);
    }
  }

  #deleteNodeWithChild(parent, isLeft, child) {
    if (parent === null) {
      this.#root = child;
    } else {
      if (isLeft) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }
  }

  #deleteNodeWithChildren(node) {
    // Identify successor (node with min value in the right subtree)
    let sucParent = node;
    let suc = node.right;
    while (suc.left !== null) {
      sucParent = suc;
      suc = suc.left;
    }

    // Let current succeed the data
    node.data = suc.data;

    // Eliminate successor, which has no child or only right child
    this.#deleteNodeWithChild(sucParent, true, suc.right);
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
