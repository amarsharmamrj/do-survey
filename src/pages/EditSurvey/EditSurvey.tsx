import { Grid, Box, Stack, TextField, IconButton, Tooltip, Button } from "@mui/material"
import { useEffect, useState } from "react"
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import Question from "../../components/CreateSurvey/Question"
import "../CreateSurvey/CreateSurvey.css"
import FormatTools from "../../components/CreateSurvey/FormatToolsName";
import FormatToolsName from "../../components/CreateSurvey/FormatToolsName";
import FormatToolsDesc from "../../components/CreateSurvey/FormatToolsDesc";
import axios from 'axios'
import dayjs from 'dayjs'
import { useParams } from "react-router-dom";

const EditSurvey = () => {
    const { id: surveyId } = useParams();
    console.log("survey id:", surveyId)

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
            })
            .catch((err: any) => {
                console.log("update survey err:", err)
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
                })
                .catch((err) => {
                    console.log("error in getting survey data:", err)
                })
        }
    }, [surveyId])

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
            <Grid container item md={12} className="question-container edit-survey">
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
                <Grid item xs={12} sm={12} md={10} sx={{ margin: '0', padding: '0' }}>
                    <Stack direction="row" justifyContent="flex-end" className="stack p0">
                        <Button variant="contained" onClick={handleUpdate}>Update</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default EditSurvey