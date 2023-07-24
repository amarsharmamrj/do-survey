import { Grid, Box, Switch, IconButton, Divider, Tooltip, Zoom, Slide } from "@mui/material"
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import Multiple from "./Multiple";

const Question = (props: any) => {
    const { question, questions, setQuestions, pollName, setPollName } = props
    const [checked, setChecked] = useState(true);

    return (
        <Grid item xs={12} sm={12} md={10}>
            <Slide in={true} direction="up">
                <Box className="question-box">

                    <Multiple
                        question={question}
                        questions={questions}
                        setQuestions={setQuestions}
                        checked={checked}
                        setChecked={setChecked}
                        pollName={pollName}
                        setPollName={setPollName}
                    />
                </Box>
            </Slide>

        </Grid >
    )
}

export default Question