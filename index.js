// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = { value: value, next: null };
  }
  replaceIfFoundOrAppend(value) {
    let current = this.head;
    let previous;

    while (current) {
      if (value[0] == current.value[0]) {
        current.value[1] = value[1];
        return;
      } else {
        previous = current;
        current = current.next;
      }
    }
    previous.next = { value: value, next: null };
    // this.append(value);
  }

  get(key) {
    let current = this.head;
    while (current) {
      if (key == current.value[0]) {
        return current.value[1];
      }
      current = current.next;
    }
    return null;
  }

  has(key) {
    let current = this.head;
    while (current) {
      if (current.value[0] == key) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // remove(key){
  //   let current = this.head;
  //   while(current){
  //     if(current.value[0] == key){
  //       current = current.
  //     }
  //   }
  // }
}
class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.buckets = Array(16);
    this.capacity = 16;
    this.actual_content = 0;
    this.load_factor = 0.75;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let hash = this.hash(key);
    let key_value = [key, value];

    // console.log(key, hash);

    if (!this.buckets[hash]) {
      this.buckets[hash] = new LinkedList();
      this.buckets[hash].head = new Node(key_value, null);
      this.actual_content++;
    } else {
      this.buckets[hash].replaceIfFoundOrAppend(key_value);
    }
    this.enlarge();
  }

  enlarge() {
    if (this.actual_content / this.capacity >= this.load_factor) {
      this.buckets = [...this.buckets, ...Array(this.buckets.length)];
      this.capacity *= 2;
    }
  }

  get(key) {
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        let value = this.buckets[i].get(key);
        if (value) {
          return value;
        }
      }
    }
    return null;
  }

  has(key) {
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        if (this.buckets[i].has(key)) {
          return true;
        }
      }
    }
    return false;
  }

  remove(key) {
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        if (this.buckets[i].has(key)) {
          return true;
        }
      }
    }
    return false;
  }
}

let hashy = new HashMap();

hashy.set("frog", "green");
hashy.set("apple", "red");
hashy.set("banana", "yellow");
hashy.set("carrot", "orange");
hashy.set("dog", "brown");
hashy.set("elephant", "gray");
hashy.set("grape", "purple");
hashy.set("hat", "black");
hashy.set("ice cream", "white");
hashy.set("jacket", "blue");
hashy.set("lion", "golden");
hashy.set("kite", "pink");
hashy.set("kite", "red");
hashy.set("kope", "red");

hashy.set("fac", "golden");
hashy.set("nacho", "pink");
hashy.set("robot", "dark");
hashy.set("stand", "red");
hashy.set("tube", "yellow");
hashy.set("under", "orange");
hashy.set("vlog", "brown");
hashy.set("word", "gray");
hashy.set("xylo", "purple");
hashy.set("yard", "black");
hashy.set("zok cream", "white");
hashy.set("brown", "blue");
hashy.set("crow", "golden");
hashy.set("dove", "pink");
hashy.set("park", "red");
hashy.set("hot", "golden");
hashy.set("inter", "pink");
hashy.set("park", "rolling");
hashy.set("robot", "trollo");

console.log(hashy.buckets);
console.log(hashy.actual_content);

console.log(hashy.has("jacket"));
