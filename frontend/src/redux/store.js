import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modeSlice from "./modeSlice.js"
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from "./authSlice.js";
import CompanySlice from "./CompanySlice.js";
import jobSlice from "./jobSlice.js";
import applicaationSlice from "./applicaationSlice.js"

const rootReducer = combineReducers({
    mode: modeSlice,
    auth : authSlice,
    company : CompanySlice,
    job : jobSlice,
    applicaation : applicaationSlice
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})



export default store