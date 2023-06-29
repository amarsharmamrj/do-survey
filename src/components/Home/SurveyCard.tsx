import { Box, Button, IconButton, Stack, Typography } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import '../../pages/Home.css'

const SurveyCard = (props: any) => {
    const { survey } = props
    return (
        <Box className='survey-card'>
            <Stack direction='row' justifyContent={'flex-end'}>
                <IconButton>
                    <MoreHorizIcon />
                </IconButton>
            </Stack>

            <Typography variant='h5' className="survey-title">My Survey</Typography>
            <Typography variant='h6' className="survey-modified-date">10 June 2023</Typography>

            <Typography variant='h6' className="survey-status-label">Status</Typography>
            <Typography variant='h6' className="survey-status"><b>Open</b></Typography>

            <Button variant='outlined' fullWidth={true}>Open Survey</Button>
        </Box>
    )
}

export default SurveyCard