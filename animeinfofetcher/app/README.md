# MovieMate - Movie Information Fetcher

A beautiful, responsive web application that allows users to search for movies and get detailed information including ratings, cast, director, plot, and more.

## Features

- 🎬 Search movies by title
- 📱 Responsive design that works on all devices
- ⭐ Display IMDb ratings and Rotten Tomatoes scores
- 🎭 Show cast and director information
- 📄 Movie plot and overview
- 🖼️ Movie posters
- 🎥 Quick access to YouTube trailers
- ✨ Beautiful animations and loading states

## Setup Instructions

### 1. Get a Free API Key

1. Visit [OMDB API](http://www.omdbapi.com/apikey.aspx)
2. Sign up for a free API key
3. You'll receive the API key via email

### 2. Configure the Application

1. Open `index.html`
2. Find this line in the JavaScript section (around line 493):
   ```javascript
   const apiKey = 'YOUR_API_KEY';
   ```
3. Replace `'YOUR_API_KEY'` with your actual OMDB API key:
   ```javascript
   const apiKey = 'your-actual-api-key-here';
   ```

### 3. Run the Application

Simply open `index.html` in your web browser. No server setup required!

## Usage

1. **Search for Movies**: Type a movie title in the search box and press Enter or click Search
2. **Quick Search**: Click on any of the suggested popular movie titles
3. **View Details**: See comprehensive movie information including ratings, cast, and plot
4. **Watch Trailers**: Click the "Watch Trailer" button to search for trailers on YouTube

## API Information

This application uses the [OMDB API](http://www.omdbapi.com/) (The Open Movie Database):
- Free tier: 1,000 requests per day
- No attribution required
- Reliable and fast movie data

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients and animations
- **JavaScript**: Vanilla JS with Fetch API
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## Browser Compatibility

Works in all modern browsers including:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Troubleshooting

### Common Issues

1. **"Movie not found" error**: 
   - Check the movie title spelling
   - Try searching with the exact movie title
   - Some very recent or obscure movies might not be in the database

2. **"Invalid API key" error**:
   - Make sure you've replaced `YOUR_API_KEY` with your actual API key
   - Verify the API key is active (check your email from OMDB)

3. **No results showing**:
   - Check your internet connection
   - Open browser developer tools (F12) to see any console errors
   - Try searching for popular movies like "Inception" or "The Godfather"

### Development Mode

If you want to test without an API key first (very limited requests):
- The app will try to work without an API key but with severe limitations
- Get a free API key for the best experience

## Contributing

Feel free to fork this project and add features like:
- Movie recommendations
- Watchlist functionality
- Advanced search filters
- Multiple language support

## License

This project is open source and available under the [MIT License](LICENSE).
