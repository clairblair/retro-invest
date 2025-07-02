# KLTMINES Investment Platform

A modern, advanced, and beautiful investment platform built with **Next.js**, **Tailwind CSS**, and **shadcn/ui**. KLTMINES offers a seamless, responsive, and secure experience for investors, with features like smart investment plans, wallet management, ROI tracking, notifications, and more.

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
