import { Grid, Box, Stack, TextField, IconButton, Tooltip, Button, Typography, Fab, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import "../PreviewSurvey/PreviewSurvey.css"
import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import axios from 'axios'
import { useParams, Link } from "react-router-dom";
import DataGrid from '../../partials/DataGrid'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewSubmissionsSkel from "../../Skeletons/ViewSubmissionsSkel";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import checkLogin from "../../utils/checkLogin";
import { useNavigate } from "react-router-dom";
import { PollSubmissionChart } from "../../components/pollSubmissions/PollSubmissionChart";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};
const PollSubmissions = () => {
    const { id: pollId } = useParams();
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
    const [graphData, setGraphData] = useState([])
    const [pollName, setPollName] = useState('')
    const [surveyDesc, setSurveyDesc] = useState('')
    const [questions, setQuestions] = useState([{
        id: 1,
        questionType: 'textbox',
        required: false
    }])

    const handleDelete = (e, value) => {
        console.log("handle delete")
        console.log("handle delete:", value.value, e)
        axios.delete(`${process.env.REACT_APP_API_URL}/pollAnswer/${value.value}`)
            .then((res) => {
                console.log("deleted data:", res.data)
                const filterData = questions.filter((item) => item._id !== value.value)
                setQuestions(filterData)
                setDataForRows(filterData)
                collectDataForGraph(filterData)
                // if (res.data) {
                //     setServerData(res.data[0])
                //     setQuestions(res.data)
                //     setDataForRows(res.data)
                // }
                // setLoading(false)
            })
            .catch((err) => {
                console.log("deleted:", err)
                // setLoading(false)
            })
    }

    const columns = [
        {
            field: 'pollName',
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
                            aria-label="View"
                            variant="contained"
                            // color="secondary"
                            component={Link}
                            to={`/poll/submissions/responces/${cellValues.value}`}
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
                pollName: item.pollName,
                submitter: item.submitter,
                submittedDate: new Date(),
                delete: item._id,
                open: item._id,
            }
        })
        setRows(dataRows)
    }

    const setServerData = (data) => {
        console.log("dataName:", data, data.pollName)
        setPollName(data.pollName)
        // setSurveyDesc(survey.surveyDesc)
    }

    const collectDataForGraph = (data) => {
        let optionsData = {}
        data.forEach((item) => {
            let answers = JSON.parse(item.answers)
            let options = answers[0].options
            options.forEach((option) => {
                if (optionsData.hasOwnProperty(option.label)) {
                    if (option.isSelected) optionsData[option.label] = optionsData[option.label] + 1
                    else optionsData[option.label] = optionsData[option.label]
                } else {
                    if (option.isSelected) optionsData[option.label] = 1
                    else optionsData[option.label] = 0
                }
            })
        })
        let finalData = []
        for (let key in optionsData) {
            finalData.push({ 'key': key, 'value': optionsData[key] })
        }
        console.log("#@@# finalData:", finalData)
        setGraphData(finalData)
    }

    useEffect(() => {
        if (pollId) {
            axios.get(`${process.env.REACT_APP_API_URL}/pollAnswer/allAnswers/${pollId}`)
                .then((res) => {
                    console.log("all polls data:", res.data)
                    if (res.data) {
                        // setServerData(res.data[0])
                        setQuestions(res.data)
                        setDataForRows(res.data)

                        collectDataForGraph(res.data)
                    }
                    setLoading(false)
                })
                .catch((err) => {
                    console.log("error in getting all poll data:", err)
                    setLoading(false)
                })


            axios.get(`${process.env.REACT_APP_API_URL}/poll/${pollId}`)
                .then((res) => {
                    console.log("poll data:", res.data)
                    if (res.data) {
                        // setServerData(res.data[0])
                        setPollName(res.data[0].pollName)
                        // setDataForRows(res.data)
                    }
                    setLoading(false)
                })
                .catch((err) => {
                    console.log("error in getting poll data:", err)
                    setLoading(false)
                })

        }
    }, [pollId])

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
                                <Typography sx={surveyNameStyle} className="survey-name">{pollName} <span style={{ fontSize: '1rem' }}><i>(Total Submission - {questions.length})</i></span> </Typography>
                                {
                                    graphData.length > 0 ? (
                                        <Box>
                                            <PollSubmissionChart graphData={graphData} />
                                        </Box>
                                    ) : ''
                                }
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
                                ) : ('No submissions yet !')

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
                            onClick={() => navigate(-1)}
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

export default PollSubmissions