import { createRoot } from'react-dom/client'
import { RouterProvider} from "react-router-dom";
import router from './router';
import './index.css';

const el = document.getElementById('root');
const root = createRoot(el);

root.render(
      <RouterProvider router={router}/>      
)
