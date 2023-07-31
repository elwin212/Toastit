# Toastit - Web Application for Content Sharing and Discussion

![Toastit Logo](/public/toastit192.png)

Toastit is a modern web application that closely resembles Reddit, providing users with a platform to create, post, and upvote content across various interest groups.<br> The application is built using cutting-edge technologies, including Next.js, Typescript, AWS RDS, Prisma, and Cache storage for optimal performance and user experience.<br>
**Please note:** Many features are still in progress and the application is actively being developed.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Dev Setup](#development-setup)

## Features

- 📝 **Content Creation**: Users can easily create and share their content within specific interest groups also they can comment on a post.
- 👍 **Upvoting System**: The application incorporates an upvoting system, allowing users to show their appreciation for posts and content they find valuable.
- 🗃️ **AWS RDS Data Storage**: AWS RDS (Relational Database Service) is employed as the primary data storage solution, ensuring scalability, security, and reliability.
- 🚀 **Caching with Upstash**: Upstash is utilized for caching purposes, optimizing the performance of the application and reducing response times.
- 🔐 **Google Account Authentication**: User authentication is seamlessly integrated with Google accounts, making the login process secure and user-friendly.

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
