# Drive Booker - Driving School Management System

Drive Booker is a comprehensive web application built with Next.js for driving schools, enabling efficient scheduling, booking, and management of driving lessons. This system streamlines communication between instructors, students, and administrators through an intuitive, responsive interface.

---

## 🧰 Technology Stack

- **Frontend Framework**: Next.js for server-side rendering and optimal performance.
- **Styling**: Tailwind CSS for utility-first styling with Shadcn UI components.
- **State Management**: React Context API, react-query and iron-session for session management.
- **Authentication**: Custom JWT implementation with secure HTTP-only cookies and csrf protection.
- **API Integration**: REST API consumption with Axios.
- **Form Handling**: React Hook Form with Zod validation.
- **CI**: Github Workflow

---

## Features (App is still in development)

### Multi-Role Authentication System

- **Secure SPA Authentication**: Implements token-based authentication with HTTP-only cookies and anti-CSRF protection
- **Multiple Authentication Methods**: Supports both credential-based login and third-party providers
-

### Instructor Features

- **Availability Management**: Easy submission of available time slots for lessons.
- **Calendar Integration**: Comprehensive calendar view of scheduled lessons.

### Student Features

- **Lesson Booking**: Intuitive interface for selecting preferred lesson times.
- **Calendar View**: Personal calendar showing scheduled and completed lessons.
- **Course Selection**: Browse and enroll in available driving courses.
- **Profile Management**: Update personal information and preferences.

### Course Catalog

- **Detailed Course Listings**: Comprehensive information about each driving course.
- **Advanced Filtering**: Filter courses by type, duration, price, and more.
- **Sorting Options**: Arrange courses by various criteria for easy browsing.

### Modern UI/UX

- **Responsive Design**: Fully optimized for all device sizes from mobile to desktop.
- **Tailwind CSS + Shadcn**: Clean, modern interface built with industry-standard tools.

## Getting Started

First install required dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
