# Contact Manager Application
A full-stack contact management system built with Node.js/Express/MongoDB (backend), React.js (web frontend), and Flutter (mobile app).

## Features
- Add, view, update, and delete contacts
- Responsive web interface
- RESTful API

## Technologies Used
  ### Backend
  - Node.js with Express.js
  - MongoDB with Mongoose ODM
  - RESTful API architecture
### Web Frontend
- React.js
- Bootstrap for UI components
- Axios for API requests
### Mobile App
- Flutter with BLoC pattern for state management
- HTTP package for API integration
- Responsive UI with Material Design

## Installation and Setup
### Backend
cd backend
npm install

## Web Frontend React
cd frontend
npm install
npm run dev

## Mobile App Flutter
cd mobile
flutter pub get
flutter run

API Documentation
The backend provides the following endpoints:
GET    /api/contacts   Get all contacts
GET    /api/contacts/   Get a single contact
POST  /api/contacts    Create a new contact
PUT    /api/contacts/  Update a contact
DELETE  /api/contacts/  Delete a contact

Get Single Contact

URL: /contacts/:id
Method: GET
URL Params: id - Contact ID
Response: Single contact object


Create Contact

URL: /contacts
Method: POST

Update Contact

URL: /contacts/:id
Method: PUT
URL Params: id - Contact ID

Delete Contact

URL: /contacts/:id
Method: DELETE
URL Params: id - Contact ID



