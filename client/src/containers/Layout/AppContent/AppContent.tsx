import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from '../../HomePage/HomePage'
import Callback from '../../Callback/Callback'
import PrivacyPolicy from '../../../components/PrivacyPolicy/PrivacyPolicy'
import TermsOfService from '../../../components/TermsOfService/TermsOfService'

const AppContent = () => {
    return (
        <Switch>
            <Route
                path="/privacy-policy"
                exact
                component={PrivacyPolicy}
            />
            <Route
                path="/terms-of-service"
                component={TermsOfService}
            />
            <Route
                path="/callback"
                component={Callback}
            />

            <Route component={HomePage} />

        </Switch>
    )
}

export default AppContent