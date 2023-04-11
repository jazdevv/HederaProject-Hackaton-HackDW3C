import { createRoot } from'react-dom/client'
import { RouterProvider} from "react-router-dom";
import router from './router';
import './index.css';
import  store  from "./store/store"
import { Provider } from 'react-redux'


const el = document.getElementById('root');
const root = createRoot(el);

root.render(<div className='h-screen'>
      <Provider store={store}>
            <RouterProvider router={router}/>  
      </Provider>
</div>
      
          
)
