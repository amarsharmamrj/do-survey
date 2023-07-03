import { Grid, Typography, Button, Box, Stack, TextField, FormControl, Select, MenuItem } from "@mui/material"
import { useState } from "react"
import { Link } from 'react-router-dom'
import Question from "../../components/CreateSurvey.tsx/Question"
import "./CreateSurvey.css"

const CreateSurvey = () => {
    const [questions, setQuestions] = useState([{
        id: 1,
        questionType: 'textbox',
        required: false
    }])

    return (

        <Grid container className="homepage-container">
            <Grid item md={12}>
                <Stack direction="row" justifyContent="space-between" className="stack">
                    {/* <Box>
                        <Typography variant="h5" component="h6">All Surveys</Typography>
                    </Box>
                    <Box>
                        <Button component={Link} to="/create-survey" variant="contained" className="bg-two">Create Survey</Button>
                    </Box> */}
                </Stack>
            </Grid>
            <Grid item md={12} container className="question-container">
                <Grid item xs={12} sm={12} md={10}>
                    <Box className="survey-details">
                        <TextField
                            variant="outlined"
                            className="mtb-1"
                            label="Survey Name"
                            fullWidth={true}
                            autoFocus
                            placeholder='Enter survey name'
                        />
                        <TextField
                            variant="outlined"
                            className="mtb-1"
                            label="Survey description"
                            fullWidth={true}
                            autoFocus
                            placeholder='Enter survey description'
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid container item md={12} className="question-container">
                {
                    questions.length > 0 ? (
                        questions.map((question: any) => {
                            return (
                                <Question key={question.id} question={question} questions={questions} setQuestions={setQuestions} />
                            )
                        })
                    ) : ('')
                }
            </Grid>
        </Grid>
    )
}

export default CreateSurvey