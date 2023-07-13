import { Label } from "@mui/icons-material"
import { Box, TextField, FormControl, Select, MenuItem } from "@mui/material"
import QuestionType from "./QuestionType"

const Textbox = (props: any) => {
    const { question, handleQuestionType, questions, setQuestions } = props

    const handleQuestionLabel = (e: any) => {
        console.log("handleQuestionLabel")
        const questionData = questions.map((item: any) => {
            if (item.id === question.id) {
                item.label = e.target.value
            }
            return item
        })

        setQuestions(questionData)
        console.log("questionData:", questionData)
    }

    return (
        <Box>
            <h4 className="questioon-label">{question.label}</h4>
            <TextField
                id={question.id}
                variant="outlined"
                fullWidth={true}
                autoComplete="off"
                // label={question.label}
                placeholder='Type answer'
                // value={question.label}
                // onChange={handleQuestionLabel}
            />
            {/* <QuestionType question={question} handleQuestionType={handleQuestionType} /> */}
        </Box>
    )
}

export default Textbox