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

// DIJKSTRA'S ALGORITHM

//=======================================
//=======================================

export function dijkstras(grid, startNode, endNode) {
  // Initiate the priority queue
  var nodes = new PriorityQueue();
  // Set up visited nodes array - used for animations later
  const visitedNodes = [];
  // Give the start node a distance of 1 and use the distance as the priority
  startNode.distance = 1;
  nodes.enqueue(startNode, startNode.distance);
  let priority;
  // While there is something in the queue
  while (!!nodes.values.length) {
    // Get the first priority node - Node with shortest distance
    priority = nodes.dequeue().val;
    // If the node is a wall then skip
    if (priority.isWall) continue;
    // Add visited property to the node and push into visited array
    priority.isVisited = true;
    visitedNodes.push(priority);
    // Return if the priority node is the end node
    if (priority === endNode) return visitedNodes;
    // Find neighboring nodes to the priority node
    let neighbors = [];
    const { col, row } = priority;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    // Filter out visited nodes as we don't want to revist them
    neighbors = neighbors.filter(x => !x.isVisited);
    for (let i = 0; i < neighbors.length; i++) {
      // Update the distance to be an accumulation of all the nodes before it
      neighbors[i].distance = priority.distance + 1;
      // Set a previous property to be the priority node - this lets us find the shortest path later
      neighbors[i].previousNode = priority;
      // Only push the neighbor onto the priority queue if it isn't already in there
      if (!nodes.values.some(x => x.val === neighbors[i])) {
        nodes.enqueue(neighbors[i], neighbors[i].distance);
      }
    }
  }
  // If there is nothing left in the priority queue return the visited nodes array for animation
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
