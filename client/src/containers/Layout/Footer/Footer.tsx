import * as React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer" style={{ color: 'white' }}>
            <div className="container container--fluid text--center">
                <div className="footer__links">
                    <a className="footer__link-item" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/portosaurus/">
                        LinkedIn
                    </a>
                    <span className="footer__link-separator">·</span>
                    <a className="footer__link-item" target="_blank" rel="noopener noreferrer" href="https://github.com/portosaurus">
                        GitHub
                    </a>
                    <span className="footer__link-separator">·</span>
                    <a className="footer__link-item" target="_blank" rel="noopener noreferrer" href="mailto:claperone.portasaurus@gmail.com">
                        Email
                    </a>
                </div>
                <div>Copyright ©2020 Portosaurus </div>

                <div className="footer__links">
                    <Link className="footer__link-item" to="/privacy-policy">Privacy Policy</Link>
                    <span className="footer__link-separator">·</span>
                    <Link className="footer__link-item" to="/terms-of-service">Terms of Service</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer