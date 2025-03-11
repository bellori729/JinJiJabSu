import { Link } from "react-router-dom"
import useBigFontSizeStore from "../../lib/store/useBigFontSizeStore"

const Footer = () => {
  const { bigFontSize } = useBigFontSizeStore()

  return (
    <footer className="w-full h-[85px] py-[25px] px-[20px] flex items-center mt-[50px]">
      <ul>
        <li className={`${bigFontSize ? "medium-font-size" : "small-font-size"} text-[#272829]`}>
          © BELLORI All rights reserved.
        </li>
        <li className={`${bigFontSize ? "medium-font-size" : "small-font-size"} text-[#272829]`}>
          <Link to="mailto:dhtldka@icloud.com" aria-label="클릭하시면 메일로 연락할 수 있습니다.">
            dhtldka@icloud.com
          </Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
