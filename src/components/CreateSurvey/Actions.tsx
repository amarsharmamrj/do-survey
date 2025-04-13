import { Box, Divider, IconButton, Switch, Tooltip } from "@mui/material"  
import AddCircleIcon from '@mui/icons-material/AddCircle';  
import DeleteIcon from '@mui/icons-material/Delete'; 

const Actions = (props:any) => {
    const {question, handleRequired, handleDeleteQuestion, handleAddQuestion } = props  

    return (
        <Box className="question-actions"> 
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <span>Required</span>
                        <Tooltip title='Make this field required'>  
                            <Switch onChange={handleRequired} checked={question.required} /> 
                        </Tooltip>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ marginRight: '1rem' }} />
                    {
                        question.id !== 1 && (
                            <Tooltip title='Delete question'>
                                <IconButton
                                    size="small"
                                    className="mr-2"
                                    onClick={handleDeleteQuestion}
                                >
                                    <DeleteIcon className="color-two" />
                                </IconButton>
                            </Tooltip>
                        )
                    }
                    <Tooltip title={'Add question'}>
                        <IconButton
                            size="small"
                            onClick={handleAddQuestion}
                        >
                            <AddCircleIcon className="color-one" />
                        </IconButton>
                    </Tooltip>
                </Box>
    )
}

export default Actions
