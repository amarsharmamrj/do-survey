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
        <Box className="question-section">
            <TextField
                id={question.id}
                variant="outlined"
                fullWidth={true}
                autoFocus
                placeholder='Enter question'
                onChange={handleQuestionLabel}
            />
            <QuestionType question={question} handleQuestionType={handleQuestionType} />
        </Box>
    )
}

export default Textbox