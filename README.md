# This project is for a Bank Management Backend System.

## Project Setup:

```
npm init -y
npm install prisma typescript ts-node @types/node --save-dev
npx tsc --init
<!-- npx prisma  -->
npx prisma init
```
### For Prisma Generate and Migration

```
npx prisma migrate dev --name init
```

### Prisma Client

```
 npm i @prisma/client
 npx prisma studio
```