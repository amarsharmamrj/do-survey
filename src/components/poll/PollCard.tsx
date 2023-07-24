import { Box, Button, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import '../../pages/Home/Home.css'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useState } from "react"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import ChecklistIcon from '@mui/icons-material/Checklist';

const PollCard = (props: any) => {
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
                <IconButton onClick={handleMenuOpen} className="color-two">
                    <MoreHorizIcon />
                </IconButton>
            </Stack>
            <Typography variant='h5' className="survey-title">{survey.pollName}</Typography>
            <Typography variant='h6' className="survey-modified-date">{dayjs(survey.createdAt).format("DD MMM YYYY")}</Typography>

            <Typography variant='h6' className="survey-status-label">Status</Typography>
            <Typography variant='h6' className="survey-status"><b className={survey.active ? 'open' : 'closed'}>{survey.active ? 'Open' : 'Closed'}</b></Typography>

            <Button
                component={Link}
                to={`/survey/edit/${survey._id}`}
                variant='outlined'
                fullWidth={true}
                sx={{ color: 'white' }}
                className="bg-one"
            >
                Open Poll
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
            >
                <MenuItem component={Link} to={`/poll/preview/${survey._id}`} target='_blank'><RemoveRedEyeIcon className="mr-1 color-two" />Preview</MenuItem>
                <MenuItem component={Link} to={`/poll/edit/${survey._id}`}><EditIcon className="mr-1 color-two" />Edit</MenuItem>
                <MenuItem component={Link} to={`/poll/submit/${survey._id}`}><ShareIcon className="mr-1 color-two" />Fill Poll</MenuItem>
                <MenuItem component={Link} to={`/poll/submissions/${survey._id}`}><ChecklistIcon className="mr-1 color-two" /> Submissions</MenuItem>
            </Menu>
        </Box>
    )
}

export default PollCard