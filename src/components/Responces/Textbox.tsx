import { Label } from "@mui/icons-material"
import { Box, TextField, FormControl, Select, MenuItem, Divider, Chip } from "@mui/material"
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
            <h4 className="questioon-label"><span>Question: </span>{question.label}</h4>
            <h4 className="questioon-answer"><span>Answer: </span>{question.answer ?? 'No responce'}</h4>
        </Box>
    )
}

export default Textbox