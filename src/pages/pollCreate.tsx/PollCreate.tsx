import { Grid, Box, Stack, TextField, IconButton, Tooltip, Button, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import Question from "../../components/PollCreate/Question"
// import "./CreateSurvey.css"
import axios from 'axios'
import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import checkLogin from "../../utils/checkLogin";
import { useSelector } from "react-redux";

const PollCreate = () => {
    const navigate = useNavigate()
    document.title = 'Create Poll'
    const loginUser = useSelector((state: any) => state.loginLogout)
    console.log("create loginUser:", loginUser)

    const [openFormatToolsName, setOpenFormatToolsName] = useState(false)
    const [anchorElName, setAnchorElName] = useState(null)
    const [surveyNameStyle, setSurveyNameStyle] = useState({})
    const [disableToolsButtonName, setDisableToolsButtonName] = useState(true)

    const [anchorElDesc, setAnchorElDesc] = useState(null)
    const [surveyDescStyle, setSurveyDescStyle] = useState({})
    const [disableToolsButtonDesc, setDisableToolsButtonDesc] = useState(true)
    const [loading, setLoading] = useState(false)

    // data states
    const [pollName, setPollName] = useState('')
    const [surveyDesc, setSurveyDesc] = useState('')

    const [questions, setQuestions] = useState<any>([{
        id: 1,
        questionType: 'textbox',
        required: false,
        options: [{ id: 1, label: '' }]
    }])

    const handleSave = () => {
        setLoading(true)
        console.log("questions:", questions)

        const model = {
            userId: loginUser.user.userId,
            pollName: pollName,
            start_date: dayjs(new Date).format("DD/MM/YYYY"),
            end_date: "20/10/2028",
            questions: JSON.stringify(questions)
        }
        console.log("model:", model)

        axios.post(`${process.env.REACT_APP_API_URL}/poll/create`, model)
            .then((res: any) => {
                console.log("save poll:", res)
                enqueueSnackbar('Saved successfullly!', { variant: 'success', autoHideDuration: 1000 })
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            })
            .catch((err: any) => {
                setLoading(false)
                console.log("create poll err:", err)
                enqueueSnackbar('Something went wrong!!', { variant: 'error', autoHideDuration: 1000 })
            })
    }

    useEffect(() => {
        if (!checkLogin()) {
            navigate('/login')
        }
    }, [])

    return (

        <Grid container className="homepage-container">
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
                    questions.length > 0 ? (
                        questions.map((question: any) => {
                            return (
                                <Question key={question.id} pollName={pollName} setPollName={setPollName} question={question} questions={questions} setQuestions={setQuestions} />
                            )
                        })
                    ) : ('')
                }
            </Grid>
            <Grid container item md={12} className="question-container ptb2">
                <Grid item xs={12} sm={12} md={10} sx={{ margin: '1rem 0', padding: '0' }}>
                    <Stack direction="row" justifyContent="flex-end" className="stack p0">
                        <Button
                            variant="contained"
                            disabled={questions.length === 0 || loading === true ? true : false}
                            onClick={handleSave}
                            className="bg-one"
                        >
                            {loading ? <CircularProgress size={27} className="color-white" /> : 'Save'}
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PollCreate