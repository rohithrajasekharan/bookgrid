import axios from 'axios';
const ROOT_URL = 'http://localhost:8080/books/post';
export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';
export function fetchPosts(){
  const request = axios.get(`${ROOT_URL}`);

  return {
         type: FETCH_POSTS,
         payload: request
  };
}
export function createPost(props) {
  const request = axios.post(`${ROOT_URL}`, props);

  return{
    type: CREATE_POST,
    payload: request
  }
}
export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/${id}`);

  return {
         type: FETCH_POST,
         payload: request
  };
}
export function deletePost(id) {
  const request = axios.delete(`${ROOT_URL}/${id}`);

  return {
         type: DELETE_POST,
         payload: request
  };
}
