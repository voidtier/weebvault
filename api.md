# Jikan API v4 — Quick Reference

Base URL: `https://api.jikan.moe/v4`
Rate limit: **3 requests/second**, **60/minute**

---

## 🎌 ANIME

| What you want | URL | Key Params |
|---|---|---|
| Search anime | `/anime` | `q=<title>`, `type=tv\|movie\|ova`, `status=airing\|complete\|upcoming`, `rating=g\|pg\|pg13\|r17\|r\|rx`, `order_by=score\|popularity`, `sort=asc\|desc`, `genres=<id>`, `sfw=true\|false` |
| Anime details | `/anime/{id}` | — |
| Full details + streaming | `/anime/{id}/full` | — |
| Characters + voice actors | `/anime/{id}/characters` | — |
| Staff | `/anime/{id}/staff` | — |
| Episodes | `/anime/{id}/episodes` | `page=<n>` |
| Single episode | `/anime/{id}/episodes/{ep}` | — |
| News | `/anime/{id}/news` | `page=<n>` |
| Videos / promos | `/anime/{id}/videos` | — |
| Pictures | `/anime/{id}/pictures` | — |
| Statistics | `/anime/{id}/statistics` | — |
| Recommendations | `/anime/{id}/recommendations` | — |
| Reviews | `/anime/{id}/reviews` | `page=<n>`, `preliminary=true\|false`, `spoilers=true\|false` |
| Relations (sequel/prequel) | `/anime/{id}/relations` | — |
| OP/ED themes | `/anime/{id}/themes` | — |
| Streaming links | `/anime/{id}/streaming` | — |

---

## 📚 MANGA

| What you want | URL | Key Params |
|---|---|---|
| Search manga | `/manga` | `q=<title>`, `type=manga\|novel\|lightnovel\|oneshot\|doujin\|manhwa\|manhua`, `status=publishing\|complete\|hiatus\|discontinued\|upcoming`, `order_by=score\|popularity`, `sfw=true\|false` |
| Manga details | `/manga/{id}` | — |
| Characters | `/manga/{id}/characters` | — |
| Statistics | `/manga/{id}/statistics` | — |
| Recommendations | `/manga/{id}/recommendations` | — |
| Reviews | `/manga/{id}/reviews` | `page=<n>`, `preliminary=true\|false` |
| Relations | `/manga/{id}/relations` | — |

---

## 🏆 TOP LISTS

| What you want | URL | Key Params |
|---|---|---|
| Top anime (score) | `/top/anime` | `type=tv\|movie\|ova`, `filter=airing\|upcoming\|bypopularity\|favorite`, `page=<n>`, `limit=1-25` |
| Top manga | `/top/manga` | `type=manga\|novel\|manhwa\|manhua`, `filter=publishing\|upcoming\|bypopularity\|favorite` |
| Top characters | `/top/characters` | `page=<n>`, `limit=1-25` |
| Top by popularity | `/top/anime?filter=bypopularity` | `page=<n>`, `type=tv\|movie\|ova` |
| Top by favorites | `/top/anime?filter=favorite` | `page=<n>` |

---

## 🔥 TRENDING / POPULAR

| What you want | URL |
|---|---|
| Trending anime (most followed) | `/anime?order_by=members&sort=desc` |
| Top scored anime | `/anime?order_by=score&sort=desc` |
| Most popular anime | `/anime?order_by=popularity&sort=asc` |
| Most favorited anime | `/anime?order_by=favorites&sort=desc` |
| Hot right now (airing + followed) | `/anime?status=airing&order_by=members&sort=desc` |
| Trending manga | `/manga?order_by=members&sort=desc` |
| Top scored manga | `/manga?order_by=score&sort=desc` |

---

## 📅 SEASONS

| What you want | URL | Key Params |
|---|---|---|
| Currently airing | `/seasons/now` | `filter=tv\|movie\|ova\|ona`, `page=<n>`, `sfw=true\|false` |
| Upcoming | `/seasons/upcoming` | `filter=tv\|movie\|ova\|ona`, `page=<n>` |
| Specific season | `/seasons/{year}/{season}` | `season=winter\|spring\|summer\|fall` |
| All seasons archive | `/seasons` | — |
| Weekly schedule | `/schedules` | `filter=monday\|tuesday\|...\|sunday`, `sfw=true\|false` |

---

## 👤 CHARACTERS

| What you want | URL | Key Params |
|---|---|---|
| Search characters | `/characters` | `q=<name>`, `order_by=mal_id\|name\|favorites`, `sort=asc\|desc` |
| Character details | `/characters/{id}` | — |
| Full character data | `/characters/{id}/full` | — |
| Anime appearances | `/characters/{id}/anime` | — |
| Voice actors | `/characters/{id}/voices` | — |

---

## 🎤 PEOPLE (Voice Actors / Staff)

| What you want | URL | Key Params |
|---|---|---|
| Search people | `/people` | `q=<name>`, `order_by=mal_id\|name\|favorites\|birthday` |
| Person details | `/people/{id}` | — |
| Anime they worked on | `/people/{id}/anime` | — |
| Characters voiced | `/people/{id}/voices` | — |

---

## 👥 USERS

| What you want | URL | Key Params |
|---|---|---|
| User profile | `/users/{username}` | — |
| User stats | `/users/{username}/statistics` | — |
| User favorites | `/users/{username}/favorites` | — |
| Anime list | `/users/{username}/animelist` | `status=watching\|completed\|on_hold\|dropped\|plan_to_watch` |
| Manga list | `/users/{username}/mangalist` | `status=reading\|completed\|on_hold\|dropped\|plan_to_read` |

---

## 🎲 RANDOM

| What you want | URL |
|---|---|
| Random anime | `/random/anime` |
| Random manga | `/random/manga` |
| Random character | `/random/characters` |

---

## 🏷️ GENRES

| What you want | URL | Params |
|---|---|---|
| All anime genre IDs | `/genres/anime` | `filter=genres\|explicit_genres\|themes\|demographics` |
| All manga genre IDs | `/genres/manga` | same |

---

## Common Genre IDs (for `genres=` param)
| ID | Genre |
|---|---|
| 1 | Action |
| 2 | Adventure |
| 4 | Comedy |
| 7 | Mystery |
| 8 | Drama |
| 10 | Fantasy |
| 14 | Horror |
| 22 | Romance |
| 24 | Sci-Fi |
| 36 | Slice of Life |
| 37 | Supernatural |