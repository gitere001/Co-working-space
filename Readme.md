# Coworking Space Booking Demo

Welcome to the Coworking Space Booking Platform Demo. This modern and responsive web application is designed to handle coworking space bookings with an intuitive user interface and powerful backend functionality. The platform allows users to view available workspaces, book them, manage their bookings, and make payments.

## Live Demo

You can access the live demo of the platform here:

[**Coworking Space Booking Demo**](https://coworking-booking-demo.vercel.app)

### How to Register and Use the Demo:

1. Go to the **Sign-Up** page.
2. You can use any sample credentials to register.
3. After signing up, log in using the same credentials.
4. Once logged in, you will be directed to the **Dashboard** where you can view and manage your bookings.

---

## Features

### 1. **Landing Page**
   - The landing page provides a clear overview of the platform with a **Hero section**, **About**, **Pricing**, **Testimonials**, **Featured Spaces**, and a modern footer.
   - **Pricing**: Calculates monthly and yearly costs, including discounts.
   - **Smooth Navigation**: The page implements single-page application (SPA) functionality with smooth scrolling between sections for a better user experience.

### 2. **Authentication**
   - Simple and intuitive **Sign-Up** and **Login** process with **clear call-to-action** buttons.
   - Includes **error handling** and **validation** to ensure a seamless experience.
   - Data is securely stored in **MongoDB**.

### 3. **JWT-based Auto Logout**
   - **Auto logout** is implemented using JWT (JSON Web Tokens). Users will be logged out automatically when their session expires.
   - To see this feature in real-time, the session is set to expire after **5 minutes**. You can stay logged in for 5 minutes to observe this functionality in action.

### 4. **Home Dashboard**
   - Displays the user's **My Bookings** section with the option to:
     - **View details** of bookings
     - **Cancel** bookings
     - **Make payments** for bookings
   - Available workspaces are displayed with booking options.
   - **Toast notifications** provide real-time feedback to users on their actions.
   - A **My Account** section allows users to update their details.

### 5. **Workspace Availability**
   - Sample workspaces are stored in **file storage** for easy demonstration. The platform can handle real-world workspaces once integrated with a real database.

---

## Technologies & Tools Used

### Frontend
- **React**: Used for building reusable components.
- **Redux Toolkit**: For state management.
- **Tailwind CSS**: For easy and customizable styling.
- **JWT**: For authorization, including JWT decode for auto logout on session expiry.
- **Vite**: For faster development and bundling.

### Backend
- **Node.js & Express**: The backend server is built with Node.js and Express.
- **MongoDB**: For database management, storing user data and booking information.
- **JWT**: For authentication and authorization.

### Deployment
- **Frontend**: Deployed on **Vercel**.
- **Backend**: Deployed on **DigitalOcean**, with **Nginx** configured as a reverse proxy.

---

## Scalability & Optimization

- **React Lazy Loading**: Used with Suspense for better optimization and faster loading times.
- **Database Indexing**: To improve query performance in MongoDB.
- **Scalability**: The system is designed using a **client-server architecture**, making it easy to scale by adding more resources, servers, and introducing load balancers.
- **Modularization**: The code is organized in line with best practices, making the platform easier to maintain and scale in the future.

---

## Screenshots

![Landing Page](./path/to/screenshot1.png)
*Landing Page showcasing the Hero section and navigation.*

![My Bookings](./path/to/screenshot2.png)
*Dashboard displaying user's bookings.*

![Workspace Availability](./path/to/screenshot3.png)
*Available workspaces displayed for booking.*

![Pricing Details](./path/to/screenshot4.png)
*Pricing page with monthly and yearly cost breakdown.*

---

## Conclusion

This Coworking Space Booking Platform is built with modern technologies, ensuring a seamless and enjoyable experience for users. The platform is designed for scalability, optimization, and easy maintenance, making it ready for future growth.

Feel free to explore the platform, and don't hesitate to reach out if you have any questions or feedback.



