import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { APP_COLLAPSE_WIDTH, APP_EXTEND_WIDTH } from '../src/const'
import './index.css'

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

// logic for creating embedded extension as a side-panel
async function init() {
  const initialEnabled = await loadChromeStorage()

  // Create html tag wrapper
  const htmlWrapper: HTMLHtmlElement = document.querySelectorAll('html')[0]
  htmlWrapper.id = 'original-html-wrapper'
  htmlWrapper.className = 'duration-300 ease-in-out'
  htmlWrapper.style.marginRight = `${APP_COLLAPSE_WIDTH}px`

  // Create div wrapper
  const body = document.body
  const bodyWrapper = document.createElement('div')
  bodyWrapper.id = 'original-body-wrapper'
  bodyWrapper.className =
    'relative w-full h-full overflow-auto duration-300 ease-in-out'

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
  app.className =
    'z-max top-0 bottom-0 right-0 flex flex-1 p-0 m-0 overflow-hidden duration-300 ease-in-out'
  app.style.maxWidth = `${
    initialEnabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH
  }px`

  if (body) {
    body.append(app)
  }

  function onSidePanelWidthChange(value: number) {
    app.style.maxWidth = `${value}px`
    htmlWrapper.style.marginRight = `${value}px`
  }

  ReactDOM.createRoot(app).render(
    <React.StrictMode>
      <App
        initialEnabled={initialEnabled}
        onWidthChange={onSidePanelWidthChange}
      />
    </React.StrictMode>
  )
}

init()

/* const pluginTagId = 'extension-root'
const existingInstance = document.getElementById('extension-root')
if (existingInstance) {
  console.log('existing instance found, removing')
  existingInstance.remove()
}

const index = document.createElement('div')
index.id = pluginTagId

// Make sure the element that you want to mount the app to has loaded. You can
// also use `append` or insert the app using another method:
// https://developer.mozilla.org/en-US/docs/Web/API/Element#methods
//
// Also control when the content script is injected from the manifest.json:
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time
const body = document.querySelector('body')
if (body) {
  body.append(index)
}

ReactDOM.createRoot(index).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
) */
