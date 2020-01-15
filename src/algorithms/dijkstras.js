//=======================================
//=======================================

// PRIORITY QUEUE

//=======================================
//=======================================
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue = (val, priority) => {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  };
  bubbleUp = () => {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  };
  dequeue = () => {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  };
  sinkDown = () => {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  };
}

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}
//=======================================
//=======================================

// PRIORITY QUEUE

//=======================================
//=======================================

export function dijkstras(grid, startNode, endNode) {
  var nodes = new PriorityQueue();
  const visitedNodes = [];
  startNode.distance = 1;
  nodes.enqueue(startNode, startNode.distance);
  let priority;
  // While there is something in the queue
  var i = 0;
  while (!!nodes.values.length) {
    i++;
    console.log(nodes.values.slice());
    // Get the first priority node - Node with shortest distance
    priority = nodes.dequeue().val;
    // If the node is a wall then skip
    if (priority.isWall) continue;
    // Add visited property to the node and push into visited array
    priority.isVisited = true;
    visitedNodes.push(priority);
    // Return if the priority node is the end node
    if (priority === endNode) return visitedNodes;
    // Find neighboring nodes and update the distancs
    // Set each of the neighboring nodes to have a prevous node of the currnent priority
    // Push them all into the priority queue then re-loop
    let neighbors = [];
    const { col, row } = priority;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    neighbors = neighbors.filter(x => !x.isVisited);
    neighbors.forEach(neighbor => {
      neighbor.distance = priority.distance + 1;
      neighbor.previousNode = priority;
      if (!nodes.values.some(x => x.val === neighbor)) {
        nodes.enqueue(neighbor, neighbor.distance);
      }
    });
  }
  return visitedNodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function shortestPath(endNode) {
  const shortestPath = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    shortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPath;
}
