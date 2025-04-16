# Introduction

This app was created to replace cash in the board game "Monopoly"

- To use, make sure all "players" and the server are connected to the same Wifi.
- Follow the instructions below and have fun!

# Instructions

1.  Open terminal ( cmd in search )

    - type: ipconfig
    - Copy current v4 IP address

2.  Open code in VS editor

    - Paste this in:
      - ip-address.js
      - ip-front.js
    - Save both files

3.  cntrl + "`" top open terminal

    - open 2 terminals
    - navigate to /frontend in 1
    - navigate to /backend in 1

4.  Run following commands:

    - in backend folder:
      - npm start
    - in frontend folder:
      - npm run dev -- --host 192.168.0.26
      - Replace last numbers with current IP ( copied in step 1 )

5.  Navigate to the address the frontend terminal shows, and share with all "players"
    - Once logged in, everybody can make payments to eachother
    - Stats can be seen at /admin
      - can also reset the whole state from here

# Please Note

This app is optimized for mobile, use on mobile phone, or on phone mode in inspect on a browser for the best experience.
Thank you!
