import { configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { rootReducer } from './root-reducer'

const persistConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const createStore = (initialState = {}) => {
	return configureStore({
		reducer: persistedReducer,
		preloadedState: initialState,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
				}
			})
	})
}

export const store = createStore()
export const persistor = persistStore(store)
export type TypeRootState = ReturnType<typeof rootReducer>
