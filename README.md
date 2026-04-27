# 🛒 Social Media - E-Commerce Platform

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb&logoColor=white" alt="MERN Stack">
  <img src="https://img.shields.io/badge/License-ISC-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge">
</p>

> 🏪 Nền tảng mạng xã hội và thương mại điện tử full-stack hiện đại được xây dựng với MERN stack, tích hợp chat trực tiếp, thanh toán và dashboard quản trị toàn diện.

---

## 🇻🇳 Giới thiệu

**Social Media - E-Commerce Platform** là một nền tảng mạng xã hội và thương mại điện tử đầy đủ tính năng, được xây dựng với công nghệ hiện đại gồm React, Express.js và MongoDB. Dự án bao gồm ba thành phần chính:

- **Frontend** - Ứng dụng dành cho khách hàng với giao diện hiện đại, mượt mà
- **Backend** - API RESTful mạnh mẽ với đầy đủ tính năng bảo mật
- **Admin** - Dashboard quản trị viết bằng TypeScript cho việc quản lý

Dự án hỗ trợ đầy đủ các tính năng của một trang thương mại điện tử: quản lý sản phẩm, giỏ hàng, đơn hàng, mã giảm giá, thanh toán trực tuyến qua VNPay, chat trực tiếp, gọi video realtime qua Stream Chat, và hệ thống blog tin tức.

---

> A modern, full-stack social media and e-commerce platform built with the MERN stack, featuring real-time messaging, payment integration, and a comprehensive admin dashboard.

---

## 🚀 Features

### 🛍️ Customer Frontend

- **Product Catalog** - Browse products with categories, brands, and search
- **Shopping Cart** - Add/remove items, update quantities
- **User Authentication** - Register, login, logout with JWT
- **Order Management** - Place orders, track order status
- **Voucher System** - Apply coupon codes for discounts
- **Real-time Chat** - Live customer support via Stream Chat
- **Blog/Posts** - News and product articles

### ⚙️ Backend API

- **RESTful API** - Well-structured Express.js endpoints
- **MongoDB Database** - Flexible data storage with Mongoose
- **JWT Authentication** - Secure token-based auth
- **Real-time Communication** - Socket.io for live updates
- **Payment Integration** - VNPay gateway integration
- **Cloud Storage** - Cloudinary for image uploads
- **Email Service** - Resend for transactional emails
- **Security** - Arcjet protection

### 📊 Admin Dashboard

- **Product Management** - CRUD operations for products
- **Category & Brand Management** - Organize inventory
- **Order Processing** - View and update orders
- **Voucher Management** - Create discount codes
- **Profile & Access Control** - Protected routes and admin authentication flow

---

## 🏗️ Architecture

```
zhilingg-donghua/
├── backend/           # Express.js API server
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── services/      # Business logic
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth & other middleware
│   │   ├── lib/            # Utilities (db, socket, cloudinary)
│   │   └── emails/        # Email templates
│   └── package.json
│
├── frontend/          # Customer React app
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux state management
│   │   ├── hooks/         # Custom hooks
│   │   └── ...
│   └── package.json
│
└── admin/             # Admin Dashboard (React + TypeScript)
    ├── src/
    │   ├── apis/          # API calls
    │   ├── components/    # UI components
    │   ├── hooks/         # React Query hooks
    │   ├── pages/         # Admin pages
    │   ├── types/         # TypeScript definitions
    │   └── ...
    └── package.json
```

---

## 🛠️ Tech Stack

### Backend

| Technology         | Purpose                 |
| ------------------ | ----------------------- |
| Express.js         | Web framework           |
| MongoDB + Mongoose | Database                |
| Socket.io          | Real-time communication |
| JWT                | Authentication          |
| Cloudinary         | Image storage           |
| VNPay              | Payment gateway         |
| Arcjet             | Security                |
| Resend             | Email service           |
| Stream Chat        | Real-time communication |
| Postman            | Test API                |

### Frontend

| Technology     | Purpose               |
| -------------- | --------------------- |
| React 18       | UI library            |
| Vite           | Build tool            |
| Redux Toolkit  | State management      |
| Zustand        | State management      |
| TanStack Query | Server state          |
| Tailwind CSS   | Styling               |
| Stream Chat    | Messaging, Video call |
| Framer Motion  | Animations            |
| React Router   | Navigation            |
| DaisyUI        | UI components         |
| Shadcn UI      | UI components         |

### Admin Dashboard

| Technology      | Purpose       |
| --------------- | ------------- |
| React 19        | UI library    |
| TypeScript      | Type safety   |
| Vite            | Build tool    |
| TanStack Query  | Data fetching |
| Tailwind CSS v4 | Styling       |
| React Router v7 | Navigation    |
| Framer Motion   | Animations    |

---

## 📦 Installation

### Prerequisites

- Node.js >= 20.0.0
- MongoDB (local or Atlas)

### Quick Start

```bash

# Install root dependencies
npm install

# Install dependencies for each app
npm install --prefix backend
npm install --prefix frontend
npm install --prefix admin

# Build frontend (used by backend in production)
npm run build

# Start development servers
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev

# Terminal 3 - Admin
cd admin && npm run dev
```

### Individual Services

```bash
# Backend
cd backend
npm install
npm run dev    # Development (port 3000)

# Frontend
cd frontend
npm install
npm run dev    # Development (port 5173)

# Admin
cd admin
npm install
npm run dev    # Development (port 5174)
```

---

## 🔧 Environment Variables

Create environment files for each app.

### Backend (`backend/.env`)

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/xxxxxx

# JWT
JWT_SECRET=your-jwt-secret-key
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# VNPay Payment
VNP_TMN_CODE=your-tmn-code
VNP_HASH_SECRET=your-hash-secret
VNP_URL=https://vnpay.vn
VNP_RETURN_URL=http://localhost:5173/vnpay-return

# Email
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=Zhilingg Donghua

# Security
ARCJET_KEY=your-arcjet-key
ARCJET_ENV=development

# Stream
STREAM_API_KEY=your-stream-api-key
STREAM_API_SECRET=your-stream-api-secret
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000/api
VITE_STREAM_API_KEY=your-stream-api-key
```

### Admin (`admin/.env`)

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 🔌 API Endpoints

| Method | Endpoint                                     | Description                  |
| ------ | -------------------------------------------- | ---------------------------- |
| POST   | `/api/auth/signup`                           | User registration            |
| POST   | `/api/auth/login`                            | User login                   |
| POST   | `/api/auth/logout`                           | User logout                  |
| GET    | `/api/auth/check`                            | Check current session        |
| GET    | `/api/product/get-all-product`               | List products                |
| GET    | `/api/product/get-product-by-id/:id`         | Product details              |
| POST   | `/api/product/add-product`                   | Create product (admin)       |
| PUT    | `/api/product/update-product/:productId`     | Update product (admin)       |
| DELETE | `/api/product/delete-product/:productId`     | Delete product (admin)       |
| GET    | `/api/category/get-categories`               | List categories              |
| GET    | `/api/brand/get-all-brands`                  | List brands                  |
| GET    | `/api/cart/get-cart`                         | Get current user cart        |
| POST   | `/api/cart/add-to-cart`                      | Add item to cart             |
| PATCH  | `/api/cart/update-quantity-product-in-cart`  | Update cart item quantity    |
| POST   | `/api/order/create-order`                    | Create order                 |
| GET    | `/api/order/get-order-by-user-id`            | List current user orders     |
| PATCH  | `/api/order/cancel-order/:orderId`           | Cancel order                 |
| GET    | `/api/voucher/get-vouchers`                  | List vouchers                |
| POST   | `/api/voucher/create-voucher`                | Create voucher (admin)       |
| POST   | `/api/payment/create_payment_url`            | Create VNPay payment URL     |
| GET    | `/api/payment/vnpay_return`                  | VNPay return callback        |
| GET    | `/api/messages/contacts`                     | Get chat contacts            |
| GET    | `/api/messages/:id`                          | Get messages by user         |
| POST   | `/api/messages/send/:id`                     | Send message to user         |
| GET    | `/api/post/allposts`                         | List social posts            |
| POST   | `/api/post/addpost`                          | Create social post           |

---

## 📱 Demo Accounts

> Contact the administrator to create admin accounts.

---

## 🔨 Available Scripts

### Root

```bash
npm run build   # Install backend/frontend deps and build frontend
npm run start   # Start production server
```

### Backend

```bash
npm run dev     # Start with nodemon
npm run start   # Start production
```

### Frontend/Admin

```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run lint    # Run ESLint
npm run preview # Preview build
```

> Note: Root `npm run build` currently installs dependencies for backend/frontend and builds frontend only.

---

<p align="center">
  Made with ❤️ by Dũng
</p>
