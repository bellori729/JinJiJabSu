import { useNavigate } from "react-router-dom"
import route from "../../router/route"
import NavIcon from "../atoms/NavIcon"
import { basicTextBold } from "../../lib/constants/style/basicText"

const NavItem = ({
  isHome,
  isHomeActive,
  isSearch,
  isSearchActive,
  isBookmark,
  isBookmarkActive,
  isMore,
  isMoreActive,
}) => {
  const navigate = useNavigate()
  const isActive = isHomeActive || isSearchActive || isBookmarkActive || isMoreActive

  const navItemInfo = {
    home: {
      title: "홈",
      ariaText: "홈 페이지 이동",
      path: route.home,
    },
    search: {
      title: "검색",
      ariaText: "검색 페이지 이동",
      path: route.search,
    },
    bookmark: {
      title: "즐겨찾기",
      ariaText: "즐겨찾기 페이지 이동",
      path: route.bookmark,
    },
    more: {
      title: "더보기",
      ariaText: "더보기 페이지 이동",
      path: route.more,
    },
  }

  const getTitle = () => {
    if (isHome || isHomeActive) {
      return navItemInfo.home.title
    } else if (isSearch || isSearchActive) {
      return navItemInfo.search.title
    } else if (isBookmark || isBookmarkActive) {
      return navItemInfo.bookmark.title
    } else if (isMore || isMoreActive) {
      return navItemInfo.more.title
    }
  }

  const getPath = () => {
    if (isHome || isHomeActive) {
      return navItemInfo.home.path
    } else if (isSearch || isSearchActive) {
      return navItemInfo.search.path
    } else if (isBookmark || isBookmarkActive) {
      return navItemInfo.bookmark.path
    } else if (isMore || isMoreActive) {
      return navItemInfo.more.path
    }
  }

  const getAriaText = () => {
    if (isHome || isHomeActive) {
      return navItemInfo.home.ariaText
    } else if (isSearch || isSearchActive) {
      return navItemInfo.search.ariaText
    } else if (isBookmark || isBookmarkActive) {
      return navItemInfo.bookmark.ariaText
    } else if (isMore || isMoreActive) {
      return navItemInfo.more.ariaText
    }
  }

  const getType = () => {
    if (isHome || isHomeActive) {
      return "home"
    } else if (isSearch || isSearchActive) {
      return "search"
    } else if (isBookmark || isBookmarkActive) {
      return "bookmark"
    } else if (isMore || isMoreActive) {
      return "more"
    }
  }

  const getIsActive = () => {
    if (isHomeActive) {
      return "home_active"
    } else if (isSearchActive) {
      return "search_active"
    } else if (isBookmarkActive) {
      return "bookmark_active"
    } else if (isMoreActive) {
      return "more_active"
    }
  }

  return (
    <button
      type="button"
      aria-label={getAriaText()}
      title={getAriaText()}
      className="flex flex-col items-center justify-center hover:scale-[1.1] transition-transform"
      onClick={() => {
        const path = getPath()
        navigate(path)
      }}
    >
      <NavIcon type={getType()} isActive={getIsActive()} />
      <p className={`${basicTextBold} ${isActive && "!text-[#0A82AE]"}`}>{getTitle()}</p>
    </button>
  )
}

export default NavItem
