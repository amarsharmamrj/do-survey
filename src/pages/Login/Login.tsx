import { Grid, Typography, Button, Box, Stack, TextField, InputLabel, FormControl, InputAdornment, FilledInput, IconButton, OutlinedInput, FormHelperText, CircularProgress } from "@mui/material"
import SurveyCard from "../../components/Home/SurveyCard"
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import { useEffect, useState } from "react"
import axios from "axios"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { enqueueSnackbar } from 'notistack'
import { useSelector, useDispatch } from "react-redux"
import { login, logout } from "../../actions"
import { getLS, setLS } from "../../utils/localStorageEncryp"

const Login = () => {
    const myState = useSelector((state: any) => state.loginLogout)
    const dispatch = useDispatch()
    console.log("@@myState:", myState)

    const [surveys, setSurveys] = useState([])
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState({
        email: '',
        password: '',
    })

    const [data, setData] = useState<any>({
        email: '',
        password: '',
        errors: {}
    })

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleOnChange = (e: any) => {
        const targetName = e.target.name
        const targetValue = e.target.value

        if (targetName.trim().length > 0) setDisable(false)
        if (targetName === 'confirmPassword') {
            let data = { [targetName]: targetValue }
            let err = validate(data);
            setData((prev: any) => {
                return {
                    ...prev,
                    [targetName]: targetValue,
                    errors: { ...prev.errors, ...err }
                }
            })
        } else {
            let data = { [targetName]: targetValue }
            let err = validate(data);
            setData((prev: any) => {
                return {
                    ...prev,
                    [targetName]: targetValue,
                    errors: { ...prev.errors, ...err }
                }
            })

        }
        console.log("data:", data)
    }


    const validate = (dataToValidate: any) => {
        console.log("validate dataToValidate:", dataToValidate)
        let name = '',
            email = '',
            password = '',
            confirmPassword = '',
            err: any = {};

        if (dataToValidate.hasOwnProperty('email')) {
            let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (dataToValidate.email === '' || dataToValidate.email == null) {
                email = 'Email cannot be blank!'
            } else if (!emailRegex.test(dataToValidate.email)) {
                email = "Kindly enter a valid email address."
            } else {
                email = ''
            }
            err.email = email
        }

        if (dataToValidate.hasOwnProperty('password')) {
            if (dataToValidate.password === '') {
                password = 'Password cannot be blank!'
            } else if (dataToValidate.password.length < 4) {
                password = "Password should not be less than 4 characters."
            } else if (dataToValidate.password.length > 20) {
                password = "Password should be less than 20 characters."
            } else {
                password = ''
            }
            err.password = password
        }

        setData((prev: any) => {
            return {
                ...prev,
                errors: { ...prev.errors, ...err }
            }
        })

        return err
    }

    const handleLogin = () => {
        const newData = {
            email: data.email,
            password: data.password,
        }

        const err: any = validate(newData)
        console.log("err:", err)

        const model = {
            email: data.email,
            password: data.password,
        }

        console.log("model:", model)
        let flag = true
        for (let key in err) {
            if (err[key] !== '') flag = false
        }


        if (flag) {
            setDisable(true)
            axios.post(`${process.env.REACT_APP_API_URL}/user/login`, model)
                .then((res) => {
                    console.log("get surveys:", res.data)
                    // setDisable(false)
                    dispatch(login(res.data))
                    setLS(res.data)
                    let userData = getLS(); 
                    console.log("@userdata:", userData)
                    enqueueSnackbar('Login successfullly!', { variant: 'success', autoHideDuration: 2000 })
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                })
                .catch((err) => {
                    console.log("get surveys error:", err)
                    setDisable(false)
                    if (err?.response?.status === 404) {
                        enqueueSnackbar('Either email or password is wrong!', { variant: 'warning', autoHideDuration: 2000 })
                    } else {
                        enqueueSnackbar('Something went wrong!', { variant: 'info', autoHideDuration: 1000 })
                    }
                })
        } else {
            enqueueSnackbar('Validate all fields!', { variant: 'error', autoHideDuration: 1500 })
        }

    }

    return (
        <Grid container className="signup-container">

            <Grid container item md={12} className="center">
                <Grid item xs={12} sm={10} md={8} className="mb-1">
                    <Typography variant="h5" component="h6">Login</Typography>
                </Grid>
                <Grid item xs={12} sm={10} md={8} className="mtb-1">
                    <TextField
                        variant="outlined"
                        fullWidth={true}
                        label="Email"
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        helperText={data.errors.email ?? data.errors.email}
                        error={data.errors.email ?? data.errors.email === '' ? true : false}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={8} className="mtb-1">
                    <FormControl variant="outlined" fullWidth={true}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth={true}
                            label="Password"
                            name="password"
                            value={data.password}
                            onChange={handleOnChange}
                            error={data.errors.password ?? data.errors.password === '' ? true : false}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleTogglePassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormHelperText sx={{ color: '#d32f2f', paddingLeft: '1rem' }}>{data.errors.password ?? data.errors.password}</FormHelperText>
                </Grid>

                <Grid item xs={12} sm={10} md={8} className="mtb-1 flexEnd">
                    <Button
                        variant="contained"
                        disabled={disable}
                        className="bg-one"
                        onClick={handleLogin}
                    >
                        {disable ? <CircularProgress size={27} className="color-white" /> : 'Login'}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Login