import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';

export default {
  state() {
    return {
      //   userId: 'c3',
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  mutations,
  getters,
  actions,
};
