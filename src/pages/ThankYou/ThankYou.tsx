import { Box } from "@mui/material"
import { useParams } from "react-router-dom"

const ThankYou = () => {
    const { name } = useParams()
    return (
        <Box className="thankyou-box">
            <h1>thank you submitting your response for - <b>{name}</b></h1>
        </Box>
    )
}

export default ThankYou