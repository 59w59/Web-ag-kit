#!/usr/bin/env python3
"""
Scrapling Quick Scrape Utility
Fetches a webpage, extracts clean text or markdown, and tests anti-bot defenses.

Usage:
    python quick_scrape.py <url> [--stealth] [--markdown]
"""

import sys
import argparse

def main():
    parser = argparse.ArgumentParser(description="Fetch and extract content with Scrapling")
    parser.add_argument("url", help="Target URL to scrape")
    parser.add_argument("--stealth", action="store_true", help="Use StealthyFetcher (Chromium + Cloudflare bypass)")
    parser.add_argument("--markdown", action="store_true", help="Convert response to clean Markdown (ideal for LLM context)")
    args = parser.parse_args()

    try:
        from scrapling.fetchers import Fetcher, StealthyFetcher
    except ImportError:
        print("Scrapling is not installed. Please run: pip install 'scrapling[all]>=0.5.1'")
        sys.exit(1)

    print(f"[*] Scraping {args.url} (Mode: {'StealthyFetcher' if args.stealth else 'Standard Fetcher'})...")

    if args.stealth:
        page = StealthyFetcher.fetch(args.url, solve_cloudflare=True)
    else:
        page = Fetcher.get(args.url, http3=True)

    print(f"[+] Status: {page.status}")

    if args.markdown:
        md = page.markdown()
        print("\n--- EXTRACTED MARKDOWN ---\n")
        print(md[:1500] + ("\n... [truncated]" if len(md) > 1500 else ""))
    else:
        title = page.css("title::text").get()
        print(f"[+] Page Title: {title}")
        print(f"[+] Body Length: {len(page.body)} bytes")

if __name__ == "__main__":
    main()
