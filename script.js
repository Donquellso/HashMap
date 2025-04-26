class HashMap {
  constructor() {
    this.hashmap = [];
  }
  #capacity = 16;

  getCapacity() {
    return this.#capacity;
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.#capacity;
  }
  set(key, value) {
    let nextNode = null;
    const bucket = this.hash(key);
    // console.log(`key: ${key} → bucket: ${bucket}`);
    if (!this.hashmap[bucket]) {
      this.hashmap[bucket] = { key, value, nextNode };
      return;
    } else if (this.hashmap[bucket].key === key) {
      this.hashmap[bucket].value = value;
      return;
    } else {
      let current = this.hashmap[bucket];
      while (current) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        if (!current.nextNode) break;
        current = current.nextNode;
      }
      current.nextNode = { key, value, nextNode };
    }
    this.preload();
  }
  get(key) {
    const bucket = this.hash(key);
    let current = this.hashmap[bucket];
    if (this.hashmap[bucket]) {
      while (current) {
        if (current.key === key) {
          return current.value;
        }
        current = current.nextNode;
      }
    }
    return null;
  }
  has(key) {
    const bucket = this.hash(key);
    let current = this.hashmap[bucket];
    if (this.hashmap[bucket]) {
      while (current) {
        if (current.key === key) {
          return true;
        }
        current = current.nextNode;
      }
    }
    return false;
  }
  remove(key) {
    const bucket = this.hash(key);
    let current = this.hashmap[bucket];
    let previous = null;
    if (this.hashmap[bucket]) {
      while (current) {
        if (current.key === key) {
          if (!previous) {
            this.hashmap[bucket] = current.nextNode;
          } else {
            previous.nextNode = current.nextNode;
          }
          return true;
        }
        previous = current;
        current = current.nextNode;
      }
    }
    return false;
  }
  length() {
    let count = 0;
    this.hashmap.forEach((node) => {
      let current = node;
      while (current) {
        count++;
        current = current.nextNode;
      }
    });
    return count;
  }
  clear() {
    this.hashmap = [];
  }
  keys() {
    let keys = [];
    this.hashmap.forEach((node) => {
      let current = node;
      while (current) {
        keys.push(current.key);
        current = current.nextNode;
      }
    });
    return keys;
  }
  values() {
    let values = [];
    this.hashmap.forEach((node) => {
      let current = node;
      while (current) {
        values.push(current.value);
        current = current.nextNode;
      }
    });
    return values;
  }
  entries() {
    let entries = [];
    this.hashmap.forEach((node) => {
      let current = node;
      while (current) {
        entries.push([current.key, current.value]);
        current = current.nextNode;
      }
    });
    console.log(entries);
    return entries;
  }
  preload() {
    const length = this.length();
    const loadfactor = length / this.#capacity;
    console.log("loadfactor: " + loadfactor);
    if (loadfactor > 0.75) {
      this.#capacity = this.#capacity * 2;
    }
    const newHashMap = [];
    this.hashmap.forEach((element) => {
      let current = element;
      while (current) {
        const bucket = this.hash(current.key);
        const newNode = {
          key: current.key,
          value: current.value,
          nextNode: null,
        };
        if (!newHashMap[bucket]) {
          newHashMap[bucket] = newNode;
        } else {
          let temp = newHashMap[bucket];
          while (temp.nextNode) {
            temp = temp.nextNode;
          }
          temp.nextNode = newNode;
        }
        current = current.nextNode;
      }
    });
    this.hashmap = newHashMap;
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

const score = test.entries();
console.log(score);
const length = test.length();
console.log(length);
const capacity = test.getCapacity();
console.log(capacity);
