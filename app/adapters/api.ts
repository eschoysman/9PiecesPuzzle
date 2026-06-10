const basePath = "http://localhost:7070/api";

export interface API {
    get: (endpoint: string) => Promise<Response>
    post: (endpoint: string, body: any) => Promise<Response>
    put: (endpoint: string, body: any) => Promise<Response>
    delete: (endpoint: string) => Promise<Response>
}

const api:API = {
    get: (endpoint:string) => fetch(`${basePath}/${endpoint}`),
    post: (endpoint:string, body:any) =>
        fetch(`${basePath}/${endpoint}`, {
            method: "POST",
            body: body && JSON.stringify(body),
        }),
    put: (endpoint:string, body:any) =>
        fetch(`${basePath}/${endpoint}`, {
            method: "PUT",
            body: body && JSON.stringify(body),
        }),
    delete: (endpoint:string) =>
        fetch(`${basePath}/${endpoint}`, {
            method: "DELETE",
        }),
};

export { api };