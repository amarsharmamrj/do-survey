import { Grid, Typography, Button, Box, Stack } from "@mui/material"
import SurveyCard from "../../components/Home/SurveyCard"
import { Link } from 'react-router-dom'
import "./Home.css"
import { useEffect, useState } from "react"
import axios from "axios"
import AddIcon from '@mui/icons-material/Add';
import SurveyCardSkel from "../../Skeletons/SurveyCardSkel"
import checkLogin from "../../utils/checkLogin"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PollIcon from '@mui/icons-material/Poll';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';

const Home = () => {
    const navigate = useNavigate()
    document.title = 'Home'
    const loginUser = useSelector((state: any) => state.loginLogout)
    console.log("create loginUser:", loginUser)

    const [surveys, setSurveys] = useState([])

    useEffect(() => {
        if (!checkLogin()) {
            navigate('/login')
        }
    }, [])


    return (
        <Grid container className="homepage-container">
            <Grid container item md={12}>
                <Grid item md={3} xs={12} sm={6} className='survey-card-item'></Grid>
                <Grid item md={3} xs={12} sm={6} className='survey-card-item'>
                    <Box component={Link} to='/poll' className="category-card-box">
                        <div className="category-card">
                            <PollIcon className="icon color-one" />
                            <h2>My Polls</h2>
                        </div>
                    </Box>
                </Grid>
                <Grid item md={3} xs={12} sm={6} className='survey-card-item'>
                    <Box component={Link} to='/survey' className="category-card-box">
                        <div className="category-card">
                            <HorizontalSplitIcon className="icon color-one" />
                            <h2>My Surveys</h2>
                        </div>
                    </Box>
                </Grid>
                <Grid item md={3} xs={12} sm={6} className='survey-card-item'></Grid>
            </Grid>
        </Grid>
    )
}

export default Home