# Intelligent Home Monitoring System

A smart, easy-to-use web application that monitors power usage across home appliances, interprets energy consumption patterns, and provides clear insights to help reduce overall electricity usage and lower monthly energy bills.

---

## Group Members

- Emre Akilli
- Juan Carlos Gomez
- Carlos Diaz
- David Palacio
- Henry Perez

---

## Repository Structure

This repository is a full-stack web application with a clear separation between frontend and backend.

client → React frontend  
server → Node.js + Express backend

---

## Frontend (Client)

The frontend is built using React and serves as the user-facing interface for the system.

Current progress includes:
- Landing page
- User authentication (login and signup)
- Routing between landing, authentication, and dashboard
- Dashboard as the primary application hub
- Modal-based UI interactions for managing devices and viewing data

### Dashboard Design

The dashboard is structured into two main sections.

Live Devices:
- Displays all active devices selected by the user
- Shows device nickname (or outlet name if no nickname is provided)
- Shows outlet/location (e.g., Living Room, Laundry Room)
- Displays live energy usage (simulated for demo purposes)
- Devices are added only from this section using an Add Device button
- Clicking a live device opens a popup that allows:
  - Editing the device nickname
  - Removing the device

Usage Overview:
- Read-only section that automatically reflects all active devices
- Displays high-level energy status labels:
  - Eco
  - Normal
  - Overusage
- Status labels are based on realistic household energy expectations per outlet type
- Clicking an item opens a popup showing detailed historical energy usage

Historical Data:
- Displayed using bar graphs
- Time ranges include:
  - Last 24 hours
  - 7 days
  - 1 month
  - 1 year

---

## Backend (Server)

The backend is built using Node.js, Express, and PostgreSQL, with Prisma as the ORM.

Current functionality includes:
- Secure user authentication using JWT
- User profile storage and management
- Device management (add, edit, remove)
- Energy usage data storage (simulated for demonstration purposes)
- REST API endpoints supporting:
  - Authentication
  - Device tracking
  - Energy usage retrieval
- Unit tests for login and signup functionality

The backend is intentionally kept minimal and focused to support the defined user stories without unnecessary complexity.

---

## Device and Energy Model

- Devices represent predefined household outlets (e.g., Kitchen, Living Room, Laundry Room)
- Users may optionally assign nicknames to devices (e.g., TV, Washer)
- Live energy usage values are simulated for demo purposes
- Usage status labels (Eco, Normal, Overusage) are derived from realistic expectations of how different areas of a home typically consume electricity
- Historical usage data is displayed only when requested

---

## Project Status

- Core system architecture is complete
- Frontend and backend are connected
- Dashboard behavior and user flow are fully defined
- All required user stories are accounted for
- Active development is focused on implementing dashboard functionality and device interactions

---

## Future Enhancements

- Developer-only debug panel for demo purposes
- Advanced data visualization improvements
- UI quality-of-life features such as dark mode, loading indicators, and tutorial popups
