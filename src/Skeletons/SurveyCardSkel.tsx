import { Box, Skeleton } from "@mui/material"

const SurveyCardSkel = (props: any) => {

    return (
        <Box className='survey-card bg-white'>
            <Skeleton variant="circular" width={40} height={40} sx={{marginLeft: 'auto', marginBottom: '1.5rem'}} />

            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '92%' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '40%', marginBottom: '1.5rem' }} />

            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '50%' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '40%', marginBottom: '1.5rem' }} />

            <Skeleton variant="rounded" sx={{width: '100%', height: '35px'}} />
        </Box>
    )
}

export default SurveyCardSkel