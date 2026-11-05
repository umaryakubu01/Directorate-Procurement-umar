# Directorate of Procurement — The Command Briefing

An offline, touchscreen-first information kiosk built with plain HTML, CSS and vanilla JavaScript. No installation, build, server, database or internet connection is required to run the application.

## Open the application

Open `index.html` directly in a modern browser. Keep the complete folder together so its local scripts, fonts and icon remain available.

On the Windows presentation computer:

1. Copy the complete `directorate-of-procurement` folder to a permanent location, preferably a simple path such as `C:\Kiosks\directorate-of-procurement`.
2. Ensure Microsoft Edge is installed.
3. Double-click `prepare.bat` once to create the **Directorate of Procurement** desktop shortcut. The shortcut launches `run.bat` through `cmd.exe`, preserving the baseline shortcut approach. Redirected Desktop folders are resolved through Windows Script Host.
4. Open that shortcut, or double-click `run.bat`, to launch Edge in fullscreen kiosk mode.
5. Use Alt+F4 to close the kiosk during setup or maintenance.

The launcher preserves `--kiosk`, `--edge-kiosk-type=fullscreen`, `--no-first-run` and the baseline enterprise-mode feature flag. It adds per-user Edge discovery and clear errors for a missing browser or entry file. Windows Script Host must be enabled to create the shortcut. Taskbar pinning remains a manual OS action.

**Windows validation remains required.** Development and browser QA were performed on macOS. Neither Windows shortcut creation nor Windows Edge kiosk execution has been tested here.

## Explore

- **Overview:** establishment date, statutory basis, Office of the COAS position, institutional liaison, PPC and budget roles, and procurement administration responsibilities.
- **Organizational structure:** select the Director or any of the three main and three supporting cells. Descriptions preserve only the roles supplied in the brief. Supporting cells are grouped separately without implying that they report to particular main cells.
- **Core responsibilities:** select any of eleven entries; use list pagination or the detail arrows. The portal responsibility remains conditional on establishment of that portal.
- **Home** returns to Overview; **Back** returns to the preceding section. All controls support keyboard operation with visible focus. Section changes focus the new heading. No automatic timeout interrupts reading.

## Files

- `index.html`: semantic screen structure and persistent navigation.
- `css/styles.css`: responsive layout, local typography, focus and reduced-motion styles.
- `js/data.js`: structured content from the user-supplied brief.
- `js/app.js`: screen history, chart selections and responsibilities explorer.
- `prepare.bat`, `run.bat`: adapted Windows launch workflow.
- `assets/fonts/`: DM Sans and Libre Baskerville variable fonts, with SIL Open Font Licenses.
- `assets/icons/app.ico`: original geometric application icon, not official insignia.
- `AUDIT.md`: baseline analysis and design rationale.
- `qa/`: validation report, browser evidence and screenshots.

## Content and assets

The supplied brief is the content authority. Editorial titles summarize the eleven supplied responsibilities; the full descriptions preserve their wording. Sequential numbers 01–11 replace the source's letter enumeration without inventing a missing K. No officers, contract values, procurement statistics or extra unit functions have been added.

The palette is a design proposal, not a claim of official branding. The DP mark and icon are typographic/geometric identifiers, not military insignia. No reference-project photographs, crests, video or audio are redistributed. Fonts are locally bundled from the Google Fonts repositories (`ofl/dmsans` and `ofl/librebaskerville`) under their included licenses.

## Submission checklist

- Run the Windows steps above on the actual presentation machine.
- Confirm touch responsiveness and readability at the installed screen's scaling and viewing distance.
- Confirm final content and proposed branding with the Directorate.
- Keep the full application folder intact; `qa/` is evidence and is not required at runtime.
