export default {
  //same for login and sign in
  //store all data in UX
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    // state.tokenExpiration = payload.tokenExpiration;
    state.didLogout = false;
  },
  setAutoLogout(state) {
    state.didLogout = true;
  },
};
