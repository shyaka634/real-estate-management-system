# 🏠 Real Estate Management System

A full-stack web application that empowers landlords and property owners to manage their listings, while allowing tenants to browse available properties with real-time status, location, and pricing information.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About the Project

The **Real Estate Management System** is designed to bridge the gap between landlords and tenants. Property owners can add and manage their listings, while tenants can explore available properties along with their availability status, geographic location, and rental price — all from one intuitive platform.

---

## ✨ Features

- 🔑 **Landlord Dashboard** — Add, update, and manage property listings
- 🏘️ **Tenant Portal** — Browse all available properties with filters
- 📍 **Location Info** — View property location details
- 💰 **Pricing Display** — Clear rental pricing per listing
- 🔄 **Availability Status** — Real-time property availability tracking
- 📱 **Responsive Design** — Fully responsive UI built with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React](https://reactjs.org/) | UI component library |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS styling and responsive design |

### Backend
| Technology | Purpose |
|---|---|
| Node.js / Express | RESTful API server |
| [Sequelize ORM](https://sequelize.org/) | Database modeling and querying |
| [MySQL](https://www.mysql.com/) | Relational database |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MySQL](https://www.mysql.com/) (v8 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/real-estate-management-system.git
   cd real-estate-management-system
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=real_estate_db
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   PORT=5000
   ```

5. **Set up the database**

   Sequelize will handle table creation. Run the following to sync the database:
   ```bash
   cd server
   npm run db:sync
   ```

6. **Start the development servers**

   Backend:
   ```bash
   cd server
   npm run dev
   ```

   Frontend:
   ```bash
   cd client
   npm start
   ```

7. **Open the app**

   Visit `http://localhost:3000` in your browser.

---

## 🖥️ Usage

- **As a Landlord:** Register or log in, then navigate to your dashboard to add a new property with its details, price, and location.
- **As a Tenant:** Browse the property listings page to view all available houses, filter by location or price, and check availability status.

---

## 📁 Project Structure

```
real-estate-management-system/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Page-level components
│       └── App.jsx
├── server/                  # Node.js backend
│   ├── config/              # Sequelize DB config
│   ├── models/              # Sequelize models
│   ├── routes/              # Express API routes
│   ├── controllers/         # Route handlers
│   └── index.js
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

> Built with ❤️ using React, Tailwind CSS, Sequelize ORM, and MySQL.
