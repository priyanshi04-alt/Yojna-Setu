# 🏛️ YojnaSetu (योजनासेतु)
> **Bridging the Gap Between Citizens and Government Schemes**

YojnaSetu is a premium, AI-powered digital assistance platform designed to simplify how citizens discover, understand, and apply for government schemes in India. Built with a focus on accessibility, the platform guides users through eligibility verification, documentation checklists, and application steps via interactive online and offline assistance modes.

🖥️ **Live Demo**: [yojnasetu-ruby.vercel.app](https://yojnasetu-ruby.vercel.app)

---

## 🌟 Key Features

### 1. 🤖 AI Scheme Discovery Chatbot
* **Conversational Search**: Interactive chatbot helps users discover schemes based on simple questions about their profile (age, state, caste, profession, and income).
* **Automatic Profile Sync**: Direct integration with the user's dashboard vault to auto-fill search preferences.

### 2. ⚡ Online Co-Pilot Simulator
* **Interactive Form Assistance**: Visualizes the web application flow step-by-step with a mock browser simulator.
* **Auto-Fill & Clipboard Tooling**: Pre-populates mock application fields and provides simple click-to-copy fields to reduce user friction.
* **Responsive Sim View**: Address bar truncation and compact UI scale dynamically to prevent mobile layout overflow.

### 3. 🗺️ Interactive Offline Map Navigator
* **Bunny Route Guide**: An interactive, lovable bunny helper mascot that guides users step-by-step to the nearest administrative offices (CSCs, block offices, etc.).
* **Touch-Optimized Map canvas**: Fully draggable bunny with bounds protection, custom drag-and-drop boundary limits, and zero-interference touch mechanics for mobile viewports.
* **Collapsible Route Settings**: GPS routes, documents checklist, and turn-by-turn directions fold into elegant accordion panels on mobile.
* **Optimal Default Zoom**: Set to a balanced city-level scale (zoom `14`) to give immediate geographic context.

### 4. 🔀 Resilient Client-Side Hash Router
* **Bookmarkable State**: Uses a custom, vanilla React hash-based router that syncs views (`window.location.hash`).
* **Refresh Persistence**: Page reloads preserve the active route, query parameters, and selected schemes (e.g. `#/details?id=ira-wrflsncs`) instead of reverting to the home screen.

### 5. 📱 Premium Mobile-Responsive UI
* **Aesthetic Styling**: Modern light-red and emerald green accents compliance, card layouts, clean shadows, and smooth micro-animations.
* **Adaptive Breakpoints**: 100% responsiveness on mobile viewports (320px–768px) with zero horizontal scroll or clipped text boxes.

---

## 🛠️ Tech Stack

* **Frontend Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) (Fast HMR & build optimization)
* **Icons**: [Lucide React](https://lucide.dev/) (For clean, modern interface iconography)
* **Mapping Library**: [React Leaflet 5](https://react-leaflet.js.org/) & [Leaflet 1.9](https://leafletjs.com/) (For GPS plotting and marker rendering)
* **Styling**: Vanilla CSS (Tailored variables, flexbox/grid utility patterns, and responsive overrides)
* **Deployment**: [Vercel](https://vercel.com)

---

## 📁 Folder Structure

```
HACKTIVATORS/
├── public/                 # Static icons and metadata assets
├── src/
│   ├── assets/             # Images, banners, and bunny guides
│   ├── data/
│   │   └── SchemesData.js  # Main scheme repository (~20k lines, 300+ schemes)
│   ├── App.css             # Main stylesheet (structural components)
│   ├── App.jsx             # Main application views, router, and logic
│   ├── index.css           # Global typography, color tokens, and responsive overrides
│   └── main.jsx            # React root mount point
├── eslint.config.js        # Linting rules
├── index.html              # Base HTML template (light-scheme compliant)
├── package.json            # Scripts & dependencies
└── vite.config.js          # Vite configurations
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

### 2. Installation
Clone the repository and install all dependencies:
```bash
# Clone the repository
git clone https://github.com/priyanshi04-alt/yojnasetu.git

# Navigate into the project folder
cd yojnasetu

# Install npm packages
npm install
```

### 3. Running Locally
Start the development server:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser to view the application.

### 4. Building for Production
To bundle the project for production deployment:
```bash
npm run build
```
This builds static assets into the `dist/` folder, ready to be served on any hosting platform (Vercel, Netlify, Github Pages, etc.).

---

## 🛡️ Theme & Design Compliance
* Built with absolute support for light mode environments (`color-scheme: light`).
* Fully functional keyboard accessibility for buttons and link highlights.
* Seamless offline route simulation with clean dynamic icons.
