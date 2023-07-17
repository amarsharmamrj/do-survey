import { Grid, Box, Switch, IconButton, Divider, Tooltip, Zoom, Slide } from "@mui/material"
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import Textbox from "./Textbox";
import Multiple from "./Multiple";
import Actions from "./Actions";
import Checkboxes from "./Checkboxes";

const Question = (props: any) => {
    const { question, questions, setQuestions } = props
    const [checked, setChecked] = useState(true);

    const handleQuestionType = (e: any) => {
        console.log("questions:", questions)

        const questionData = questions.map((item: any) => {
            if (item.id === question.id) {
                item.questionType = e.target.value
                if (e.target.value === 'multiple') {
                    item.options = [{ id: 1000, label: 'Option' }]
                }
                if (e.target.value === 'checkbox') {
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
        console.log("option value:", e.target.value)
        const questionData: any = questions.find((question: any) => question.id === questionId)
        console.log("option questionData:", questionData)

        if (e.key === 'Enter' && questionData && questionData.options.at(-1).id === optionId) handleAddOption(questionId)
        if (questionData) {
            const optionsData = questionData.options.map((item: any) => {
                if (item.id === optionId) item.label = e.target.value
                return item
            })
            console.log("option optionsData:", optionsData)

            let newQuestionData = { ...questionData, options: optionsData }
            console.log("option newQuestionData:", newQuestionData)

            const filterQuestions = questions.filter((item: any) => item.id != questionId)
            console.log("option filterQuestions:", filterQuestions)

            console.log("after option change:", [...filterQuestions, newQuestionData])
            setQuestions([...filterQuestions, newQuestionData])
        }
    }

    return (
        <Grid item xs={12} sm={12} md={10}>
            <Slide in={true} direction="up">
                <Box className="question-box">
                    {/* {
                        question.questionType === 'multiple' && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', direction: 'row-reverse', alignItems: 'center' }}>
                                {checked ? 'Collapse' : 'Expand'}
                                <IconButton onClick={handleChange} sx={{ marginLeft: '0.5rem' }}>
                                    {checked ? <ExpandLessIcon className="color-one" /> : <ExpandMoreIcon className="color-one" />}
                                </IconButton>
                            </Box>
                        )
                    } */}
                    {
                        question.questionType === 'textbox' ? (
                            <Textbox
                                question={question}
                                handleQuestionType={handleQuestionType}
                                questions={questions}
                                setQuestions={setQuestions}
                            />

                        ) : (
                            question.questionType === 'multiple' ? (
                                <Multiple
                                    question={question}
                                    handleQuestionType={handleQuestionType}
                                    handleOptionChange={handleOptionChange}
                                    handleDeleteOption={handleDeleteOption}
                                    handleAddOption={handleAddOption}
                                    questions={questions}
                                    setQuestions={setQuestions}
                                    checked={checked}
                                    setChecked={setChecked}
                                />
                            ) : (
                                question.questionType === 'checkbox' ? (
                                    <Checkboxes
                                        question={question}
                                        handleQuestionType={handleQuestionType}
                                        handleOptionChange={handleOptionChange}
                                        handleDeleteOption={handleDeleteOption}
                                        handleAddOption={handleAddOption}
                                        questions={questions}
                                        setQuestions={setQuestions}
                                        checked={checked}
                                        setChecked={setChecked}
                                    />
                                ) : <p>other</p>
                            )
                        )
                    }

                    {/* <Divider sx={{ marginTop: '1rem' }} />

                    <Actions
                        question={question}
                        handleRequired={handleRequired}
                        handleDeleteQuestion={handleDeleteQuestion}
                        handleAddQuestion={handleAddQuestion}
                    /> */}

                </Box>
            </Slide>

        </Grid >
    )
}

export default Question