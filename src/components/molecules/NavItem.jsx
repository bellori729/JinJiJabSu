import { useEffect } from "react"
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
      activeImg: "/assets/icons/home_active.png",
    },
    search: {
      title: "검색",
      ariaText: "검색 페이지 이동",
      path: route.search,
      activeImg: "/assets/icons/search_active.png",
    },
    bookmark: {
      title: "즐겨찾기",
      ariaText: "즐겨찾기 페이지 이동",
      path: route.bookmark,
      activeImg: "/assets/icons/bookmark_active.png",
    },
    more: {
      title: "더보기",
      ariaText: "더보기 페이지 이동",
      path: route.more,
      activeImg: "/assets/icons/more_active.png",
    },
  }

  // 이미지 프리로드 함수
  useEffect(() => {
    Object.values(navItemInfo).forEach((item) => {
      const img = new Image()
      img.src = item.activeImg
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getTitle = () => {
    if (isHome || isHomeActive) return navItemInfo.home.title
    if (isSearch || isSearchActive) return navItemInfo.search.title
    if (isBookmark || isBookmarkActive) return navItemInfo.bookmark.title
    if (isMore || isMoreActive) return navItemInfo.more.title
  }

  const getPath = () => {
    if (isHome || isHomeActive) return navItemInfo.home.path
    if (isSearch || isSearchActive) return navItemInfo.search.path
    if (isBookmark || isBookmarkActive) return navItemInfo.bookmark.path
    if (isMore || isMoreActive) return navItemInfo.more.path
  }

  const getAriaText = () => {
    if (isHome || isHomeActive) return navItemInfo.home.ariaText
    if (isSearch || isSearchActive) return navItemInfo.search.ariaText
    if (isBookmark || isBookmarkActive) return navItemInfo.bookmark.ariaText
    if (isMore || isMoreActive) return navItemInfo.more.ariaText
  }

  const getType = () => {
    if (isHome || isHomeActive) return "home"
    if (isSearch || isSearchActive) return "search"
    if (isBookmark || isBookmarkActive) return "bookmark"
    if (isMore || isMoreActive) return "more"
  }

  const getIsActive = () => {
    if (isHomeActive) return "home_active"
    if (isSearchActive) return "search_active"
    if (isBookmarkActive) return "bookmark_active"
    if (isMoreActive) return "more_active"
  }

  return (
    <button
      type="button"
      aria-label={getAriaText()}
      title={getAriaText()}
      className="flex flex-col items-center justify-center hover:scale-[1.1] transition-transform"
      onClick={() => navigate(getPath())}
    >
      <NavIcon type={getType()} isActive={getIsActive()} />
      <p className={`${basicTextBold} ${isActive && "!text-[#0A82AE]"}`}>{getTitle()}</p>
    </button>
  )
}

export default NavItem
