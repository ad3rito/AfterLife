const { remote } = require('electron');
const { Menu, BrowserWindow, MenuItem, shell } = remote;

var webview,
    bookmarks = [];

onload = () => {
    webview = document.querySelector('webview');
    // ********************************* WEBVIEW EVENTS *********************************

    webview.addEventListener('did-start-loading', (e) => {
        showStop();
    });

    webview.addEventListener('did-stop-loading', (e) => {
        showRefresh();
    });

    webview.addEventListener('did-navigate', (e) => {
        $("#url").val(e.url);
    });

    webview.addEventListener('did-navigate-in-page', (e) => {
        $("#url").val(e.url);
    });

    refreshBookmarks();
};