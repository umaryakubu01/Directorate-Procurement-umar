# Baseline audit and design decisions

Reference: https://github.com/itcentralng/timbuktu-triangle

Inspected revision: `39c5c8ab25966eaf49ca1bf1d46da4ce6a91c8c3`. Downloaded into a separate temporary directory; the reference application was not modified.

## What the baseline does well

- Local assets and classic scripts suit a serverless Windows kiosk.
- Large menu tiles, a Home control and a clear screen-based application model support touch exploration.
- The immersive desert palette and locally stored media create a subject-specific atmosphere.
- English, French and Arabic options, narration, documentary media and reading-direction handling support that project's broader content needs.
- `prepare.bat` creates a named desktop shortcut targeting `cmd.exe /C run.bat`, with working directory and icon. `run.bat` detects Edge in two standard installation directories and opens the local page in fullscreen kiosk mode.

## Opportunities found in source review

| Baseline observation | New implementation |
| --- | --- |
| Fixed 1920×1080 stage scaled using a transform | Responsive CSS grid and type sizes retain controls at least 56×56 CSS pixels at the tested widths. |
| Hidden page overflow and disabled user zoom | Zoom remains available; smaller layouts can scroll vertically without clipping content. |
| Video background, gradients, menu tiles and multiple decorative layers | A restrained editorial composition uses forest green, ivory, brass and distinct layouts for each information task. |
| Display font stack references unbundled fonts | Two licensed variable fonts are bundled locally for consistent offline rendering. |
| Home hidden on attract and article screens | Home is visible in all three sections; section navigation shows current location. |
| No explicit `:focus-visible` or `prefers-reduced-motion` treatment located | Visible keyboard focus, focus transfer to headings, native buttons and motion preference support. |
| Script toggles screens without moving keyboard focus | Section changes move focus to the new heading; hidden screens leave the tab sequence. |
| 100-second idle reset on eligible screens, ambient audio and automatic roster scrolling | Visitors control reading pace; no automatic screen reset or scrolling. |
| Launch assumes Edge exists after its two checks | Also detects per-user Edge and reports missing Edge or index.html. |

This is a new information architecture and implementation, not a reskin. Unrequested translation/media functions were not transferred. Comparison is based on source inspection and a local browser view, not a user study or a prediction of judging scores.

## Design system

DM Sans provides clear controls and body copy; Libre Baskerville gives headings an institutional editorial character. Thin rules and restrained indexing establish hierarchy without fabricated military symbols. The Overview pairs a large statement with an ivory briefing sheet. The organization chart uses hierarchy linework and a distinct support group. Responsibilities pair a six-entry paged list with a large reading panel and eleven explicitly numbered functions.

Primary transitions last 220–250 ms and are disabled under reduced motion. Persistent section controls, Home and contextual Back provide direct navigation. Content lives in `js/data.js`, with no fetch, ES modules, service workers or runtime remote requests.
