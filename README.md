This project was bootstrapped with create-rubric-app


TLDR:

- Vercel CRON hits /gather every minute
- /Gather hits the unofficial gather api and requests users
- Based on how long ago the user "last visited" -> we decide whether the user is online
- Then hit Vercel KV and see if theres a discrepency between live and db data
- If theres a discrepency, send a slack message with the update
- THEN update the KV store

- BOOM!

