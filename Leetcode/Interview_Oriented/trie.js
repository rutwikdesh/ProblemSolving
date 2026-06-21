// Build Trie (use this in almost all problems)


const buildTrie = (words) => {
  const root = {};

  for (const word of words) {
    let node = root;

    for (const ch of word) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }

    node.word = word; // ⭐ mark end (better than isEnd)
  }

  return root;
};

// cat, car, dog

// root['c'] = {}

// root = root['c'];

// root = {
//   c: {
//     a: {
//       t: {
//         word: "cat"
//       },
//       r: {
//         word: "car"
//       }
//     }
//   },
//   d: {
//     o: {
//       g: {
//         word: "dog"
//       }
//     }
//   }
// }