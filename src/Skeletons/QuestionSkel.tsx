import { Box, Grid, Skeleton } from "@mui/material"

const QuestionSkel = (props: any) => {

    return (
        <Grid item xs={12} sm={12} md={10}>
            <Box className="question-box">

                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '40%', margin: '1rem 0' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '60%', marginBottom: '1rem' }} />


            </Box>
        </Grid>
    )
}

export default QuestionSkel