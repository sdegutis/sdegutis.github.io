---
title: "ObjC equivalents to Swift solutions #2: Avoiding ObjC method name collisions"
---

When we created the Xcode project for our first iPhone app,[Accomplish](http://penandpapersoftware.com/accomplish/) ("the quickest & easiest todo list app"), we had to choose a language to use: Swift or Objective-C. Our first blog post details why we chose Objective-C, despite the huge popularity of Swift in the past few years.

But Swift was created because Objective-C had some flaws. One of these is avoiding _class_ name collisions without the use of prefixing, which our second blog post covers. Now we'll look at avoiding _method_name collisions.

The problem is that we might accidentally create a method in a subclass, with the same name as a _private_ method in one of our superclasses. The compiler can't warn us about this because they're not forward-declared like public methods are.

One of the most common classes you'll subclass is `UIViewController`, so let's take a look at its private methods. Let's print all their methods at runtime:

```objc
#import <objc/runtime.h>

unsigned int count;
Method* methods = class_copyMethodList([UIViewController class], &count);

qsort_b(methods,
        count,
        sizeof(Method),
        ^int(const void* a, const void* b) {
            return strcmp(sel_getName(method_getName(*((Method*)a))),
                          sel_getName(method_getName(*((Method*)b))));
        });

for (int i = 0; i < count; i++) {
    const char* n = sel_getName(method_getName(methods[i]));
    NSLog(@"%s", n);
}

free(methods); // avoid memory leaks
```

Looks like about 60% of the methods start with at least one `_`. This adds up, since Apple explicitly says they're the only ones allowed to start method or class names with underscores. So even if we wanted to use that as our solution, we can't.

Most of the remaining method names are public methods we recognize from either `UIViewController` or one of its superclasses, like`setView:`, `autorelease`, `setTitle:`, `setValue:forKey:`, and`viewIfLoaded`.

But many of them don't appear anywhere in the public method list! Some of these we wouldn't have any need for, like `containmentSupport`, but some of them we might imagine using for our own private methods, like`customTransitioningView` or `defaultPNGName`.

Well at least this proves that there is a real danger here. But first let's see if we're overreacting, maybe the runtime warns us right away like it did with class name collisions. So let's take one of the more vital-looking private methods with an easy-to-guess signature:

```objc
- (void) _doCommonSetup {
    NSLog(@"craptastic.");
}
```

Put that in a `UIViewController` subclass and watch the console prove that it is called by the system even though it's our version and not the original implementation. (This will happen when you override any private method, whether it starts with an underscore or not.)

So how can we solve it?

One solution is to use a prefix for all your own methods. Notice that none of the internal methods contain `'_'` _after_ the initial characters. Which means you can safely get away with using `x_` as your prefix. So `- (void) x_updateSomething;` should always be safe.

But it's not future-proof. Just because Apple isn't using that now, doesn't mean they won't in the future. After all, they're already using non-underscore-prefixed names right now, which they really ought not to be doing in the first place.

If you want to get super-safe, you can use your own name as a prefix:`- (void) penpapersw_updateSomething;`. Personally I think this is a bit overkill. And even though it's safer, we can do one better:

Static functions. This is the safest, because unlike with regular C functions or Objective-C methods, when you define a static function, its name doesn't even exist at the point when it's time worry about name clashes. At compile-time, it literally becomes an "anonymous" function of sorts. In fact you can have two static functions with the same name in two different `.m` files in your own project, and there's still no danger of name collision!

```objc
static void UpdateSomething(MyViewController* self, NSString* thing) {
    self.thing = [thing uppercaseString];
}
```

If you use static functions, keep in mind that even if you define it inside the body of the Objective-C class implementation, they still don't have access to any properties or ivars. So you'll still have to pass `self` as the first parameter, or at least whatever relevant data & objects it needs access to.

One thing to keep in mind is that when you start typing the type names of parameters in your static function definitions, Xcode doesn't even try to auto-complete them, so you have to type them out fully, which gets real old real fast once you've gotten used to auto-completion everywhere else.

There's one other solution, but it's pretty ridiculous: create a helper function that scours through all your own subclasses and their methods at runtime, and prints a list of all the methods you've overridden, minus the ones you've already "approved" (like`viewDidLoad`). This would be really tricky to get right while still being low-maintenance, so I'm not even going to give example code.

Phew! Now we have several solutions for avoiding accidentally overriding an important private method from within our subclass.