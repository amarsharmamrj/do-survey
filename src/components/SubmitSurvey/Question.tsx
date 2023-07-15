import { Grid, Box, Switch, IconButton, Divider, Tooltip, Zoom, Slide } from "@mui/material"
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import Textbox from "../SubmitSurvey/Textbox";
import Multiple from "../SubmitSurvey/Multiple";
import Checkboxes from "../SubmitSurvey/Checkboxes";

const Question = (props: any) => {
    const { question, questions, setQuestions } = props
    const [checked, setChecked] = useState(true);

    return (
        <Grid item xs={12} sm={12} md={10}>
            <Slide in={true} direction="up">
                <Box className="question-box">
                    {
                        question.questionType === 'textbox' ? (
                            <Textbox
                                question={question}
                                questions={questions}
                                setQuestions={setQuestions}
                            />

                        ) : (
                            question.questionType === 'multiple' ? (
                                <Multiple
                                    question={question}
                                    questions={questions}
                                    setQuestions={setQuestions}
                                    checked={checked}
                                    setChecked={setChecked}
                                />
                            ) : (
                                question.questionType === 'checkbox' ? (
                                    <Checkboxes
                                        question={question}
                                        questions={questions}
                                        setQuestions={setQuestions}
                                        checked={checked}
                                        setChecked={setChecked}
                                    />
                                ) : <p>other</p>
                            )
                        )
                    }


                </Box>
            </Slide>

        </Grid >
    )
}

export default Question