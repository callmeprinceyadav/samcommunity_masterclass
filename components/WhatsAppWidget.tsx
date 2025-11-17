'use client'

import { useEffect } from 'react'

export default function WhatsAppWidget() {
  useEffect(() => {
    // Create and append the WhatsApp widget script
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js'
    script.id = 'aisensy-wa-widget'
    script.setAttribute('widget-id', 'aaa6xn')
    script.async = true

    // Append to body
    document.body.appendChild(script)

    // Cleanup function to remove script on unmount
    return () => {
      const existingScript = document.getElementById('aisensy-wa-widget')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return null // This component doesn't render anything
}

