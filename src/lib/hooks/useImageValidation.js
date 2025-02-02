import { useState, useEffect } from "react"

const useImageValidation = (imgUrl) => {
  const [isValidImgUrl, setIsValidImgUrl] = useState(false)

  useEffect(() => {
    if (!imgUrl) {
      setIsValidImgUrl(false)
      return
    }

    const validateImage = (url) =>
      new Promise((resolve) => {
        const img = new Image()
        img.src = url

        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
      })

    const checkImage = async () => {
      const isValid = await validateImage(imgUrl)
      setIsValidImgUrl(isValid)
    }

    checkImage()
  }, [imgUrl])

  return isValidImgUrl
}

export default useImageValidation
