import { MinPriorityQueue } from "@datastructures-js/priority-queue";

// Question Link: https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1

class Solution {
  // Returns shortest distances from src to all other vertices
  dijkstra(V, edges, src) {
    const dist = Array(V).fill(Infinity);
    dist[src] = 0;

    const pq = new MinPriorityQueue({
      compare: (a, b) => a[0] - b[0],
    });

    pq.enqueue([0, src]);

    const adj = Array.from({ length: V }, () => new Array(0));

    for (let [from, to, wt] of edges) {
      adj[from].push([to, wt]);
      adj[to].push([from, wt]);
    }

    while (!pq.isEmpty()) {
      const [d, node] = pq.dequeue();

      if (d > dist[node])
        continue;

      for (let [nbr, weight] of adj[node]) {
        const newDist = weight + d;
        if (newDist < dist[nbr]) {
          dist[nbr] = newDist;
          pq.enqueue([newDist, nbr]);
        }
      }
    }
    return dist;
  }
}

// Code Runner
const sol = new Solution();

const V = 3;
const edges = [[0, 1, 1], [1, 2, 3], [0, 2, 6]];
const src = 2;

const result = sol.dijkstra(V, edges, src);
console.log(result);
