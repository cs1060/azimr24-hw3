# PlayX - Basketball Game Finder

A React Native application that helps basketball players find and join games, track their stats, and connect with other players.

## Features

- Find pickup games, tournaments, and training sessions
- Join games and track your stats
- Create and manage your player profile
- Connect with other players
- View game history and performance stats

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v16 or newer)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)

## Setup for Web Platform

1. Clone the repository:
```bash
git clone <repository-url>
cd prototype
```

2. Install dependencies:
```bash
npm install
```

3. Install Expo CLI globally:
```bash
npm install -g expo-cli
```

4. Install web-specific dependencies:
```bash
npx expo install react-native-web react-dom @expo/webpack-config
```

5. Create or update the webpack config:
```bash
touch webpack.config.js
```
Add the following content to webpack.config.js:
```javascript
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  return config;
};
```

## Running the App

1. Start the development server:
```bash
npx expo start --web
```

2. Your default browser should open automatically. If not, open:
```
http://localhost:19006
```

## Development Notes

### Environment Setup
- The app uses Expo for development
- TypeScript is used for type safety
- React Navigation for routing
- React Native Paper for UI components

### Web-Specific Considerations
- Some native components might need web-specific alternatives
- Use the `Platform.select()` API for platform-specific code
- Test touch interactions for web compatibility
- Ensure responsive design works on different screen sizes

### Common Issues and Solutions

1. If you see module resolution errors:
```bash
npm clear cache
rm -rf node_modules
npm install
```

2. If web build fails:
```bash
rm -rf web-build
npx expo build:web
```

3. For navigation issues:
```bash
npm install @react-navigation/native-web
```

## Testing

Run tests with:
```bash
npm test
```

## Building for Production

Build the web version:
```bash
npx expo build:web
```

The built files will be in the `web-build` directory.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository.
