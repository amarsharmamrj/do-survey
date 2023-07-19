import { Grid, Box, Stack, TextField, IconButton, Tooltip, Button, Typography, Fab } from "@mui/material"
import { useEffect, useState } from "react"
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import Question from "../../components/SubmitSurvey/Question"
import "./ViewSurvey.css"
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'
import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import QuestionSkel from "../../Skeletons/QuestionSkel";

const SubmitSurvey = () => {
    const { id: surveyId } = useParams();
    const navigate = useNavigate()
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
    const [username, setUsername] = useState('')
    const [questions, setQuestions] = useState([{
        id: 1,
        questionType: 'textbox',
        required: false
    }])

    const handleUsername = (e: any) => {
        setUsername(e.target.value.trim())
    }

    const handleSubmit = () => {
        console.log("questions:", questions)

        const model = {
            surveyId: surveyId,
            surveyName: surveyName,
            surveyDesc: surveyDesc,
            submitter: username,
            answers: JSON.stringify(questions)
        }
        console.log("model:", model)

        axios.post(`http://localhost:4000/answer`, model)
            .then((res: any) => {
                console.log("submit survey:", res)
                enqueueSnackbar('Survey submitted!', { variant: 'success', autoHideDuration: 1000 })
                setTimeout(() => {
                    navigate(`/survey/thankyou/${surveyName}`)
                }, 1000)
            })
            .catch((err: any) => {
                console.log("submit survey err:", err)
                enqueueSnackbar('Something went wrong!!', { variant: 'error', autoHideDuration: 1000 })
            })
    }

    const setServerData = (survey: any) => {
        console.log("surveyName:", survey, survey.surveyName)
        setSurveyName(survey.surveyName)
        setSurveyDesc(survey.surveyDesc)
        let tempSurveyNameStyle = survey.surveyNameStyle && JSON.parse(survey.surveyNameStyle)
        if (tempSurveyNameStyle) setSurveyNameStyle(tempSurveyNameStyle['& input'])

        let tempSurveyDescStyle = survey.surveyDescStyle && JSON.parse(survey.surveyDescStyle)
        if (tempSurveyDescStyle) setSurveyDescStyle(tempSurveyDescStyle['& input'])

        console.log("questions from server:", JSON.parse(survey.questions))
        setQuestions(survey.questions && JSON.parse(survey.questions))
    }

    useEffect(() => {
        if (surveyId) {
            axios.get(`http://localhost:4000/survey/${surveyId}`)
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
            {
                !loading ? (
                    <Grid item md={12} container className="question-container">
                        <Grid item xs={12} sm={12} md={10}>
                            <Box className="survey-details">
                                <Typography sx={surveyNameStyle} className="survey-name">{surveyName}</Typography>
                                <Typography sx={surveyDescStyle} className="survey-desc">{surveyDesc}</Typography>
                                <TextField
                                    variant="outlined"
                                    label="Enter Name"
                                    fullWidth={true}
                                    placeholder="Enter your name here"
                                    className="mtb-2"
                                    value={username}
                                    onChange={handleUsername}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                ) : ('')
            }
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
            {
                !loading ? (
                    <Grid container item md={12} className="question-container ptb2">
                        <Grid item xs={12} sm={12} md={10} sx={{ margin: '0', padding: '0' }}>
                            <Stack direction="row" justifyContent="flex-end" className="stack p0">
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    className="mtb-2 bg-one"
                                >
                                    <SendIcon className="mr-2 bg-on" /> Submit
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                ) : ('')
            }
        </Grid>
    )
}

export default SubmitSurvey