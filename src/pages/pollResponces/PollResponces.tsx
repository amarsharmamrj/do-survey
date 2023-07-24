import { Grid, Box, Stack, TextField, IconButton, Tooltip, Button, Typography, Fab } from "@mui/material"
import { useEffect, useState } from "react"
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Question from "../../components/pollResponces/Question"
// import "./Responces.css"
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'
import dayjs from 'dayjs'
import { useParams, Link, useNavigate } from "react-router-dom";
import checkLogin from "../../utils/checkLogin";

const PollResponces = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    document.title = 'Responces'
    const serverUrl = process.env.REACT_APP_API_URL
    console.log("serverUrl:", serverUrl)
    console.log("answer id:", id)

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
    const [answers, setAnswers] = useState([{
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

   
    const setServerData = (data: any) => {
        setPollName(data.pollName)
        setAnswers(data.answers && JSON.parse(data.answers))
    }

    useEffect(() => {
        if (id) {
            axios.get(`${serverUrl}/pollAnswer/${id}`)
                .then((res) => {
                    console.log("answer data:", res.data)
                    if (res.data) setServerData(res.data[0])
                })
                .catch((err) => {
                    console.log("error in getting answer data:", err)
                })
        }
    }, [id])

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
                <Grid item xs={12} sm={12} md={10}>
                    <Box className="survey-details">
                        <Typography sx={surveyNameStyle} className="survey-name">{pollName}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid container item md={12} className="question-container preview">
                {
                    answers.length > 0 ? (
                        answers.map((question: any) => {
                            return (
                                <Question key={question.id} question={question} answers={answers} setAnswers={setAnswers} />
                            )
                        })
                    ) : ('')
                }
            </Grid>
            <Grid container item md={12} className="question-container ptb2">
                <Grid item xs={12} sm={12} md={10} sx={{ margin: '0', padding: '0' }}>
                    <Stack direction="row" justifyContent="flex-end" className="stack p0">
                        <Button
                            variant="contained"
                            // component={Link}
                            // to={-1}
                            onClick={() => navigate(-1)}
                            className="mtb-2 bg-one"
                        >
                            <ArrowBackIcon className="mr-1" /> Go back
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PollResponces