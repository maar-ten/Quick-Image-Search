const searchByTextFn = query => `https://www.google.com/images?q=${query}`;
const searchByImageFn = url => `https://lens.google.com/uploadbyurl?url=${url}`;

/**
 * Analyse the click event, open a new tab, and direct the user to the correct Google Images page.
 */
function searchImagesFor(contextInfo) {
    chrome.tabs.create({
        url: createUrl(contextInfo)
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
 chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'quick-image-search-button',
        title: chrome.i18n.getMessage('search_in_google_images'),
        type: 'normal',
        contexts: ['selection', 'image']
    });
 });
chrome.contextMenus.onClicked.addListener(searchImagesFor);
