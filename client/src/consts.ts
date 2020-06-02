
export const IS_PRODUCTION = process.env.NODE_ENV === `production`


export const root_url = IS_PRODUCTION ? `prod_link` : `http://localhost:3001`

export const server_url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`

export const client_id = `77dxji5gsg5ipc`


export const redirect_uri = `${root_url}/callback`

export const auth_link = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=r_liteprofile`

export const getAccessTokenLink = (code: string) => `${server_url}/get_access_token?code=${code}&redirect_uri=${redirect_uri}`

// /// this should be impl. server side
// export const getAccessTokenLink = (code: string) => {
//     return `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`
// }