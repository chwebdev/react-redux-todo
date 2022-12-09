import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createStore, persistor } from 'store/store'
import { render } from '@testing-library/react'
import { PersistGate } from 'redux-persist/integration/react'

export const renderProvider = (Component: ReactNode, initialState = {}) => {
	return render(
		<Provider store={createStore(initialState)}>
			<PersistGate loading={null} persistor={persistor}>
				{Component}
			</PersistGate>
		</Provider>
	)
}
