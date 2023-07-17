import { Box, TextField, FormControl, Select, MenuItem, Radio, IconButton, Tooltip, Slide, FormControlLabel, RadioGroup, Divider, Chip } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import QuestionType from "./QuestionType";

const Multiple = (props: any) => {
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
            <Box>
                <h4 className="questioon-label"><span>Question: </span>{question.label}</h4>
            </Box>
            <Box className="options-section">
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    {
                        question.questionType === 'multiple' && question.options ? (
                            question.options.map((option: any) => {
                                return (
                                    <Box key={option.id - question.id} className="option-row">
                                        <FormControlLabel disabled={true} value={option.label} checked={option.isSelected} control={<Radio />} label={option.label} />
                                    </Box>
                                )
                            })
                        ) : ('')
                    }
                </RadioGroup>

            </Box>
        </>
    )
}

export default Multiple