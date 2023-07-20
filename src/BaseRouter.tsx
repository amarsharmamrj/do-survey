import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import Router from "./Router"
import { SnackbarProvider } from 'notistack'
import Signup from "./pages/signup/Signup"

const BaseRouter = () => {
    return (
        <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<Router />} />
                </Routes>
            </BrowserRouter>
        </SnackbarProvider>
    )
}

export default BaseRouter