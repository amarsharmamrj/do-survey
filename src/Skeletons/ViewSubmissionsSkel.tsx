import { Box, Grid, Skeleton } from "@mui/material"

const ViewSubmissionsSkel = () => {
    return (
        <Grid item xs={12} sm={12} md={12}>
            <Box className="question-box mb-2">

                <Skeleton variant="rounded" sx={{ width: '100%', height: '1rem', margin: '1rem 0' }} />
                <Skeleton variant="rounded" sx={{ width: '100%', height: '1rem', margin: '1rem 0' }} />

            </Box>
            <Box className="mtb-2">
                <Skeleton variant="rectangular" sx={{ width: '100%', height: '3.2rem', margin: '0.5rem 0' }} />
                <Skeleton variant="rectangular" sx={{ width: '100%', height: '3.2rem', margin: '0.5rem 0' }} />
                <Skeleton variant="rectangular" sx={{ width: '100%', height: '3.2rem', margin: '0.5rem 0' }} />
                <Skeleton variant="rectangular" sx={{ width: '100%', height: '3.2rem', margin: '0.5rem 0' }} />
            </Box>
        </Grid>
    )
}

export default ViewSubmissionsSkel