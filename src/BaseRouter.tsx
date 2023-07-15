import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Router from "./Router"
import { SnackbarProvider } from 'notistack'

const BaseRouter = () => {
    return (
        <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<Router />} />
                </Routes>
            </BrowserRouter>
        </SnackbarProvider>
    )
}

export default BaseRouter