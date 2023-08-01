import { Grid, Typography, Button, Box, Stack } from "@mui/material"
import SurveyCard from "../../components/Home/SurveyCard"
import { Link } from 'react-router-dom'
import "./Poll.css"
import { useEffect, useState } from "react"
import axios from "axios"
import AddIcon from '@mui/icons-material/Add';
import SurveyCardSkel from "../../Skeletons/SurveyCardSkel"
import checkLogin from "../../utils/checkLogin"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PollCard from "../../components/poll/PollCard"

const Poll = () => {
    const navigate = useNavigate()
    document.title = 'Poll'
    const loginUser = useSelector((state: any) => state.loginLogout)
    console.log("create loginUser:", loginUser)

    const [polls, setPolls] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (checkLogin()) {
            axios.get(`${process.env.REACT_APP_API_URL}/poll/data/${loginUser.user.userId}`)
                .then((res) => {
                    console.log("get polls:", res.data)
                    setPolls(res.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log("get polls error:", err)
                    setLoading(false)
                })
        }
    }, [loginUser])

    useEffect(() => {
        if (!checkLogin()) {
            navigate('/login')
        }
    }, [])


    return (
        <Grid container className="homepage-container">
            <Grid item md={12}>
                <Stack direction="row" justifyContent="space-between" className="stack">
                    <Box>
                        <Typography variant="h5" component="h6">All Polls {polls.length >= 0 ? `(${polls.length})` : ''}</Typography>
                    </Box>
                    <Box>
                        <Button component={Link} to="/create-poll" variant="contained" className="bg-two"><AddIcon className="mr-1" />Create Poll</Button>
                    </Box>
                </Stack>
            </Grid>
            <Grid container item md={12}>
                {
                    !loading ? (
                        polls ? (
                            polls.map((survey) => {
                                return (
                                    <Grid item md={3} xs={12} sm={6} className='survey-card-item'>
                                        <PollCard survey={survey} />
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

export default Poll