# 🎵 Music App

A modern, responsive web-based music player featuring dynamic video backgrounds, intuitive controls, and a sleek user interface. Built with vanilla JavaScript, this app delivers a premium music listening experience directly in your browser.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Features

- **Dynamic Video Backgrounds**: Each song comes with its own video background for an immersive experience
- **Full Playback Controls**: Play, pause, seek, volume control, repeat, and shuffle modes
- **Song Library**: Browse and select from a curated list of songs
- **Responsive Design**: Optimized for various screen sizes and devices
- **Smooth Animations**: Elegant transitions and hover effects
- **Audio Visualization**: Real-time progress tracking and time display
- **Volume Management**: Intuitive volume slider with visual feedback
- **Shuffle & Repeat**: Advanced playback options for customized listening

## 🛠️ Technologies Used

- **Frontend**:
  - HTML5 for semantic structure
  - CSS3 for modern styling and animations
  - JavaScript (ES6+) for interactive functionality
- **Icons**: Font Awesome for beautiful, scalable icons
- **Assets**: Custom audio files, images, and videos

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required - runs entirely in the browser

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/music-app.git
   cd music-app
   ```

2. **Open the application**:
   - Simply open `index.html` in your web browser
   - Or serve it through a local web server for better performance

### Usage

1. **Launch**: Open `index.html` in your preferred web browser
2. **Play Music**: Click the play button to start playback
3. **Navigate**: Use forward/backward buttons or click on songs in the list
4. **Control Volume**: Click the volume icon to reveal the slider
5. **Shuffle/Repeat**: Toggle shuffle and repeat modes as desired
6. **Browse Songs**: Click the SoundCloud icon to open the song library

## 📁 Project Structure

```
music-app/
├── index.html          # Main HTML structure
├── style.css           # Application styling
├── script.js           # Core functionality and event handlers
├── musicList.js        # Song data and configuration
├── assets/
│   ├── audio/          # Audio files
│   ├── image/          # Album artwork
│   └── video/          # Background videos
└── README.md           # Project documentation
```

## 🎨 Customization

### Adding New Songs

To add new songs to the playlist:

1. Add audio, image, and video files to their respective `assets/` folders
2. Update `musicList.js` with the new song information:
   ```javascript
   {
       name: "Song Title",
       music: "./assets/audio/song.mp3",
       img: "./assets/image/album.jpg",
       video: "./assets/video/background.mp4",
       auth: "Artist Name"
   }
   ```

### Styling Modifications

The app uses CSS custom properties for easy theming. Key variables are defined in `style.css` for colors, fonts, and spacing.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Font Awesome for the beautiful icons
- Inspiration from modern music streaming platforms
- Community contributors and feedback

## 📞 Contact

For questions or suggestions, please open an issue on GitHub or reach out to the maintainers.

---

**Enjoy your music! 🎧**
