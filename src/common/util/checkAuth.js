

const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token');
    if (!userToken || userToken === 'undefined') {
        console.log("User not logged in")
      localStorage.clear();
      return false
    }
    return true;
  }
  
  export default checkUserToken;

export function getAuthToken(){
  const token =  localStorage.getItem('user-token');
  const userRole = localStorage.getItem('user-role');
  const tokenType={
    token,userRole
  };
  return tokenType;
}

export function tokenLoader(){
    console.log("token loader",getAuthToken() )
    return getAuthToken();
}


  