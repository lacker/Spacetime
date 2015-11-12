##Setup

brew install node  
npm install

Use node 4.1 (iojs 3.1.1 will error when you run the server).

##Run the Game Server

npm run-script server

##Run the Client in XCode

open ios/Spacetime.xcodeproj

In Xcode, press the run button (or cmd-R). 

##Start a 2nd iOS Simulator Client

There's a good chance you'll want to run multiple clients at once. To do that

* run the client on a simulator from XCode 
* stop the run, switch simulators to any different device, and run it again

Then, open the other simulator too:

* cd /Applications/Xcode.app/Contents/Developer/Applications
* open -n Simulator.app
* In the Simulator menu, Hardware -> Device, select the resolution that you ran before but you are not currently running via XCode.