import { Box, Button, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import '../../pages/Home/Home.css'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useState } from "react"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';

const SurveyCard = (props: any) => {
    const { survey } = props
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleMenuOpen = (e: any) => {
        setAnchorEl(e.currentTarget)
    }
    const handleMenuClose = () => setAnchorEl(null)
   
    return (
        <Box className='survey-card'>
            <Stack direction='row' justifyContent={'flex-end'}>
                <IconButton onClick={handleMenuOpen}>
                    <MoreHorizIcon />
                </IconButton>
            </Stack>
            <Typography variant='h5' className="survey-title">{survey.surveyName}</Typography>
            <Typography variant='h6' className="survey-modified-date">{dayjs(survey.createdAt).format("DD MMM YYYY")}</Typography>

            <Typography variant='h6' className="survey-status-label">Status</Typography>
            <Typography variant='h6' className="survey-status"><b className={survey.active ? 'open' : 'closed'}>{survey.active ? 'Open' : 'Closed'}</b></Typography>

            <Button component={Link} to={`/survey/edit/${survey._id}`} variant='outlined' fullWidth={true}>Open Survey</Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
            >
                <MenuItem component={Link} to={`survey/${survey._id}`}><RemoveRedEyeIcon className="mr-1" />View</MenuItem>
                <MenuItem component={Link} to={`/survey/edit/${survey._id}`}><EditIcon  className="mr-1"/>Edit</MenuItem>
                <MenuItem><ShareIcon className="mr-1" /> Share</MenuItem>
            </Menu>
        </Box>
    )
}

export default SurveyCard