---
title: "You might not need MobX or Redux"
---

A lot of React developers have been flocking away from Redux and going towards Mobx in recent months. I’ve talked to many of them and their reason is that they wanted a simpler way to manage their state than Redux. But even Mobx gives you a lot that you just might not need!

The simple cases.
=================

1. **Passing state down** through hierarchies is the easiest thing to solve without either Redux or Mobx. If you’re only passing a property down one or two levels, you can just pass the property and “deal with it”. It may feel unclean or repetitive, but it is significantly cleaner than adding an entire dependency!
2. **Passing state upward** is the second easiest. Just create a callback and hand it to the component, and call it from the child component. You can even pass this down a few levels if you need! In cases where you _know_ it’s only going to ever be used once, you can use a singleton, like a dark/light theme switcher (highly recommended as an accessibility feature by the way, since many of us have sensitive eyes!).
3. **Passing state to the side** is a variation on the previous two. Pass data to parent through a callback, which just passes the state to another child component.

But what about events?
======================

Yes, you will eventually need to handle events, whether from the user or from the server or from long distance components across your hierarchy. This is a big reason people mention they think they need something more complex than setState. But you can still do without it!

**Receiving a stream of events**, such as chat messages in a chatroom app, would be messy with just setState. But it’s much cleaner if we introduce a separate, non-state-related dependency: [RxJS](https://www.npmjs.com/package/rxjs), part of the [ReactiveX](http://reactivex.io/) project.

What RxJS gives you is the ability to create “streams” of data. Taking this chatroom example, say you’re building the message list component, which shows all messages you ever received from the server since loading.

First we receive messages from the server. We could just store it in an array:

```typescript
const messages = [];
socket.on('new message', message => {
  messages.push(message);
};
```

But we can do better. Let’s use ReplaySubject. The [docs for this](http://reactivex.io/documentation/subject.html) say:

> ReplaySubject emits to any observer all of the items that were emitted by the source Observable(s), regardless of when the observer subscribes.

In other words, you can push to it all you want, and anyone who subscribes gets all past, present, and future items (chat messages). Perfect! Pushing to a ReplaySubject is almost identical to the array version we had before.

```typescript
const messages = new ReplaySubject();
socket.on('new message', message => {
  messages.next(message);
};
```

Now we just have to subscribe in the component:

```typescript
class MessageList extends React.Component {
  state = {
    messages: [],
  };
  componentDidMount() {
    this.subscription = messages.subscribe(message => {
      this.setState(state => (
        { messages: [...state.messages, message] }
      ));
    })
  }
  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  render() {
    // ...
  }
}
```

That’s it! Just subscribe when mounting, unsubscribe when unmounting, and use the simple and intuitive setState we all know and love!

(Thanks to Chris Thomas for pointing out that we need the asynchronous version of setState to avoid race conditions! We need to pass a function to setState that takes the previous state, because if setState runs asynchronously, then this.state may contain stale data! The above code has been updated.)

But what about other types of events? RxJS has several types of [subjects](http://reactivex.io/documentation/subject.html):

* BehaviorSubject sends the most recent item and all future items to every subscriber. Useful when you don’t care about the history of some state change, but need to know what it’s current and future states are.
* PublishSubject sends you everything it gets after you subscribed, and nothing before that. Good for things like game state changes.
* AsyncSubject waits until the stream is closed, then sends all subscribers the last value it received. For times like when you need to fetch a single value from the server, but multiple components want to know what it is.
* ReplaySubject which we already looked at with code samples.

There’s a lot more to ReactiveX (and the JS version, [RxJS](https://rxjs-dev.firebaseapp.com/guide/overview)), but even just using this little bit, we can already see how to cleanly implement our own state management on top of setState.

The main thing to realize is that state management is all about sending messages through pipes on one end, and one or more components receiving messages on the other end. This is why ReactiveX is a great fit for helping you write your own minimalist, home-grown state management in React!
