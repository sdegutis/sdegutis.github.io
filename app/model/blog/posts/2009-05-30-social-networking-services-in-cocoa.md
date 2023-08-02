---
title: "Social Networking services, in Cocoa"
---

Inspired by the amazing but elderly MGTwitterEngine, I wrote my own social networking classes for Cocoa, collectively named SDSocialNetworking. You can find them at their github repo.

The main advantages are:

* Supports multiple services, not just Twitter (currently implementing [identi.ca](http://identi.ca) and friendfeed)
* Uses NSOperation and NSOperationQueue, for much-improved performance by running in background threads
* Very simple and transparent API, giving developers more control over the parameters sent to the RESTful servers, without compromising on simplicity

One of the big things is the API. It's inspired by Core Animation in that you can set up properties on a task before running it, rather than calling one of many long and inflexible related methods (as has been the case with MGTwitterEngine).

The API allows developers to quickly run a task with exactly the parameters the RESTful API declares on the other side. The Task subclasses simply map their @properties to the appropriate query variable, adds these to an NSURLRequest, and runs the task in a background thread. Your delegate methods (only 2, one for success and one for failure) are called on the main thread when the task is done. Then you can access the results (or error) on the Task object from these delegates, which also let you read the properties which set them up, giving you full context. One cool benefit of this is that a UUID is no longer needed to determine context surrounding a Task, as you can ask its `type`, `page`, `count`, etc. directly via its @properties.

You can download the code by typing the following into Terminal.app.

Here's some sample code to get you started:

```objc
- (void) awakeFromNib {
    // inside a header file, declare manager as an instance variable
    SDTwitterManager *manager;

    // create out manager, retaining it as we want it to stick around
    manager = [[SDTwitterManager manager] retain];
    manager.delegate = self;

    // this is a must for certain API calls which require authentication
    // change them to real login values or the tasks will fail
    manager.username = @"USERNAME";
    manager.password = @"PASSWORD";

    // 3 tasks can be run simultaneously
    manager.maxConcurrentTasks = 3;

    // create a basic task
    SDTwitterTask *mentionsTask = [SDTwitterTask taskWithManager:manager];
    mentionsTask.type = SDTwitterTaskGetMentions; // available types are found in SDTwitterTask.h
    mentionsTask.count = 3;
    mentionsTask.page = 10;

    // more properties (parameters) can be found inside SDTwitterTask.h, which
    // correlate directly to those found in the official Twitter RESTful API


    // run the task asynchronously
    [mentionsTask run];
}

- (void) twitterManager:(SDTwitterManager*)manager resultsReadyForTask:(SDTwitterTask*)task {
    NSLog(@"%@", task.results);
}

- (void) twitterManager:(SDTwitterManager*)manager failedForTask:(SDTwitterTask*)task {
    NSLog(@"%@", task.error);
}
```

If you find this code useful or are using it in your project, let me know! I'll put up a list of projects that use it, on a static page on my blog.