import * as React from 'react'
import Header from './Header/Header'
import AppContent from './AppContent/AppContent'
import Footer from './Footer/Footer'

const Layout = () => {
    return (
        <div>
            <Header />
            <div style={{ minHeight: '90vh', backgroundColor: 'black', color: 'white', marginTop: 64 }}>
                <AppContent />
            </div>
            <Footer />
        </div>
    )
}

export default Layout