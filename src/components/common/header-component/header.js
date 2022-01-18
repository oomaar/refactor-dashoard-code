import React, { useState ,Fragment,useEffect } from 'react';
import logo from '../../../assets/images/endless-logo.png';
import Language from './language';
import UserMenu from './userMenu';
import Notification from './notification';
import SearchHeader from './searchHeader';
import { Link } from 'react-router-dom';
import { AlignLeft, Maximize, Bell, MessageCircle, MoreHorizontal } from 'react-feather';
import '../../../app.css'
import { getUser } from '../../../Utils/common';
import worexlogo from '../../../assets/images/worexlogo.png'
import logo2 from '../../../assets/images/logo2.png'

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [rightSidebar, setRightSidebar] = useState(true);
  const [headerbar, setHeaderbar] = useState(true);
  const [something , setsomething] = useState(true)

 const openCloseSidebar = () => {
    if (sidebar) {
      setSidebar(!sidebar)
      document.querySelector(".page-main-header").classList.remove('open');
      document.querySelector(".page-sidebar").classList.remove('open');
      setsomething(!something)
    } else {
      setSidebar(!sidebar)
      document.querySelector(".page-main-header").classList.add('open');
      document.querySelector(".page-sidebar").classList.add('open'); 
    }
    

    
  }
  useEffect(() => {
    if(window.innerWidth<=700){
      openCloseSidebar()
    }
  },[] )

  function showRightSidebar() {
    if (rightSidebar) {
      setRightSidebar(!rightSidebar)
      document.querySelector(".right-sidebar").classList.add('show');
    } else {
      setRightSidebar(!rightSidebar)
      document.querySelector(".right-sidebar").classList.remove('show');
    }
  }

  //full screen function
  function goFull() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  return (
    <Fragment>
      <div className="page-main-header" >
        <div className="main-header-right row">
          <div className="main-header-left d-lg-none">
            <div className="logo-wrapper">
              <Link to="/dashboard/landing">
                <img className="img-fluid" src={logo2}   alt="" />
              </Link>
            </div>
          </div>
          <div className="mobile-sidebar d-block">
            <div className="media-body text-right switch-sm">
              <label className="switch">
                <a href="#javascript" onClick={() => {openCloseSidebar() 
                   }}>
                  <AlignLeft />
                </a>
              </label>
            </div>
          </div>
          <div className="nav-right col p-0">
            <ul className={`nav-menus ${headerbar ? '' : 'open'}`}>
            <li>
                <SearchHeader />
              </li>
              <li>
                <a onClick={goFull} className="text-dark" href="#!">
                  <Maximize />
                </a>
              </li>
              <li className="onhover-dropdown">
                <a className="txt-dark" href="#javascript">
                  <h6>EN</h6></a>
                <Language />
              </li>
              <li className="onhover-dropdown">
                <Notification />
                <Bell />
                <span className="dot"></span>
                <Notification />
              </li>
              <li>
                <a href="#javascript" >
                  <MessageCircle />
                  <span className="dot"></span>
                </a>
              </li>
              <UserMenu />
              
            </ul>
            <div className="d-lg-none mobile-toggle pull-right" onClick={() => setHeaderbar(!headerbar)}><MoreHorizontal/></div>
          </div>
          </div>
      </div>
    </Fragment>
  )
};
export default Header;