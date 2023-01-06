export interface IContentConfig {
  contentId?: string
  contentUrl?: string
  language?: string
  type?: 'advisor' | 'marketing' | 'content' | 'changelog' | undefined
  title?: string
  label?: string
  partnerShopUrl?: string
  iframeButtonLabel?: string | null
  iframeUrl?: string | null
  changelogContent?: string | null
}
