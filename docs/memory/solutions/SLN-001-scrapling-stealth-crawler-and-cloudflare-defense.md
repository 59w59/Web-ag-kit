# SLN-001: Scrapling Stealth Crawler & Cloudflare Anti-Bot Bypass

- **Date:** 2026-11-07
- **Author Agent:** @explorer-agent & @penetration-tester
- **Tags:** [scrapling, cloudflare, crawling, anti-bot, stealth]
- **Status:** Validated

## 1. Context & Challenge
Scraping modern dynamic SPAs and edge-protected endpoints frequently encounters Cloudflare Turnstile verification or DataDome 403 blocks. Traditional Python `requests` or plain `BeautifulSoup` fail immediately.

## 2. The Winning Pattern
Integrate `scrapling.StealthyFetcher` or `scrapling.DynamicFetcher` with headless browser spoofing. Adaptive selectors (`Adaptor`) preserve parsing resilience even when class names change:

```python
from scrapling import StealthyFetcher

fetcher = StealthyFetcher()
page = fetcher.fetch('https://target-protected-website.com')
# Adaptive CSS extraction
articles = page.css('article.post-item')
```

## 3. Gotchas & Pitfalls Avoided
- Never trigger raw headless Chrome without TLS fingerprint spoofing; Cloudflare identifies it on TCP handshake.
- Use `uvx scrapling mcp` inside AI agent harnesses to expose stealth fetching tools directly in chat.
