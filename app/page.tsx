'use client';
import {StrictMode} from "react";
import {Provider} from 'react-redux'

import {store} from '@/app/store';
import Counter from "@/app/features/counter/Counter";

const App = () => {

  return (
      <StrictMode>
          <Provider store={store}>
              {/*<Home/>*/}
              <Counter/>
          </Provider>
      </StrictMode>
  );

}

export default App;