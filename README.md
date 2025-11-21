# SnapDo 📸✅

> Transform screenshots into actionable tasks with the power of OCR

SnapDo is a modern, privacy-first to-do manager that uses **on-device OCR** to extract tasks from your screenshots. Built with React and featuring a clean, Apple Reminders-inspired interface, it makes task management effortless and intelligent.

![SnapDo Banner](https://img.shields.io/badge/Built%20with-Google%20Antigravity-4285F4?style=for-the-badge&logo=google&logoColor=white)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

## ✨ Features

### 🎯 Smart Screenshot Processing
- **Drag & Drop Interface**: Simply drop any screenshot to extract tasks
- **Real OCR**: Uses Tesseract.js for accurate, client-side text recognition
- **Auto-Task Generation**: Creates individual tasks from each line of text

### 🧠 Intelligent Prioritization
- **Smart Detection**: Automatically identifies urgent tasks and quick wins
- **Context Tagging**: Tags tasks as "Phone Call" or "Shopping" based on keywords
- **"Do This Now" Widget**: Suggests the best task to tackle based on urgency and effort

### 🔒 Privacy-First Architecture
- **100% Client-Side**: All processing happens in your browser
- **No Server Uploads**: Your data never leaves your device
- **Local Storage**: Tasks persist across sessions using browser storage

### 🎨 Beautiful Design
- **Apple Reminders Aesthetic**: Clean, minimalist interface
- **Light Mode**: Carefully crafted color palette for optimal readability
- **Responsive Layout**: Works seamlessly across devices

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/light-saber/snap-do.git
cd snap-do

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see SnapDo in action!

### Build for Production

```bash
npm run build
```

## 🎮 How to Use

1. **Drop a Screenshot**: Drag and drop any image containing text into the drop zone
2. **Watch the Magic**: SnapDo uses OCR to read the text and creates tasks automatically
3. **Manage Tasks**: Check off completed items, filter by urgency, or view all tasks
4. **Stay Organized**: Your tasks are automatically saved and persist across sessions

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **OCR Engine**: [Tesseract.js](https://tesseract.projectnaptha.com/) (WASM-based)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: Browser LocalStorage API

## 📁 Project Structure

```
snap-do/
├── src/
│   ├── components/
│   │   ├── DropZone.jsx      # Screenshot upload & OCR processing
│   │   ├── Layout.jsx         # App layout with sidebar
│   │   ├── SmartWidget.jsx    # "Do This Now" suggestion widget
│   │   └── TaskList.jsx       # Task rendering & management
│   ├── lib/
│   │   └── utils.js           # Utility functions
│   ├── App.jsx                # Main app component
│   └── index.css              # Global styles
├── public/
└── package.json
```

## 🎯 Roadmap

- [ ] Dark mode support
- [ ] Custom task categories
- [ ] Export tasks to CSV/JSON
- [ ] Mobile app version
- [ ] Cloud sync (optional)

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Creator

**Sachin Acharya**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/acharyasachin/)

---

<div align="center">
  <sub>Built with ❤️ using <a href="https://deepmind.google/technologies/gemini/antigravity/">Google Antigravity</a></sub>
</div>
