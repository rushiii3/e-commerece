# About the Project

An e-commerce application that supports user authentication, product browsing, cart management, checkout, and advanced search and filtering. This app uses Expo React Native and integrates various technologies to provide a smooth and efficient shopping experience.

## Features

- **Authentication:** Users can log in and register to access personalized features.
- **Product Browsing:** Explore and view product details.
- **Cart Management:** Add items to the cart, manage quantities, and handle cart data locally for full functionality.
- **Checkout:** Complete transactions with Razorpay integration for payments.
- **Search and Filters:** Find products easily with search and filter options.

## Screens

The app includes the following screens:

- **Login:** For user authentication.
- **Register:** For user registration.
- **Home:** Displays product categories and featured items.
- **Cart:** Manages cart items with local storage for dynamic functionality.
- **Product Preview:** Shows detailed information about selected products.

## Technologies Used

- **Frontend:** Expo React Native
- **State Management:** Zustand
- **Local Storage:** MMKV for fast local storage
- **API Integration:** FakeData API for fetching product data
- **Payment Integration:** Razorpay for handling checkout payments

## Higher-Order Components (HOCs)

- **withAuthentication:** Manages authentication for the cart screen.
- **withLoading:** Displays a full-screen loader component.

## Cart Functionality

The cart component leverages two higher-order components (HOCs) to manage authentication and loading states. Cart data is managed locally using Zustand for state management and MMKV for local fast storage, ensuring dynamic cart functionality without relying on static data from the FakeData API.



# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


