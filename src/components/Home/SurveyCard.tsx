import { Box, Button, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material" 
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import '../../pages/Survey/Survey.css'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useState } from "react"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'; 
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SegmentIcon from '@mui/icons-material/Segment'; 

const SurveyCard = (props: any) => { 
    const { survey } = props 
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleMenuOpen = (e: any) => {
        setAnchorEl(e.currentTarget)
    }
    const handleMenuClose = () => setAnchorEl(null)
    const handleShareOptions = (id:any) => {
        // e.preventDefault()
        console.log("handleShareOptions cliked")
        if (navigator.share) {
            navigator.share({
                title: "Do Survey",
                url: `${process.env.REACT_APP_CLIENT_URL}/survey/submit/${id}`
            })
                .then((res) => {
                    console.log("Shared successfully")
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }


    return (
        <Box className='survey-card'>
            <Stack direction='row' justifyContent={'flex-end'}>
                <IconButton onClick={handleMenuOpen} className="color-two">
                    <MoreHorizIcon />
                </IconButton>
            </Stack>
            <Typography variant='h5' className="survey-title">{survey.surveyName}</Typography>
            <Typography variant='h6' className="survey-modified-date">{dayjs(survey.createdAt).format("DD MMM YYYY")}</Typography>

            <Typography variant='h6' className="survey-status-label">Status</Typography>
            <Typography variant='h6' className="survey-status"><b className={survey.active ? 'open' : 'closed'}>{survey.active ? 'Open' : 'Closed'}</b></Typography>

            <Button
                component={Link}
                to={`/survey/submissions/${survey._id}`}
                variant='outlined'
                fullWidth={true}
                sx={{ color: 'white' }}
                className="bg-one"
            >
                All Submissions
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
            >
                <MenuItem component={Link} to={`/survey/preview/${survey._id}`} target='_blank'><RemoveRedEyeIcon className="mr-1 color-two" />Preview</MenuItem>
                <MenuItem component={Link} to={`/survey/edit/${survey._id}`}><EditIcon className="mr-1 color-two" />Edit</MenuItem>
                <MenuItem component={Link} to={`/survey/submit/${survey._id}`}><SegmentIcon className="mr-1 color-two" />Fill Survey</MenuItem>
                <MenuItem component={Link} to={`/survey/submissions/${survey._id}`}><ChecklistIcon className="mr-1 color-two" /> Submissions</MenuItem>
                <MenuItem onClick={() => handleShareOptions(survey._id)}><ShareIcon className="mr-1 color-two" /> Share</MenuItem>
            </Menu>
        </Box>
    )
}

export default SurveyCard
