# To-Do List App

## Project Description

This To-Do List App is a simple yet functional mobile application built using React Native and Expo. It allows users to manage their tasks with features such as adding, editing, deleting, and marking tasks as completed. The app supports sorting tasks by creation date or completion status and includes persistent storage using AsyncStorage. The design is minimalistic and responsive, handling both light and dark modes seamlessly.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:
- Node.js
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/kulaizki/todo-app.git
   ```
   ```bash
   cd <repository-folder>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```
3. **Start Development Server**

   ```bash
   npx expo start
   ```

## List of Implemented Features
- Task Management:
   - Add new tasks
   - Edit existing tasks
   - Delete tasks
   - Toggle task completion status
- Task Display:
   - List tasks with a minimalistic design
- Sorting:
   - Sort tasks by creation date (newest first)
   - Sort tasks by completion status (completed items last)
- Data Persistence:
   - Persist tasks using AsyncStorage
- User Interface:
   - Responsive design that adapts to light and dark modes
   - Input field for adding tasks with automatic focus and hiding
- Additional Features:
   - Clear completed tasks
   - Sort tasks using a dropdown menu
- Compatibility:
  - Supports both iOS and Android