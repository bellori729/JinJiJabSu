import BasicTemplate from "../../templates/BasicTemplate"

const Search = () => {
  return (
    <BasicTemplate
      isNoBack={true}
      isNoLogo={true}
      isSquareLogo={true}
      isNoSearch={true}
      headerText={"검색하기"}
    ></BasicTemplate>
  )
}

export default Search
