import { Grid, Box, Stack, TextField, IconButton, Tooltip, Button, Typography, Fab } from "@mui/material"
import { useEffect, useState } from "react"
import "../PreviewSurvey/PreviewSurvey.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios'
import { useParams, Link } from "react-router-dom";
import DataGrid from '../../partials/DataGrid'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewSubmissionsSkel from "../../Skeletons/ViewSubmissionsSkel";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import checkLogin from "../../utils/checkLogin";
import { useNavigate } from "react-router-dom";

const ViewSubmissions = () => {
    const { id: surveyId } = useParams();
    const [rows, setRows] = useState([])
    const navigate = useNavigate()
    document.title = 'Submissions'
    // let rows = []
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

    const handleDelete = (e, value) => {
        console.log("handle delete")
    }

    const columns = [
        {
            field: 'surveyName',
            headerName: 'Name',
            flex: 1,
            headerClassName: 'data-grid-header'
        },
        {
            field: 'submitter',
            headerName: 'User',
            flex: 1,
            headerClassName: 'data-grid-header'
        },
        {
            field: 'submittedDate',
            headerName: 'Date',
            flex: 1,
            headerClassName: 'data-grid-header'
        },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            flex: 1,
            type: "actions",
            headerClassName: 'data-grid-header',
            renderCell: (cellValues) => {
                return (
                    <Tooltip title="Delete">
                        <IconButton
                            aria-label="delete"
                            variant="contained"
                            // color="secondary"
                            className="color-two"
                            onClick={(event) => {
                                handleDelete(event, cellValues);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                );
            }
        },
        {
            field: 'open',
            headerName: 'Open',
            sortable: false,
            flex: 1,
            type: "actions",
            headerClassName: 'data-grid-header',
            renderCell: (cellValues) => {
                return (
                    <Tooltip title="Delete">
                        <IconButton
                            aria-label="delete"
                            variant="contained"
                            // color="secondary"
                            component={Link}
                            to={`/survey/submissions/responces/${cellValues.value}`}
                            className="color-one"
                        // onClick={(event) => {
                        //     handleDelete(event, cellValues);
                        // }}
                        >
                            <OpenInNewIcon />
                        </IconButton>
                    </Tooltip>
                );
            }
        },
    ];

    const setDataForRows = (data) => {
        let dataRows = data.map((item) => {
            return {
                _id: item._id,
                surveyName: item.surveyName,
                submitter: item.submitter,
                submittedDate: new Date(),
                delete: item._id,
                open: item._id,
            }
        })
        setRows(dataRows)
    }

    const setServerData = (survey) => {
        console.log("surveyName:", survey, survey.surveyName)
        setSurveyName(survey.surveyName)
        setSurveyDesc(survey.surveyDesc)
    }

    useEffect(() => {
        if (surveyId) {
            axios.get(`http://localhost:4000/answer/allAnswers/${surveyId}`)
                .then((res) => {
                    console.log("survey data:", res.data)
                    if (res.data) {
                        setServerData(res.data[0])
                        setQuestions(res.data)
                        setDataForRows(res.data)
                    }
                    setLoading(false)
                })
                .catch((err) => {
                    console.log("error in getting survey data:", err)
                    setLoading(false)
                })
        }
    }, [surveyId])

    useEffect(() => {
        if (!checkLogin()) {
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
            {
                !loading ? (
                    <Grid item md={12} container className="question-container mb-2">
                        <Grid item xs={12} sm={12} md={12}>
                            <Box className="survey-details">
                                <Typography sx={surveyNameStyle} className="survey-name">{surveyName}</Typography>
                                <Typography sx={surveyDescStyle} className="survey-desc">{surveyDesc}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                ) : ('')
            }
            {
                !loading ? (
                    <Grid container item md={12} className="question-container">
                        <Grid item xs={12} sm={12} md={12} sx={{ margin: '0', padding: '0' }}>
                            {
                                questions.length > 0 ? (
                                    <DataGrid rows={rows} columns={columns} autoHeight={true} getRowClassName="data-grid-header" height="800px" />
                                ) : ('')

                            }
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container item md={12} className="question-container">
                        <Grid item xs={12} sm={12} md={12} sx={{ margin: '0', padding: '0' }}>
                            <ViewSubmissionsSkel />
                        </Grid>
                    </Grid>
                )
            }
            <Grid container item md={12} className="question-container ptb2">
                <Grid item xs={12} sm={12} md={12} sx={{ margin: '0', padding: '0' }}>
                    <Stack direction="row" justifyContent="flex-end" className="stack p0">
                        <Button
                            variant="contained"
                            component={Link}
                            to={`/`}
                            className="mtb-2 bg-one"
                        >
                            <ArrowBackIcon className="mr-1" /> Go back
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default ViewSubmissions