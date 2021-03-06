const $jquery = require('./jquery')

const docNode = window.Node.DOCUMENT_NODE

//TODO: make this not allow jquery
const isDocument = (obj: HTMLElement | Document): obj is Document => {
  try {
    if ($jquery.isJquery(obj)) {
      obj = obj[0]
    }

    return Boolean(obj && obj.nodeType === docNode)
  } catch (error) {
    return false
  }
}

// does this document have a currently active window (defaultView)
const hasActiveWindow = (doc) => {
  // in firefox, detached documents still have a reference to their window
  // but document.location is null
  if (Cypress.isBrowser('firefox') && !doc.location) {
    return false
  }

  return !!doc.defaultView
}

const getDocumentFromElement = (el: HTMLElement): Document => {
  if (isDocument(el)) {
    return el
  }

  return el.ownerDocument as Document
}

export {
  isDocument,

  hasActiveWindow,

  getDocumentFromElement,
}
