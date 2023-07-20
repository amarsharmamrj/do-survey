import { Route, Routes } from "react-router-dom"
import Template from "./components/nav/Template"
import CreateSurvey from "./pages/CreateSurvey/CreateSurvey"
import EditSurvey from "./pages/EditSurvey/EditSurvey"
import Home from "./pages/Home/Home"
import SubmitSurvey from "./pages/SubmitSurvey/SubmitSurvey"
import ThankYou from "./pages/ThankYou/ThankYou"
import ViewSubmissions from "./pages/ViewSubmissions/ViewSubmissions"
import PreviewSurvey from "./pages/PreviewSurvey/PreviewSurvey"
import Responces from "./pages/Responces/Responces"

const Router = () => {
    return (
        <Template>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-survey" element={<CreateSurvey />} />
                <Route path="/survey/edit/:id" element={<EditSurvey />} />
                <Route path="/survey/preview/:id" element={<PreviewSurvey />} />
                <Route path="/survey/submit/:id" element={<SubmitSurvey />} />
                <Route path="/survey/submissions/:id" element={<ViewSubmissions />} />
                <Route path="/survey/submissions/responces/:id" element={<Responces />} />
                <Route path="/survey/thankyou/:name" element={<ThankYou />} />
            </Routes>
        </Template>
    )
}

export default Router