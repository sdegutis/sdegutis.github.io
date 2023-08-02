---
title: "Language implementation"
---

[The implementation of Lua 5.0](http://www.tecgraf.puc-rio.br/~lhf/ftp/doc/jucs05.pdf)is an excellent read for anyone curious about language implementation. It explains much of how Lua is implemented.

Particularly interesting to me is the design of their register-based virtual machine, the internal representation of Lua values, and how they enable closures.