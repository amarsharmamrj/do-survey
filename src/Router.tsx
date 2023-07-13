import { Route, Routes } from "react-router-dom"
import Template from "./components/nav/Template"
import CreateSurvey from "./pages/CreateSurvey/CreateSurvey"
import EditSurvey from "./pages/EditSurvey/EditSurvey"
import Home from "./pages/Home/Home"
import Login from "./pages/Login"
import ViewSurvey from "./pages/ViewSurvey/ViewSurvey"

const Router = () => {
    return (
        <Template>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-survey" element={<CreateSurvey />} />
                <Route path="/survey/edit/:id" element={<EditSurvey />} />
                <Route path="/survey/:id" element={<ViewSurvey />} />
            </Routes>
        </Template>
    )
}

export default Router