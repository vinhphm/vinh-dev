import React, { useCallback, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import useTranslation from 'next-translate/useTranslation'
import siteMetadata from '@/data/siteMetadata.mjs'

const Utterances = () => {
  const { t } = useTranslation()
  const [enableLoadComments, setEnabledLoadComments] = useState(true)
  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    theme === 'dark' || resolvedTheme === 'dark'
      ? siteMetadata.comment.utterancesConfig.darkTheme
      : siteMetadata.comment.utterancesConfig.theme

  const COMMENTS_ID = 'comments-container'

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false)
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute('repo', siteMetadata.comment.utterancesConfig.repo)
    script.setAttribute('issue-term', siteMetadata.comment.utterancesConfig.issueTerm)
    script.setAttribute('label', siteMetadata.comment.utterancesConfig.label)
    script.setAttribute('theme', commentsTheme)
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)
    if (comments) comments.appendChild(script)

    return () => {
      const comments = document.getElementById(COMMENTS_ID)
      if (comments) comments.innerHTML = ''
    }
  }, [commentsTheme])

  // Reload on theme change
  useEffect(() => {
    const iframe = document.querySelector('iframe.utterances-frame')
    if (!iframe) return
    LoadComments()
  }, [LoadComments])

  // Added `relative` to fix a weird bug with `utterances-frame` position
  return (
    <div className="pt-6 pb-6 text-center text-neutral-700 dark:text-neutral-300">
      {enableLoadComments && <button onClick={LoadComments}>{t('common:comment')}</button>}
      <div className="relative utterances-frame" id={COMMENTS_ID} />
    </div>
  )
}

export default Utterances
