import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";


export const CORS:CorsOptions ={
    origin : true,
    methods : 'SET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    credentials: true,
}