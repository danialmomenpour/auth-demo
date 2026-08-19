import {Refine} from "@refinedev/core";
import {BrowserRouter} from "react-router";
import "./App.css";
import {dataProvider} from "./providers/data";
import {Routers} from "./Router/Router.tsx";
import {AuthProvider} from "./context/authContext.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import defaultOptions from "./config/reactQuery.ts";

function App() {

    const queryClient = new QueryClient({defaultOptions});

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Refine
                    dataProvider={dataProvider}
                    resources={[]}
                >
                    <AuthProvider>
                        <Routers />
                    </AuthProvider>
                </Refine>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
