---
title: The enterprise browser and PAM are on a collision course
heading: The browser and PAM collision
date: 2026-06-18
minutes: 6
tag: Market
summary: The extension versus full browser argument misses where the deals actually go. Privileged access lives at a broker, and the browser and PAM categories are converging on it from opposite sides.
short: Both enterprise browser camps assume the browser is the unit of security, and privileged access proves it is not. The broker between a person and a production host is PAM's territory, the user's screen is the browser's, and each side is missing the other's half. Whoever closes that gap, by building across it or buying across it, matters more than whoever wins the extension argument.
---

The enterprise browser category has spent two years on one argument: ship a hardened Chromium and make people switch browsers, or ride the browser they already have with an extension. I have written three posts on where the extension half of that argument breaks, so I am on record taking it seriously. It is a real argument, and it is the wrong one to be obsessed with, because both answers assume the browser is the unit of security, and both camps are about to hit the same wall. The wall is privileged access, and it does not live in the browser at all.

## The deals were never about tabs

For SaaS in a tab, the browser framing holds up fine. Watermark the screen, block the paste, gate the download, all of that is genuinely browser work, whichever architecture does it. But watch the deals that actually get signed in this category, regulated banks, offshore development centers, contractor-heavy engineering orgs, and they run into privileged access fast. An engineer needs a shell on a production host. A contractor needs scoped database access for two weeks. An admin needs into a jump box that fronts a customer's network. The evaluation started as "secure the browser" and by the third call it is "how does a contractor reach postgres."

Privileged access was never a tab problem. It is a question of who gets a credential, how long it lives, and whether the audit log can name the actual human behind a shared login, and you answer that question at the broker between the person and the resource, not in the page the person happens to be looking at. A browser, hardened or extended, is the page.

## What the broker actually involves

I got a close look at this building browser-based SSH under Ulaa. The terminal in the tab was a week of work, a terminal emulator, a WebSocket, a PTY on the far end, done. Everything that made it something a security team would deploy sat behind the tab, and it is worth listing what that was, because the list is instructive.

A certificate authority signing short-lived user certificates per session, lifetimes in minutes, not the months-old keys sitting in `authorized_keys` files today. OpenSSH has supported certificate authentication since 5.4, back in 2010, almost nobody outside large infrastructure shops turns it on, and a broker's whole job is turning it on for you. Principals on those certificates mapping a real corporate identity onto the shared server account, so when five engineers log in as `ubuntu` the trail still resolves to five people. Session recording at the protocol layer, keystrokes and output, so the auditor who shows up in eight months gets a name and a replay instead of a shrug. And routing through a connector that dials out from the private network, so the server never has an inbound port facing the internet.

Now read that list against any PAM datasheet. Ephemeral credentials, identity mapping, session recording, no exposed ports: every item is a line on it. None of it is browser code. The browser contributed a rectangle to type in.

## Each side is holding half

So I do not think the interesting question is extension or full browser. I think enterprise browser and privileged access management are walking toward each other, each holding half of the same buyer's problem.

PAM's half is the broker, and its weakness is everything between the user and the broker. The install base runs on vaults and checkout flows, a desktop client here, a jump-host chain there, an agent on every target. Ask anyone who has used one to reach a database under deadline: check the credential out, launch the client, paste, work, check it back in, and do it again after lunch because the checkout expired. The browser is where the user already spends the day, and PAM keeps making the user leave it and come to the vault instead.

The enterprise browser's half is the user, and its weakness is depth. It holds the session, the screen, the identity token, the policy engine, and all of it stops at anything that is not HTTP. SSH is not HTTP, the postgres wire protocol is not HTTP, and the part of Kubernetes access that starts as HTTP upgrades into an exec stream that page-level controls never see. The browser vendors know this, which is why infrastructure-access pages with terminal screenshots are appearing on their sites, and behind most of those screenshots is a thin bridge to somebody else's broker.

| | Enterprise browser | PAM |
| --- | --- | --- |
| Has | the user's screen, session, and identity | the credential broker and the audit trail |
| Lacks | anything that is not HTTP | a path to the user that is not a vault |

## Where this goes

Watch the RFPs, they are blending already. Session recording used to be a PAM checklist item, it now shows up in enterprise browser evaluations, and browser-side controls like clipboard policy for privileged sessions are creeping into privileged access RFPs from the other direction. When two categories' evaluation checklists converge, the categories follow.

The gap closes one of two ways. Build across: a browser team ships a real broker, the CA, the connectors, the protocol-level recording, or a PAM team ships a real surface inside the browser, and both are multi-year programs. Having built from the browser side, I can say the broker is the harder half, the tab was a week and the broker was the year. Or buy across: one side acquires the other, and given where the money in this category sits, the browser side is likelier to be the buyer. Either way, whoever closes the gap holds both halves of the deal, and that is a much stronger position than winning the extension argument.

If you are evaluating in either category this year, the test is one question each. Ask the browser vendor exactly how a contractor gets a scoped, recorded, two-week database session, and listen for whether the answer is their code or a partner's. Ask the PAM vendor to walk the user's path from a morning browser tab to a production shell, and count the installs and the clicks along the way. Whichever vendor has a boring, specific answer to the other side's question is the one worth shortlisting.
