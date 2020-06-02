
import * as React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import logo from '../../../assets/logo192-noin.png'
import styles from './Header.module.css'
import { auth_link } from '../../../consts'
import { useAuthState } from '../../../App'


const Header = () => {
  const [state, dispatch] = useAuthState()

  const handleLogout = () => {
    dispatch({ access_token: null })
    window.location.href = `/`
  }
  const getNavElems = () => {
    const isAuthenticated = state.access_token ? true : false
    if (isAuthenticated) {
      return (
        <Nav>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      )
    }
    else {
      return (
        <Nav>
          {/* <Nav.Link href={auth_link}>Generate Portfolio</Nav.Link> */}
        </Nav>
      )
    }
  }

  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Navbar.Brand href="/" className={styles.logoWrapper}>
        <img src={logo} alt="TuneApp" className={styles.logo} />
        <span className={styles.logoText}>Portosaurus</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="mr-auto" />
        {getNavElems()}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header