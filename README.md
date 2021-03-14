# mern_forum
Assessment done by MERN Stack

1) git clone https://github.com/EruliaF-NMG/mern_forum.git
2) Back-end Codes are avilable in mern_forum/backend-server
3) Fornt-end Codes are avilable in mern_forum/frontend 
4) Database back up avilable in mern_forum/db_backup
5) Fornt-end react app runs on port 3000 -> http://localhost:3000/
4) Back-end server runs on port 4000 -> http://localhost:4000/
5) swagger Document runs on -> http://localhost:4000/api-docs

Run Backend Server
1) cd ./backend-server
2) run npm install
3) import the database backup avilable on "mern_forum/db_backup" directory 
4) to import backup type :-  "mongorestore --db <database-name>  --verbose <directory-parth>"
   eg:- mongorestore --db merntest  --verbose ./db_backup/merntest
6) copy example.env and replace as .env 
7) change .env values for database 
   eg:- DB_DATABASE=merntest
8) npm run development
9) to access swagger Document :- http://localhost:4000/api-docs

Run Frontend Server
1) cd ./frontend
2) run npm install
3) if you change the backend server running port then update it on .frontend/src/config/core.config.js  apiBaseURL variable

Admim user
email :- nisal.nmg@gmail.com
password :- 12345

Normal user
email :- hasaf38@gmail.com
password :- 12345
