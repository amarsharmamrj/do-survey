import { Collapse, Box, TextField, FormControl, Select, MenuItem, Radio, IconButton, Tooltip, Slide, Checkbox, FormGroup, FormControlLabel } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import QuestionType from "./QuestionType";

const Checkboxes = (props: any) => {
    const { checked, question, handleQuestionType, handleOptionChange, handleDeleteOption, handleAddOption, questions, setQuestions } = props

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
        <>
            {/* // <Collapse in={checked} collapsedSize={60}> */}
            <Box className="question-section">
                <Box>
                    <h4 className="questioon-label"><span>Question: </span>{question.label}</h4>
                </Box>
            </Box>
            <Box className="options-section">
                <FormGroup>
                    {
                        question.questionType === 'checkbox' && question.options ? (
                            question.options.map((option: any) => {
                                return (
                                    <Box key={option.id - question.id} className="option-row">
                                        <FormControlLabel disabled={true} control={<Checkbox checked={option.isSelected}/>} label={question.label} />
                                    </Box>
                                )
                            })
                        ) : ('')
                    }
                </FormGroup>

                {/* </Collapse > */}
            </Box>
        </>
    )
}

export default Checkboxes