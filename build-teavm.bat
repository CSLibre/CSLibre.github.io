@echo off
echo Building Java applications with TeaVM...
echo.

cd java-src

echo Running Maven compilation...
call mvn clean compile

if %errorlevel% equ 0 (
    echo.
    echo ✅ TeaVM compilation successful!
    echo 📁 Output files are in: ../teavm-output/text-demo/
    echo.
    echo 📋 Compiled files:
    dir ..\teavm-output\text-demo\
) else (
    echo.
    echo ❌ TeaVM compilation failed!
    echo 💡 Make sure you have Maven installed and Java 8+
    echo 💡 Check the error messages above
    pause
    exit /b 1
)

echo.
echo 🚀 You can now build your 11ty site with: npx @11ty/eleventy --serve
pause