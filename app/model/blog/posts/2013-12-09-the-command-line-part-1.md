---
title: "The Command Line, Part 1"
---

I've heard many people say they prefer the UNIX command line over GUI apps. This got me thinking about the purpose of the command line. That's when I realized it:

The command line is just a REPL! And programs like `echo` or `mv` are just functions.

You invoke them by name ("echo" or "mv"). They take a variable number of arguments of any type, which are always encoded as strings. They always return exactly one value, an integer (possibly encoded as a string, but I'm not sure if it's just the shell doing that).

They also take 3 hidden parameters, which are streams of strings, used to communicate with the program while it's running. These default to stdin/stdout/stderr.

Most of these "functions" seem to be file-related. Creating files, moving or copying them, deleting them, editing them. Some of them are for string manipulation, such as `cat` and `echo`. Others are for system tasks, like logging in and out, creating users, managing user permissions.

One cool property of this system is that you can create a new "function" simply by creating a file and flipping its executable bit. This means UNIX is basically an interactive, self-modifying IDE.

So, the basic operations of an operating system seem to be: create functions, and use those functions to create more functions, and keep going until you have some really high-level functions which are generally useful, like calculators and email clients and even web browsers.

This requires functions that know how to save/load functions to disk, in a format that can be sent over networks and such. It also requires a way to pass data between functions, and a way to create new functions on the fly.

More thoughts to come.