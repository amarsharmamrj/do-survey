import { Grid, Box, Stack, TextField, IconButton, Tooltip, Button, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import Question from "../../components/CreateSurvey/Question"
import "./CreateSurvey.css"
import FormatToolsName from "../../components/CreateSurvey/FormatToolsName";
import FormatToolsDesc from "../../components/CreateSurvey/FormatToolsDesc";
import axios from 'axios'
import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import checkLogin from "../../utils/checkLogin";
import { useSelector } from "react-redux";

const CreateSurvey = () => {
    const navigate = useNavigate()
    document.title = 'Create Survey'
    const loginUser = useSelector((state:any) => state.loginLogout)
    console.log("create loginUser:", loginUser)

    const [openFormatToolsName, setOpenFormatToolsName] = useState(false)
    const [anchorElName, setAnchorElName] = useState(null)
    const [surveyNameStyle, setSurveyNameStyle] = useState({})
    const [disableToolsButtonName, setDisableToolsButtonName] = useState(true)
    const [disablesave, setDisableSave] = useState(false)
    const openNameTools = Boolean(anchorElName)

    const [openFormatTools, setOpenFormatTools] = useState(false)
    const [anchorElDesc, setAnchorElDesc] = useState(null)
    const [surveyDescStyle, setSurveyDescStyle] = useState({})
    const [disableToolsButtonDesc, setDisableToolsButtonDesc] = useState(true)
    const openDescTools = Boolean(anchorElDesc)
    const [loading, setLoading] = useState(false)

    // data states
    const [surveyName, setSurveyName] = useState('')
    const [surveyDesc, setSurveyDesc] = useState('')
    const [questions, setQuestions] = useState<any>([])

    // {
    //     id: 1,
    //     questionType: 'textbox',
    //     required: false
    // }

    const handleSurveyName = (e: any) => {
        if (e.target.value.length > 0) setDisableToolsButtonName(false)
        else setDisableToolsButtonName(true)

        if (e.target.value.trim().length > 0) {
            setSurveyName(e.target.value)
        }
    }

    const handleSurveyDesc = (e: any) => {
        if (e.target.value.length > 0) setDisableToolsButtonDesc(false)
        else setDisableToolsButtonDesc(true)

        if (e.target.value.trim().length > 0) {
            setSurveyDesc(e.target.value)
        }
    }

    const handleOpenFormatToolsName = (e: any) => {
        console.log("handleOpenFormatTools:", e.currentTarget)
        setAnchorElName(e.currentTarget)
    }

    const handleCloseFormatToolsName = () => {
        setAnchorElName(null);
    };

    const handleOpenFormatToolsDesc = (e: any) => {
        console.log("handleOpenFormatTools:", e.currentTarget)
        setAnchorElDesc(e.currentTarget)
    }

    const handleCloseFormatToolsDesc = () => {
        setAnchorElDesc(null);
    };

    const handleFormatTools = (e: any) => {
        console.log(e)
        setOpenFormatToolsName(!openFormatToolsName)
    }

    const handleAddQuestion = () => {
        let newQuestion = {
            id: 1,
            questionType: 'textbox',
            required: false
        }
        setQuestions([...questions, newQuestion])
    }

    const handleSave = () => {
        setLoading(true)
        console.log("questions:", questions)

        const model = {
            userId: loginUser.user.userId,
            surveyName: surveyName,
            surveyNameStyle: JSON.stringify(surveyNameStyle),
            surveyDesc: surveyDesc,
            surveyDescStyle: JSON.stringify(surveyDescStyle),
            start_date: dayjs(new Date).format("DD/MM/YYYY"),
            end_date: "20/10/2028",
            questions: JSON.stringify(questions)
        }
        console.log("model:", model)

        axios.post(`${process.env.REACT_APP_API_URL}/survey/create`, model)
            .then((res: any) => {
                console.log("save survey:", res)
                enqueueSnackbar('Saved successfullly!', { variant: 'success', autoHideDuration: 1000 })
                setTimeout(() => {
                    navigate("/survey")
                }, 1000)
            })
            .catch((err: any) => {
                setLoading(false)
                console.log("create survey err:", err)
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
            <Grid item md={12} container className="question-container">
                <Grid item xs={12} sm={12} md={10}>
                    <Box className="survey-details">
                        <Box sx={{ display: 'flex' }}>
                            <TextField
                                variant="outlined"
                                className="mtb-1"
                                sx={surveyNameStyle}
                                label="Survey Name"
                                fullWidth={true}
                                autoFocus
                                autoComplete="off"
                                autoCapitalize="true"
                                placeholder='Enter survey name'
                                onChange={handleSurveyName}
                            />
                            {
                                !disableToolsButtonName && (
                                    <Box sx={{ display: 'flex' }}>
                                        <IconButton onClick={handleOpenFormatToolsName}>
                                            <Tooltip title="formatting tools">
                                                <FormatColorFillIcon className="color-two" />
                                            </Tooltip>
                                        </IconButton>
                                    </Box>
                                )
                            }
                        </Box>

                        <FormatToolsName
                            anchorEl={anchorElName}
                            setAnchorEl={setAnchorElName}
                            surveyNameStyle={surveyNameStyle}
                            setSurveyNameStyle={setSurveyNameStyle}
                            open={openNameTools}
                            handleOpenFormatTools={handleOpenFormatToolsName}
                            handleCloseFomrmatTools={handleCloseFormatToolsName}
                        />
                        {/* ) : ("")
                        } */}

                        <Box sx={{ display: 'flex' }}>
                            <TextField
                                variant="outlined"
                                className="mtb-1"
                                label="Survey description"
                                sx={surveyDescStyle}
                                fullWidth={true}
                                onChange={handleSurveyDesc}
                                autoComplete="off"
                                placeholder='Enter survey description'
                            />
                            {
                                !disableToolsButtonDesc && (
                                    <Box sx={{ display: 'flex' }}>
                                        <IconButton onClick={handleOpenFormatToolsDesc}>
                                            <Tooltip title="formatting tools">
                                                <FormatColorFillIcon className="color-two" />
                                            </Tooltip>
                                        </IconButton>
                                    </Box>
                                )
                            }
                            <FormatToolsDesc
                                anchorEl={anchorElDesc}
                                setAnchorEl={setAnchorElDesc}
                                surveyNameStyle={surveyDescStyle}
                                setSurveyNameStyle={setSurveyDescStyle}
                                open={openDescTools}
                                handleOpenFormatTools={handleOpenFormatToolsDesc}
                                handleCloseFomrmatTools={handleCloseFormatToolsDesc}
                            />
                        </Box>
                        {
                            questions.length === 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={handleAddQuestion}
                                        className="bg-one"
                                    >
                                        <AddCircleIcon className="mr-1" />
                                        Add question
                                    </Button>
                                </Box>
                            )
                        }
                    </Box>
                </Grid>
            </Grid>
            <Grid container item md={12} className="question-container">
                {
                    questions.length > 0 ? (
                        questions.map((question: any) => {
                            return (
                                <Question key={question.id} question={question} questions={questions} setQuestions={setQuestions} />
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

export default CreateSurvey