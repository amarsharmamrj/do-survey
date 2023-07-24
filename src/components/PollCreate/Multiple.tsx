import { Collapse, Box, TextField, FormControl, Select, MenuItem, Radio, IconButton, Tooltip, Slide } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useParams } from "react-router-dom";

const Multiple = (props: any) => {
    const { id: surveyId } = useParams();
    const { autoFocus } = props
    const { checked, question, pollName, setPollName, handleQuestionType, handleOptionChange, handleDeleteOption, handleAddOption, questions, setQuestions } = props

    const handleQuestionLabel = (e: any) => {
        console.log("handleQuestionLabel")
        setPollName(e.target.value)
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
        <Collapse in={checked} collapsedSize={60}>
            <Box className="question-section">
                <TextField
                    id={question.id}
                    variant="outlined"
                    fullWidth={true}
                    placeholder='Enter poll name'
                    value={question.label}
                    onChange={handleQuestionLabel}

                />
            </Box>
            <Box className="options-section">
                {
                    question.options ? (
                        question.options.map((option: any) => {
                            return (
                                <Box key={option.id - question.id} className="option-row">
                                    <Slide in={true} direction="up">
                                        <Box className="option-row-input">
                                            <Radio disabled={true} />
                                            <TextField
                                                id={question.id + option.id}
                                                variant="standard"
                                                className="option-label"
                                                placeholder='Option'
                                                autoFocus={autoFocus}
                                                defaultValue={option.label}
                                                // value={option.label}
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

export default Multiple