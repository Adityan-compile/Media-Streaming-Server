import axios from "./axios";

const media = {
  search: (query) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/media/search?q=${query}`)
        .then(({ data }) => {
          resolve(data.results);
        })
        .catch((e) => reject(e));
    });
  },
  fetchHighlights: () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/media/highlights")
        .then(({ data }) => {
          resolve(data.highlights);
        })
        .catch((e) => reject(e));
    });
  },
  fetchTopRated: () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/media/toprated")
        .then(({ data }) => {
          resolve(data.results);
        })
        .catch((e) => reject(e));
    });
  },
  createHighlight: (id, highlightType) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/media/highlights/new", {
          highlight: id,
          highlightType,
        })
        .then(({ data }) => {
          resolve(data.highlight[0]);
        })
        .catch((e) => reject(e));
    });
  },
  deleteHighlight: (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/media/highlights/delete?id=${id}`)
        .then(() => resolve(true))
        .catch((e) => reject(e));
    });
  },
  fetchWatching: () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/media/watching/all")
        .then(({ data }) => {
          resolve(data.body.watching);
        })
        .catch((e) => reject(e));
    });
  },
  updateWatching: (body) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/media/watching/update", body)
        .then(({ data }) => resolve(data.body.updated))
        .catch((err) => reject(err));
    });
  },
  resetWatching: (mediaId) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/media/watching/reset?mediaId=${mediaId}`)
        .then(resolve)
        .catch(reject);
    });
  },
};

export default media;
