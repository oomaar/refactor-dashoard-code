import React from 'react'
import Header from './common/header-component/header'
import Sidebar from './common/sidebar-component/sidebar'
import Footer from './common/footer'
import ThemeCustomizer from './common/theme-customizer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Layout = ({ children }) => {
  return (
    <div>
      <div className="page-wrapper">
        <div className="page-body-wrapper">
          <Header />
          <Sidebar />

          <div className="page-body">{children}</div>
          <Footer />
          <ThemeCustomizer />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
