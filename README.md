# Gunther
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Setup environment variables

```
DATABASE_URL= your postgre sql database url
NEXT_PUBLIC_URL=http://localhost:3000 or your productive url
NEXTAUTH_URL=http://localhost:3000 or your productive url
GOOGLE_CLIENT_ID=your google oauth client id
GOOGLE_CLIENT_SECRET= your google oauth client secret
```

### Setting up the database

This project uses Prisma as ORM; to get started you need to apply the migrations to your DB and generate the client

```
yarn prisma migrate dev
yarn prisma generate
```
