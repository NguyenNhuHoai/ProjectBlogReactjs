import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const handleMapMainMenu = menuItems => {
    return (
        <li key={menuItems.id}>
            {
                menuItems.url.startsWith('http')
                    ?
                    <a href={menuItems.url} target="_blank"  rel="noreferrer">{menuItems.title}</a>
                    :
                    <Link to={menuItems.url}>{menuItems.title}</Link>
            }
            {
                menuItems.childItems.length > 0 && <ul>{menuItems.childItems.map(handleMapMainMenu)} </ul>
            }
        </li>
    )
}

function HeaderMainMenu() {
    const mainMenus = useSelector(state => state.MENU.mainMenus)

    return (
        <ul className="header-nav__lists">
            {
                mainMenus.map(handleMapMainMenu)
            }
        </ul>
    )
}

export default HeaderMainMenu