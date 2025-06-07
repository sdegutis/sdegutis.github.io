# Getting C++ Hello World working on Windows (a comedy && tragedy)

## Compiling Hello World

1. Download Visual Studio Installer and install Visual Studio 2022
2. Get vcpkg working and install SDL2 and get its basic hello world working
3. Learn that the titlebar isn't darkmode in SDL2 but automatically is in SDL3
4. Learn that SDL3 was finally released and that it's probably way better
5. Look for quickjs on vcpkg and find that it's not there
6. Learn of the quickjs-ng fork and debate which one to use
7. Download quickjs from either place and guess which files are sources

## Getting key bindings working

1. Try writing a few lines of code in Visual Studio for more than 3 minutes
8. Realize it's like learning emacs or vim all over again ughhhhhh no thanks
9. Enable `Visual Studio Code` keymapping for Visual Studio and try that
10. Rejoice for about 5 minutes and enjoy using VS as if it were VS Code
11. Realize that about 50% of the keybindings do absolutely unrelated things
12. Learn that comment-lines doesn't work if the first line is whitespace

## Alternative: *not* using Visual Studio

1. Uninstall Visual Studio from the Installer
2. Install CMake from its installer on its website
3. Install Clang/LLVM from its installer on its website
4. Compile hello world and see that it can't find iostream
5. Download and install MSYS2
6. Uninstall MSYS2 since it literally didn't do anything to fix this
7. Install Visual Studio Preview from the Installer by accident
8. Uninstall VS Preview and install VS non-Preview
9. Repeat steps 1-8 about 15 times for 2 or 3 hours with slight variations

## Visual Studio Code integration

1. Give up on using Visual Studio entirely and install VS Code
2. Find the tasks.json fix so you don't have to open VS Code from dev-prompt
3. Install the C++ and CMake extensions for VS Code
4. Note that these extensions point out that Visual Studio is basically better
5. Add a questionable launch.json to debug the exe that CMake auto-updates or something

## Upgrading to Conan

1. Find quickjs in Conan and learn that it's fuller than vcpkg
2. Download and install Conan and hope the default profile is fine
3. Create a conanfile.txt and add SDL3 by copy/pasting from Conan's site
4. Run `conan install .` and see that it works but now Visual Studio doesn't run
5. Notice that VS's F5 now only has `conan-release` and also it does nothing

## Bonus: Using WSL2

1. Install WSL2
2. Restart your whole computer
3. Install Ubuntu 24
4. Run `sudo snap install cmake` and hesitantly add `--classic` when it says to
5. Find that Clang/LLVM 18 is supported
6. Download clang/llvm 20 from the website
7. Read the website's instructions for how to install it
8. Delete the 1gb file and give up
9. Install gcc since it apparently has better C++23 support now anyway somehow?

This list is not complete. Please let me know if I missed anything.
