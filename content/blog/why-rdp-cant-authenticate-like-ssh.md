---
title: Why RDP can't authenticate like SSH
heading: Why RDP can't authenticate like SSH
date: 2026-07-03
minutes: 6
tag: Protocols
summary: SSH made passwordless, short-lived, identity-attributed access a one-line server config. RDP can get there too, through a chain of Active Directory machinery that explains why brokered access is winning instead.
short: SSH certificates give you passwordless, short-lived, identity-attributed access with one sshd_config directive. RDP can reach roughly the same place, but only via PKINIT, an enterprise CA in the NTAuth store, SID-mapped certificates, and smartcard emulation. The asymmetry is structural, and it is why the broker that terminates the protocol is the model that actually wins.
---

SSH solved passwordless, short-lived, identity-attributed access a decade ago, and the server side of the entire solution is one line of `sshd_config`. RDP can be pushed to roughly the same place. I spent real time mapping out how, and the map is the point of this post: the path exists, every step of it is documented, and the sheer stack of steps explains why almost nobody walks it, and why the direction that actually wins does not involve fixing RDP authentication at all.

## What SSH got right

Authentication in SSH is a clean protocol phase, a distinct exchange that completes before anything else exists, owned entirely by the protocol. That is what made it replaceable. The certificate model that grew out of it works like this: you run a user CA, a single keypair whose public half every server trusts. When an engineer needs access, something they have already authenticated to (in practice, your identity provider fronting a signing service) issues a certificate valid for a few minutes, listing the principals they may log in as. The server checks the signature, the validity window, and the principal against the account.

`TrustedUserCAKeys` in `sshd_config` is the entire server-side deployment. No per-user key distribution, no authorized_keys sprawl, and revocation stops being a process because expiry is the revocation, the certificate dies before the meeting where you would have discussed revoking it ends.

The audit story falls out for free. The certificate carries a key ID naming the human, so even when five engineers share the `deploy` account, the server log says which of the five connected. Short-lived, passwordless, identity-attributed. One page of config.

## The login before the login

RDP's problem starts with what RDP is. It is a display protocol, its job is to ship a Windows desktop over the wire, and classic RDP did the natural thing: connect, spin up a session, let winlogon render the credential prompt inside the remote desktop, and send you the pixels. The remote host built a full session for a user who had not yet proven anything. That was a resource problem, session setup is expensive and anonymous connections could exhaust it, and it was an attack surface, everything involved in session creation was reachable before authentication.

Network Level Authentication fixed it. NLA, carried by CredSSP, requires the client to authenticate before the session exists, the login before the login. It was the right fix and it came with a bill: CredSSP does not do authentication itself, it wraps Windows authentication, which means passwords, NTLM, or Kerberos. The moment RDP got serious about authenticating early, it bound itself to the operating system's identity machinery.

## The passwordless path RDP does have

Windows does have certificate logon, and it predates the SSH CA fashion: the smartcard model, Kerberos PKINIT underneath. So in principle you can build the same thing, a service that mints a short-lived certificate after the user authenticates to your identity provider, and the user logs into RDP with no password ever typed. Here is what "in principle" expands to.

You need an enterprise CA that the domain trusts for logon, which means its certificate published into the forest's NTAuth store, not just the usual root stores. The client certificate needs the user's UPN in the subject alternative name, as the `szOID_NT_PRINCIPAL_NAME` otherName. Since the KB5014754 enforcement changes it also needs the user's SID embedded in a dedicated extension, `szOID_NTDS_CA_SECURITY_EXT`, because UPN mapping alone is now classed as weak and enforcement mode rejects certificates without a strong mapping. The certificate needs the Smartcard Logon EKU. And then the client has to present all of this as a smartcard, because Windows certificate logon is smartcard logon; that means a physical card and reader, or smartcard emulation, a virtual card behind a minidriver, so that the credential stack sees something card-shaped.

Every step in that chain is documented. None of it is exotic, organizations that issue physical smartcards run all of it today. But put the whole stack next to `TrustedUserCAKeys`:

| | SSH | RDP |
| --- | --- | --- |
| Trust anchor | One CA public key in `sshd_config` | Enterprise CA published to the NTAuth store |
| Identity in the credential | Principals list in the cert | UPN in the SAN plus SID in `szOID_NTDS_CA_SECURITY_EXT` |
| Certificate profile | Anything the CA signs | Smartcard Logon EKU, strong-mapping rules |
| Client presentation | A file the ssh client reads | A smartcard, physical or emulated |
| What validates it | sshd | The KDC, LSA, winlogon, and the credential provider stack |

That table is why "SSH certificates for RDP" is a whiteboard sentence and a quarter-long project.

## Structural, not negligence

It is tempting to read the chain as negligence. It is not. SSH is one protocol owned end to end, authentication included, so OpenSSH could add certificates in a single release (5.4, in 2010) and be done. RDP made the opposite choice at birth: it delegates authentication to the operating system's identity system, and in exchange it gets single sign-on into the whole desktop, the session token, the file shares, everything Kerberos reaches. The price is that changing how you log in to RDP means changing Active Directory's mind, not the protocol's. There is no per-host escape hatch, no one-line directive for a single server, because the server was never the thing doing the deciding.

## Where the access actually goes

Now the flip. If parity requires a directory-wide PKI project, the winning move is not to run that project against every desktop, it is to run it once, behind a broker.

A broker sits between the user and the host and terminates the protocol, and increasingly it renders the session into a browser tab, which is the shape the ZTNA reference implementations all converged on. The user authenticates to the broker with modern identity: SSO, hardware-backed MFA, short sessions. The broker carries the baroque part centrally, it does the PKINIT dance against the domain or holds the session credential and injects it, and the host sees a perfectly ordinary smartcard or NLA logon. The user gets the SSH experience, click, authenticated, in. And the audit log gets the real human identity, recorded at the broker, no matter which shared local admin account the session lands on.

This is not hypothetical for me. I shipped browser-based SSH access built on exactly the CA-signed short-lived certificate model above, and sitting down to map the same design onto RDP is what made the asymmetry concrete: on the SSH side the design was mostly finished when the introduction was, on the RDP side the introduction was where the project started.

So the practical version. If you already run a real smartcard deployment, RDP certificate logon is closer than you think, finish the KB5014754 strong-mapping work and use what you have. If you do not, do not start an enterprise PKI project just to get rid of RDP passwords. Put a broker in front, terminate the protocol there, let the broker hold the Windows machinery, and spend your effort on the part that generalizes: the identity of the human, attested once, attached to every session in the log.
