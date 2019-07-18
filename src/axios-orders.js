// @flow
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://udemy-reactcg-burger-builder.firebaseio.com',
});

export default instance;
