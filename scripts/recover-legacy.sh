#!/usr/bin/env bash
#
# Issue #1 — legacy content recovery.
# Read-only. Queries public archives and DNS, writes findings to content/legacy/.
# Run from the repo root:  ./scripts/recover-legacy.sh

set -uo pipefail   # deliberately not -e; a dead endpoint shouldn't abort the run

DOMAIN="kinetika.consulting"
OUT="content/legacy"
mkdir -p "$OUT/captures"

echo "═══ Kinétika legacy recovery ═══"
echo

# ---------------------------------------------------------------------------
# 1. Every URL the Wayback Machine has ever seen on this domain.
#    The CDX API is more complete than the web UI — it includes subdomains,
#    both http and https, and the www variant.
# ---------------------------------------------------------------------------
echo "[1/5] Querying Wayback CDX for all known URLs..."
curl -s --max-time 60 \
  "http://web.archive.org/cdx/search/cdx?url=${DOMAIN}&matchType=domain&fl=original,timestamp,statuscode,mimetype&collapse=urlkey&limit=1000" \
  > "$OUT/wayback-all-urls.txt"

COUNT=$(wc -l < "$OUT/wayback-all-urls.txt" | tr -d ' ')
echo "      $COUNT unique URLs → $OUT/wayback-all-urls.txt"
echo

# ---------------------------------------------------------------------------
# 2. Every distinct version of the homepage.
#    collapse=digest keeps only captures whose content actually changed, so
#    40 captures reduce to the handful of real redesigns.
# ---------------------------------------------------------------------------
echo "[2/5] Finding distinct homepage versions..."
curl -s --max-time 60 \
  "http://web.archive.org/cdx/search/cdx?url=${DOMAIN}/&fl=timestamp,statuscode,digest&collapse=digest" \
  > "$OUT/homepage-versions.txt"

echo "      Distinct versions:"
awk '{print "        " substr($1,1,4)"-"substr($1,5,2)"-"substr($1,7,2)"  ("$1")"}' \
  "$OUT/homepage-versions.txt"
echo

# ---------------------------------------------------------------------------
# 3. Download each distinct homepage version.
#    The 2021–2022 captures are the dark site the usability test was run on.
#    You already have March 2025; this gets the rest.
# ---------------------------------------------------------------------------
echo "[3/5] Downloading each distinct version..."
while read -r ts _rest; do
  [ -z "$ts" ] && continue
  echo "      $ts"
  curl -s --max-time 60 -L \
    "https://web.archive.org/web/${ts}/https://${DOMAIN}/" \
    > "$OUT/captures/homepage-${ts}.html"
  sleep 1   # be polite to archive.org
done < <(awk '{print $1}' "$OUT/homepage-versions.txt")
echo

# ---------------------------------------------------------------------------
# 4. Extract internal links from every captured homepage.
#    This is the redirect map. Pages that were linked but never crawled still
#    show up here, which is exactly what issue #39 needs.
# ---------------------------------------------------------------------------
echo "[4/5] Extracting internal links from captures..."
grep -ohE 'href="[^"]*'"${DOMAIN}"'[^"]*"' "$OUT/captures/"*.html 2>/dev/null \
  | sed -E 's/.*(https?:\/\/[^"]*)".*/\1/' \
  | sed -E 's|https?://web\.archive\.org/web/[0-9]+/||' \
  | sed -E 's|\?.*$||' \
  | sort -u > "$OUT/legacy-url-map.txt"

LINKS=$(wc -l < "$OUT/legacy-url-map.txt" | tr -d ' ')
echo "      $LINKS distinct internal URLs → $OUT/legacy-url-map.txt"
echo

# ---------------------------------------------------------------------------
# 5. Is the original hosting still alive?
#    Determines whether avenues 2 and 3 (WP export, UpdraftPlus) are open.
# ---------------------------------------------------------------------------
echo "[5/5] Checking whether the original hosting is reachable..."
{
  echo "=== DNS ==="
  dig +short "$DOMAIN"        || echo "(dig unavailable)"
  dig +short "www.$DOMAIN"    || true

  echo
  echo "=== HTTP status ==="
  curl -sI --max-time 15 "https://$DOMAIN"          | head -1 || echo "no response"
  curl -sI --max-time 15 "https://$DOMAIN/wp-admin/" | head -1 || echo "no response"
  curl -sI --max-time 15 "https://$DOMAIN/wp-login.php" | head -1 || echo "no response"

  echo
  echo "=== Registration ==="
  whois "$DOMAIN" 2>/dev/null \
    | grep -iE "registrar:|expiry|expiration|status:|name server" \
    | head -20 || echo "(whois unavailable)"
} > "$OUT/hosting-status.txt" 2>&1

cat "$OUT/hosting-status.txt"
echo

echo "═══ Done ═══"
echo "Review these before closing issue #1:"
echo "  $OUT/wayback-all-urls.txt    every archived URL"
echo "  $OUT/homepage-versions.txt   distinct homepage versions"
echo "  $OUT/captures/               raw HTML per version"
echo "  $OUT/legacy-url-map.txt      redirect map for issue #39"
echo "  $OUT/hosting-status.txt      whether avenues 2 and 3 are open"
