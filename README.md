# yxorp

A simple open source automatic proxy selector extension for Firefox.

## What it does

This extension uses the proxy API listener `onRequest` to listen for requests to visit a web page.

The proxy configuration is stored in local storage.

The configuration can be changed through the extensions options page.
It should contain a json value:

```json
[
  {
    "proxy": {
      "type": "http",
      "host": "127.0.0.1",
      "port": 65535
    },
    "hosts": [
      "example.com",
      ...
    ]
  },
  ...
]
```

The proxy object should be a [ProxyInfo](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/proxy/ProxyInfo) object.

To try out this extension:

* install it
* visit `about:addons`, open the add-on's preferences, and change the configuration.
* visit some pages to see the effect of your changes.
