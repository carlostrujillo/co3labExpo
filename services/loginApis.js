const FB_API_ID = "2011718712462198";

export const login = () => {
     return  Expo.Facebook.logInWithReadPermissionsAsync(FB_API_ID, {
        permissions: ['public_profile'],
        behavior: 'native'
      });
}

export const fetchUserInfo = () => {
    const response =  fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`);
    const userInfo =  response.json();
    return userInfo;
}