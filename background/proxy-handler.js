class Proxy {
  // proxy: a ProxyInfo object, see: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/proxy/ProxyInfo
  // hosts: an array of host names to match against
  constructor(proxy, hosts) {
    this.proxy = proxy;
    this.hosts = hosts;
  }

  matches(url) {
    for (const host of this.hosts) {
      if (-1 != url.indexOf(host)) {
        return true;
      }
    }
    return false;
  }
}
// Initialize the list of proxies
// example config. The order of proxies is important as first match will return.
//
// ```json
// [
//   {
//     "proxy": {
//       "type": "http",
//       "host": "127.0.0.1",
//       "port": 65535
//     },
//     "hosts": [
//       "google.com"
//     ]
//   }
// ]
// ```
let config = [];

// Set the default list on installation.
browser.runtime.onInstalled.addListener(details => {
  browser.storage.local.set({
    config: JSON.stringify(config)
  });
});

function updateConfig(strValue) {
  const jsonConfig = JSON.parse(strValue);
  const newConfig = [];

  for (const proxy of jsonConfig) {
    newConfig.push(new Proxy(proxy.proxy, proxy.hosts));
  }

  config = newConfig;
}

// Get the stored list
browser.storage.local.get(data => {
  if (data.config) {
    updateConfig(data.config);
  }
});

// Listen for changes in the blocked list
browser.storage.onChanged.addListener(changeData => {
  updateConfig(changeData.config.newValue);
});

// Listen for a request to open a webpage
browser.proxy.onRequest.addListener(handleProxyRequest, { urls: ["<all_urls>"] });

// On the request to open a webpage
function handleProxyRequest(requestInfo) {
  // Read the web address of the page to be visited 
  const url = new URL(requestInfo.url);
  for (const proxyConfig of config) {
    if (proxyConfig.matches(url.hostname)) {
      return proxyConfig.proxy;
    }
  }
  // Default to no proxy.
  return { type: "direct" };
}

// Log any errors from the proxy script
browser.proxy.onError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});



