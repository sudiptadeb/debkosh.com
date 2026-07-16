---
title: 'Introducing memd: memory your agents don''t own'
heading: Introducing memd
date: 2026-07-16
minutes: 5
tag: Build
summary: Every AI coding tool ships its own memory, and none of them talk. memd makes memory a folder of Markdown files you own, served to every agent over MCP.
short: Agent memory today belongs to the host, you cannot read it as a file, diff it, or take it with you. memd flips that. Memory is a folder of Markdown files you own, the server is a thin MCP adapter over it, and every tool that speaks MCP shares the same memory. Teach it once, every agent knows it.
---

Teach it once, every agent knows it. That is the entire pitch for memd, a tool I have been building on nights and weekends, and after a few months of it quietly running my own work it is public today: MIT licensed at [github.com/sudiptadeb/memd](https://github.com/sudiptadeb/memd), hosted at [memd.debkosh.com](https://memd.debkosh.com).

## Every tool remembers, none of them share

Every AI coding tool now ships its own memory. Claude Code has one, Cursor has one, ChatGPT has one, and none of them talk to each other. So you explain your project conventions to one agent, that the build always goes through `build.sh` and never plain `go build`, and it dutifully remembers. Then you open a different tool the next morning and explain the same thing again, to a different memory, in a different format, stored somewhere you have never looked.

That last part is the one that actually bothers me. The memory belongs to the host. You cannot read it as a file, you cannot diff yesterday's version against today's, and you cannot take it with you when you switch tools or when the vendor changes its mind about how memory works. It is your accumulated context, the most personal artifact these tools produce, and you hold none of it.

## The flip: memory is files you own

memd starts from the opposite premise. Memory is a folder of Markdown files, plain enough to read in any editor, versioned in Git if you want history, organized into whatever folders make sense to you and your agents. The server is a thin MCP adapter over that folder, not the source of truth. Delete the server and your memory is still just files sitting on disk. That is the property everything else falls out of, and it is the property I refuse to trade away.

Because the interface is MCP, any client that speaks it gets the same memory: Claude Code, Codex CLI, Cursor, ChatGPT. Teach one agent that your staging box sits behind a jump host, and the next tool you open already knows.

## How it runs

A single Go binary, two ways to use it. The quick way: point it at a directory, `memd ~/notes`, and you get an ephemeral MCP URL to hand to whatever agent you are sitting in. The persistent way: run it as a server with a web UI managing multiple directories, work memory in one, personal in another.

Two backends. A plain local folder, for memory that never needs to leave one machine. Or a clone of a private Git repo with debounced commit and push, so a session's worth of edits coalesces into one commit instead of forty. Either way the files stay files.

## Named after what humans do with memory

The part I care most about is not the storage, it is the maintenance. A memory that only ever grows turns into a junk drawer, so memd ships five maintenance workflows an agent can run, and I named them after what humans actually do with memory:

- reorganise, rearranging the shelves
- harvest, bringing knowledge in from outside
- dream, sleep consolidation, cement what got used and fade what didn't
- recall, reminiscing on a topic
- housekeep, the daily tidying

Naming them this way was a design decision, not decoration. Both the agent and the human immediately know what `dream` is for without reading a manual, and that shared intuition matters when the agent is the one deciding which workflow the moment calls for.

## Two owners in the front matter

Each Markdown page carries front matter with two ownership zones. The server maintains the usage stats, when the page was last read and how often. The agent maintains the meaning, topic, tags, priority, what supersedes what. Neither side writes into the other's zone, and the human can override both, they are just YAML keys in a file you own.

The stats are what makes dream possible. Memory that never gets read fades, memory that gets pulled into session after session gets cemented and promoted. Without honest usage numbers, consolidation is guesswork dressed up as a feature. With them it is a policy the agent can actually execute.

## It runs this site

The dogfooding is real. This site runs on memd, the analysis that produced this very post ran on memd, and my own working memory, project conventions, architecture decisions, half-finished directions, lives in it and follows me across every tool I use. When I switch from Claude Code to Codex mid-task, the second agent picks up where the first one's context ended, because they were never two memories to begin with.

That is also why I trust the file-first premise more than when I started. I have opened those Markdown files in a plain editor to fix something an agent got wrong, I have read a Git diff to see what a session actually learned, and both of those moments would be impossible with every hosted memory I have used.

## Try it, then tell me what's wrong with it

memd is MIT licensed at [github.com/sudiptadeb/memd](https://github.com/sudiptadeb/memd), and the docs live at [memd.debkosh.com](https://memd.debkosh.com). It is a personal project serving one very opinionated user so far, which means the sharp edges are exactly the ones my own workflow never hits. If you run it and the model breaks down, the folder layout fights your agent, the Git debounce loses an edit, dream fades something it shouldn't have, I want to hear it, and the critical version is worth more to me than the kind one. Issues on the repo, or email, either works.
