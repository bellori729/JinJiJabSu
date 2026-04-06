import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_ROBOTS,
  SITE_DESCRIPTION,
  SITE_NAME,
  getAbsoluteUrl,
  getMetaKeywords,
  getPageTitle,
} from "../../lib/seo/constants"

const Seo = ({
  title,
  description = SITE_DESCRIPTION,
  path,
  canonical,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = "website",
  keywords = [],
  robots,
  noindex = false,
  structuredData,
}) => {
  const location = useLocation()

  const pagePath = path ?? `${location.pathname}${location.search}`
  const pageUrl = getAbsoluteUrl(pagePath)
  const canonicalUrl = canonical ? getAbsoluteUrl(canonical) : pageUrl
  const fullTitle = getPageTitle(title)
  const metaKeywords = getMetaKeywords(keywords)
  const robotsContent = robots ?? (noindex ? `noindex,follow,${DEFAULT_ROBOTS.split(",").slice(2).join(",")}` : DEFAULT_ROBOTS)
  const structuredDataList = Array.isArray(structuredData) ? structuredData : structuredData ? [structuredData] : []

  return (
    <Helmet prioritizeSeoTags>
      <html lang="ko" />
      <title>{fullTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={description} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="author" content={SITE_NAME} />
      <meta name="theme-color" content="#0a82ae" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {structuredDataList.map((item, index) => (
        <script key={`${canonicalUrl}-schema-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  )
}

export default Seo

