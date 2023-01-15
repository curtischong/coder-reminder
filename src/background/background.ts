import InstalledDetails = chrome.runtime.InstalledDetails;

// redirect ppl to the onboarding page when they install the extension
// https://stackoverflow.com/questions/5745822/open-a-help-page-after-chrome-extension-is-installed-first-time

chrome.runtime.onInstalled.addListener(function (object: InstalledDetails) {
    let internalUrl = chrome.runtime.getURL("onboarding.html");

    if (object.reason === "install") {
        chrome.tabs.create({ url: internalUrl });
    }
});

// uninstall form to get metrics on why they uninstalled
chrome.runtime.setUninstallURL("https://forms.gle/udzv9F7hcTy4CW7X9");
