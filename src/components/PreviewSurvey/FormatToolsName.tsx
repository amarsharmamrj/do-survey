import { Bloodtype, LocalPrintshopSharp } from "@mui/icons-material"
import { IconButton, Box, Divider, Menu, MenuItem } from "@mui/material"
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

const FormatToolsName = (props: any) => {
    const { anchorEl, handleOpenFormatTools, setAnchorEl, open, surveyNameStyle, setSurveyNameStyle } = props

    const handleCloseFormatTools = () => {
        console.log("open:", open)
        setAnchorEl(null);
    };
    const tempStyle: any = {
        '& input': {
        }
    }

    // const handleFormatBold = () => {
    //     console.log("(tempStyle['& input'].fontWeight:", tempStyle['& input'].fontWeight)
    //     if(tempStyle['& input'].fontWeight == undefined || tempStyle['& input'].fontWeight === '500' ){
    //         tempStyle['& input'].fontWeight = '800'
    //     } else {
    //         tempStyle['& input'].fontWeight = '500'
    //     }
    //     console.log("tempstyle:", tempStyle)
    //     setSurveyNameStyle(tempStyle)
    // }

    const handleFormatBold = () => {
        let newStyle
        if (surveyNameStyle['& input'] !== undefined) {
            if (surveyNameStyle['& input'].fontWeight == undefined || surveyNameStyle['& input'].fontWeight === '500') {
                newStyle = {
                    '& input': {
                        ...surveyNameStyle['& input'],
                        fontWeight: '800'
                    }
                }
            } else {
                newStyle = {
                    '& input': {
                        ...surveyNameStyle['& input'],
                        fontWeight: '500'
                    }
                }
            }
        } else {
            newStyle = {
                '& input': {
                    fontWeight: '800'
                }
            }
        }
        setSurveyNameStyle(newStyle)
    }

    const handleFormatItalic = () => {
        let newStyle
        if (surveyNameStyle['& input'] !== undefined) {
            if (surveyNameStyle['& input'].fontStyle == undefined) {
                newStyle = {
                    '& input': {
                        ...surveyNameStyle['& input'],
                        fontStyle: 'italic'
                    }
                }
            } else {
                if (surveyNameStyle['& input'].fontStyle === 'normal') {
                    newStyle = {
                        '& input': {
                            ...surveyNameStyle['& input'],
                            fontStyle: 'italic'
                        }
                    }
                } else {
                    newStyle = {
                        '& input': {
                            ...surveyNameStyle['& input'],
                            fontStyle: 'normal'
                        }
                    }
                }
            }
        } else {
            newStyle = {
                '& input': {
                    fontStyle: 'italic'
                }
            }
        }
        setSurveyNameStyle(newStyle)
    }
    const handleFormatUnderline = () => {
        let newStyle
        if (surveyNameStyle['& input'] !== undefined) {
            if (surveyNameStyle['& input'].textDecoration == undefined) {
                newStyle = {
                    '& input': {
                        ...surveyNameStyle['& input'],
                        textDecoration: 'underline'
                    }
                }
            } else {
                if (surveyNameStyle['& input'].textDecoration === 'none') {
                    newStyle = {
                        '& input': {
                            ...surveyNameStyle['& input'],
                            textDecoration: 'underline'
                        }
                    }
                } else {
                    newStyle = {
                        '& input': {
                            ...surveyNameStyle['& input'],
                            textDecoration: 'none'
                        }
                    }
                }
            }
        } else {
            newStyle = {
                '& input': {
                    textDecoration: 'underline'
                }
            }
        }
        setSurveyNameStyle(newStyle)
    }
    return (
        <>
            <Menu
                id="basic-menu"
                className="format-tools"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseFormatTools}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleFormatBold}><FormatBoldIcon /></MenuItem>
                <MenuItem onClick={handleFormatItalic}><FormatItalicIcon /></MenuItem>
                <MenuItem onClick={handleFormatUnderline}><FormatUnderlinedIcon /></MenuItem>
            </Menu>
        </>
    )
}

export default FormatToolsName