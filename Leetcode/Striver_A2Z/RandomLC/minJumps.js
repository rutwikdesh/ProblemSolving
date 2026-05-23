var minJumps = function (arr) {
    const n = arr.length;
    if (n === 1) return 0;

    const m = new Map();
    const visited = new Array(n).fill(false);

    for (let i = 0; i < n; i++) {
        if (!m.has(arr[i])) m.set(arr[i], []);
        m.get(arr[i]).push(i);
    }

    const q = [[0, 0]];
    let head = 0; // 👈 pointer instead of shift

    visited[0] = true;

    while (head < q.length) {
        const [ind, jumps] = q[head++]; // 👈 O(1)

        if (ind === n - 1) return jumps;

        // i - 1
        if (ind > 0 && !visited[ind - 1]) {
            visited[ind - 1] = true;
            q.push([ind - 1, jumps + 1]);
        }

        // i + 1
        if (ind < n - 1 && !visited[ind + 1]) {
            visited[ind + 1] = true;
            q.push([ind + 1, jumps + 1]);
        }

        // same value
        if (m.has(arr[ind])) {
            for (let nei of m.get(arr[ind])) {
                if (!visited[nei]) {
                    visited[nei] = true;
                    q.push([nei, jumps + 1]);
                }
            }
            m.delete(arr[ind]); // 🔥 critical
        }
    }

    return -1;
};