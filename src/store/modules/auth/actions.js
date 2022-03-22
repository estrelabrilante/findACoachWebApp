export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMMvFBTSenkW5aaxMcunm78wGO882-IEc';
    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMMvFBTSenkW5aaxMcunm78wGO882-IEc';
    }
    const response = await fetch(url, {
      method: 'POST',

      body: JSON.stringify({
        // request  body payload
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }
    //browser storage
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    //response payload
    console.log(responseData);
    // store data in UX
    context.commit('setUser', {
      // idToken to send requests and restrict resources
      token: responseData.idToken,
      //localId  is userId of newly created user
      userId: responseData.localId,
      //token Expiration how long token us valid
      tokenExpiration: responseData.expiresIn,
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: null,
      });
    }
  },
  //not need to send requests
  //clear all data back to null
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
