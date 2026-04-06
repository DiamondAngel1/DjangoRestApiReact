import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/createBaseQuery.ts";
import type {ICity} from "../interfaces/City/ICity.ts";
import type {ICityCreate} from "../interfaces/City/ICityCreate.ts";
import {serialize} from "object-to-formdata";

export const cityApi= createApi({
    reducerPath: 'cityApi',
    baseQuery: createBaseQuery("cities"),
    tagTypes: ['Cities'],
    endpoints: (builder) => ({

        getCities: builder.query<ICity[], void>({
            query: () => {
                return {
                    url: '/',
                    method: 'GET',
                }
            },
            providesTags: ["Cities"]
        }),

        getCitiesById: builder.query<ICity, number>({
            query: (id) => {
                return{
                    url: `/${id}/`,
                    method: 'GET',
                }

            },
            providesTags: ["Cities"]
        }),

        deleteCity: builder.mutation<void, number>({
            query: id => ({
                url: `/${id}/`,
                method: "DELETE"
            }),
            invalidatesTags: ["Cities"]
        }),

        createCity: builder.mutation<void, ICityCreate>({
            query: (body) => {
                const formData = serialize(body);
                return {
                    url: "/",
                    method: "POST",
                    body: formData
                }
            },
            invalidatesTags: ["Cities"]
        }),

        editCity: builder.mutation<void, {id: number; body: FormData; }>({
            query: ({id, body}) => {
                return {
                    url: `/${id}/`,
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ["Cities"]
        })

    })
});

export const {
    useGetCitiesQuery,
    useGetCitiesByIdQuery,
    useDeleteCityMutation,
    useCreateCityMutation,
    useEditCityMutation,
} = cityApi;