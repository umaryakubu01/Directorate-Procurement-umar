# Validation report

Completed 3 November 2026 on macOS using installed Google Chrome, controlled by Playwright. See `results.json` for browser version and measurements.

## Passed

- JavaScript syntax: `node --check` on both application scripts.
- HTML: html-validate, zero errors or warnings.
- CSS: parsed successfully with PostCSS; rendered and visually reviewed in Chrome.
- All referenced HTML/CSS assets exist; both local font families load.
- All three sections checked at 1920×1080, 1366×768, 1024×768 and 390×844.
- No horizontal page overflow at any tested size. All three screens fit vertically at both required landscape sizes; smaller screens retain vertical scrolling.
- All visible controls measure at least 56×56 CSS pixels in the four tested viewports.
- Axe WCAG 2 A/AA and WCAG 2.1 AA automated scans: zero violations on all twelve section/viewport combinations. This is automated evidence, not a complete accessibility certification.
- All seven organization selections and all eleven responsibility selections work. Every responsibility body matches the structured data. Selected-detail views also fit the 1366×768 screen.
- Both list pages, previous/next detail controls, endpoint disabled states, Home and Back work.
- Enter, Space and Tab activation; focus moves to section headings; hidden screens do not remain interactive.
- Reduced-motion emulation removes the section animation; stylesheet also disables transitions and pressed transforms.
- Browser context set offline before loading `file://`; zero remote HTTP(S) requests and zero application console errors.
- Baseline source reviewed and baseline home screen inspected in the browser.

Axe's optional stylesheet preloader is disabled because it attempts XMLHttpRequest against local file URLs. Normal stylesheet loading and local fonts remain enabled and tested. No browser security flags were relaxed for application access to local content.

## Content coverage

The Overview represents all seven supplied facts plus the administration/procedure role. Organization content includes only the supplied Director, three Deputy Director main cells and three Assistant Director support cells. The explorer contains exactly eleven functions, including the conditional portal duty and further functions directed by the COAS. Source letter K was not fabricated. Headlines are editorial summaries; body text preserves the brief.

## Not performed here

- Windows execution of either `.bat` file, shortcut creation, and Edge kiosk mode.
- Physical touchscreen, target hardware performance, Windows display scaling or viewing-distance checks.
- Manual screen-reader review or user usability study.
- Formal approval of the proposed brand treatment.

Before submission, copy the full folder to the Windows presentation PC, run `prepare.bat`, open its shortcut, disconnect networking, and walk through all three sections using touch. See the main README for the complete launch steps.
