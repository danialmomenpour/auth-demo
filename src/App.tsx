import {Refine} from "@refinedev/core";
import {BrowserRouter} from "react-router";
import "./App.css";
import {dataProvider} from "./providers/data";
import {Routers} from "./Router/Router.tsx";
import {AuthProvider} from "./context/authContext.tsx";

function App() {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                resources={[]}
            >
                <AuthProvider>
                    <Routers/>
                </AuthProvider>
            </Refine>
        </BrowserRouter>
    );
}

export default App;
