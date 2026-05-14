import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="layout-wrapper">
      <Outlet />
    </div>
  )
}

export default Layout