const initialState = null

const loginLogout = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            state = {
                user: action.payload
            }
            return state
        }

        case 'LOGOUT': {
            state = {
                user: initialState
            }
            return state
        }
        
        default: return state
    }
}

export default loginLogout