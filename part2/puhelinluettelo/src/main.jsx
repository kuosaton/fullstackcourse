import axios from "axios";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

axios.get("http://localhost:3001/persons").then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
});
