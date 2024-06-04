'use client'

import { Nav, Navbar, Offcanvas, Container } from 'react-bootstrap';
import Logo from '../Logo';
import { NavBarItem } from '../Header/NavBarItem';

const MobileHeader = () => {
  return (
    <div className="mobile-header">
      <Logo />
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-transparent"
        bg={'light'}
        variant={'light'}
      >
        <Container fluid>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`} className='flex justify-center w-full font-bold'>
                Меню
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 gap-5">
                <NavBarItem label="Главная" href={"/"}/>
                <NavBarItem label="О мастерской" href={"/about"}/>
                <NavBarItem label="Расписание" href={"/schedule"}/>
                <NavBarItem label="Контакты" href={"/contacts"}/>
                <NavBarItem label="Аренда" href={"/rent"}/>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default MobileHeader;