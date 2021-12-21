import axios from './axios';
import storage from "../../storage";

const auth = {
  getAuthStatus: () => {
    return new Promise((resolve, reject) => {
      const user = storage.get("USER");
      if (user === null || user === undefined) {
        return resolve({
          authenticated: false,
        });
      }
      resolve({
        user: user,
        authenticated: true,
      });
    });
  },
  getUserCount: ()=>{
    return new Promise((resolve,reject)=>{
      axios.get('/auth/users/count').then(({data})=>{
        resolve(data.count);
      }).catch(err=>{
        reject(err);
      });
    });
  },
  serverSetup: (data)=>{
    return new Promise((resolve,reject)=>{
      axios.post('/auth/setup', data).then(({data:res})=>{
        storage.set('USER', res.user);
        resolve({
          user: res.user
        })
      }).catch(e=>reject(e));
    });
  },
  loginUser: (data)=>{
    return new Promise((resolve, reject)=>{
      axios.post('/auth/login',data).then(({data:res})=>{
        storage.set('USER', res.user);
        resolve({
          user: res.user
        })
      }).catch(e=>reject(e))
    });
  }
};

export default auth;
