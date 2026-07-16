---
title: 'The extension ceiling, part 4: DLP on the page vs the wire'
heading: DLP on the page vs the wire
date: 2026-06-20
minutes: 6
series: The extension ceiling
part: 4
parts: 4
summary: Extension DLP inspects the page. Exfiltration happens in the request. Those are different objects, and the gap between them is where data actually leaves.
short: Content scripts watch a rendering of state, the DOM, while the bytes that leave are assembled in JavaScript and serialized on the wire. Manifest V3 took body inspection away from normal extensions, and even the enterprise carve-out sees a partial view. Enforcement-grade classification has to happen where the request actually exists, at the gateway.
---

Part 1 needed a missing API. Part 2 needed a signed-in account. Part 3 needed a keyboard shortcut, and I said that closed the series. It did not, because there is a case quieter than all three: nothing is bypassed, nothing is disabled, the extension runs exactly as designed, watching the page, and the data leaves in the request anyway. Extension DLP inspects a rendering of state. Exfiltration is judged on the wire, on the bytes that actually leave the machine. Those are two different objects, and the distance between them is the subject of this post.

## What page-level DLP genuinely catches

Let me concede the real part first, because it is real. Extension DLP is content scripts: listeners on inputs and textareas, handlers on paste and drop events, an interceptor wrapped around the file picker so the upload can be classified before the form submits. Against the honest-mistake tier, this works. An employee pastes a customer table into a personal notes app, the paste handler sees the clipboard content, matches the pattern, and blocks or warns right there in the page. That is most incidents by count, and catching them at the moment of action is worth more than the mechanism suggests, a warning at paste time teaches someone something, a request blocked three layers down teaches them nothing.

So the coaching tier is genuinely well served by the page. The mistake is reading that as inspection of what leaves the browser, because the page never was that.

## The page is not the wire

The DOM is what the user sees. The request is what the server receives. JavaScript sits between them and is under no obligation to keep them related. A web app can build a `FormData` entirely in memory, slice a blob out of IndexedDB, encode it, and hand it to `fetch`, and at no point did that payload exist in any element a content script could observe. WebSocket frames carry data with no form, no input, no paste event. gRPC-web serializes protobuf into a body that would not match a regex even if something could read it.

Walk one concrete case through. A user opens a file-sharing site and drags a spreadsheet onto the page. The extension's drop handler fires, inspects the file, finds nothing sensitive, allows it. The app then reads the file, compresses it, splits it into chunks, and uploads each chunk as a separate request with its own encoding. The object the extension classified and the objects that left the machine share content but not form, and every DLP verdict was rendered against the wrong one. Nothing malicious happened here, this is just how upload code is written in 2026, resumable, chunked, encoded. The page view was accurate about the page. It was never a statement about the wire.

## What Manifest V3 leaves you

It used to be partially recoverable, because extensions had blocking `webRequest` and could at least stand in the request path. Manifest V3 removed blocking `webRequest` for normal extensions and replaced it with `declarativeNetRequest`, which is a rule engine, not an observer: rules match URL patterns, resource types, and headers, and they cannot read a request body at all. A DNR rule can block `personal-drive.example` wholesale, it cannot tell an upload containing customer data from one containing lunch photos, because it never sees either.

There is an enterprise carve-out, and it matters less than the datasheets imply. Extensions force-installed by policy keep blocking `webRequest`, including the `requestBody` view on `onBeforeRequest`. But that view is partial by design: parsed form data when the body is a parseable form post, raw bytes when they happen to be present, and nothing at all for streamed bodies or payloads the page encrypted before sending. And there is no response body access, ever, in any manifest version, so the download direction is simply dark. The strongest position an extension can hold in Chrome today is a partial read of some request bodies, in the managed-install case only.

| | Page view (extension) | Wire view (gateway) |
| --- | --- | --- |
| What it inspects | DOM events, inputs, pickers | The serialized request itself |
| Request body | Partial, enterprise installs only | Complete, after all client-side assembly |
| Response body | None, in any manifest version | Complete |
| WebSocket, gRPC-web | Effectively invisible | Frames and bodies on the wire |

## The verdict belongs on the wire

A gateway that terminates TLS sees the request after everything the client was going to do to it has been done: the chunking, the encoding, the in-memory assembly, all of it already happened, and what remains is the actual bytes headed to the actual destination. That is the only vantage point where "we classified this upload" means what it claims to mean, because the thing classified and the thing transmitted are the same object. I built a streaming DLP engine that scans request bodies inline at the gateway, part of the SASE stack alongside Ulaa, and that project is where this distinction stopped being theoretical for me, the requests we scanned on the wire routinely had no resemblance to anything a content script would have seen on the page.

## The uncomfortable middle

Now the honest flip on my own position: the wire does not solve everything either. A payload the page encrypts before sending arrives at the gateway as ciphertext, an exotic encoding defeats a naive scanner just as thoroughly as it defeats a paste handler, and a determined insider will find the channel you did not model. Anyone selling wire inspection as complete is running the same overclaim in the other direction.

The defensible architecture is layered, and each layer keeps the job it is actually good at. The page coaches: catch the honest mistake at the moment of action, in the user's face, where it changes behavior. The wire enforces: render the classification verdict on the bytes that leave, because that is the only place the verdict is about the right object. When a vendor tells you their extension inspects uploads, the question to ask is which object it inspected, the file the user dropped or the requests that carried it, and whether their datasheet knows those are different things. Most do not, and the gap between the two is exactly the width of the data you were trying to keep.
