# MyGate Clone - Residential Society Management App

## Overview

MyGate Clone is a React Native mobile application built with Expo that provides comprehensive residential society management features. The app enables residents to manage visitors, track daily help staff, book amenities, raise complaints, view notices, handle payments, and manage their profiles. The application focuses on improving communication and operations within residential communities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Platform**
- **React Native with Expo**: Cross-platform mobile development framework supporting iOS, Android, and web deployments
- **Navigation Strategy**: Hybrid navigation using React Navigation with bottom tabs for main sections and stack navigation for nested screens
- **State Management**: Component-level state using React hooks (useState, useEffect) with no global state management library

**UI Components**
- Built with React Native core components (View, Text, TouchableOpacity, ScrollView, FlatList)
- Vector icons from Expo's Ionicons library for consistent iconography
- Custom-styled components without external UI libraries
- Modal-based overlays for QR codes and booking confirmations

**Navigation Structure**
- Bottom Tab Navigator: Primary navigation with 5 main sections (Home, Visitors, Helpdesk, Payments, Profile)
- Stack Navigators: Nested stacks for features requiring multi-screen flows (Visitors → Add Visitor, Helpdesk → Add Complaint)
- Screen options configured for custom headers and navigation behaviors

### Data Storage Solutions

**Local Persistence**
- **AsyncStorage**: React Native's key-value storage for all application data
- **Storage Pattern**: JSON serialization for complex objects (visitors, complaints, daily help records)
- **Data Structure**: Each feature maintains its own storage key ('visitors', 'complaints', 'dailyHelp')
- **No Backend**: Purely client-side application with no server communication or cloud synchronization

**Data Models**
- **Visitors**: id, name, phone, purpose, date, time, status, createdAt
- **Complaints**: id, title, category, description, status, date, createdAt
- **Daily Help**: id, name, type, phone, status, time
- **Payments**: Static/hardcoded data for demonstration purposes
- **Notices**: Static array stored in component state

### Authentication & Authorization

**Current Implementation**
- No authentication system implemented
- Hardcoded user information (name: "John Doe", flat: "A-101")
- Single-user mode with no login/logout functionality
- Profile data is static and displayed from component state

**Security Considerations**
- Data stored locally on device without encryption
- No user sessions or token management
- App designed for prototype/demonstration purposes

### Feature Modules

**Visitor Management**
- Pre-approval system for expected visitors
- QR code generation using react-native-qrcode-svg for entry verification
- Status tracking (approved, checked-in, checked-out)
- CRUD operations with AsyncStorage persistence

**Daily Help Tracking**
- Manage recurring household staff (maids, cooks, drivers)
- Check-in/check-out functionality with timestamp logging
- Status indicators for staff presence

**Amenity Booking**
- Calendar-based booking using react-native-calendars
- Time slot selection for facilities (clubhouse, pool, gym, courts)
- Modal-based booking workflow
- Availability status tracking

**Helpdesk & Complaints**
- Category-based complaint submission (Plumbing, Electrical, Cleaning, Security, Other)
- Status workflow (pending → in-progress → resolved)
- Timestamp and description tracking

**Noticeboard**
- Static announcements with priority levels (high, medium, low)
- Color-coded notices with icons
- Date-based organization

**Payments**
- Display of maintenance dues
- Payment history view
- Payment gateway integration placeholder

## External Dependencies

### Core Framework Dependencies
- **expo (~54.0.0)**: Development platform and build toolchain
- **react (19.1.0)** & **react-native (0.81.5)**: UI framework
- **react-dom (19.1.0)** & **react-native-web (^0.21.0)**: Web platform support

### Navigation Libraries
- **@react-navigation/native (^6.1.9)**: Core navigation framework
- **@react-navigation/bottom-tabs (^6.5.11)**: Tab-based navigation
- **@react-navigation/stack (^6.3.20)**: Stack-based navigation
- **react-native-screens (~4.16.0)** & **react-native-safe-area-context (~5.6.0)**: Navigation dependencies

### Feature-Specific Libraries
- **@react-native-async-storage/async-storage (2.2.0)**: Local data persistence
- **react-native-qrcode-svg (^6.3.2)**: QR code generation for visitor management
- **react-native-svg (15.12.1)**: SVG rendering (required for QR codes)
- **react-native-calendars (^1.1306.0)**: Calendar UI for amenity booking
- **expo-notifications (~0.32.12)**: Push notification capability (configured but not implemented)
- **expo-calendar (~15.0.7)**: Device calendar access
- **expo-image-picker (~17.0.8)**: Image selection functionality
- **@expo/vector-icons**: Icon library (Ionicons)

### Build & Development Tools
- **@babel/core (^7.25.2)**: JavaScript transpiler
- **babel-preset-expo**: Expo-specific Babel configuration

### Platform Configuration
- iOS bundle identifier: com.mygate.clone
- Android package: com.mygate.clone
- Supports iOS tablets and Android adaptive icons
- Web deployment capability via Expo