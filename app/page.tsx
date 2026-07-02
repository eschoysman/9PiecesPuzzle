'use client';
import {StrictMode} from "react";
import {Provider} from 'react-redux'

import {store} from '@/app/store/Store';
import Home from "@/app/components/home/Home";

const App = () => {

  return (
      <StrictMode>
          <Provider store={store}>
              <Home/>
          </Provider>
      </StrictMode>
  );

}

export default App;