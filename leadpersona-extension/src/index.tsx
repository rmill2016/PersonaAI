import 'react-app-polyfill/ie11'

import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import Panel from './Panel'
import { APP_COLLAPSE_WIDTH, APP_EXTEND_WIDTH } from './const'
import { Screen } from './types/types'

async function loadChromeStorage() {
  let initialEnabled = true
  try {
    // Loading chrome local setting, can be replace with sync
    // for more information, see: https://developer.chrome.com/docs/extensions/reference/storage/
    const result = await window['chrome'].storage.local.get(['enabled'])
    initialEnabled = !!result.enabled
  } catch (e) {
    // Demo propose
    initialEnabled = false
  }

  return initialEnabled
}

async function handleScreen() {
  chrome.runtime.onMessage.addListener((message) => {
    return message
  })
}

// logic for creating embedded extension as a side-panel
async function init() {
  const initialEnabled = await loadChromeStorage()
  const screen = await handleScreen()

  // Create html tag wrapper
  const htmlWrapper: HTMLHtmlElement = document.querySelectorAll('html')[0]
  htmlWrapper.id = 'original-html-wrapper'
  htmlWrapper.style.marginRight = `${initialEnabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH}px`
  htmlWrapper.className = 'duration-300 ease-in-out'

  // Create div wrapper
  const body = document.body
  const bodyWrapper = document.createElement('div')
  bodyWrapper.id = 'original-body-wrapper'
  bodyWrapper.className = 'relative w-full h-full overflow-auto duration-300 ease-in-out'

  // Move the body's children into this wrapper
  while (body.firstChild) {
    bodyWrapper.appendChild(body.firstChild)
  }

  bodyWrapper.style.overflow = 'auto'
  bodyWrapper.style.height = '100vh'

  // Append the wrapper to the body
  body.style.overflow = 'hidden'
  body.style.margin = '0'
  body.appendChild(bodyWrapper)

  // create react app
  const app = document.createElement('div')
  app.id = 'side-bar-extension-root'
  app.className = 'z-max fixed top-0 bottom-0 right-0 flex flex-1 p-0 m-0 overflow-hidden duration-300 ease-in-out'
  app.style.maxWidth = `${initialEnabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH}px`

  body.appendChild(app)
  const root = createRoot(app!)

  function onSidePanelWidthChange(value: number) {
    app.style.maxWidth = `${value}px`
    htmlWrapper.style.marginRight = `${value}px`
  }

  root.render(<Panel onWidthChange={onSidePanelWidthChange} initialEnabled={initialEnabled} screen={screen} />)
}

init()
