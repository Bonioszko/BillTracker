import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import InvoicesPage from "./pages/InvoicesPage";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return <InvoicesPage></InvoicesPage>;
}

export default App;
