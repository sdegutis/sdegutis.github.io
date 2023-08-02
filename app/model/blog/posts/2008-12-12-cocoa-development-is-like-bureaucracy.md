---
title: "Cocoa Development is like Bureaucracy"
---

I thoroughly enjoy analogies. They help me relate new concepts to ones I already grasp fairly well, which makes learning them a lot easier. I've been learning Cocoa for some time now, and I recently thought of an analogy that really helps me out. (Disclaimer: this may be a somewhat simplified version of real life; it's meant for educational purposes, not for historical accuracy.)

### Encapsulation: "You do your job, I'll do mine"

This is a very simple concept, yet sometimes it's one of the hardest ones for newcomers to the platform to be able to stick to. The concept is basically "don't tell me how to do my job and I won't tell you how to do yours." For example, let's say you are the mayor of a little town, and you tell the Post Office that a new outgoing-mailbox needs to be put near the new school. The message in Objective-C would look something like this:

```objc
PostOffice* postOffice;
School* newSchool;

[postOffice addMailboxNearBuilding:newSchool];
```

Very simple code, right? Just a single line. The mayor doesn't tell the Post Office where to obtain the mailbox from, or what time and day to install it, or where exactly it should go.

Likewise, in order to figure out where to put the new mailbox, the Post Office doesn't steal the school's blueprints out from the superintendent's desk, he asks for it. Then the Post Office would need to use the blueprint and mark on it where the mailbox should go, and continually ask the New School if the location is acceptable. If it were in code, this line would be something like this:

```objc
BluePrint* bluePrint;

// when there are no public accessors, some may be tempted to do this:
bluePrint = [newSchool valueForKey:@"bluePrint"];

// or this (assuming such a method exists in a *private* API)
bluePrint = [newSchool _bluePrint];

// however, both are incorrect most of the time.
// this is the appropriately encapsulated version
bluePrint = [newSchool bluePrint];

// if there was no publicly available API, then the job ends here, and
// you fire the school’s superintendent for not providing you a blueprint.

// now keep trying locations until the school accepts one
NSPoint mailboxLocation;
BOOL locationIsAcceptable;

while (locationIsAcceptable == NO) {
        mailboxLocation = [self nextIdeaForMailboxLocation];
        locationIsAcceptable = [newSchool canAddMailboxAtPoint:mailboxLocation];
};

[self addMailboxToPoint:mailboxLocation];
```

This will work just fine, but doesn't it seem like it's a little too much work on the Post Office's part? This loop is another more common place that encapsulation is broken, although not as obvious as the lines directly above it. What it _should_ be is more like this:

```objc
NSPoint mailboxLocation = [newSchool availableLocationForMailbox];
[self addMailboxToPoint:mailboxLocation];
```

As you might notice, this is much less work on the Post Office's job, and in all, much more logical. You have less code to introduce your own bugs in, which is especially good, because if something goes wrong with the installation location, you can just blame the school! To sum this up with a simpler analogy, when designing your own Public APIs for your own use, don't let your objects reach inside someone else's pockets for gum. Make them ask politely, and put all the logic and verifying and double-checking onto the receiver of the question, not the asker.

### Delegate Providers: Interns of the Code World

Delegation can sound like a scary concept to someone who hasn't ever read or heard its definition before. More or less it means a person (or object, in this case) who is responsible for answering a question or reporting to someone else.

Let's say you work at a local newspaper, and there's a new intern, Little Timmy, who is all grow'd up now and ready for his first taste of the real world, where [bread and cheese come a'plenty](http://en.wikipedia.org/wiki/Rags%5Fto%5Friches). But, he has to earn it, so he gets an internship, specifically interning under you, the experienced journalist. This is great news because before, you always had to sit outside and keep your eyes and ears out for any good stories to come across your way. That cut down on your writing, because you just didn't have enough time to write the quality articles you _know_ you can do. Now, you can have the new intern go sit outside and watch for interesting stories to cross his path, while you sit down and work on the one you already have in your hands. When he finds one, he will report to you, and you will write it up until the next one comes across. Because of all this new free time you have during your work day, you end up writing such quality work that you win the Pulitzer. The code would look something like this:

```objc
- (void) awakeFromBed {
    Intern* newIntern = [Intern internWithName:@"Little Timmy"];

    [newIntern setDelegate:self];
    [newIntern beginWatchingForStories];
}

- (void) intern:(Intern*)intern informsOfStory:(Story*)goodStory {
    [self writeAboutStory:goodStory];
}
```

What a simple and easy job you have! Well, not exactly: that statement ignores the long and complex -writeAboutStory: method you've developed over the years (which I've omitted for the sake of briefness). But the good news is that now, that task takes up the majority of your time so you can focus on improving it until you get rich and retire early.