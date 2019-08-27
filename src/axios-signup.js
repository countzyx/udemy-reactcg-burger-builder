// @flow
import axios from 'axios';

const apiKey = 'AIzaSyBA_tQyyrq-P-sHM9tH4RCFhOv8zQ4296Y';
const instance = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
});

export default instance;
