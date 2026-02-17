# TechStorm 2026 – Mobile App

A React Native (Expo) app that mirrors the TechStorm 2026 website experience, with a native Splash + Home screen and web-view–based secondary tabs.

## Project Setup

- **Base repo**: TechStorm-2.26-Website (sibling folder)
- **Stack**: Expo, React Native, TypeScript
- **Package manager**: npm

## Features

- **Splash Screen**: Hero logo with brand background, transition to main app after assets load
- **Home Tab**: Native implementation of the website hero section (layout, typography, CTAs)
- **Events / Teams / Schedule Tabs**: Website pages loaded in embedded WebViews
- **Bottom Tab Navigation**: Home, Events, Teams, Schedule
- **Theming**: Shared colors, typography, spacing aligned with website branding

## Getting Started

```bash
cd TechStorm-2.26-Website-App
npm install
npm start
```

Then:
- **Android**: `npm run android` or scan QR code with Expo Go
- **iOS** (macOS): `npm run ios` or scan QR code with Expo Go
- **Web**: `npm run web`

## Project Structure

```
src/
├── components/
│   ├── HeroSection/     # Native hero implementation
│   └── Shared/          # PrimaryButton, SecondaryButton
├── navigation/
│   ├── RootNavigator.tsx
│   └── types.ts
├── screens/
│   ├── SplashScreen.tsx
│   ├── HomeScreen.tsx
│   ├── EventsScreen.tsx   # WebView
│   ├── TeamsScreen.tsx    # WebView
│   └── ScheduleScreen.tsx # WebView
├── theme/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
├── hooks/
│   └── useTheme.ts
└── utils/
    ├── constants.ts
    └── webviewOptions.ts
```

## Web View URLs

Events, Teams, and Schedule tabs load:
- `https://techstorm.bppimt.ac.in/events`
- `https://techstorm.bppimt.ac.in/team`
- `https://techstorm.bppimt.ac.in/schedule`

## Branding

- **Primary**: #FF6B00
- **Accent**: #ffc010
- **Background**: #000000
- **Fonts**: Press Start 2P, Silkscreen
