import axios from 'axios';
import { Photo } from '../types/Photo';
import { SearchType } from '../types/SearchType';

const API_KEY = 'h9SePOehg6N1eQ1wcurI9TkvMh34zsXkPYMnnpYKFkg';
const BASE_URL = `https://api.unsplash.com/photos?client_id=${API_KEY}`;
const LINK = `photos?client_id=${API_KEY}`;

export const getPhotos = (page = 1, perPage = 10, orderBy = 'latest') => {
  return axios
    .get<Photo[]>(`${BASE_URL}&page=${page}&per_page=${perPage}&order_by=${orderBy}`);
};

export const getPhoto = (id: string) => {
  return axios.get<Photo>(`https://api.unsplash.com/photos/${id}/?client_id=${API_KEY}`);
};

export const searchPhotos = (query: string, page: number, perPage = 10, orderBy = 'relevant') => {
  const searchUrl = `https://api.unsplash.com/search/${LINK}&query=${query}&page=${page}&per_page=${perPage}&order_by=${orderBy}`;
  return axios.get<SearchType>(searchUrl);
};