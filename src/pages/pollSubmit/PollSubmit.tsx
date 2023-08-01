import { Grid, Box, Stack, TextField, IconButton, Tooltip, Button, Typography, Fab } from "@mui/material"
import { useEffect, useState } from "react"
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import Question from "../../components/pollSubmit/Question"
// import "./ViewSurvey.css"
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'
import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import QuestionSkel from "../../Skeletons/QuestionSkel";
import { useSelector } from "react-redux";

const PollSubmit = () => {
    const { id: pollId } = useParams();
    const navigate = useNavigate()
    const loginUser = useSelector((state:any) => state.loginLogout)

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
    const [pollName, setPollName] = useState('')

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
            pollId: pollId,
            pollName: pollName,
            submitter: 'user',
            answers: JSON.stringify(questions)
        }
        console.log("model:", model)

        axios.post(`${process.env.REACT_APP_API_URL}/pollAnswer`, model)
            .then((res: any) => {
                console.log("submit survey:", res)
                enqueueSnackbar('poll submitted!', { variant: 'success', autoHideDuration: 1000 })
                setTimeout(() => {
                    navigate(`/poll/thankyou/${pollId}`)
                }, 1000)
            })
            .catch((err: any) => {
                console.log("submit survey err:", err)
                enqueueSnackbar('Something went wrong!!', { variant: 'error', autoHideDuration: 1000 })
            })
    }

    const setServerData = (survey: any) => {
        setQuestions(survey.questions && JSON.parse(survey.questions))
    }

    useEffect(() => {
        if (pollId) {
            axios.get(`${process.env.REACT_APP_API_URL}/poll/${pollId}`)
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

    }, [pollId])

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
        
            <Grid container item md={12} className="question-container">
                {
                    !loading ? (
                        questions.length > 0 ? (
                            questions.map((question: any) => {
                                return (
                                    <Question key={question.id} pollName={pollName} setPollName={setPollName} question={question} questions={questions} setQuestions={setQuestions} />
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

export default PollSubmit