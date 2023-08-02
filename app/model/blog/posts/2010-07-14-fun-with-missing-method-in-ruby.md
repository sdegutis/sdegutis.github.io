---
title: "Fun with missing\\_method in Ruby"
---

```ruby
class Fun
  def initialize(sym)
    @str = sym.to_s
  end
  def method_missing(symbol, *args)
    Fun.new("#{self} #{Fun.new(symbol)}")
  end
  def to_s
    @str
  end
end

def method_missing(symbol, *args)
  Fun.new(symbol.to_s.capitalize)
end

# should output "This is awesome!"
puts this.is.awesome!

```