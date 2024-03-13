import {render} from "react-dom";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );