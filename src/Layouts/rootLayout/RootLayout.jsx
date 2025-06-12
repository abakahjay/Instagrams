// import './rootLayout.css';
import {Link,Outlet} from 'react-router-dom'
import  Navbar from  '../../components/NavBar/Navbar.jsx'

const RootLayout = () => {
  return (
    <div className='rootLayout'>
      <Navbar/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default RootLayout