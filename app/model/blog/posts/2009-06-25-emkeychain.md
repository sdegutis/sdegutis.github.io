---
title: "EMKeychain"
---

The [sole developer](http://brianamerige.com/) over at [ExtendMac](http://extendmac.com/) wrote a bunch of open source components, including [EMKeychain](http://extendmac.com/EMKeychain/) which is very very useful if you deal with passwords at all in your Cocoa app. Despite its usefulness though, something seemed a little off about it every time I've used it in the past year.

EMKeychain comes with 2 classes, EMKeychainProxy and EMKeychainItem. The latter is where almost all the work is done, and the former is.. well it lets you access the latter. A few days ago I thought about what exactly was unsettling about it, and almost immediately I realized that this EMKeychainProxy class was it.

Traditionally, a class has _instance methods_ which let you access properties and aspects of a class's instance (ie, an "item") and _class methods_ which let you derive instances of that class (either creating, or retrieving) based on given properties. EMKeychain splits this into two classes, rather than one class with class methods and instance methods. That's weird.

So, I fixed this in my github fork of EMKeychain. There is now EMKeychainItem and its two subclasses (for generic- and internet-based keychain items), and EMKeychainProxy is now dead, having been assimilated and/or integrated into EMKeychainItem et al in the form of class methods.

Feel free to use that source code, I hope it helps to makes your life easier and less confusing, just as it's helped me.