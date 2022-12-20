import { createRoot } from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './index.css';
import Main from "./components/Main/Main.jsx";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Main />);