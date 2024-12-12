@echo off
setlocal enabledelayedexpansion

REM Set the version of Node.js to be installed
set "nodeVersion=v20.10.0"

REM Set the path where Node.js will be installed
set "installPath=C:\Node"

REM Create the installation directory if it doesn't exist
if not exist "%installPath%" mkdir "%installPath%"

REM Download and install Node.js
echo Installing Node.js...
bitsadmin.exe /transfer "NodeInstaller" https://nodejs.org/dist/%nodeVersion%/node-%nodeVersion%-x64.msi "%installPath%\node-installer.msi"
msiexec.exe /i "%installPath%\node-installer.msi" /qn /norestart

REM Add Node.js and NPM to the system PATH
set "nodePath=%installPath%\nodejs"
set "npmPath=%installPath%\nodejs\node_modules\npm\bin"
set "path=%path%;%nodePath%;%npmPath%"

REM Display Node.js and NPM versions
node -v
npm -v

echo Installation complete.
exit /b 0
