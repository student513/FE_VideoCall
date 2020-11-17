import { observable } from 'mobx';

const tokenStore = observable({
  token: null,

  setStoreToken(token) {
    this.token = token;
  },
});

export { tokenStore };
