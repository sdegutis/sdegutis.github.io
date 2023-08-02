---
title: "Ambiguities in Programming Language Grammars"
---

Okay, let's get straight to it, because fluffy writing just isn't compatible with my semi-autistic brain. This blog post **explains what programming language ambiguities are, how they happen, and how to avoid them when designing a programming language grammar.** There's literally no point in me writing it, because you'll only want to read on ahead if you're into amateur programming language design, but only mildly, and thus spend no time trying to figure this out yourself, since otherwise you'd have already known everything written here.

We'll use good old trusty EBNF for our simple language.

If you've forgotten or don't know EBNF, it's mostly self-explanatory. The `::=` makes a definition. The `|` means it can be either the thing on the left or the thing on the right. Literal strings are enclosed in single-quotes. The `{...}` syntax allows 0 or more of these things. The `[...]` syntax allows 0 or 1 of these things. And sometimes`(...)` is needed to groups things, to disambiguate the `|` thing.

So, given the following grammar:

```ebnf
expr ::= Number | Symbol | array | assignment ;

assignment ::= Symbol '=' expr ;

array ::= '[' [expr {',' expr}] ']' ;
```

We could then write:

```ruby
a = 0
b = [1, 2, 3]
c = []
```

Dead simple stuff here. You have variables ("symbols"), numbers, assignments, and arrays.

To keep things super simple, let's just say a Symbol can only be `a`through `z`, and a number can only be `0` through `9`, and both can only be one character long.

Now, what if you wanted hashmaps? Let's use the syntax `[a=1,b=2]`:

```ebnf
expr ::= Number | Symbol | array | assignment | hashmap;

assignment ::= Symbol '=' expr ;

array ::= '[' [expr {',' expr}] ']' ;

hashmap ::= '[' [assignment {',' assignment}] ']' ;
```

So now we can write:

```ruby
a = 0
b = [1, 2, 3]
c = [d = 4, e = 5]
```

But wait? What's that last line? Is it a hashmap? Or an array of assignments? Also, is `[]` an empty array, or an empty hashmap?

_Oh, the Ambiguity!!!_

Okay, so let's fix that by changing it to use `{` these `}` delimters, instead of sharing with array, and let's add a colon to separate keys from values. Nothing else is using those so far, so it should be fine:

```ebnf
expr ::= Number | Symbol | array | assignment | hashmap;

assignment ::= Symbol '=' expr ;

array ::= '[' [expr {',' expr}] ']' ;

keyvalue ::= expr '=' expr ;

hashmap ::= '{' [keyvalue {',' keyvalue}] '}' ;
```

So now we can write:

```ruby
a = 0
b = [1, 2, 3]
c = {d : 4, e : 5}
```

Great! Now that last line isn't ambiguous! Plus, now we know that `[]`is an empty array, and `{}` is an empty hashmap!

Okay, but what if we want to start using `{` these `}` delimiters for blocks of expressions grouped together?

```ebnf
expr ::= Number | Symbol | array | assignment | hashmap | block;

assignment ::= Symbol '=' expr ;

block ::= '{' [expr {';' expr}] '}'

array ::= '[' [expr {',' expr}] ']' ;

keyvalue ::= expr '=' expr ;

hashmap ::= '{' [keyvalue {',' keyvalue}] '}' ;
```

So now we can write:

```ruby
a = { 0 ; [1, 2, 3] }
b = {x : 4, y : 5}
c = {}
```

Oh crap. What is `c`? Is it the result of an empty block of code? (The grammar does allow that, mind you.) Or, is it an empty hashmap? Crap crap crappity crap.

Two simple resolutions come to mind:

1. Change the syntax for empty hashmaps. This is ugly because it creates an inconsistency. One simple example is `{:}` is an empty hashmap whereas `{}` is an empty block. Doable, but ugly.
2. Disallow empty code blocks. But empty code blocks are sometimes useful. Like, when you want to give a no-op callback function.

Solution #1 would change the grammar like so:

```diff
-hashmap ::= '{' [keyvalue {',' keyvalue}] '}' ;
+hashmap ::= '{' (':' | keyvalue {',' keyvalue}) '}' ;
```

Solution #2 would change it like this:

```diff
-block ::= '{' [expr {';' expr}] '}'
+block ::= '{' expr {';' expr} '}'
```

Okay that's it. Bye.