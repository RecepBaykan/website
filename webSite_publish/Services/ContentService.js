import axios from 'axios';

const BASE_URL = 'https://128.0.1.196:8080/api/content';

export const listContents = () => axios.get(BASE_URL);