---
title: "Class-Dump Services in Snow Leopard"
---

Earlier today I came across a tweet that mentioned that Automator can make Services in Snow Leopard. So, I jumped right on it and make 2 very convenient services for developers, which make use of class-dump. [Feel free to download them](/static/old-blog-files/ClassDumpSnowLeopardServices.zip) and try them out!

To install them, just extract the .zip file and move the 2 service files into `~/Library/Services`. To use them, navigate to the Application or Framework that you want to class-dump, right-click (or control-click) to bring up their context menu, and choose one of the two services. It will ask for a destination folder to save the folder containing the headers (or just a single header file, if that's the service you clicked at the moment) and then you'll see the headers saved right there.

Neat, eh?

(By the way, you can open the 2 service files with Automator to modify them to your likings.)

Note: you _will_ need to have already installed [class-dump (free download)](http://www.codethecode.com/projects/class-dump/), by Steve Nygard, before this will work.