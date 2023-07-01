import { Grid, Typography, Button, Box, Switch, Stack, TextField, FormControl, Select, MenuItem, Radio, IconButton, FormControlLabel, Divider } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { isTemplateExpression } from "typescript";
const Question = (props: any) => {
    const { question, questions, setQuestions } = props
    const [checked, setChecked] = useState(true);

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
            questionType: 'textbox',
            required: false
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

    const handleChange = () => {
        setChecked((prev: any) => !prev);
    };

    const handleRequired = (e: any) => {
        let questionsData
        questionsData = questions.map((item: any) => {
            if (item.id === question.id) item.required = e.target.checked
            return item
        })
        console.log("questionsData after required:", questionsData)
        setQuestions(questionsData)
    }

    const handleOptionChange = (e: any, optionId: number, questionId: number) => {
        const questionData: any = questions.find((question: any) => question.id === questionId)
        if (e.key === 'Enter' && questionData && questionData.options.at(-1).id === optionId) handleAddOption(questionId)
    }

    return (
        <Grid item xs={12} sm={12} md={10}>
            <Box className="question-box">
                {
                    question.questionType === 'multiple' && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', direction: 'row-reverse', alignItems: 'center' }}>
                            {checked ? 'Collapse' : 'Expand'}
                            <IconButton onClick={handleChange} sx={{ marginLeft: '0.5rem' }}>
                                {checked ? <ExpandLessIcon className="color-one" /> : <ExpandMoreIcon className="color-one" />}
                            </IconButton>
                        </Box>
                    )
                }
                {
                    question.questionType === 'textbox' ? (
                        <Box className="question-section">
                            <TextField
                                id={question.id}
                                variant="outlined"
                                fullWidth={true}
                                autoFocus
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
                                <Collapse in={checked} collapsedSize={60}>
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
                                                                    id={question.id + option.id}
                                                                    variant="standard"
                                                                    className="option-label"
                                                                    placeholder='Option'
                                                                    autoFocus
                                                                    onKeyUp={(e) => handleOptionChange(e, option.id, question.id)}
                                                                />
                                                            </Box>

                                                            <Box className="option-row-buttons">
                                                                {question.options.length > 1 && (
                                                                    <IconButton onClick={() => handleDeleteOption(question.id, option.id)}>
                                                                        <DeleteOutlineIcon className="color-two" />
                                                                    </IconButton>
                                                                )
                                                                }
                                                                <IconButton onClick={() => handleAddOption(question.id)}>
                                                                    <AddIcon className="color-one" />
                                                                </IconButton>
                                                            </Box>


                                                        </Box>
                                                    )
                                                })
                                            ) : ('')
                                        }
                                    </Box>
                                </Collapse>
                            </>
                        ) : (
                            <p>other</p>)
                    )
                }

                <Divider sx={{marginTop: '1rem'}} />

                <Box className="question-actions">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <span>Required</span> <Switch onChange={handleRequired} />
                    </Box>
                    <Divider orientation="vertical" flexItem  sx={{marginRight:'1rem'}} />
                    {
                        question.id !== 1 && (
                            <IconButton
                                size="small"
                                className="mr-2"
                                onClick={handleDeleteQuestion}
                            >
                                <DeleteIcon className="color-two" />
                            </IconButton>
                        )
                    }
                    <IconButton
                        size="small"
                        onClick={handleAddQuestion}
                    >
                        <AddCircleIcon className="color-one" />
                    </IconButton>
                </Box>
            </Box>

        </Grid >
    )
}

export default Question