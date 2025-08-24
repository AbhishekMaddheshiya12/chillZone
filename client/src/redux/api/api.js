import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const API_URL = "http://localhost:3000"//"https://chillzone-tif5.onrender.com";

const api = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:`${API_URL}/user`}),
    tagTypes:["Chat","User"],

    endpoints:(builder) => ({
        myDetails : builder.query({
            url:"/me",
            credentials:"include"
        }),
        providedTags:["User"]
    })

    
})