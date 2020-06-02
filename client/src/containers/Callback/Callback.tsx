import * as React from 'react'
import get from 'axios'
import Loading from '../../components/Loading/Loading';
import { getQueryVariable } from '../../utils/utils';
import ErrorComponent from '../../components/Error/Error';
import { getAccessTokenLink } from '../../consts';
import { useAuthState } from '../../App';


const { useEffect, useState } = React;

const Callback = () => {
    const [, dispatch] = useAuthState()
    const [error, setError] = useState(``)

    useEffect(() => {
        const error = getQueryVariable(`error`)
        const code = getQueryVariable(`code`)
        if (error) {
            setError(error)
        }
        else if (code) {
            /// code is now set, we need to exchange auth code for an access token
            get(getAccessTokenLink(code))
                .then((res) => {
                    const access_token: string = res.data.access_token

                    dispatch({ access_token: access_token })

                    window.location.href = '/'

                }).catch((err) => {
                    setError(err.toString())
                })
        }
        else {
            setError(`Something went wrong`)
        }
    }, [dispatch])

    if (error.length > 0) {
        return <ErrorComponent error={error} />
    }
    else {
        return <Loading loadingText={undefined} />
    }
}

export default Callback;