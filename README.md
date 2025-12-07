# 🎬 ScreenMasterUI - Cinema Booking System

<!-- ![Project Banner](https://falcon-core.vercel.app/imgs/gallery-31.png) -->
![Project Banner](https://srceenmaster.vercel.app/gallery-31.png)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## 📖 Overview

**ScreenMasterUI** is a modern, full-featured cinema ticket booking application. It provides a seamless experience for users to browse movies, select theaters, choose seats interactively, pre-order food, and securely book tickets. It also includes a comprehensive Admin Dashboard for managing cinema operations.

## 📸 Project Screenshots

Below are some screenshots showcasing ScreenMasterUI features.

### Home & Booking Flow
![1](screenshots/1.webp)
![2](screenshots/2.webp)
![3](screenshots/3.webp)
![4](screenshots/4.webp)
![5](screenshots/5.webp)

### Movie Details & Seat Selection
![6](screenshots/6.webp)
![7](screenshots/7.webp)
![8](screenshots/8.webp)
![9](screenshots/9.webp)
![10](screenshots/10.webp)

### Admin Dashboard
![11](screenshots/11.webp)
![12](screenshots/12.webp)
![13](screenshots/13.webp)
![14](screenshots/14.webp)
![15](screenshots/15.webp)

### Reports & Misc
![16](screenshots/16.webp)
![17](screenshots/17.webp)
![18](screenshots/18.webp)

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
