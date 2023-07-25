import { Grid, Box, Stack, TextField, IconButton, Tooltip, Button, Typography, Fab } from "@mui/material"
import { useEffect, useState } from "react"
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import Question from "../../components/PreviewSurvey/Question"
import "./PreviewSurvey.css"
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'
import { useParams, Link } from "react-router-dom";
import QuestionSkel from "../../Skeletons/QuestionSkel";
import checkLogin from "../../utils/checkLogin";
import { useNavigate } from "react-router-dom";

const PreviewSurvey = () => {
    const navigate = useNavigate()
    document.title = 'Preview'
    const { id: surveyId } = useParams();

    const [loading, setLoading] = useState(true)
    const [openFormatToolsName, setOpenFormatToolsName] = useState(false)
    const [anchorElName, setAnchorElName] = useState(null)
    const [surveyNameStyle, setSurveyNameStyle] = useState({})
    const [disableToolsButtonName, setDisableToolsButtonName] = useState(true)
    const openNameTools = Boolean(anchorElName)

    const [openFormatTools, setOpenFormatTools] = useState(false)
    const [anchorElDesc, setAnchorElDesc] = useState(null)
    const [surveyDescStyle, setSurveyDescStyle] = useState({})
    const [disableToolsButtonDesc, setDisableToolsButtonDesc] = useState(true)
    const openDescTools = Boolean(anchorElDesc)

    // data states
    const [surveyName, setSurveyName] = useState('')
    const [surveyDesc, setSurveyDesc] = useState('')
    const [questions, setQuestions] = useState([{
        id: 1,
        questionType: 'textbox',
        required: false
    }])

    const setServerData = (survey: any) => {
        setSurveyName(survey.surveyName)
        setSurveyDesc(survey.surveyDesc)
        let tempSurveyNameStyle = survey.surveyNameStyle && JSON.parse(survey.surveyNameStyle)
        if (tempSurveyNameStyle) setSurveyNameStyle(tempSurveyNameStyle['& input'])

        let tempSurveyDescStyle = survey.surveyDescStyle && JSON.parse(survey.surveyDescStyle)
        if (tempSurveyDescStyle) setSurveyDescStyle(tempSurveyDescStyle['& input'])

        setQuestions(survey.questions && JSON.parse(survey.questions))
    }

    useEffect(() => {
        if (surveyId) {
            axios.get(`${process.env.REACT_APP_API_URL}/survey/${surveyId}`)
                .then((res) => {
                    console.log("survey data:", res.data)
                    if (res.data) setServerData(res.data[0])
                    setLoading(false)
                })
                .catch((err) => {
                    console.log("error in getting survey data:", err)
                    setLoading(false)
                })
        }
    }, [surveyId])

    useEffect(()=> {
        if(!checkLogin()){
         navigate('/login')
        }
     }, [])
 

    return (

        <Grid container className="homepage-container view-survey">
            <Grid item md={12}>
                <Stack direction="row" justifyContent="space-between" className="stack">
                    {/* <Box>
                        <Typography variant="h5" component="h6">All Surveys</Typography>
                    </Box>
                    <Box>
                        <Button component={Link} to="/create-survey" variant="contained" className="bg-two">Create Survey</Button>
                    </Box> */}
                </Stack>
            </Grid>
            <Grid item md={12} container className="question-container">
                {
                    !loading ? (
                        <Grid item xs={12} sm={12} md={10}>
                            <Box className="survey-details">
                                <Typography sx={surveyNameStyle} className="survey-name">{surveyName}</Typography>
                                <Typography sx={surveyDescStyle} className="survey-desc">{surveyDesc}</Typography>
                            </Box>
                        </Grid>
                    ) : ('')
                }
            </Grid>
            <Grid container item md={12} className="question-container">
                {
                    !loading ? (
                        questions.length > 0 ? (
                            questions.map((question: any) => {
                                return (
                                    <Question key={question.id} question={question} questions={questions} setQuestions={setQuestions} />
                                )
                            })
                        ) : ('')
                    ) : (
                        [1, 2, 3, 4].map((item) => (
                            <QuestionSkel key={item + 'card'} />
                        )
                        )
                    )
                }
            </Grid>
            <Grid container item md={12} className="question-container ptb2">
                {
                    !loading ? (
                        <Grid item xs={12} sm={12} md={10} sx={{ margin: '0', padding: '0' }}>
                            <Stack direction="row" justifyContent="flex-end" className="stack p0">
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to={`/survey/edit/${surveyId}`}
                                    className="mtb-2 bg-one"
                                >
                                    <EditIcon className="mr-2" /> Edit Survey
                                </Button>
                            </Stack>
                        </Grid>
                    ) : ('')
                }
            </Grid>
        </Grid>
    )
}

export default PreviewSurvey