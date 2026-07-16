---
title: 'The extension ceiling, part 1: mandatory screen recording'
heading: Mandatory screen recording
date: 2026-02-17
minutes: 7
series: The extension ceiling
part: 1
parts: 4
summary: If your security tool needs to watch the screen to do its job, you have already left the extension model. The mechanics of why.
short: Extensions cannot record the screen without per-session user consent. The workarounds are partial reconstructions, and managed policy cannot consent on the user's behalf. If recording is mandatory, the requirement is a browser, not an extension.
---

A buyer asks this question in every enterprise browser evaluation: can we record the screen for high-risk sessions. Not screenshots on a violation, recording, mandatory, for contractors and offshore teams. If your security tooling lives in an extension, the honest answer is no, and the dishonest answers are worth understanding.

## What the extension APIs actually allow

Chrome gives an extension two routes to pixels. `chrome.desktopCapture` shows the user a picker and waits for consent, every session. `chrome.tabCapture` needs the user to invoke the extension first, and it sees one tab, not the desktop. Both die with the service worker in Manifest V3, so "always on" means keeping a worker alive that Chrome is actively trying to put to sleep.

There is no silent path. That is not an oversight, it is the contract. An extension is a guest in someone else's browser, and Chrome treats pixels as the most user-owned resource there is.

## What vendors ship instead

The workaround industry is real. DOM snapshots streamed on a timer. MutationObserver diffs reassembled server-side into something that plays back like video. Canvas readback where the page allows it. It demos well. Then you deploy it and find what it misses: cross-origin iframes, native file dialogs, the address bar, PDFs in the built-in viewer, every other app on the desktop, and the user who drags the tab into a new window.

| The policy asks for | An extension can see |
| --- | --- |
| The whole desktop | One tab, with consent, per session |
| Native dialogs and pickers | Nothing |
| Cross-origin iframes | A hole in the snapshot |
| Recording that survives a restart | A service worker Chrome wants to sleep |

## Can't policy just force it?

Admins ask the reasonable next question: we manage these machines, can't policy grant the permission. Policy can force-install the extension, pin its version, hide the uninstall button. It cannot grant capture consent on the user's behalf. The picker is rendered by the browser, above the extension's reach, deliberately. There are narrow loosenings, kiosk modes, allowlisted origins for `getDisplayMedia`, and none of them add up to a silent, always-on recorder driven by an extension.

## What it actually takes

Recording is a compositor-level capability. To make it a policy decision instead of a user decision, you have to own the compositor, which means owning the browser. On a Chromium fork the capture pipeline is yours: gated by enterprise policy, scoped to the profiles and sites the policy names, with a consent surface you design and disclose honestly. That is the line between an extension product and a browser product, and recording is usually the first requirement that makes a buyer cross it.

None of this is extension-bashing. For most policy an extension is the right tool, cheaper to deploy and easier to trust. The ceiling is real for the rest. Part 2 is Chrome sync and MDM scoping, where the failure is quieter and the data walks out the front door.
