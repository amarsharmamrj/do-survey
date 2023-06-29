import Topbar from "./Topbar"

const Template = (props:any) => {
    return (
        <>
            <Topbar />
            {props.children}
        </>
    )
}

export default Template