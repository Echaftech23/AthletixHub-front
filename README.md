# SportFit Frontend

This project is the frontend for the SportFit application, built with React, TypeScript, and Vite. It includes various features such as authentication, event management, participant management, and more.

## Table of Contents

- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Building the Project](#building-the-project)
- [Linting](#linting)
- [📂 Project Structure](#-project-structure)
- [Expanding the ESLint Configuration](#expanding-the-eslint-configuration)
- [Docker](#docker)
- [🚧 Future Roadmap](#-future-roadmap)

## 🚀 Features

- User authentication
- Event management
- Participant management
- Responsive design
- PDF export of participant lists

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Formik
- Yup
- Axios
- Radix UI
- Lucide React
- Sonner for notifications

## 📋 Prerequisites

- Node.js (version 20 or higher)
- npm (version 6 or higher)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Echaftech23/SportFit-back.git
   cd sportfit-frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Project

To start the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`

## Building the Project

To build the project for production:

```sh
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Linting

To lint the project:

```sh
npm run lint
```

To lint and fix:

```sh
npm run lint:fix
```

## 📂 Project Structure

```
sportfit-frontend/
├── public/                 # Static assets
├── src/
│   ├── api/                # API configuration and calls
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable React components
│   │   ├── auth/           # Authentication-related components
│   │   ├── charts/         # Data visualization components
│   │   └── ...
│   ├── contexts/           # React context providers
│   ├── pages/              # Page components
│   ├── router/             # Application routing
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── validations/        # Form and data validations
├── .env                    # Environment variables
└── README.md               # Project documentation
```

## Expanding the ESLint Configuration

To enable type-aware lint rules:

1. Update `eslint.config.js`:

```javascript
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';

export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

## Docker

### Build Docker Image

```sh
docker build -t sportfit-frontend:latest .
```

### Run Docker Container

```sh
docker run -d -p 5173:80 sportfit-frontend:latest
```

## 🚧 Future Roadmap

- [ ] Implement advanced user roles and permissions
- [ ] Develop comprehensive analytics and reporting features
- [ ] Enhance platform with third-party service integrations
- [ ] Create more interactive and intuitive UI components
- [ ] Add internationalization (multi-language) support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[Specify your project's license]

---

**Happy Coding! 🚀**