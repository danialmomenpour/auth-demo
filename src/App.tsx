import {Refine} from "@refinedev/core";
import {BrowserRouter} from "react-router";
import "./App.css";
import {dataProvider} from "./providers/data";
import {Routers} from "./Router/Router.tsx";

function App() {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                resources={[]}
            >
                <Routers/>
            </Refine>
        </BrowserRouter>
    );
}

export default App;
