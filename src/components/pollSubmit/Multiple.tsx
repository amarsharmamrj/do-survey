import { Box, TextField, FormControl, Select, MenuItem, Radio, IconButton, Tooltip, Slide, FormControlLabel, RadioGroup } from "@mui/material"

const Multiple = (props: any) => {
    const { checked, question, pollName, setPollName, handleQuestionType, handleOptionChange, handleDeleteOption, handleAddOption, questions, setQuestions } = props

    const handleChangeRadio = (e: any, questionId: number, optionId: number) => {
        console.log("handleChangeRadio:", e.target.checked, optionId, questionId)

        const newQuestions = questions.map((question: any) => {
            if (question.id === questionId) {
                setPollName(question.label)
                question.options.map((option: any) => {
                    if (option.id === optionId) option.isSelected = e.target.checked
                    else option.isSelected = !e.target.checked
                })
            }
            return question
        })
        console.log("newQuestions:", newQuestions)
        setQuestions(newQuestions)
    }

    return (
        <>
            <Box>
                <h4 className="questioon-label">{question.label}</h4>
            </Box>
            <Box className="options-section">
                <Box className="option-row">
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="female"
                        name="radio-buttons-group"
                    >
                        {
                            question.options ? (
                                question.options.map((option: any) => {
                                    return (
                                        <FormControlLabel
                                            value={option.label}
                                            onChange={(e) => handleChangeRadio(e, question.id, option.id)}
                                            control={
                                                <Radio />
                                            }
                                            label={option.label}
                                        />
                                    )
                                })
                            ) : ('')
                        }
                    </RadioGroup>
                </Box>

            </Box>
        </>
    )
}

export default Multiple