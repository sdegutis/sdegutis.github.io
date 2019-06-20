---
layout: base
title: "Considering removing TypeScript"
---

TypeScript has a few inherent issues:

1. Browsers don't support it, so it adds an extra build step.
2. Type-completion has gotten slower the bigger our project gets.
3. Seems to encourage tight coupling of types between modules.
4. The type system often fights with us and we have to work hard to shut it up.
5. Seems to encourage complex types instead of simpler contracts.

That said, there are a few genuine benefits:

1. It helps us catch errors like accessing properties on what's really null.
2. It helps with auto-completion in VS Code (albeit slowly).
3. Our project is already fully typed and has been for a while.

This week I spent a few minutes converting our project's TypeScript files to JavaScript files to get some intuition to help guide this decision.

1. Some files are almost entirely interface declarations, and removing them feels like a big loss.
2. A lot of types looked like they would be otherwise hard to figure out.
3. Auto-completion and type-hints in VS Code are almost useless now.
4. The code all looks *a lot* simpler and cleaner.

Overall I'm on the fence about this. If we never put TypeScript in, I'm sure we could have managed. And without it, I'm sure we could manage too. But with TypeScript, I guess the question is, are its benefits worth the trouble it's causing? I'm not sure.