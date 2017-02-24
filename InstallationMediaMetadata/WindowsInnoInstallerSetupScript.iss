; Script generated by the Inno Script Studio Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{AB8896B4-6E3B-495C-8ADF-1496766E2B95}
AppName=MarkSearch
AppVersion=2017.2.24
AppPublisher=Coop
AppPublisherURL=http://darkle.github.io/MarkSearch/
AppSupportURL=http://darkle.github.io/MarkSearch/
AppUpdatesURL=http://darkle.github.io/MarkSearch/
DefaultDirName={pf}\MarkSearch
DefaultGroupName=MarkSearch
OutputDir=C:\Users\Merp\Coding\MarkSearch\packagesForPlatforms\WindowsInstaller
OutputBaseFilename=MarkSearch-Windows(64)-Installer
SetupIconFile=C:\Users\Merp\Coding\MarkSearch\frontend\static\images\favicons\favicon.ico
Compression=lzma
SolidCompression=yes
MinVersion=0,6.0
ArchitecturesInstallIn64BitMode=x64
ArchitecturesAllowed=x64

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\MarkSearch.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\d3dcompiler_47.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\ffmpeg.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\libEGL.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\libGLESv2.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\node.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\xinput1_3.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\natives_blob.bin"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\snapshot_blob.bin"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\icudtl.dat"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\LICENSE"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\version"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\LICENSES.chromium.html"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\blink_image_resources_200_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\content_resources_200_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\content_shell.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\ui_resources_200_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\views_resources_200_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\am.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\ar.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\bg.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\bn.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\ca.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\cs.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\da.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\de.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\el.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\en-GB.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\en-US.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\es-419.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\es.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\et.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\fa.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\fake-bidi.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\fi.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\fil.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\fr.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\gu.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\he.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\hi.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\hr.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\hu.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\id.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\it.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\ja.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\kn.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\ko.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\lt.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\lv.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\ml.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\mr.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\ms.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\nb.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\nl.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\pl.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\pt-BR.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\pt-PT.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\ro.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\ru.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\sk.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\sl.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\sr.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\sv.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\sw.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\ta.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\te.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\th.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\tr.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\uk.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\vi.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\zh-CN.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\locales\zh-TW.pak"; DestDir: "{app}\locales\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\resources\app.asar"; DestDir: "{app}\resources\"; Flags: ignoreversion
Source: "..\packagesForPlatforms\MarkSearch-win32-x64\resources\electron.asar"; DestDir: "{app}\resources\"; Flags: ignoreversion

[Icons]
Name: "{group}\MarkSearch"; Filename: "{app}\MarkSearch.exe"
Name: "{group}\{cm:UninstallProgram,MarkSearch}"; Filename: "{uninstallexe}"
Name: "{commondesktop}\MarkSearch"; Filename: "{app}\MarkSearch.exe"; Tasks: desktopicon

[Run]
Filename: "{app}\MarkSearch.exe"; Description: "{cm:LaunchProgram,MarkSearch}"; Flags: nowait postinstall skipifsilent

[Dirs]
Name: "{app}\locales\"
Name: "{app}\resources\"
