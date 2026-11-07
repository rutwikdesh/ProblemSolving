function bfs(graph, startNode) {
  const visited = new Set([startNode]);
  const queue = [startNode];
  let head = 0; // Index pointer for O(1) dequeue
  const result = [];

  while (head < queue.length) {
    const current = queue[head++]; // Read and advance pointer
    result.push(current);

    for (const neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor); // O(1) amortized append
      }
    }
  }

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

console.log(bfs(adjList, 'A'));
// Output: ['A', 'B', 'C', 'D', 'E', 'F']
