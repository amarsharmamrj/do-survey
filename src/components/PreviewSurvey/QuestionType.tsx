import { FormControl, MenuItem, Select } from "@mui/material"

const QuestionType = (props:any) => {
    const {question, handleQuestionType} = props
    return (
        <FormControl className="question-type-select">
        <Select
            id="demo-simple-select"
            value={question.questionType}
            onChange={handleQuestionType}   
        >
            <MenuItem value='textbox'>Textbox</MenuItem>
            <MenuItem value='multiple'>Multiple Choice</MenuItem>
            <MenuItem value='checkbox'>Checkboxes</MenuItem>
        </Select>
    </FormControl>
    )
}

export default QuestionType