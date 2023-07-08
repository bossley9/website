---
title: "sn"
description: "sn: a simple syncing client for Simplenote"
date: 2023-01-04T13:33:00-07:00
tags:
  - "simplenote"
  - "golang"
  - "diff"
  - "project"
  - "tech"
---

I've been working quietly on this project for over six months and today marks the final release of changes required for me to consider the project finished. This project is none other than **sn**, my Simplenote syncing client.

https://github.com/bossley9/sn

I started this project early last summer because I wanted to be able to sync text across all my devices. The benefits of having text syncing are obvious: real time grocery list syncing, jotting down notes for later, saving links to look at on desktop, and of course, writing while on the train to work (which I do frequently). My criteria for a perfect note-taking system was as follows:

* Cross-platform. Easily accessible notes on iOS, Android, Windows, MacOS, the various Linuxes, and OpenBSD.
* Accessible from the command line or a file browser. I shouldn't need to open an electron application or web browser to view my notes on my laptops or desktop.
* Free. I shouldn't have to pay money for a text syncing service (or I should at least be able to host it myself).
* Fast. If the service I use can't display text information in less than five seconds , it's not worth using.

I was frustrated with the existing alternatives. iCloud notes is essentially DRM-locked to only Apple products and iCloud storage is not free, not to mention inaccessible from terminal. Evernote's phone app simply became too slow. Notion is browser-only and prone to UI bugs (not to mention their new public API isn't very robust). Joplin is close, but requires FUSE and doesn't work pleasantly with non-Linux operating systems. Google Keep isn't command-line accessible without drive sync which I do not wish to activate.

The closest alternative I could find was Simplenote, a real-time websocket-syncing note-taking app. This was the alternative I chose because it met almost all criteria: it was accessible via browser site on all platforms with highly performant iOS and Android apps, cost no money to create an account or maintain it, and was blazing fast due to its websocket syncing. As an additional bonus, Simplenote is owned by Automattic and is open source. Simplenote's only flaw was its inability to be accessed from the command line. This is where sn comes in.

## Design

I designed sn as a command-line syncing client for Simplenote to make text notes accessible and editable in Vim. Focusing on portability and speed, I chose Golang to implement the client because its toolchain is relatively mundane to set up and It is compatible on all operating systems I use including OpenBSD. It also is a statically-typed compiled language, providing speed and type safety out of the box.

I wanted its usage to be synchronous in opposition to its websocket implementation because I wanted to perform each action atomically (download notes, sync notes, upload changes, clear auth, and so on). Simplenote communicates and stores data via [Simperium](https://simperium.com/) and although they provide a public HTTP API, it doesn't work the way it's describe in the documentation. Confusing documentation was a reoccurring theme throughout my development cycle (see [here](https://github.com/bossley9/sn/blob/f7f31cb8ed29e50ba3256842098d539c367d6dd3/pkg/client/localdiffs.go#L49-L51) and [here](https://github.com/bossley9/sn/blob/f7f31cb8ed29e50ba3256842098d539c367d6dd3/pkg/client/client.go#L134-L135)). For the initial MVP, I stuck to sending websocket messages as synchronous API calls and used this pattern for the rest of the project.

I was initially worried about having to store a plain text username and password. Fortunately, Simperium performs authentication using tokens, and generating a token only requires a single HTTP API call. Now that I host my own Bitwarden instance, I also added support for inputting a Bitwarden master password if the Bitwarden client is detected.

I chose to have note data stored as markdown text files in an arbitrary directory with all significant note metadata stored in `$XDG_DATA_HOME` (`~/.local/share`) as JSON for easy parsing and debugging. It also stores duplicate notes required for diffing in a `.git` folder since most IDEs ignore that folder.

## Golang

I had barely used Golang before working on this project and I'm grateful I chose this language. The Golang language has a pleasant syntax and is very beginner-friendly. It is a compiled language naturally centered around multi-threaded processing (called "goroutines"). Channels and contexts are a fantastic idea for communication between threads.

```go
func DoSomething() error {
  ctx, cancel := context.WithTimeout(context.Background(), time.Second*4)
  defer cancel()
  errChan := make(chan error)

  go func() {
    if err := DoSomethingThatTakesALongTime(ctx); err != nil {
      errChan <- err
    }
    errChan <- nil
  }()

  for {
    select {
    case <-timedContext.Done():
      return errors.New("async function timed out.")
    case err := <- errChan:
      return err
    }
  }
}
```

Golang's error handling is another wonderful feature. It prevents deeply nested errors and forces you to write clean error handling at the moment an error is found.

```go
err := someFunction()
if err != nil {
  // do something
}
```

It's nice that they also allow multiple return values in functions.

```go
func MyFunc() (string, error) {
  return "Hello world", nil
}

func main() {
  value, err := MyFunc()
  if err != nil {
    return
  }

  fmt.Println(value)
}
```

My main criticism of the Go language is its impartiality to file structure. Coming from languages such as Typescript or C which require explicit file imports to use functions and constants, it was confusing to me to learn that all files in a package automatically import each other. In addition, it was hard for me to wrap my head around the idea of importing relative packages in a project.

## Diffs

How do you tell if a file has been edited, and if so, what parts were edited? This is what **diffs** are: a formula for how to change a file from state A to state B.

I learned a lot about how to track diffs over the course of this project and heavily relied on the principles from [Myers' Diff Algorithm](https://sam-bossley-us-media.sfo3.cdn.digitaloceanspaces.com/thoughts/2023/myers-diff-algorithm.pdf). At a high level, I record two copies of each note and compare the two to generate a diff. Simperium uses a diffing format called JSONDiff I formatted my diffs to match this representation. I may write about diffs in a future article so I'll save on details but you can see [my crude JSONDiff implementation](https://github.com/bossley9/sn/blob/f7f31cb8ed29e50ba3256842098d539c367d6dd3/pkg/jsondiff/getdiff.go) to get a general sense of how diffing works.

## Conclusion

I'm really proud of this project and how it has grown over the course of a few months. I use it all the time and will continue to make tweaks or adjustments in the future as needed. Let me know if you find value in this program as well!
