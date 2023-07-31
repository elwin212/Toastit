# Toastit

![Toastit Logo](/public/toastit192.png)

Toastit is a web application that aims to replicate some of the core features of Reddit, allowing users to post, discuss, and vote on content.<br>
**Please note:** Many features are still in progress and the application is actively being developed.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Dev Setup](#development-setup)

## Features

- User registration and login
- Creating, editing, and deleting posts
- Commenting on posts
- Upvoting and downvoting posts and comments
- Sorting posts based on popularity and time

## Demo

You can find a live demo of the application [here](https://toastit-dusky.vercel.app/).

## Technologies Used

- Frontend: React with Next.js, Tailwind CSS
- Backend: Node.js, Express.js
- Language: TypeScript
- Database: AWS RDS with PostgreSQL
- Cache: upstash

## Development Setup

To run the PostgreSQL database in Docker during development, you can use the provided Docker Compose file:

Make sure you have Docker installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/elwin212/toastit.git
cd toastit
```

2. Install dependencies:

```bash
npm install
```

3. Set up the docker:

```bash
docker compose up -d
```

4. Generate prisma:

```bash
npx prisma generate
```

5. Create database:

```bash
npx prisma db push
```

6. Run on local:

```bash
npm run dev
```

Open your web browser and visit http://localhost:3000 to access the application.
