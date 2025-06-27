# User Directory App

A modern, business-oriented user directory built with Next.js, TypeScript, TailwindCSS, and ag-Grid. Designed for top managers: clean UI, responsive, fast, and easy to use. Features user list, detail modal, copy actions, and client-side user management.

---

## Features
- User table with name/email, address, phone, website, company, actions
- Responsive, minimalistic, business-style UI
- User detail modal with all info and Google Maps link
- Copy email/phone to clipboard
- Client-side user deletion with confirmation
- Full keyboard and accessibility support

---

## Getting Started (without Docker)

### 1. Install dependencies
```sh
npm install
```

### 2. Run in development mode
```sh
npm run dev
```
App will be available at [http://localhost:3000](http://localhost:3000)

### 3. Build and run production version
```sh
npm run build
npm start
```
App will be available at [http://localhost:3000](http://localhost:3000)

---

## Running with Docker

### 1. Production mode
```sh
docker-compose up app --build
```
App will be available at [http://localhost:3000](http://localhost:3000)

### 2. Development mode (with hot reload)
```sh
docker-compose up dev --build
```
App will be available at [http://localhost:3000](http://localhost:3000)

---

## Project structure
- `src/app` — main Next.js app, page, layout
- `src/components` — UI components (table, modal, confirm, etc.)
- `src/types` — TypeScript types
- `src/api` — API fetch logic
- `src/hooks` — custom React hooks

---

## License
MIT
