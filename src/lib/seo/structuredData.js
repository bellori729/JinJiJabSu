import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL, getAbsoluteUrl } from "./constants"

const toAbsoluteItemUrl = (item) => {
  if (!item) {
    return undefined
  }

  return /^https?:\/\//.test(item) ? item : getAbsoluteUrl(item)
}

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "경기도 어르신 무료급식소 안내",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "ko-KR",
  image: DEFAULT_OG_IMAGE,
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: getAbsoluteUrl("/logo.png"),
}

export const buildBreadcrumbStructuredData = (items = []) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.filter(Boolean).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteItemUrl(item.item),
    })),
  }
}

export const buildPlaceStructuredData = ({ name, description, url, telephone, address, image = DEFAULT_OG_IMAGE }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Place",
    name,
    description,
    url: toAbsoluteItemUrl(url),
    image,
  }

  if (telephone) {
    structuredData.telephone = telephone
  }

  if (address) {
    structuredData.address = {
      "@type": "PostalAddress",
      streetAddress: address,
      addressCountry: "KR",
    }
  }

  return structuredData
}

