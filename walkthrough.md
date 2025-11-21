# SnapDo Walkthrough

## Overview
SnapDo is a smart to-do manager that uses **real on-device OCR** to generate tasks from your screenshots. It features a clean, Apple Reminders-inspired UI with intelligent prioritization and **persistent storage**.

## Features Implemented

### 1. The "Snap" Input (Real OCR Powered)
- **Drop Zone**: Drop any image containing text (screenshots, photos of notes).
- **Tesseract.js Integration**: The app runs a local OCR model in your browser to read the text.
- **Auto-Generation**: Creates a separate task for each line of text found in the image.

### 2. Context Tagging
- **Smart Tags**: The app automatically tags tasks as "Phone Call" or "Shopping" based on keywords.
- **Clean UI**: Context tags are only shown when relevant.

### 3. "Do This Now" Widget
- **Smart Logic**: Automatically suggests the best task based on Urgency and Effort (Quick Wins first).
- **Dynamic**: Updates as you complete tasks or add new ones.

### 4. Persistence
- **Auto-Save**: Tasks are automatically saved to your browser's Local Storage.
- **Safe Refresh**: You can refresh the page or close the tab, and your tasks will be there when you return.

## How to Run
1.  **Run the App**:
    ```bash
    cd snap-do
    npm run dev
    ```
2.  **Test It**:
    - Drop an image.
    - Refresh the page to see your tasks persist!

## Technical Details
- **Framework**: React + Vite
- **Styling**: Tailwind CSS (v3)
- **OCR Engine**: Tesseract.js (WASM based, runs locally)
- **Storage**: LocalStorage
- **Icons**: Lucide React
