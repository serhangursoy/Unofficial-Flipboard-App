onload = () => {
  const {
    BrowserWindow,
    shell
  } = require('electron').remote;
  const goBackButton = document.querySelector("#goBackButton")
  const minButton = document.querySelector('#minimizeButton')
  const maxButton = document.querySelector('#maximizeButton')
  const closeButton = document.querySelector('#closeButton')
  const homeButton = document.querySelector('#homeButton')
  const loaderInd = document.querySelector(".loader")
  const externalButton = document.querySelector('#externalButton')

  var w = document.querySelector('webview');
  var theWindow = BrowserWindow.getFocusedWindow();

  function pageGoBack() {
    console.log("Going back...")
    w.goBack();
  }

  function openExternal() {
    shell.openExternal(w.getURL())
  }

  function setFunctions() {
    w.insertCSS('::-webkit-scrollbar { width: 10px; margin-top: 10px;}::-webkit-scrollbar-track {box-shadow: inset 0 0 4px grey;border-radius: 0px;}::-webkit-scrollbar-thumb {background: red;border-radius: 0px;}::-webkit-scrollbar-thumb:hover {background: #b30000;}');
    loaderInd.style.display = "none";
    if (w.canGoBack()) {
      goBackButton.setAttribute("href", "#");
      goBackButton.style.color = "red";
      externalButton.addEventListener('click', openExternal)
      goBackButton.addEventListener('click', pageGoBack)
    } else {
      goBackButton.style.color = "gray";
      goBackButton.removeAttribute('href');
    }
  }

  function loadStarted() {
    console.log("Loading Started...");
  }

  function loadFinished() {
    loaderInd.style.display = "none";
  }

  function CloseWindow() {
    theWindow.close();
  }

  function MaximizeWindow() {
    theWindow.maximize();
  }

  function MinimizeWindow() {
    theWindow.minimize();
  }

  function HomeButtonClicked() {
    w.clearHistory()
    w.src = "https://www.flipboard.com/"
  }

  minButton.addEventListener('click', MinimizeWindow)
  maxButton.addEventListener('click', MaximizeWindow)
  closeButton.addEventListener('click', CloseWindow)
  homeButton.addEventListener('click', HomeButtonClicked)

  w.addEventListener('dom-ready', setFunctions)
  w.addEventListener('did-start-loading', loadStarted)
  w.addEventListener('did-finish-load', loadFinished)
  w.addEventListener('new-window', (e) => {
    const protocol = require('url').parse(e.url).protocol
    if (protocol === 'http:' || protocol === 'https:') {
      loaderInd.style.display = "inherit";
      w.src = e.url;
    }
  })

}