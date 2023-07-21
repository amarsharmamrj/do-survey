import { Grid, Box, Stack, TextField, IconButton, Tooltip, Button, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import Question from "../../components/CreateSurvey/Question"
import "../CreateSurvey/CreateSurvey.css"
import FormatTools from "../../components/CreateSurvey/FormatToolsName";
import FormatToolsName from "../../components/CreateSurvey/FormatToolsName";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormatToolsDesc from "../../components/CreateSurvey/FormatToolsDesc";
import axios from 'axios'
import dayjs from 'dayjs'
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from 'notistack'
import { useNavigate, Link } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditSurveySkel from "../../Skeletons/EditSurveySkel";
import checkLogin from "../../utils/checkLogin";

const EditSurvey = () => {
    const navigate = useNavigate()
    const { id: surveyId } = useParams();
    console.log("survey id:", surveyId)

    const [loading, setLoading] = useState(true)
    const [loadingSave, setLoadingSave] = useState(false)

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

    const handleUpdate = () => {
        setLoadingSave(true)
        console.log("questions:", questions)

        const model = {
            id: surveyId,
            surveyName: surveyName,
            surveyNameStyle: JSON.stringify(surveyNameStyle),
            surveyDesc: surveyDesc,
            surveyDescStyle: JSON.stringify(surveyDescStyle),
            start_date: dayjs(new Date).format("DD/MM/YYYY"),
            end_date: "20/10/2028",
            questions: JSON.stringify(questions)
        }
        console.log("model:", model)

        axios.put(`http://localhost:4000/survey`, model)
            .then((res: any) => {
                console.log("update survey:", res)
                enqueueSnackbar('Updated successfullly!', { variant: 'success', autoHideDuration: 1000 })
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            })
            .catch((err: any) => {
                setLoadingSave(false)
                console.log("update survey err:", err)
                enqueueSnackbar('Something went wrong!!', { variant: 'error', autoHideDuration: 1000 })
            })
    }

    const setServerData = (survey: any) => {
        console.log("surveyName:", survey, survey.surveyName)
        setSurveyName(survey.surveyName)
        setSurveyDesc(survey.surveyDesc)
        setSurveyNameStyle(survey.surveyNameStyle && JSON.parse(survey.surveyNameStyle))
        setSurveyDescStyle(survey.surveyDescStyle && JSON.parse(survey.surveyDescStyle))
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

    useEffect(()=> {
        if(!checkLogin()){
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
            {
                !loading ? (
                    <Grid item md={12} container className="question-container">
                        <Grid item xs={12} sm={12} md={10}>
                            <Box className="survey-details">
                                <Box sx={{ display: 'flex' }}>
                                    <TextField
                                        variant="outlined"
                                        className="mtb-1"
                                        value={surveyName}
                                        sx={surveyNameStyle}
                                        label="Survey Name"
                                        fullWidth={true}
                                        autoFocus
                                        placeholder='Enter survey name'
                                        onChange={handleSurveyName}
                                    />
                                    {
                                        !disableToolsButtonName && (
                                            <Box sx={{ display: 'flex' }}>
                                                <IconButton onClick={handleOpenFormatToolsName}>
                                                    <Tooltip title="formatting tools">
                                                        <FormatColorFillIcon className="color-one" />
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
                                        value={surveyDesc}
                                        sx={surveyDescStyle}
                                        fullWidth={true}
                                        onChange={handleSurveyDesc}
                                        autoFocus
                                        placeholder='Enter survey description'
                                    />
                                    {
                                        !disableToolsButtonDesc && (
                                            <Box sx={{ display: 'flex' }}>
                                                <IconButton onClick={handleOpenFormatToolsDesc}>
                                                    <Tooltip title="formatting tools">
                                                        <FormatColorFillIcon className="color-one" />
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
                            </Box>
                        </Grid>
                    </Grid>
                ) : ('')
            }
            <Grid container item md={12} className="question-container edit-survey">
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
                            <EditSurveySkel key={item + 'card'} />
                        )
                        )
                    )
                }
            </Grid>
            <Grid container item md={12} className="question-container ptb2">
                <Grid item xs={12} sm={12} md={10} sx={{ margin: '1rem 0', padding: '0' }}>
                    <Stack direction="row" justifyContent="flex-end" className="stack p0">
                        <Button
                            variant="contained"
                            component={Link}
                            to={'/'}
                            className="bg-one"
                        >
                            <ArrowBackIcon className="mr-1" /> Go back
                        </Button>
                        {
                            !loading ? (
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to={`/survey/preview/${surveyId}`}
                                    target="_blank"
                                    className="mlr-2 bg-two"
                                ><RemoveRedEyeIcon className="mr-1"
                                    />
                                    Preview
                                </Button>
                            ) : ('')
                        }
                        {
                            !loading ? (
                                <Button
                                    variant="contained"
                                    className="bg-one"
                                    disabled={loading}
                                    onClick={handleUpdate}
                                >
                                    {
                                        loadingSave
                                            ? <CircularProgress
                                                size={27}
                                                className="mlr-2 color-white"
                                            />
                                            :
                                            'Update'
                                    }
                                </Button>
                            ) : ('')
                        }
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default EditSurvey