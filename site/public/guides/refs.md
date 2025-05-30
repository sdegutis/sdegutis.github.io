# Understanding Refs

Refs lend themselves extremely well to reactive GUI programming.

This guide explains how they work and shows some basic recipes.

### Basics

A ref is like a pointer that has `.val` and `.set(val)`

::: runcode 120 50
```tsx
import { $, print } from '/api.js'

const r = $(0)
print('val is', r.val)  // val is 0

r.set(r.val + 1)
print('val is', r.val)  // val is 1
```
:::

You can use the convenience getter/setter `value`

::: runcode 120 50
```tsx
import { $, print } from '/api.js'

const r = $(0)
print('val is', r.value)  // val is 0

r.value++
print('val is', r.value)  // val is 1
```
:::

You can `.watch()` it.

::: runcode 120 50
```tsx
import { $, print } from '/api.js'

const r = $(0)
r.watch(n => print('val is', n))

r.value = 3  // val is 3
r.value++    // val is 4
```
:::

You can `.adapt()` it to another value.

::: runcode 120 50
```tsx
import { $, print } from '/api.js'

const r = $(0)
const r2 = r.adapt(n => n * 2)
r2.watch(n => print('val is', n))

r.value = 3  // val is 6
r.value++    // val is 8
```
:::

### Properties

You can back existing properties with a ref.

::: runcode 120 50
```tsx
import { $, print, makeRef } from '/api.js'

const point = { x: 0, y: 0 }
const $x = makeRef(point, 'x')

$x.watch(x => print('val is', x))

point.x = 10  // val is 10
point.x++     // val is 11
```
:::

You can even back class properties.

::: runcode 120 50
```tsx
import { $, print, makeRef } from '/api.js'

class Point {
  x = 0
  y = 0

  $x = makeRef(this, 'x')
  $y = makeRef(this, 'y')
}

const point = new Point()

point.$x.watch(x => print('val is', x))

point.x = 10 // val is 10
point.x++    // val is 11
```
:::

In fact, all [built-in view classes](../reference/built-in-views.md#view) do this to back all their properties.

### Advanced

You can create a new ref based on multiple other refs:

::: runcode 120 50
```tsx
import { $, print, multiplex } from '/api.js'

const r1 = $(1)
const r2 = $(100)

const r3 = multiplex([r1, r2], (v1, v2) => v1 * v2)
print(r3.val) // 100

r3.watch(n => print(`${r1.val} * ${r2.val} = ${n}`))

r1.value++    // 2 * 100 = 200
r1.value++    // 3 * 100 = 300
r2.value *= 2 // 3 * 200 = 600
```
:::

You can change a value before watchers see it.

This is useful for normalizing/constraining values.

::: runcode 120 50
```tsx
import { $, print } from '/api.js'

const r = $(0)
r.watch(n => print('val is', n))
r.intercept(n => Math.max(0, Math.min(10, n)))

r.value = 9  // val is 9
r.value++    // val is 10
r.value++    // (nothing printed; no change in value)

print('val is currently', r.val) // val is currently 10
```
:::

You can make one ref defer to another.

This basically ties the two refs together.

::: runcode 120 100
```tsx
import { $, print } from '/api.js'

const first = $(10)
first.watch(n => print('first is', n))

print(first.val) // 10

const second = $(0)

first.defer(second)  // first is 0
first.value++        // first is 1
second.value++       // first is 2

print(first.val)  // 2
print(second.val) // 2

second.watch(n => print('second is', n))

first.value++   // first is 3
                // second is 3

second.value++  // first is 4
                // second is 4
```
:::
