function dfsRecursive(graph, startNode) {
  const visited = new Set();
  const result = [];

  function traverse(node) {
    if (!node) return;

    visited.add(node);
    result.push(node);

    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        traverse(neighbor);
      }
    }
  }

  traverse(startNode);
  return result;
}

// Example Adjacency List
const adjList = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E']
};

console.log(dfsRecursive(adjList, 'A'));
// Output: ['A', 'B', 'D', 'E', 'F', 'C']
