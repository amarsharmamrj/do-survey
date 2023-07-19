import { Grid, Typography, Button, Box, Stack } from "@mui/material"
import SurveyCard from "../../components/Home/SurveyCard"
import { Link } from 'react-router-dom'
import "./Home.css"
import { useEffect, useState } from "react"
import axios from "axios"
import AddIcon from '@mui/icons-material/Add';
import SurveyCardSkel from "../../Skeletons/SurveyCardSkel"

const Home = () => {
    const [surveys, setSurveys] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:4000/survey')
            .then((res) => {
                console.log("get surveys:", res.data)
                setSurveys(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log("get surveys error:", err)
                setLoading(false)
            })
    }, [])

    return (
        <Grid container className="homepage-container">
            <Grid item md={12}>
                <Stack direction="row" justifyContent="space-between" className="stack">
                    <Box>
                        <Typography variant="h5" component="h6">All Surveys</Typography>
                    </Box>
                    <Box>
                        <Button component={Link} to="/create-survey" variant="contained" className="bg-two"><AddIcon className="mr-1" />Create Survey</Button>
                    </Box>
                </Stack>
            </Grid>
            <Grid container item md={12}>
                {
                    !loading ? (
                        surveys ? (
                            surveys.map((survey) => {
                                return (
                                    <Grid item md={3} xs={12} sm={6} className='survey-card-item'>
                                        <SurveyCard survey={survey} />
                                    </Grid>
                                )
                            })
                        ) : ("No survey")
                    ) : (
                        [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <Grid item md={3} xs={12} sm={6} className='survey-card-item'>
                                <SurveyCardSkel key={item + 'card'} />
                            </Grid>
                        )
                        )
                    )
                }
            </Grid>
        </Grid>
    )
}

export default Home