@echo off
setlocal
rem Adapted from itcentralng/timbuktu-triangle run.bat.
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%LOCALAPPDATA%\Microsoft\Edge\Application\msedge.exe"
if not exist "%~dp0index.html" (
  echo Could not find index.html. Keep this script in the application folder.
  pause
  exit /b 1
)
if not exist "%EDGE%" (
  echo Microsoft Edge was not found. Install Edge and try again.
  pause
  exit /b 1
)
set "APP_PATH=%~dp0index.html"
set "APP_PATH=%APP_PATH:\=/%"
start "" "%EDGE%" --kiosk "file:///%APP_PATH%" --edge-kiosk-type=fullscreen --no-first-run --disable-features=msEdgeEnterpriseModePolicies
endlocal
