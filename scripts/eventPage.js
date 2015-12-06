/**
 * Copied and modified from Cheng Lee's MapMe extension. Here is his statement:
 *
 * Copyright (c) 2012 Cheng Lee. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 *
 * Icon designed by Yellowicon.com (taken from findicons.com, which said it was GNU/GPL licensed)
 */

/**
 * Returns a handler which will open a new window when activated.
 */
function onClickHandler(info, tab) {
    var selected, url = "https://encrypted.google.com/";
    if (info.selectionText) {
        selected = info.selectionText;

        // Join multiple lines into one separated with comma
        selected = selected.replace(/\n/g, ', ');
        url += 'images?q=' + selected;
    }

    if (info.mediaType == "image") {
        url += 'searchbyimage?image_url=' + info.srcUrl;
    }

    // Create a new tab to the info page.
    chrome.tabs.create({url: url});
}

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
    "id":       "gis_button",
    "title":    chrome.i18n.getMessage("search_in_google_images"),
    "type":     "normal",
    "contexts": ["selection", "image"]
});
chrome.contextMenus.onClicked.addListener(onClickHandler);
