// 1353. Maximum Number of Events That Can Be Attended [https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/description/]

/**
 * @param {number[][]} events
 * @return {number}
 */
const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

function maxEvents(events) {
  events.sort((a, b) => a[0] - b[0]);

  const n = events.length;
  let pos = 0;
  let time = 1;
  let attended = 0;

  // Queue holds end times
  const minheap = new MinPriorityQueue();

  while (pos < n || !minheap.isEmpty()) {
    if (minheap.isEmpty()) {
      time = Math.max(time, events[pos][0]);
    }

    while (pos < n && events[pos][0] === time) {
      minheap.enqueue(events[pos][1]);
      pos++;
    }

    while (!minheap.isEmpty() && minheap.front().element < time) {
      minheap.dequeue();
    }

    if (!minheap.isEmpty()) {
      minheap.dequeue();
      attended++;
    }

    time++;
  }

  return attended;
}

// Example:
console.log(maxEvents([[2, 3], [3, 3], [1, 4], [4, 4]])); // 4
