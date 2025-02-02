import NavItem from "../molecules/NavItem"
import route from "../../router/route"

const Navigation = () => {
  const path = window.location.pathname

  return (
    <nav
      id="navigation"
      className="flex items-center justify-around w-[360px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.4)] h-[85px] bg-white fixed bottom-0 rounded-t-[15px]"
    >
      <NavItem isHome={path !== route.home} isHomeActive={path === route.home} />
      <NavItem isSearch={path !== route.search} isSearchActive={path === route.search} />
      <NavItem isBookmark={path !== route.bookmark} isBookmarkActive={path === route.bookmark} />
      <NavItem isMore={path !== route.more} isMoreActive={path === route.more} />
    </nav>
  )
}

export default Navigation
