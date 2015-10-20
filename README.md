Run `npm run-script server` to run the game server.

Open the XCode project and run it to run the game client.

There's a good chance you'll want to run multiple clients at once.
To do that, first run the client from XCode for two different
simulated devices (not at the same time). Then:

* Run a simulator in XCode
* `cd /Applications/Xcode.app/Contents/Developer/Applications`
* `open -n Simulator.app`
* In Hardware -> Device, select the resolution that you ran before but
  you are not currently running via XCode