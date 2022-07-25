const rootURL = 'https://codeial.codingninjas.com:8000/api/v2';
export const APIUrls = {
    loginURL: () => `${rootURL}/users/login`,
    signupURL : () => `${rootURL}/users/signup`,
    fetchPostsURL: (pages=1,limit=25) => `${rootURL}/posts?page=${pages}&limit=${limit}`,
    editProfileURL: () => `${rootURL}/users/edit`,
    userProfile : (userId) => `${rootURL}/users/${userId}`,
    userFriends: () => `${rootURL}/friendship/fetch_user_friends`,
    addFriend : (userId) => `${rootURL}/friendship/create_friendship?user_id=${userId}`,
    removeFriend : (userId) => `${rootURL}/friendship/remove_friendship?user_id=${userId}`,
    createPost : () => `${rootURL}/posts/create`,
    createComment: () => `${rootURL}/comments/`,
    toggleLike: (id,likeType) => `${rootURL}/likes/toggle?likeable_id=${id}&likeable_type=${likeType}`,
    userSearch: (searchText) => `${rootURL}/users/search?text=${searchText}`,
}