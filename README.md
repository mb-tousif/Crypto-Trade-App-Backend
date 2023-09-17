# This project is for a Crypto-Trade-App Backend.

## Description

This is a backend for a Crypto Trade App where user can invest their money for trading purpose. It is built with implementing CRUD operations, used `$transaction` for logical groups of processing data in *Mongodb* that needs to encapsulate several operations, pagination and filtering using *Prisma*, *MongoDB*, *Typescript* and *Express*.

## Features

- [x] Implemented CRUD operations
- [x] Implemented Authentication and Authorization
- [x] Implemented Pagination and Filtering
- [x] Implemented `$transaction` for logical groups of processing data in *Mongodb* that needs to encapsulate several operations.
- [x] Implemented `Zod` for validation
- [x] Implemented `JWT` for authentication
- [x] Implemented `Bcrypt` for hashing password
- [x] Implemented `Prisma` for ORM
- [x] Implemented `Typescript` for type checking

## Technologies Used

- [x] Express.js
- [x] Typescript
- [x] Prisma
- [x] MongoDB
- [x] Zod
- [x] JWT
- [x] Bcrypt

## Entity Relationship Diagram

<p>
<img src="./ERD.svg" align="center" width="100%" height="100%" style="border-radius: 30px;">
</p>

## Project Setup:

```
npm init -y
npm install prisma typescript ts-node @types/node --save-dev
npx tsc --init
<!-- npx prisma  -->
npx prisma init
```

### Prisma Client

```
 npm i @prisma/client
 npx prisma studio
```

### Generate Prisma Client

```
    npx prisma generate
```

### This is a link to the backend API hosted on vercel [Live Site](https://investor-trading.vercel.app/)

## API Endpoints

### User

- [x] Create User `POST /api/v1/auth/register` [All users]
- [x] Login User `POST /api/v1/auth/login` [All users]
- [x] Get All Users `GET /api/v1/users` [Only admin]
- [x] Get User by id `GET /api/v1/users/:id` [All users]
- [x] Update User `PATCH /api/v1/users/:id` [Only admin]
- [x] Delete User `DELETE /api/v1/users/:id` [Only admin]

### Deposit

- [x] Create Deposit `POST /api/v1/deposits/createDeposit` [only user & admin]
- [x] Get All Deposits `GET /api/v1/deposits` [only admin]
- [x] Get Deposit by id `GET /api/v1/deposits/:id` [Admin, user, investor, staker]

### Referrals

- [x] Create Referral `POST /api/v1/referrals/createReferral` [only staker & admin]
- [x] Get All Referrals `GET /api/v1/referrals` [only admin]
- [x] Get Referral by id `GET /api/v1/referrals/:id` [Admin, staker, investor]

### Staking

- [x] Create Staking `POST /api/v1/stakers/startStaking` [only staker, investor, admin]
- [x] Get All Stakes `GET /api/v1/stakers` [only admin]
- [x] Get Stake by id `GET /api/v1/stakers/:id` [Admin, staker, investor]

### Stake Reward

- [x] Create Stake Reward `GET /api/v1/stake-rewards/stakeRewards` [Only admin]
- [x] Get All Stake Rewards `GET /api/v1/stake-rewards/all` [Only admin]
- [x] Get Stake Reward by id `GET /api/v1/stake-rewards/:id` [Admin, staker, investor]

### Income

- [x] Get All Incomes `GET /api/v1/incomes/all` [only admin]
- [x] Get Income by id `GET /api/v1/incomes/:id` [Admin, staker, investor]
- [x] Update Income `PATCH /api/v1/incomes/:id` [Only admin]

###### Do not forget to feedback or starred if you like it.