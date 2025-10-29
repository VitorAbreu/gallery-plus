import axios, {type AxiosRequestConfig} from 'axios';

// fazer isso simplifica as chamadas http do axios
// podendo acessar o endpoint sem precisar repetir a baseURL
// import.meta.env é a forma como acessa as variáveis de ambiente pelo VITE
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// criando fetcher para atuar com reactQuery
// options é usado para os headers
export const fetcher = (url: string, options: AxiosRequestConfig = {}) =>
  api.get(url, options).then((res) => res.data);