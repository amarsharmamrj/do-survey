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
import Poll from "./pages/poll/Poll"
import PollCreate from "./pages/pollCreate.tsx/PollCreate"
import PollPreview from "./pages/pollPreview/PollPreview"
import PollEdit from "./pages/pollEdit/PollEdit"
import PollSubmit from "./pages/pollSubmit/PollSubmit"
import PollSubmissions from "./pages/pollSubmissions/PollSubmission"
import PollResponces from "./pages/pollResponces/PollResponces"
import Survey from "./pages/Survey/Survey"
import ThankYouPoll from "./pages/ThankyouPoll/ThankYouPoll"

const Router = () => {
    return (
        <Template>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/survey" element={<Survey />} />
                <Route path="/create-survey" element={<CreateSurvey />} />
                <Route path="/survey/edit/:id" element={<EditSurvey />} />
                <Route path="/survey/preview/:id" element={<PreviewSurvey />} />
                <Route path="/survey/submit/:id" element={<SubmitSurvey />} />
                <Route path="/survey/submissions/:id" element={<ViewSubmissions />} />
                <Route path="/survey/submissions/responces/:id" element={<Responces />} />
                <Route path="/survey/thankyou/:name" element={<ThankYou />} />

                <Route path="/poll" element={<Poll />} />
                <Route path="/create-poll" element={<PollCreate />} />
                <Route path="/poll/edit/:id" element={<PollEdit />} />
                <Route path="/poll/preview/:id" element={<PollPreview />} />
                <Route path="/poll/submit/:id" element={<PollSubmit />} />
                <Route path="/poll/submissions/:id" element={<PollSubmissions />} />
                <Route path="/poll/submissions/responces/:id" element={<PollResponces />} />
                <Route path="/poll/thankyou/:pollId" element={<ThankYouPoll />} />

            </Routes>
        </Template>
    )
}

export default Router