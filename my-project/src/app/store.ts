import {configureStore} from "@reduxjs/toolkit";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {cityApi} from "../services/cityApi.ts";
import {departmentApi} from "../services/departmentApi.ts";

export const store = configureStore({
    reducer: {
        [cityApi.reducerPath]: cityApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(cityApi.middleware)
        .concat(departmentApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;