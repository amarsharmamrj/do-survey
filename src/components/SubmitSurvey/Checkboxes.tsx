import { Collapse, Box, TextField, FormControl, Select, MenuItem, Radio, IconButton, Tooltip, Slide, Checkbox, FormGroup, FormControlLabel } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Checkboxes = (props: any) => {
    const { checked, question, handleQuestionType, handleOptionChange, handleDeleteOption, handleAddOption, questions, setQuestions } = props

    const handleCheckboxChange = (e: any, questionId: number, optionId: number) => {
        console.log("handleCheckboxChange:", e.target.checked, optionId, questionId)

        const newQuestions = questions.map((question: any) => {
            if (question.id === questionId) {
                question.options.map((option: any) => {
                    if (option.id === optionId) option.isSelected = e.target.checked
                })
            }
            return question
        })
        console.log("newQuestions:", newQuestions)
        setQuestions(newQuestions)
    }

    return (
        <>
            {/* // <Collapse in={checked} collapsedSize={60}> */}
            <Box className="question-section">
                <Box>
                    <h4 className="questioon-label">{question.label} {question.required ? (<span style={{color: 'red'}}>*</span>) : ''}</h4>
                </Box>
            </Box>
            <Box className="options-section">
                <FormGroup>
                    {
                        question.questionType === 'checkbox' && question.options ? (
                            question.options.map((option: any) => {
                                return (
                                    <Box key={option.id - question.id} className="option-row">
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label={option.label}
                                            className="color-two"
                                            onChange={(e) => handleCheckboxChange(e, question.id, option.id)}
                                        />
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