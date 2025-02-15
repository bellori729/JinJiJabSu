import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="w-full h-[85px] py-[25px] px-[20px] flex items-center mt-[50px]">
      <ul>
        <li className="text-[16px] text-[#272829]">© BELLORI All rights reserved.</li>
        <li className="text-[16px] text-[#272829]">
          <Link to="mailto:dhtldka@icloud.com">dhtldka@icloud.com</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
