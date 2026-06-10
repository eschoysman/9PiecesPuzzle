import {API} from "../adapters/api";

const jsonConverter = (data:Response) => data.json();

const jsonApi = (api:API):API => ({
    get: (endpoint:string) => api.get(endpoint).then(jsonConverter),
    post: (endpoint:string, body:any) => api.post(endpoint, body).then(jsonConverter),
    put: (endpoint:string, body:any) => api.put(endpoint, body).then(jsonConverter),
    delete: (endpoint:string) => api.delete(endpoint).then(jsonConverter),
});

export {jsonApi};