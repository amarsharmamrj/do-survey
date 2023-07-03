import { Box, TextField, FormControl, Select, MenuItem } from "@mui/material"
import QuestionType from "./QuestionType"

const Textbox = (props: any) => {
    const { question, handleQuestionType } = props
    return (
        <Box className="question-section">
            <TextField
                id={question.id}
                variant="outlined"
                fullWidth={true}
                autoFocus
                placeholder='Enter question'
            />
            <QuestionType question={question} handleQuestionType={handleQuestionType} />
        </Box>
    )
}

export default Textbox