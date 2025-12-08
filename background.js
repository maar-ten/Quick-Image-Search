const searchByTextFn = query => `https://www.google.com/images?q=${query}`;
const searchByImageFn = url => `https://lens.google.com/uploadbyurl?url=${url}`;

if (typeof browser === "undefined") {
  // Chrome does not support the browser namespace yet.
  globalThis.browser = chrome;
}

/**
 * Analyse the click event, open a new tab to the rights of the current tab, and direct the user to the correct Google Images page.
 */
function searchImagesFor(contextInfo, tab) {
    browser.tabs.create({
        url: createUrl(contextInfo),
        index: tab.index + 1
    });
}

function createUrl({ selectionText, mediaType, srcUrl }) {
    if (selectionText) {
        // Join multiple lines into one line separated by spaces
        const query = selectionText.replace(/\n/g, ' ');
        return searchByTextFn(query)
    }

    if (mediaType === 'image') {
        return searchByImageFn(srcUrl);
    }
}

/**
 * When bootstrapping the extension create a context menu which will only show up for images and selected text.
 */
 browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
        id: 'quick-image-search-button',
        title: browser.i18n.getMessage('search_in_google_images'),
        type: 'normal',
        contexts: ['selection', 'image']
    });
 });
browser.contextMenus.onClicked.addListener(searchImagesFor);