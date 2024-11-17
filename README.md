# Music Share Application

A web app for creating virtual music rooms, joining existing ones, and collaborating on playlists in real-time.

## Key Features

- Customizable music rooms with distinct names
- Room exploration and joining
- Song integration with title, artist, and URL
- Real-time notifications for new rooms and songs
- Modern, adaptive interface with header navigation and logo
- Real-time user synchronization
- Secure authentication and authorization
- Mobile-responsive design

## Functionality Overview

1. **Room Establishment**

   - Users can initiate a new room through the `CreateRoomForm` component
   - Each room is assigned a unique identifier and name
   - Newly created rooms are instantly listed among available rooms
   - Custom room settings and privacy options available

2. **Room Participation**

   - The `AvailableRooms` component showcases all active rooms
   - Users can select any room to join
   - Multiple users can participate in the same room
   - Real-time updates when users join or leave

3. **Song Integration**
   - Within a room, users can integrate songs using the `AddSongForm`
   - Mandatory song information includes:
     - Song title
     - Artist name
     - Song URL (for audio playback)
   - Optional metadata support (album, year, genre)
   - Integrated songs are immediately visible to all room participants
   - Playlist sorting and filtering capabilities

## Technical Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Firebase Realtime Database
- **Authentication**: Firebase Auth
- **State Management**: React Context API
- **Styling**: Styled Components / CSS Modules
- **Testing**: Jest and React Testing Library

## Initial Setup

### System Requirements

- Node.js (version 14 or later)
- npm (version 6 or later) or yarn (version 1.22 or later)
- Firebase account (for real-time database and user authentication)
- Modern web browser with JavaScript enabled

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/akash3gtm/music-share.git
   cd music-share
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure Firebase:

   - Go to the Firebase Console
   - Create a new Firebase project
   - Enable Authentication and Realtime Database
   - Copy your Firebase configuration
   - Create a `.env` file in the root directory `cp .env.example .env`
   - Add your Firebase configuration variables

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
