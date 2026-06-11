---
title: 'The extension ceiling, part 3: the incognito bypass'
heading: The incognito bypass
date: 2026-05-28
minutes: 5
series: The extension ceiling
part: 3
parts: 3
summary: Every extension-based DLP I tested loses sight of the user the moment an incognito window opens. The mechanism, and why policy can't fully close it.
short: Extensions are off in incognito unless the user opts each one in, and no enterprise policy flips that switch for them. Every extension-based control on the machine is one keyboard shortcut from blind.
---

Part 1 needed a missing API. Part 2 needed a signed-in account. This one needs Ctrl+Shift+N. Open an incognito window and every extension the user has not individually allowed in is gone: no content scripts, no webRequest listeners, no DLP.

## The mechanism

Extensions are disabled in incognito by default. The opt-in is a per-extension toggle, Allow in Incognito on the chrome://extensions page, and it belongs to the user. Force-installing the extension by policy does not flip it. Pinning the version, blocking uninstall, hiding the toolbar icon, none of that flips it either. Chrome's position is the same one from part 1, applied consistently: incognito is a promise made to the user, and silently installing a watcher inside it would break the promise, even for an administrator.

So the coverage of your security product is a user preference. That sentence is worth sitting with during a vendor evaluation, because every extension-based DLP I tested behaves exactly this way, and none of the datasheets mention it.

## The obvious fix, and what lines up behind it

The standard answer is `IncognitoModeAvailability` set to disabled, kill the feature entirely. It works, and then the gaps queue up behind it. Guest mode needs `BrowserGuestModeEnabled` set to false, it is a fresh profile with no extensions. Adding new profiles needs `BrowserAddPersonEnabled` set to false, same reason. And once this browser is fully sealed, the user opens Edge, or Firefox, or the Chrome they unzipped into their home directory, none of which carry your extension at all.

Each closure is real and worth doing. The sum of them is also an admission: the enforcement boundary was never the extension. It was the inventory of browsers you can keep people inside, which is an endpoint problem, not a browser problem, and the extension was never going to solve it.

## What it looks like when you own the browser

A fork does not have an incognito problem, it has an incognito decision. The private window is your code. Policy can state plainly what a corporate session allows: incognito exists and DLP stays active in it, disclosed in the window itself. Or incognito is unavailable for managed profiles. Or it works untouched for personal browsing and corporate sites simply refuse to load in it. Any of those is a defensible design. The difference is that the choice is made by policy and disclosed to the user, instead of being made by a toggle the user controls and the admin cannot even see.

That closes the series. The ceiling is not one missing API, it is a pattern. Pixels in part 1, the sync channel in part 2, the private window here. Extensions are guests, and Chrome is a good host that protects its users from its guests. When the requirement needs the host's keys, the requirement is a browser.
