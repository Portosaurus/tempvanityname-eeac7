import * as React from 'react'
import { history } from '../../utils/history'

import styles from './Error.module.css'
type PropType = {
    error: string | undefined,
}

const getErrorContent = (error: string | undefined) => {
    if (error) {
        switch (error) {
            case `user_cancelled_login`:
                return `You did not log in to your LinkedIn Account`
            case `user_cancelled_authorize`:
                return `You did not grant LinkedIn permissions to Portosaurus`
            case `reauthenticate`:
                return `We couldn't get your profile. Let's try logging you back in.`
        }
    }
    return `Unknown error. Please try again or report a bug.`
}

const Error = (props: PropType) => {
    return (

        <div style={{ textAlign: 'center', margin: 'auto' }}>
            <h1 style={{ paddingTop: 30, marginBottom: 30, fontSize: '3rem' }}>Something went wrong...</h1>
            <div className={`alert alert--danger ${styles.errorBox}`} role="alert">
                {getErrorContent(props.error)}
            </div>
            <button onClick={() => history.goBack()} className={`button button--secondary button--outline ${styles.btn}`}>
                Go Back
            </button>
            <a href='/'>
                <button className={`button button--secondary button--outline ${styles.btn}`}>
                    Go Home
            </button>
            </a>
            <a href='mailto:claperone.portosaurus@gmail.com'>

                <button className="button button--secondary button--outline">
                    Report a Bug
            </button>
            </a>
        </div>
    )
}

export default Error

