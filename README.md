# KLTMINES Investment Platform

A comprehensive investment platform built with modern technologies, organized as a monorepo with separate frontend and backend modules.

## 🏗️ Project Structure

```
investment/
├── frontend/          # Next.js Frontend Application
│   ├── src/          # Frontend source code
│   ├── public/       # Static assets
│   ├── package.json  # Frontend dependencies
│   └── ...
├── backend/          # NestJS Backend API
│   ├── src/          # Backend source code
│   ├── test/         # Backend tests
│   ├── package.json  # Backend dependencies
│   └── ...
├── pnpm-workspace.yaml    # PNPM workspace configuration
├── package.json           # Root workspace configuration
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (>=18.0.0)
- PNPM (>=8.0.0)
- MongoDB
- Redis

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd investment
```

2. Install all dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Copy environment files and configure them
cp backend/env.example backend/.env
# Configure your environment variables in backend/.env
```

4. Start development servers:
```bash
pnpm dev
```

This will start both the frontend (Next.js) and backend (NestJS) servers concurrently.

## 📜 Available Scripts

### Root Level Scripts

- `pnpm dev` - Start both frontend and backend in development mode
- `pnpm build` - Build both frontend and backend for production
- `pnpm start` - Start frontend in production mode
- `pnpm lint` - Lint both frontend and backend
- `pnpm test` - Run backend tests
- `pnpm clean` - Clean build artifacts and node_modules

### Frontend Scripts

- `pnpm dev:frontend` - Start frontend development server
- `pnpm build:frontend` - Build frontend for production
- `pnpm lint:frontend` - Lint frontend code

### Backend Scripts

- `pnpm dev:backend` - Start backend development server
- `pnpm build:backend` - Build backend for production
- `pnpm start:backend` - Start backend in production mode
- `pnpm lint:backend` - Lint backend code
- `pnpm test:e2e` - Run backend end-to-end tests

### Database Scripts

- `pnpm seed` - Run database seeding
- `pnpm seed:admin` - Seed admin user
- `pnpm seed:plans` - Seed investment plans
- `pnpm seed:all` - Seed all data
- `pnpm seed:reset` - Reset and reseed database

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **React Query/TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Framer Motion** - Animations

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **MongoDB** - Database with Mongoose ODM
- **Prisma** - Database toolkit (for specific use cases)
- **Redis** - Caching and session storage
- **Bull** - Queue management
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **Swagger** - API documentation

### DevOps & Tools
- **PNPM** - Package manager with workspace support
- **ESLint & Prettier** - Code linting and formatting
- **Jest** - Testing framework
- **Concurrently** - Run multiple scripts simultaneously

## 🚀 Deployment

### Separate Deployment (Recommended)

Each module can be deployed independently:

#### Frontend Deployment
```bash
cd frontend
pnpm build
pnpm start
```

#### Backend Deployment
```bash
cd backend
pnpm build
pnpm start:prod
```

### Environment Variables

Ensure all required environment variables are set in your deployment environment. Refer to `backend/env.example` for required variables.

## 📱 Features

- **User Authentication & Authorization**
- **Investment Plan Management**
- **Real-time Portfolio Tracking**
- **Payment Integration** (Stripe, Paystack, Flutterwave)
- **Admin Dashboard**
- **Email Notifications**
- **Two-Factor Authentication**
- **Responsive Design**
- **Real-time Updates**

## 🧪 Testing

Run tests for the backend:
```bash
pnpm test
pnpm test:e2e
```

## 📝 Development Guidelines

1. **Frontend Code**: Place in `frontend/src/`
2. **Backend Code**: Place in `backend/src/`
3. **Shared Types**: Consider creating a shared package if needed
4. **Environment Variables**: Keep in respective module directories
5. **Documentation**: Update README when adding new features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@kltmines.com or create an issue in the repository.

---

## ✨ Features

- **Modern Dashboard**: Glassmorphic, animated, and responsive UI for all investment activities.
- **Smart Investment Plans**: Tiered, realistic plans with search, filters, and payment method selection.
- **Wallet Management**: Multi-currency support, deposit/withdrawal flows, proof uploads, and transaction history.
- **ROI & Withdrawals**: Track daily ROI, manage withdrawals, and view payout history.
- **Notifications**: Dropdown and dedicated page with filtering, search, and mark-as-read.
- **Settings**: Edit bank/crypto details, manage account, and responsive mobile tabs.
- **Authentication**: Register, login, forgot password, OTP verification, and change password flows.
- **Landing Pages**: Beautiful Home, About, Testimonials, and Contact pages with advanced design.
- **Dark/Light Mode**: Advanced, animated theme switcher with perfect alignment and accessibility.
- **Accessibility & Performance**: Keyboard navigation, color contrast, and optimized rendering.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Heroicons](https://heroicons.com/)
- **State/Utils**: React Hooks, Context, [next-themes](https://github.com/pacocoursey/next-themes)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Other**: TypeScript, ESLint, Prettier

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Irotochukwusamuel/retro-invest.git
cd retro-invest
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file and add any required environment variables (e.g., database, API keys).

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── (landing)/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── testimonials/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── auth/
│   │   ├── change-password/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── verify-otp/page.tsx
│   ├── dashboard/
│   │   ├── investments/page.tsx
│   │   ├── layout.tsx
│   │   ├── notifications/page.tsx
│   │   ├── page.tsx
│   │   ├── roi/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── wallet/page.tsx
│   │   └── withdrawals/page.tsx
│   └── layout.tsx
├── components/
│   ├── icons.tsx
│   ├── ui/
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── sonner.tsx
│   │   ├── switch.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   └── tooltip.tsx
│   └── landing/   # (for landing page components)
├── lib/
│   └── utils.ts
├── styles/
│   └── (Tailwind, global styles)
├── public/
│   └── (images, icons, etc.)
├── tailwind.config.ts
└── ...
```

---

## 📸 Screenshots

> _Add screenshots or GIFs here to showcase the UI and features!_

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact



---
