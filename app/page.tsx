'use client';
import {StrictMode} from "react";
import { Provider } from 'react-redux'

import {Home} from "@/app/components/home/Home";
// import store from './app/store/store'

const App = () => {

  return (
      <StrictMode>
          {/*<Provider store={store}>*/}
              <Home/>
          {/*</Provider>*/}
      </StrictMode>
  );

}

export default App;