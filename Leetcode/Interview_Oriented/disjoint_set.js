class DisjointSet {
  constructor(n) {
    this.size = Array(n).fill(1);
    this.parent = Array(n);

    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }

  findUParent(node) {
    if (node === this.parent[node]) return node;
    return this.parent[node] = this.findUParent(this.parent[node]);
  }

  unionBySize(u, v) {
    let ultpar_u = this.findUParent(u);
    let ultpar_v = this.findUParent(v);
    if (this.size[ultpar_u] > this.size[ultpar_v]) {
      this.parent[ultpar_v] = ultpar_u;
      this.size[ultpar_u] += this.size[ultpar_v];
    } else {
      this.parent[ultpar_u] = ultpar_v;
      this.size[ultpar_v] += this.size[ultpar_u];
    }
  }
}

const ds = new DisjointSet(7);

ds.unionBySize(1, 2);
ds.unionBySize(2, 3);
ds.unionBySize(4, 5);
ds.unionBySize(6, 7);
ds.unionBySize(5, 6);

if (ds.findUParent(3) === ds.findUParent(7)) {
  console.log("Same");
} else {
  console.log("Not Same");
}

ds.unionBySize(3, 4);

if (ds.findUParent(3) === ds.findUParent(7)) {
  console.log("Same");
} else {
  console.log("Not Same");
}
