# Task-AI

This is mini Task Manager App where tasks are created and managed by the user and sent to an AI assistant for tracking and optimization.

### 📦 Installation
1. Navigate into the project directory:
   ```sh
   cd my-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install and build Tailwind CSS:
   ```sh
   npm install tailwindcss@3.3.5 postcss autoprefixer  
   npx tailwindcss init -p 
   npx tailwindcss -i ./src/index.css -o ./dist/output.css
   ```
### 🌐 Add API
Check the example in `.env.example` for adding your Hugging Face API key. Copy it to your `.env.local` file and replace `YOUR_API_KEY_HERE` with your actual API key.

### 🔥 Running the Development Server

To start the development server, concurrently run `npm run dev` and `npm run backend`:
```sh
npm run dev:full
```

This will start the server, and you can access your app at `http://localhost:5173/` by default.

## 🛠️ Technologies Used
- **React** (UI Framework)
- **Vite** (Build tool for fast development)
- **Node.js & npm** (Dependency management)
- **Tailwind CSS** (Utility-first CSS framework)
- **Hugging Face** (Platform for ML models)
