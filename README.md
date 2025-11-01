# platheo-template-webapp

platheo-template-webapp is a modern web application built with Vue 3, designed as a minimal, reusable base template with authentication functionality. This clean foundation uses a professional grayscale theme and can be customized for different products.

## 🚀 Features

- **Modern Interface**: Built with Vue 3 and DevExtreme for optimal user experience
- **Multi-platform**: Web and Android support via Capacitor
- **Authentication**: OAuth integration with Google and Apple
- **State Management**: Pinia implementation for efficient state handling
- **Responsive Design**: Adaptable to different devices and screen sizes
- **Clean Base**: Minimal, grayscale design ready for customization

## 🛠️ Core Technologies

- Vue 3
- TypeScript
- Vite
- Capacitor
- DevExtreme
- Firebase Authentication
- Pinia
- Bootstrap Icons

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm (package manager)
- Android Studio (for Android development)

## 🔧 Installation

1. Clone the repository:

```bash
git clone [REPOSITORY_URL]
cd room-client
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Create a `.env` file in the project root with the following variables:

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key
```

## 🚀 Development

### Start development server

```bash
pnpm run dev
```

### Build for production

```bash
pnpm run build
```

### Run tests

```bash
pnpm run test:unit
```

### Linting and formatting

```bash
pnpm run lint
pnpm run format
```

## 📱 Android Development

To build and run the application on Android:

1. Build the project:

```bash
pnpm run build
```

2. Copy files to Android:

```bash
npx cap copy
```

3. Open project in Android Studio:

```bash
npx cap open android
```

## 🧪 Testing

The project uses Vitest for unit testing. Tests are located in the `tests/` directory.

To run tests:

```bash
pnpm run test:unit
```

## 📦 Project Structure

```
room-client/
├── src/              # Source code
├── public/           # Static files
├── tests/            # Unit tests
├── android/          # Android configuration
└── dist/             # Compiled files
```

## 🎨 Available Screens

- **Login**: OAuth authentication with Google and Apple
- **Profile**: User profile display with logout functionality

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Conventions

- Follow [Vue Style Guide](https://vuejs.org/style-guide/)
- Use ESLint and Prettier for code consistency
- Follow [Conventional Commits](https://www.conventionalcommits.org/) format

## 🔐 License

This project is licensed under the [MIT](LICENSE) License.

## 📞 Support

For support, please open an issue in the repository or contact the development team.
