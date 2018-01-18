# About

Organ allows you to play an organ on your computer keyboard or via your mouse, and to record, save, play and search for tracks that you create on the organ. Feel free to play around with the [LIVE APP](https://keyb0ard.herokuapp.com/).

# Description

App features:
* Ruby on Rails + React/Flux architecture
* Playable organ coded from scratch in JavaScript, HTML and CSS
* Recordable, playable savable and searchable tracks coded in JavaScript and JSX
* Ruby on Rails back end features a purpose-built search feature, that allows the user to simultaneously search for tracks by track name and track composer name.
* Non-deletability of tracks not created by the authenticated user is enforced in the front and back ends.

React/Flux architecture features:
* State of updatable components (i.e. tracks and the organ) is coded from scratch in JavaScript stores. This approach is lighter-weight than Backbone, and more convenient than Redux in that it helps the developer avoid navigating and updating a deeply nested state tree.
* Loads and updates server-affected states exclusively via Ajax requests
* Like React/Redux, it relies on the Node EventEmitter to alert components and stores, in order to very quickly update the DOM in response to user actions and server responses
