import {Routes, Route, BrowserRouter} from "react-router-dom";
import "./App.css";
import {NormalRoutes, UserRoutes} from "./Routes/Routes";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./Pages/Context/RequireAuth.jsx";

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer/>
            <BrowserRouter>
                <Routes>
                    {NormalRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>
                    ))}
                    {UserRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={<RequireAuth>{route.element}</RequireAuth>}
                        ></Route>
                    ))}
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
