---
title: 'Hello, new portfolio'
date: '2026-07-01'
tags: ['Portfolio']
excerpt: 'A short note on rebuilding this site as a minimal, fast, Markdown-driven SvelteKit app.'
---

I rebuilt this site to keep it small, fast, and easy to maintain. No CMS, no heavy frameworks — just SvelteKit, mdsvex, and a handful of typed data files.

## Why SvelteKit?

SvelteKit gives me file-based routing, server-side rendering when I need it, and a build output that is easy to deploy anywhere. For a mostly static portfolio, it is the right amount of framework.

## Content as data

Experience, projects, skills, and social links live as typed arrays in `src/lib/data/`. Blog posts are Markdown files in `src/posts/`. Adding a new post is a single file and a deploy.

## What is next

More write-ups on Kubernetes, Go, and homelab automation. The structure is ready; now it is time to fill it with useful notes.
