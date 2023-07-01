import { Route, Routes } from "react-router-dom"
import Template from "./components/nav/Template"
import CreateSurvey from "./pages/CreateSurvey/CreateSurvey"
import Home from "./pages/Home/Home"
import Login from "./pages/Login"

const Router = () => {
    return(
        <Template>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-survey" element={<CreateSurvey />} />
            </Routes>
        </Template>
    )
}

export default Router