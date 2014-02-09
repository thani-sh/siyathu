Siyathu - Online Realtime Video Mixer
===

![](http://development.ss14-team-140.divshot.io/site_assets/images/siyathu.svg)

Siyathu is an online live video mixing web app which reduces the cost of high end hardware and software by providing a lightweight infrastructure for live video production. Siyathu is suitable for both professionals as well as for simple tasks which require mixing multiple video sources.

Guidelines for Judges
---

- Siyathu is a static web app which uses WebRTC for peer to peer communication.
- WebRTC is used with [WebRTC Meeting](https://github.com/muaz-khan/WebRTC-Experiment/tree/master/meeting) by Muaz Khan.
- The app has 3 kinds of users
	- **Editors**: Users who manage and mix video content (by default, the channel owner).
	- **Publishers**: Users who stream video to the mixer using WebRTC supported devices.
	- **Viewers**: The mixer also supports re-streaming video to other devices.
- The app can be accessed from [this Divshot instance](http://ss14-team-140.divshot.io/)
- Scroll down and create a new channel and click on the join button.
- Share the publisher link with your friends or use another device.
- Current video can be switched by clicking on previews of incoming video streams.
- The channel will be active only as long as the editor is online.
- *The browser may ask for permission to access media devices a few times.*

Contributors:
---
> Quatorz Team

Tested Browsers:
---
> Chrome Version 32.0.1700.107 m (Windows 7, Ubuntu Linux)
> Chrome for Android (Android 4.4)

Version
----
0.01

Credits:
----
- Muaz Khan for [WebRTC Meeting](https://github.com/muaz-khan/WebRTC-Experiment/tree/master/meeting) and other WebRTC resources.

License
----
GNU GPL V3
