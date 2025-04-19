import { Box, Grid, Skeleton } from "@mui/material" 
  
const EditSurveySkel = (props: any) => {  
 
    return (
        <Grid item xs={12} sm={12} md={10}>    
            <Box className="question-box"> 
 
                <Skeleton variant="rounded" sx={{ width: '100%', height: '3.2rem', margin: '1rem 0' }} /> 
                <Skeleton variant="rounded" sx={{ width: '100%', height: '3.2rem', margin: '1rem 0' }} /> 

            </Box>
        </Grid>
    )
}
 
export default EditSurveySkel
