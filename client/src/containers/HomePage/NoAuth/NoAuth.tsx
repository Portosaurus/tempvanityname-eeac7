import * as React from 'react'

import styles from '../HomePage.module.css'

import undraw_react from '../../../assets/undraw_react.svg'
import undraw_domain_names_rdql from '../../../assets/undraw_domain_names_rdql.svg'
import undraw_portfolio_update_nqhs from '../../../assets/undraw_portfolio_update_nqhs.svg'

import herologo from '../../../assets/herologo.png'
import { auth_link } from '../../../consts'
import { useAuthState } from '../../../App'


const NoAuthHomePage = () => {
    const [state,] = useAuthState();

    return (
        <div>
            <div className="hero shadow--lw">
                <div className="container">
                    <div className="row">
                        <div className="col col--8">

                            <h1 className={styles.heroProjectTagline}>
                                Convert your{' '}
                                <span className="highlightColor">Social Media</span>{' '}
              into a {' '}
                                <span className="highlightColor">Portfolio webpage</span> in{' '}
                                <span className="highlightColor">one click</span>
                            </h1>
                        </div>
                        <div className="col col--4">

                            <img
                                alt="Docusaurus with Keytar"
                                className={`${styles.heroLogo} hoverLarge`}
                                src={herologo}
                            />
                        </div>
                    </div>
                    <div className={styles.generateBtn}>
                        {/* <a href={state.access_token ? '/' : auth_link}> */}

                        <button disabled className="button button--secondary button--outline button--lg">
                            {/* Generate Portfolio */}
                                Coming Soon
                            </button>
                        {/* </a> */}
                    </div>
                </div>
            </div>
            <div className={styles.section}>

                <div className="container text--center">
                    <div className="row">
                        <div className="col">
                            <img
                                className={`${styles.featureImage} hoverLarge`}
                                alt="Simple To Use"
                                src={undraw_portfolio_update_nqhs}
                            />
                            <h2 className={styles.featureHeading}>
                                <span className="highlightColorLight">Simple</span> To Use
                </h2>
                            <p className="padding-horiz--md">
                                Save time and focus on your portfolio content. Simply edit your social media details and generate
                                your portfolio with Portosaurus.
                </p>
                        </div>
                        <div className="col">
                            <img
                                alt="Built Using React"
                                className={`${styles.featureImage} hoverLarge`}
                                src={undraw_react}
                            />
                            <h2 className={styles.featureHeading}>
                                Built Using <span className="highlightColorLight">React</span>
                            </h2>
                            <p className="padding-horiz--md">
                                Extend or customize your portfolio's design and layout by reusing React.
                                Portosaurus can be extended while reusing the template design.
                </p>
                        </div>
                        <div className="col">
                            <img
                                alt="Host anywhere"
                                className={`${styles.featureImage} hoverLarge`}
                                src={undraw_domain_names_rdql}
                            />
                            <h2 className={styles.featureHeading}>
                                Generate Once - Host <span className="highlightColorLight">Anywhere</span>
                            </h2>
                            <p className="padding-horiz--md">
                                Portosaurus allows you to export your portfolio, letting you host anywhere you like.
                </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoAuthHomePage