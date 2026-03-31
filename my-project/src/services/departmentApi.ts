import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/createBaseQuery.ts";

import {serialize} from "object-to-formdata";
import type {IDepartment} from "../interfaces/Department/IDepartment.ts";
import type {IDepartmentCreate} from "../interfaces/Department/IDepartmentCreate.ts";
import type {IDepartmentEdit} from "../interfaces/Department/IDepartmentEdit.ts";

export const departmentApi= createApi({
    reducerPath: 'departmentApi',
    baseQuery: createBaseQuery("departments"),
    tagTypes: ['Department'],
    endpoints: (builder) => ({

        getDepartment: builder.query<IDepartment[], void>({
            query: () => {
                return {
                    url: '/',
                    method: 'GET',
                }
            },
            providesTags: ["Department"]
        }),

        getDepartmentById: builder.query<IDepartment, number>({
            query: (id) => {
                return{
                    url: `/${id}/`,
                    method: 'GET',
                }

            },
            providesTags: ["Department"]
        }),

        deleteDepartment: builder.mutation<void, number>({
            query: id => ({
                url: `/${id}/`,
                method: "DELETE"
            }),
            invalidatesTags: ["Department"]
        }),

        createDepartment: builder.mutation<void, IDepartmentCreate>({
            query: (body) => {
                const formData = serialize(body);
                return {
                    url: "/",
                    method: "POST",
                    body: formData
                }
            },
            invalidatesTags: ["Department"]
        }),

        editDepartment: builder.mutation<void, {id: number; body: IDepartmentEdit; }>({
            query: ({id, body}) => ({
                url: `/${id}/`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Department"]
        })

    })
});

export const {
    useGetDepartmentQuery,
    useGetDepartmentByIdQuery,
    useDeleteDepartmentMutation,
    useCreateDepartmentMutation,
    useEditDepartmentMutation,
} = departmentApi;