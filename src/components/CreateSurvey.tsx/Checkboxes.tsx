import { Collapse, Box, TextField, FormControl, Select, MenuItem, Radio, IconButton, Tooltip, Slide, Checkbox } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import QuestionType from "./QuestionType";

const Checkboxes = (props: any) => {
    const { checked, question, handleQuestionType, handleOptionChange, handleDeleteOption, handleAddOption } = props
    return (
        <Collapse in={checked} collapsedSize={60}>
            <Box className="question-section">
                <TextField
                    id={question.id}
                    variant="outlined"
                    fullWidth={true}
                    placeholder='Enter question'

                />
                <QuestionType question={question} handleQuestionType={handleQuestionType} />
            </Box>
            <Box className="options-section">
                {
                    question.questionType === 'checkbox' && question.options ? (
                        question.options.map((option: any) => {
                            return (
                                <Box key={option.id - question.id} className="option-row">
                                    <Slide in={true} direction="up">
                                        <Box className="option-row-input">
                                            <Checkbox disabled={true} />
                                            <TextField
                                                id={question.id + option.id}
                                                variant="standard"
                                                className="option-label"
                                                placeholder='Option'
                                                autoFocus
                                                onKeyUp={(e) => handleOptionChange(e, option.id, question.id)}
                                            />
                                        </Box>
                                    </Slide>

                                    <Box className="option-row-buttons">
                                        {question.options.length > 1 && (
                                            <Tooltip title='Delete option'>
                                                <IconButton onClick={() => handleDeleteOption(question.id, option.id)}>
                                                    <DeleteOutlineIcon className="color-two" />
                                                </IconButton>
                                            </Tooltip>
                                        )
                                        }
                                        <Tooltip title='Add option'>
                                            <IconButton onClick={() => handleAddOption(question.id)}>
                                                <AddIcon className="color-one" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>


                                </Box>
                            )
                        })
                    ) : ('')
                }
            </Box>
        </Collapse >
    )
}

export default Checkboxes