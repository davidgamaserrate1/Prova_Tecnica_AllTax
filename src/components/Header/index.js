import './header-styles.css'

const Header = ({ children })=>{
   return(
    <div className="dropdown_list">
        {children}
    </div>
   )
}

export default Header