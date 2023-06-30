import { Grid, Typography, Button, Box, Stack, TextField, FormControl, Select, MenuItem, Radio, IconButton } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
const Question = (props: any) => {
    const { question, questions, setQuestions } = props
    // const [optionsForMultiple, setOptionsForMultiple] = useState([{ id: 1000, label: 'option' }]) 

    const handleQuestionType = (e: any) => {
        console.log("questions:", questions)

        const questionData = questions.map((item: any) => {
            if (item.id === question.id) {
                item.questionType = e.target.value
                if (e.target.value === 'multiple') {
                    item.options = [{ id: 1000, label: 'Option' }]
                }
            }
            return item
        })

        setQuestions(questionData)
        console.log("questionData:", questionData)
    }

    const handleAddQuestion = () => {
        let newQuestion = {
            id: questions.at(-1).id + 1,
            questionType: 'textbox'
        }
        setQuestions([...questions, newQuestion])
    }

    const handleDeleteQuestion = () => {
        let filter = questions.filter((item: any) => item.id !== question.id)
        setQuestions(filter)
    }

    const handleAddOption = (questionId: number) => {
        console.log("add")
        const questionData = questions.map((item: any) => {
            if (item.id === questionId) {
                item.options = [...item.options, { id: item.options.at(-1).id + 1, label: 'Option' }]
            }
            return item
        })

        setQuestions(questionData)
        console.log("questionData:", questionData)


    }

    const handleDeleteOption = (questionId: number, optionId: number) => {
        console.log("delete")
        console.log("questionId:", questionId)
        console.log("optionId:", optionId)
        const questionData = questions.find((question: any) => question.id === questionId)
        console.log("questionData:", questionData)

        if (questionData.options.length > 1) {
            const filterOptions = questionData.options.filter((option: any) => option.id !== optionId)
            console.log("filterOptions:", filterOptions)

            const allQuestions = questions.map((item: any) => {
                if (item.id === questionId) item.options = filterOptions
                return item
            })
            console.log("allQuestions:", allQuestions)

            setQuestions(allQuestions)
        }
    }


    return (
        <Grid item xs={12} sm={12} md={10}>
            <Box className="question-box">
                {
                    question.questionType === 'textbox' ? (
                        <Box className="question-section">
                            <TextField
                                id={question.id}
                                variant="outlined"
                                fullWidth={true}
                                placeholder='Enter question'
                            />
                            <FormControl className="question-type-select">
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={question.questionType}
                                    onChange={handleQuestionType}
                                >
                                    <MenuItem value='textbox'>Textbox</MenuItem>
                                    <MenuItem value='multiple'>Multiple Choice</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    ) : (
                        question.questionType === 'multiple' ? (
                            <>
                                <Box className="question-section">
                                    <TextField
                                        id={question.id}
                                        variant="outlined"
                                        fullWidth={true}
                                        placeholder='Enter question'

                                    />
                                    <FormControl className="question-type-select">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={question.questionType}
                                            onChange={handleQuestionType}
                                        >
                                            <MenuItem value='textbox'>Textbox</MenuItem>
                                            <MenuItem value='multiple'>Multiple Choice</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box className="options-section">
                                    {
                                        question.questionType === 'multiple' && question.options ? (
                                            question.options.map((option: any) => {
                                                return (
                                                    <Box key={option.id - question.id} className="option-row">
                                                        <Box className="option-row-input">
                                                            <Radio disabled={true} />

                                                            <TextField
                                                                id="standard-basic"
                                                                variant="standard"
                                                                className="option-label"
                                                                placeholder='Option'
                                                            />
                                                        </Box>

                                                        <Box className="option-row-buttons">
                                                            {question.options.length > 1 && (
                                                                <IconButton onClick={() => handleDeleteOption(question.id, option.id)}>
                                                                    <DeleteIcon className="color-two" />
                                                                </IconButton>
                                                            )
                                                            }
                                                            <IconButton onClick={() => handleAddOption(question.id)}>
                                                                <AddCircleIcon className="color-one" />
                                                            </IconButton>
                                                        </Box>


                                                    </Box>
                                                )
                                            })
                                        ) : ('')
                                    }
                                </Box>
                            </>
                        ) : (
                            <p>other</p>)
                    )
                }

                <Box className="question-actions">
                    {
                        question.id !== 1 && (
                            <Button
                                variant='contained'
                                size="small"
                                className="bg-two mlr-2"
                                onClick={handleDeleteQuestion}
                            >
                                Delete question
                            </Button>
                        )
                    }
                    <Button
                        variant='contained'
                        size="small"
                        className="bg-one"
                        onClick={handleAddQuestion}
                    >
                        Add question
                    </Button>
                </Box>
            </Box>

        </Grid >
    )
}

export default Question