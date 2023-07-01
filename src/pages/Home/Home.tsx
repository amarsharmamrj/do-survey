import { Grid, Typography, Button, Box, Stack } from "@mui/material"
import SurveyCard from "../../components/Home/SurveyCard"
import {Link} from 'react-router-dom'
import "./Home.css"

const Home = () => {
    return (
        <Grid container className="homepage-container">
            <Grid item md={12}>
                <Stack direction="row" justifyContent="space-between" className="stack">
                    <Box>
                        <Typography variant="h5" component="h6">All Surveys</Typography>
                    </Box>
                    <Box>
                        <Button component={Link} to="/create-survey" variant="contained" className="bg-two">Create Survey</Button>
                    </Box>
                </Stack>
            </Grid>
            <Grid container item md={12}>{
                [1, 2, 3, 4, 5, 5].map((survey) => {
                    return (
                        <Grid item md={3} xs={12} sm={6} className='survey-card-item'>
                            <SurveyCard survey={survey} />
                        </Grid>
                    )
                })
            }
            </Grid>
        </Grid>
    )
}

export default Home