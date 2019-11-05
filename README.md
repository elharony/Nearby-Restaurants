# Nearby Restaurants
A React-Based Web Application to find nearby Restaurants using Google Places API

## Features
- Display X places by default using a static location (Near `Eiffel Tower`)
- Ask for the User Location using [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- Center the map to the user's location & Update the places according to the user location
- Each place has an `Image`, `Address`, `Phone`, `Total Rating`, `Reviews`
- Sort Places by Reviews (`Highest`, `Lowest`, `Randomaly`)
- Show All Reviews for the selected place
- Add New Review for the selected place
- Add New Place; It will be added to the Places List & New Marker on the Map

## Getting Started
- `git clone https://github.com/elharony/Nearby-Restaurants.git`
- `cd Nearby-Restaurants`
- `npm install`
- `npm start` or `yarn start`

The app will work on your localhost! 🚀

## API Usage
This project relies on Google Console API, it's paid and I couldn't offer the API KEY in the project directly. That's why you have to create your own API KEY, and use it within the project to run it. Please follow the instructions below to add your own API KEY:
- In the root directory, create a new environment file, called `.env`
- Copy/Paste the following line:
```
REACT_APP_GOOGLE_MAPS_API_KEY = "PASTE_YOUR_GOOGLE_MAPS_API_KEY_HERE"
```
Make sure to replace `PASTE_YOUR_GOOGLE_MAPS_API_KEY_HERE` with your Google Maps API Key!

## Inside The App
![Nearby-Restaurants](https://user-images.githubusercontent.com/16986422/68228220-c21d0000-fffd-11e9-8b43-3c79e2c89784.jpg)

## Contributing
This is my 7th Project in The [Front-End Developer Diploma at OpenClassrooms](https://openclassrooms.com/en/paths/61-front-end-developer), and there's no need to contribute to this project. But if you're interested, you can `Fork` it, and build something cool upon it!