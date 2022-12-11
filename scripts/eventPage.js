const searchByTextFn = query => `https://www.google.com/images?q=${query}`;
const searchByImageFn = url => `https://lens.google.com/uploadbyurl?url=${url}`;

/**
 * Analyse the click event, open a new tab, and direct the user to the correct Google Images page.
 */
function searchImagesFor(contextInfo) {
    browser.tabs.create({
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
 * Create a context menu which will only show up for images and selected text.
 */
browser.contextMenus.create({
    id: 'gis_button',
    title: browser.i18n.getMessage('search_in_google_images'),
    type: 'normal',
    contexts: ['selection', 'image']
});
browser.contextMenus.onClicked.addListener(searchImagesFor);
