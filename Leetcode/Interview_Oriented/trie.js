// Build Trie (use this in almost all problems)


const createTrie = function (words) {
  let trie = {};
  for (let word of words) {
    let node = trie;
    for (let ch of word) {
      if (!node[ch]) {
        node[ch] = {}
      }
      node = node[ch];
    }
    node.word = word;
  }
  return trie;
}


// Example Obj:
// {
//   "o": { "a": { "t": { "h": { "word": "oath" } } } },
//   "p": {
//     "e": { "a": { "word": "pea", "t": { "e": { "r": { "word": "peater" } } } } }
//   },
//   "r": { "a": { "i": { "n": { "word": "rain" } } } }
// }


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