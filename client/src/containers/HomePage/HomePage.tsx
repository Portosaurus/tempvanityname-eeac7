import React from 'react'
import { useAuthState } from '../../App'
import AuthHomePage from './Auth/Auth'
import NoAuthHomePage from './NoAuth/NoAuth'

const HomePage = () => {
    const [state,] = useAuthState()

    return state.access_token ? <AuthHomePage /> : <NoAuthHomePage />
}

export default HomePage