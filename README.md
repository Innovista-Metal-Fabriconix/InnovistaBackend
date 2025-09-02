# InnovistaBackend
NestJs back end

ER Digream:- https://app.diagrams.net/?src=about#G18HZI95a-0Jsg-ht6DzXHcoBsCGc6l6ph#%7B%22pageId%22%3A%22wa9LHZYvUXxbptzDQz6y%22%7D

I used Node version :- 22.0.0
1. First install the nestjs Cli tool: npm i -g @nestjs/cli
2. Create a new nestjs project: nest new project-name
3. Now We used Prisma for migration and database management: npm add prisma @prisma/client
4. Now we need to initialize Prisma: npx prisma init
5. Now Create migration files: npx prisma migrate dev --name init
6. Update the data base : npx prisma db pull
7. reset command : npx prisma migrate reset
