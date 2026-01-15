---
layout: post
title: A Video Player, Svelte, and Lodash
date: 2020-09-01 15:48:40.825302 -0400
categories: svelte javascript
description: Rebuilding a web app in Svelte
---

I finally reconstructed the base functionality of the video player web app I've been trying to build, formerly in React, now in Svelte.

It's been a decent experience so far, given that this is my first attempt trying to build something using the Svelte, but I can't shake the feeling that it just doesn't _feel_ quite right in the way that React did. This may very well be simply because I'm not used to it, and after all, the main reason I taught myself React in the first place was because it just didn't make sense to me.

However, while Svelte does make sense to me, it just _feels_ more confusing. I really think it's that I miss React's top-down dataflow, among some other things. It was just simpler to conceptualize. Information was always going one way; I could always find the origin of a piece of data in a component, a parent component, or fed to it through a reducer. With Svelte's bindings and the way it uses stores, it kind of feels like data is just being thrown every which way, which of course is just a matter of perception. But it was easier to conceptualize the flow of data with React, I feel. The dataflow of my Svelte app reminds me of my early Angular apps (and I admit, the fact that I was new to each framework likely has a lot to do with it).

Still, while I really miss the philosophy behind React's dataflow, I also really resonate with the philosophy behind Svelte's compiler-based approach and lack of virtual DOM. I could technically recreate the one-way dataflow in Svelte but that doesn't seem idiomatic so I'm going to keep trying to get used to this way first. Things may be better once I've internalized it better (and once I learn how to write good Svelte).

I will say, though, that it hasn't taken very long for me to run into bugs in Svelte and its tooling. The functionality of my video player app depends on control of the video `currentTime`, which technically Svelte can bind to. However, I'm getting inconsistent behavior when attempting to update the `currentTime` while the video is playing (when clicking on a component corresponding to a specific timestamp) and it appears [I'm not the only one](https://github.com/sveltejs/svelte/issues/3524). The issue was reported as fixed, but it's still showing to be a problem in my Firefox (while mysteriously working fine in Chrome).

Additionally, when I enable `lang="ts"`, it takes issue with me binding to `currentTime`, saying it should be `currenttime`. I've just had to disable TypeScript in that component for the moment, which would be much more annoying if I relied more on the language.

Again, I'm willing to bear through these issues in the present for the sake of familiarizing myself with the framework. Once I have a spare moment, I may try my hand at fixing the issues myself.

Anyway, I finished this rudimentary clone of my original React app and after peeking through the Dev Tools of both apps, I made two immediate observations:

1. Both apps were running at nearly 60 fps. I'm not sure I'd ever actually measured the FPS of the React version, but regardless, this isn't entirely surprising to me. I'd done decent optimizations on the React rendering so it was pretty fast for the use case. "Fast enough." But fast enough (at least, for now) or not, I could tell that React was maybe not the best tool for the job. Like I said, the app relies a lot on the video time which obviously is constantly changing. A framework that by default tries to re-render entire DOM trees whenever state changes is probably not the best to handle this sort of thing.

    The React version runs at 60fps, yes, but it does so with the update function for the `currentTime` state throttled to every 200ms, and with a lot of `shouldComponentUpdate`s. Svelte gives me the same thing without needing all the boilerplate. The React version just uses component state and currently utilizes the `currentTime` state in one area, making it easy to optimize. Imagine if I was putting it in a global store; I'd need to define custom `shouldComponentUpdate`s everywhere. With Svelte, none of that is necessary.

    That's why, as soon as I heard of Svelte, I wanted to rebuild this app with it. Not because there were any current problems with performance, but because I knew what was all going on behind the scenes and it _pained_ me. When Rich Harris said, ["As engineers, we should be _offended_ at all that inefficiency,"](https://youtu.be/AdNJ3fydeao?t=289) it really spoke into my soul. I don't want my entire app trying to diff itself every 200ms even if most of it gets blocked by `shouldComponentUpdate`. And believe me, `shouldComponentUpdate` has always been my best friend.

    Svelte binds to `currentTime` with `requestAnimationFrame` under the hood, and everything still runs at 60fps (again, for now). There's still a ton of room for improving performance down the line if I ever need to. But who knows? Maybe I'll never even need to.

2. The bundle size was nearly 80kb. 80kb? Well that's a decent amount below the React version's ~200kb, but still an order of magnitude higher than what I expected. Well, in retrospect, there was an obvious answer to this dumb question. I first tried creating a new starter Svelte app just to make sure my memory wasn't failing me and this was in fact abnormal. Built it-- bundle size was about 5kb. Okay, so I wasn't crazy.


    I tried adding a video element and some handlers/bindings to it. Maybe there was some extra Svelte machinery (75kb of it...?) that needed to be included when handling media elements and wasn't considered in most demos that didn't use video.

    Nope. Still negligible bundle size.

    I started removing things from the main Svelte app, which was ballsy considering I hadn't committed anything to git at this point. Nothing changed.

    Wait, how big is lodash? About 75kb, it turns out. That could be it.

    I removed lodash imports. 5kb. Merde.

    But wait, I had barely imported anything, just a handful of things like `import { times } from 'lodash'`, so why was it including the whole bundle? This is 2020-- isn't [tree-shaking](https://webpack.js.org/guides/tree-shaking/) a thing?

    Well it turns out [this person on StackOverflow](https://stackoverflow.com/questions/58741044/why-webpack-doesnt-tree-shake-the-lodash-when-using-import-as) had the same question. This is how I learned that the normal [lodash](https://github.com/lodash/lodash) module on npm isn't actually an esmodule and thus can't be tree-shooketh. I can't be the only person who never realized this, especially since at my last company we had also used the full `lodash` module unless we were also using [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash) and/or [lodash-webpack-plugin](https://www.npmjs.com/package/lodash-webpack-plugin) and I just never noticed.

    So PSA: WebPack can't tree-shake your lodash unless you use it with one or both of the above plugins, or you use the esmodule version of lodash aka [lodash-es](https://www.npmjs.com/package/lodash-es).

    I re-added the bits using lodash into my code, this time drawing from `lodash-es`, et voilà: 7.5kb. There's the bundle size everyone knows and loves.

    Meanwhile the React version has been awfully quiet with its 200kb.

Of course, my intention isn't to bash React or promote Svelte. At least, not in all cases, and not for everyone. For example, I personally wouldn't suggest Svelte to a new frontend developer. I would instead direct them to React, because even though React also does a lot behind the scenes, it was still essentially all JavaScript.

Which brings me to the main thing I miss about React. Bearing in mind that JSX just gets translated into function calls, React was just JavaScript. All that time working with React didn't just make me good at React-- it made me good at JavaScript.

Svelte is not JavaScript-- it's Svelte. It's its own language and gets compiled to a separate set of instructions that aren't immediately obvious from the code you write.

It was one thing to use React's synthetic events: `onClick` still feels like attaching a real event handler to a real element. But Svelte's `bind:` isn't like anything in HTML or JavaScript. You can get used to exporting your props as variables at the top of a file, but it doesn't feel like JavaScript. There's so much in there that boils down to "Because Svelte" and I'm not saying that's a bad thing, but I miss just being able to rely on my JavaScript knowledge to get me by.

<!-- Of course, that's not really true either. With React, you still have to understand the component lifecycle. You still have to internalize how to mutate state. You still have to keep the virtual DOM and render tree in the back of your mind at all times if you care at all about performance. So maybe it's just that Svelte has so much more to keep in mind under the hood, or maybe it's just that I'm still getting use to it. Or both.

I would recommend a newbie to start with React _because_ it's harder and requires more JavaScript knowledge, and that will make them a better developer in the long run. I feel like having to adhere to unidirectional dataflow helps enforce discipline in handling data cleanly. I would recommend Svelte to someone who already understands, at least somewhat, how such frameworks work and can appreciate everything Svelte does for you, especially so they know where to look when things don't quite behave as expected. I would also recommend it to someone who doesn't care about being a particularly good programmer and just wants to build a website/app. Not because you can't use Svelte and become a good programmer, but because it doesn't really require you to be, which obviously can be considered a strength, but it also doesn't particularly encourage you to be.

Then again, I suppose you could say the same about React. I'll admit my opinion is a bit colored here, and it's been a while since I've been a brand new React developer, so take all of these thoughts with a grain of salt. -->

En tout cas, my main goal here is to keep learning about and acquiring tools that fit various use cases for software development. I'm learning Svelte because the paradigm it espouses strikes me as a particularly useful and important one, especially for this application, and maybe especially for modern web development. My high school music theory teacher told our class that learning various theory concepts was essentially just adding to our "bag of tricks", and I think of these programming tools and paradigms the same way. For now, I just think Svelte is the best tool for this job.