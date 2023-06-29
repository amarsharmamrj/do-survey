import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Router from "./Router"

const BaseRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<Router />} />
            </Routes>
        </BrowserRouter>
    )
}

export default BaseRouter