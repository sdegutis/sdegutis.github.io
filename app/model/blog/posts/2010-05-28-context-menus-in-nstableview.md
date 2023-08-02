---
title: "Context Menus in NSTableView"
---

Context menus are a great way to provide a quick way to take action in a table view. In real world applications, it's nice to be able to show a specific context menu depending on the row and column that was clicked. However, NSTableView makes this a painful experience.

What NSTableView lacks is a delegate method called -tableView:menuForRow:column: which would allow you to do this. But we can fix this by subclassing NSTableView.

In the subclass, just override -menuForEvent: and get the row and column based on the NSEvent argument. Then, check if the delegate implements our new method; if so, call it. Then, return the menu that the delegate returned, or super's implementation of our delegate didn't implement our new delegate method. Easy, right?

Wrong. Technically this will work, but there's one pretty bad problem with it that makes it an unusable solution as it is so far.

Normally, if you right-click or control-click a row in a table, a blue box appears around that item for the duration that the context menu is alive, even if it's not the selected item. Try right-clicking a file in a Finder window; go ahead, I'll wait.

Our method doesn't do this. It's utterly confusing to a user which item is being acted upon. That's pretty Bad™.

Fortunately the solution is pretty simple. When we call the delegate's menu-retrieving method, if it exists, instead of returning it, we should be setting it as our own menu via `[self setMenu:returnedMenu]`. Then, regardless of whether anything was performed, we always return the super's implementation at the end of the method.

As far as I know, nobody has posted about this so far on the net. Hopefully now that this entry is here, nobody else wastes 30 whole minutes trying to figure this out like I did.