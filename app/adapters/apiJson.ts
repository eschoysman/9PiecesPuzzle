import {api} from "../adapters/api";

const apiJson = {
    get: (endpoint:string) => api.get(endpoint).then(response => response.json()),
    post: (endpoint:string, body:any) => api.post(endpoint, body).then(response => response.json()),
    put: (endpoint:string, body:any) => api.put(endpoint, body).then(response => response.json()),
    delete: (endpoint:string) => api.delete(endpoint).then(response => response.json()),
};

export { apiJson as api };