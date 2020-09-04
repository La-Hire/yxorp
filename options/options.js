const configTextArea = document.querySelector("#config");

// Store the currently selected settings using browser.storage.local.
function storeSettings() {
  let config = configTextArea.value;
  browser.storage.sync.set({
    config: config
  });
}

// Update the options UI with the settings values retrieved from storage,
// or the default settings if the stored settings are empty.
function updateUI(restoredSettings) {
  configTextArea.value = restoredSettings.config;
}

function onError(e) {
  console.error(e);
}

// On opening the options page, fetch stored settings and update the UI with them.
browser.storage.sync.get().then(updateUI, onError);

// Whenever the contents of the textarea changes, save the new values
configTextArea.addEventListener("change", storeSettings);
