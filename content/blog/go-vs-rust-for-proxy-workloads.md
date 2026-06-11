---
title: 'Go vs Rust for proxy workloads: the choice and why'
heading: Go vs Rust for proxy workloads
date: 2025-09-24
minutes: 6
summary: We pushed serious TLS traffic through both. The decision came down to GC pauses you can budget for versus lifetimes you pay for daily.
short: We prototyped the gateway data plane in both. Rust won the benchmarks by less than expected, Go won the product, and the difference was whose costs show up on whose schedule.
---

When we started the gateway under Ulaa, the language question was real, not a forum debate. A secure web gateway terminates TLS, inspects, re-encrypts, and forwards, for every user, all day. Tail latency is the product. We prototyped the data plane in both Go and Rust and pushed real traffic through each before committing.

## What a proxy actually stresses

A forward proxy is a memory churn machine: accept, handshake, parse, copy between two sockets, tear down, thousands of times a second. Three costs dominate. Allocation pressure from connection buffers. Handshake CPU. And whatever your runtime does at the worst possible moment.

Goroutine-per-connection maps onto this shape so directly that the Go prototype was passing traffic in about a week. The tokio version took close to a month, and most of that month was spent convincing the borrow checker about connection state shared between the read half and the write half across await points. That is not a complaint about Rust, it is a measurement of where the effort goes.

## What the numbers said

Rust was faster, and by less than the discourse promises. Throughput landed within roughly 10 percent once the Go version pooled its buffers. The visible difference was the tail: Go's p99.9 showed the garbage collector, Rust's did not.

But the GC story is budgetable. Pauses themselves have been sub-millisecond since Go 1.8. The real cost is assist work surfacing as jitter when allocation pressure climbs, and that you can engineer against: `sync.Pool` over connection buffers, preallocated TLS record scratch space, and a rule that nothing in the per-request path allocates. That work cut our tail by an order of magnitude, and after it, the two prototypes were close enough that no customer on a real network would ever tell them apart through normal jitter.

## What actually decided it

The deciding costs were daily, not benchmark.

A gateway's job is mostly policy, and policy changes constantly. The DLP rule engine, ICAP hooks, header rewrites for the dozen apps that do something weird, every one of those is a feature someone has to write under deadline. In Go, anyone on the team ships those. In Rust, the connection-state lifetimes we fought in the prototype were going to be fought again inside every feature that touched the hot path, forever.

Profiling matters as much. pprof against a production binary, live, answered every performance question we had during load testing. The Rust tooling is good and getting better, it was not that, not then.

And hiring is a real input. We can interview for Go and find people who are productive in a month. The Rust hiring pool for systems-with-deadlines work was a fraction of that, in Chennai, in that year.

## Where Rust would have won

If we were building the shared core that other teams embed, counted in microseconds, where every consumer pays our overhead on every call, Rust, no argument. Same if the workload were CPU-bound transformation instead of policy and plumbing. The general rule we took away: Rust when the cost of the runtime is paid by your users, Go when the cost of the language is paid by your roadmap.

We shipped Go, with a short list of enforced rules about allocation in the hot path. The p99 has not been the thing a customer escalated yet. The roadmap has shipped every quarter. That is the trade, and I would make it again.
