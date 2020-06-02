import * as React from 'react'

import loading from '../../assets/loading.svg'
// import styles from './Loading.module.css'

type Props = {
    loadingText: string | undefined
};
const Loading = (props: Props) =>
    <div style={{ textAlign: 'center' }}>
        <h1 style={{ paddingTop: 30, marginBottom: 0, fontSize: '3rem' }}>{ props.loadingText ? props.loadingText : `Loading...`}</h1>
        <img src={loading} alt="loading" className="loader" />
    </div>

export default Loading

