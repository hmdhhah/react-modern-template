# react-modern-template

## Project Folder Structure 📁

Some important directories in this repository include:

📁 Assets

- This folder serves as a repository for all media files used in our application. It's advisable to create subfolders within this directory for better organization, such as Images, Icons, Videos, Audio, Styles etc. While some may prefer to keep all components in a single place, we recommend dividing them into two folders: Components and Containers.

📁 Components

- Within this folder, we house all of our application's presentational components, also known as Stateless Components. These components primarily handle the UI display and do not manage any internal state.

📁 Containers

- The Containers folder contains the Stateful components, commonly known as Smart components. These components are responsible for managing and tracking the application's state.

📁 Constants

- In this folder, we group all the constants used throughout the application. For example, this is a suitable place to store regular expressions or other constant values.

📁 Helpers

- The Helpers folder is where we create and export reusable functions that are utilized in various parts of our application.

📁 Hooks

- Here, we store customized hooks that we've developed for our application. Custom hooks are an excellent way to share logic between components.

📁 routes

- The Routes folder handles the configuration of the application's routing system. It contains files that define different routes and associate them with corresponding components or pages. This organization allows for easier management and navigation within the application.

📁 Layouts

- Layouts in this folder consist of files like Navbar, Footer, Sidebar, etc. Layouts are used to wrap specific components, providing a consistent structure for different parts of the application.

📁 Pages

- The Pages folder contains components that represent individual pages within our application, such as Home, Contact, etc. Each page is wrapped with a specific layout to maintain a uniform appearance.

📁 Validations

- Within this folder, we manage form validation and rules, leveraging libraries like Formik. Form validation logic is separated for better organization and reusability.

📁 Services

- In the Services folder, we handle all API requests by creating separate files for each service. This approach allows for easier maintenance and organization of API-related code.

📁 Context

- The Context folder houses all the context files responsible for managing and globalizing the application's state. For instance, this is where we might handle theming styles.

📁 Config

- All application configuration files reside within the Config folder. This includes any settings or preferences that need to be centralized.

📁 i18n

- For multi-language support, we have the i18n folder. It contains subfolders with JSON files for each language that requires translation.

## Requirements

- Node v19.3.0
- Yarn v1.22.19
- npm v9.2.0
- Git

## Getting Started

## License

&copy; 2023. All rights reserved.
