const storage = {
  get: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  set: (key, value) => {
    console.log("set called");
    localStorage.setItem(key, JSON.stringify(value));
  },
  clear: () => {
    localStorage.clear();
  },
};

export default storage;
