# 🎬 ScreenMasterUI - Cinema Booking System

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## 📖 Overview

**ScreenMasterUI** is a modern, full-featured cinema ticket booking application. It provides a seamless experience for users to browse movies, select theaters, choose seats interactively, pre-order food, and securely book tickets. It also includes a comprehensive Admin Dashboard for managing cinema operations.

## 🚀 Features

### 👤 User Portal
*   **Immersive Home Page**: Dynamic sliders for Trending, Popular, and Recommended movies with "play trailer" integration.
*   **Complete Booking Flow**:
    1.  **Select Movie**: Detailed movie info, cast, and trailers.
    2.  **Choose Cinema**: View available theaters.
    3.  **Pick Showtimes**: Select convenient dates and times.
    4.  **Interactive Seat Map**: distinct zones (VIP, Standard), visual selection.
    5.  **Food & Beverage**: Pre-order snacks during booking.
    6.  **Payment**: secure checkout process.
*   **User Account**: specific booking history and profile management.
*   **Authentication**: Secure SignUp, Login, and Email Verification.

### 🛠️ Admin Dashboard
*   **Theater Management**: Add/Edit theaters and screens.
*   **Screen Layouts**: Define screen types (IMAX, 3D, Standard) and capacities.
*   **Showtime Scheduling**: Manage movie schedules per screen.
*   **Seat Management**: Visual tools to configure seat availability and layout.

## 🛠️ Tech Stack

*   **Framework**: [Vue.js 3](https://vuejs.org/) (Composition API)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Routing**: [Vue Router](https://router.vuejs.org/)
*   **HTTP Client**: [Axios](https://axios-http.com/)
*   **Utilities**: `dayjs`, `sweetalert2`, `colorthief`, `jspdf`.

## 📂 Project Structure

```
ScreenMasterUI/
├── src/
│   ├── components/     # Reusable UI components (Header, Sidebar, CarCard, etc.)
│   ├── views/          # Page views
│   │   ├── auth/       # Authentication & Booking Flow
│   │   ├── DashBoard/  # Admin Dashboard views
│   │   ├── users/      # User profile views
│   │   └── ...
│   ├── router/         # Vue Router configuration
│   ├── services/       # API integration
│   └── assets/         # Images and static assets
└── ...
```

## ⚡ Getting Started

### Prerequisites
*   Node.js (LTS version recommended)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd SrceenMasterUI
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
