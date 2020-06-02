import React from 'react'

import styles from '../HomePage.module.css'
import Loading from '../../../components/Loading/Loading'
import loadingImg from '../../../assets/loading.svg'

import get from 'axios'
import { useAuthState } from '../../../App'
import { auth_link, server_url } from '../../../consts'

const { useState, useEffect } = React


type UserProfile = {
    id: string,
    localizedFirstName: string;
    localizedLastName: string;
    profilePictureUrl: string | undefined;
}
type IState = {
    loading: boolean;
    generating: boolean;
    error: boolean;
    userProfile: UserProfile | undefined;
}

const initialState: IState = {
    loading: true,
    error: false,
    generating: false,
    userProfile: undefined
}

const mapDataToUserProfile = (data: any): UserProfile => {
    const { localizedFirstName, localizedLastName, id } = data
    let profilePictureUrl: string | undefined = undefined
    /// getting the url
    try {
        const imgElems = data.profilePicture[`displayImage~`].elements;
        /// the last is the largest
        profilePictureUrl = imgElems[imgElems.length - 1].identifiers[0].identifier

    }
    catch (err) {
        console.error(`No profile pic bruh`)
    }
    return {
        id,
        localizedFirstName,
        localizedLastName,
        profilePictureUrl
    }

}

const AuthHomePage = () => {
    const [state, setState] = useState(initialState)
    const { loading, error, generating, userProfile } = state;
    const [authState,] = useAuthState()
    useEffect(() => {
        get(`${server_url}/get_liteprofile?access_token=${authState.access_token}`).then((res) => {
            const userProfile = mapDataToUserProfile(res.data)
            console.log(userProfile)
            setState({ error: false, loading: false, userProfile, generating: true })
        }).catch((err) => {
            setState({ ...state, error: true, loading: false })
        })
    }, [state, authState])

    if (loading) {
        return <Loading loadingText={undefined} />
    }
    else if (error) {
        setTimeout(() => window.location.href = auth_link, 5000)
        return (
            <div style={{ textAlign: 'center', margin: 'auto', maxWidth: '80vw' }}>
                <h1 style={{ paddingTop: 30, marginBottom: 30, fontSize: '3rem' }}>Something went wrong...</h1>
                <div className={`alert alert--danger ${styles.errorBox}`} role="alert">
                    We couldn't get your profile. Let's try logging you back in...
                    </div>

                <img src={loadingImg} alt="loading" style={{ width: '15vw' }} />
            </div>

        )
    }
    else if (generating) {
        /// at this stage, userProfile will NOT be undefined
        const { localizedFirstName, localizedLastName, profilePictureUrl } = userProfile as UserProfile
        return (
            <div className={styles.authRoot}>
                <div className="avatar avatar--vertical">
                    <img
                        className={`avatar__photo ${styles.profPic}`}
                        src={profilePictureUrl}
                        alt={localizedFirstName}
                    />
                </div>
                <h1>Hey {localizedFirstName} {localizedLastName}!</h1>


                <h2>Hang tight! We're generating your portfolio...</h2>
                <img src={loadingImg} alt="loading" className="loader" />
            </div>)
    }
    else {
        return (<div></div>)
    }
}

export default AuthHomePage