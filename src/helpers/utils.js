export function getFormBody(params){
    let formBody=[];

    for (let property in params){
        let encodedKey = encodeURIComponent(property);  // THIS INBUILT METHOD CONVERT EG- 'user name' to 'user%20name' etc
        let encodedValue = encodeURIComponent(params[property]);

        formBody.push(encodedKey+"="+encodedValue);
    }
    return formBody.join('&');  // NOW FROM THIS WE HAVE URL ENCODED STRING LIKE SYNTAX 
}

export function getAuthTokenFromLocalStorage(){return localStorage.getItem('token')};