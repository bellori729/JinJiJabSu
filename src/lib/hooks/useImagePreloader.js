import { useEffect, useState } from "react"

const useImagePreloader = (imageUrls = []) => {
  const [loaded, setLoaded] = useState(imageUrls.length === 0)

  useEffect(() => {
    if (imageUrls.length === 0) return

    const loadImages = async () => {
      await Promise.all(
        imageUrls.map(
          (url) =>
            new Promise((resolve) => {
              const img = new Image()
              img.src = url
              img.onload = resolve
              img.onerror = resolve // 에러 발생해도 resolve하여 무한 대기 방지
            }),
        ),
      )
      setLoaded(true)
    }

    loadImages()
  }, [imageUrls])

  return loaded
}

export default useImagePreloader
