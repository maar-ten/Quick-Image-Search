To ensure the extension still works after a code change there are a few tests that are run automatically using Github actions.
These tests install the extension in Chromium and Firefox and then test the functionality of the context menu.

## Test scenario 1
- start serving the mock web page in e2e/mock
- open the mock web page in a web browser
- right click on an image 
- check that the extension is visible in the context menu

## Test scenario 2
- start serving the mock web page in e2e/mock
- open the mock web page in a web browser
- right click on an image 
- click on the context menu item
- check that there is a new tab with Google Images results

## Test scenario 3
- start serving the mock web page in e2e/mock
- open the mock web page in a web browser
- select some text
- right click the text
- check that the extension is visible in the context menu

## Test scenario 4
- start serving the mock web page in e2e/mock
- open the mock web page in a web browser
- select some text
- right click the text
- click on the context menu item
- check that there is a new tab with Google Images results
