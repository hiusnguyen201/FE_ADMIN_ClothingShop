import { Router } from "@/routes";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from 'react-redux';
import {makeStore} from './lib/store';

function App() {
  return (
    <>
        <Provider store={makeStore()}>
      <Router />
      <Toaster />
      </Provider>
    </>
  );
}

export default App;
