import axios from 'axios';
const ROOT_URL = '/books';
const AUTH_URL = '/auth';
const BOOKSAPI_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const API_KEY = ' AIzaSyA3BXEertW9Z7HLiHKnfCQBQagFUVwRbgs';
export const FETCH_POSTS = 'FETCH_POSTS';
export const LOGIN_USER = 'LOGIN_USER';
export const CREATE_POST = 'CREATE_POST';
export const SAVE_POST = 'SAVE_POST';
export const CREATE_USER = 'CREATE_USER';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_GOOGLEUSER = 'FETCH_GOOGLEUSER';
export const FETCH_FACEBOOKUSER = 'FETCH_FACEBOOKUSER';

export function fetchBooks(title){
  const request = axios.get(`${BOOKSAPI_URL}${title}&key=${API_KEY}`);

  return {
         type: FETCH_BOOKS,
         payload: request
  };
}
export function logoutUser(){
  const request = axios.get(`${AUTH_URL}/logout`);

  return {
         type: FETCH_POSTS,
         payload: request
  };
}
export function fetchPosts(){
  const request = axios.get(`${AUTH_URL}/books`);

  return {
         type: FETCH_POSTS,
         payload: request
  };
}
export function createPost(props) {
  const request = axios.post(`${ROOT_URL}/post`, props);

  return{
    type: CREATE_POST,
    payload: request
  }
}
export function savePost(props) {
  const request = axios.post(`${ROOT_URL}/update`, props);

  return{
    type: SAVE_POST,
    payload: request
  }
}
export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/post/${id}`);

  return {
         type: FETCH_POST,
         payload: request
  };
}
export function deletePost(id) {
  const request = axios.delete(`${ROOT_URL}/post/${id}`);

  return {
         type: DELETE_POST,
         payload: request
  };
}


export function createUser(props) {
  const request = axios.post(`${AUTH_URL}/register`, props);

  return{
    type: CREATE_USER,
    payload: request
  }
}

export function loginUser(props) {
  const request = axios.post(`${AUTH_URL}/login`, props);

  return {
         type: LOGIN_USER,
         payload: request
  };
}
export function fetchUser(){
  const request = axios.get(`${AUTH_URL}/user`);

  return {
         type: FETCH_USER,
         payload: request
  };
}
export function fetchGoogleUser(){
  const request = axios.get(`${AUTH_URL}/google`);

  return {
         type: FETCH_GOOGLEUSER,
         payload: request
  };
}
export function fetchFacebookUser(){
  const request = axios.get(`${AUTH_URL}/facebook`);

  return {
         type: FETCH_FACEBOOKUSER,
         payload: request
  };
}
