import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { courseApi } from '../services/coursesService';
import { userApi } from '../services/userServices';

const persistConfig = {
    key: 'user',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        user: persistedAuthReducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(courseApi.middleware, userApi.middleware),
});

const persistor = persistStore(store);

export { persistor, store };
