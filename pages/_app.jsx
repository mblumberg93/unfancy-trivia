import '../styles/globals.scss'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../reducers'

const store = createStore(rootReducer);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
