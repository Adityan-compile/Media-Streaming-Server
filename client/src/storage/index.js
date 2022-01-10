const storage = {
  get: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  clear: () => {
    console.log("Clear");
    localStorage.clear();
  },
};

export default storage;
