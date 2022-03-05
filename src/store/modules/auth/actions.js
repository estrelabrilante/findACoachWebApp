export default {
  async login(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMMvFBTSenkW5aaxMcunm78wGO882-IEc',
      {
        method: 'POST',

        body: JSON.stringify({
          // request  body payload
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }
    //response payload
    console.log(responseData);
    context.commit('setUser', {
      // idToken to send requests and restrict resources
      token: responseData.idToken,
      //localId  is userId of newly created user
      userId: responseData.localId,
      //token Expiration how long token us valid
      tokenExpiration: responseData.expiresIn,
    });
  },
  async signup(context, payload) {
    //send a requests to sign up a new user with email and password
    //request to URL
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMMvFBTSenkW5aaxMcunm78wGO882-IEc',
      {
        method: 'POST',

        body: JSON.stringify({
          // request  body payload
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }
    //response payload
    console.log(responseData);
    context.commit('setUser', {
      // idToken to send requests and restrict resources
      token: responseData.idToken,
      //localId  is userId of newly created user
      userId: responseData.localId,
      //token Expiration how long token us valid
      tokenExpiration: responseData.expiresIn,
    });
  },
};
