import { Grid, Box, Switch, IconButton, Divider, Tooltip, Zoom, Slide } from "@mui/material"
import { useState } from "react";
import Multiple from "./Multiple";

const Question = (props: any) => {
    const { question, questions, setQuestions, pollName, setPollName } = props
    const [checked, setChecked] = useState(true);
    const [autoFocus, setAutoFocus] = useState(false);

    const handleQuestionType = (e: any) => {
        console.log("questions:", questions)

        const questionData = questions.map((item: any) => {
            if (item.id === question.id) {
                item.questionType = e.target.value
                if (e.target.value === 'multiple') {
                    item.options = [{ id: 1000, label: '' }]
                }
                if (e.target.value === 'checkbox') {
                    item.options = [{ id: 1000, label: '' }]
                }
            }
            return item
        })

        setQuestions(questionData)
        console.log("questionData:", questionData)
    }


    const handleAddOption = (questionId: number) => {
        setAutoFocus(true)
        console.log("add")
        const questionData = questions.map((item: any) => {
            if (item.id === questionId) {
                item.options = [...item.options, { id: item.options.at(-1).id + 1, label: '' }]
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


    const handleOptionChange = (e: any, optionId: number, questionId: number) => {
        if (e.key === 'Enter' && questions && questions.find((question: any) => question.id === questionId).options.at(-1).id === optionId) handleAddOption(questionId)
        const newQuestions = questions.map((question: any) => {
            if (question.id === questionId) {
                question.options.map((option: any) => {
                    if (option.id === optionId) option.label = e.target.value
                })
            }
            return question
        })
        console.log("new aa:", newQuestions)
        setQuestions(newQuestions)
    }

    return (
        <Grid item xs={12} sm={12} md={10}>
            <Slide in={true} direction="up">
                <Box className="question-box">
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
                        autoFocus={autoFocus}
                        pollName={pollName}
                        setPollName={setPollName}
                    />

                </Box>
            </Slide>

        </Grid >
    )
}

export default Question