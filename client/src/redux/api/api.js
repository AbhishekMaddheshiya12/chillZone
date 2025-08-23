import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const api = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000/user"}),
    tagTypes:["Chat","User"],

    endpoints:(builder) => ({
        myDetails : builder.query({
            url:"/me",
            credentials:"include"
        }),
        providedTags:["User"]
    })

    
})