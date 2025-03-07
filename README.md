# General Services
Main technologies:

- TypeScript
- React with Next js 15
- Tailwindcss
- React Dropzone
- React Hook Form
- Cloudinary
- Redux Toolkit
- FontAwesome
- Python with Flask, Turso and LibSQL (Backend)

## Collaborators:

- [RubDev666](https://github.com/RubDev666) (Frontend)
- [martin-alexis](https://github.com/martin-alexis) (Backend)

## Documentation
- [Backend](#backend-docs)
- [Frontend](#frontend-docs)

## Project features

- Login and Signup
- Dynamic, Public and Private routes (App router with Next js 15)
- CRUD Services
- Edit profile
- Filter and search for services
- Profile photos and services with cloudinary
- Responsive Design

Inspired design from [SliderRevolution](https://www.sliderrevolution.com/). official web site.

# Backend Docs

The backend repository is private, if you want to collaborate on this project add **Alexis11** or **Rubdev666** on discord

# Frontend Docs

This document provides an overview of the General services project, specifically the `frontend`.

## Installation

To install the project dependencies, run the following command:

```bash
npm install
```

## Project Structure

The structure of the `frontend` folder is as follows:

```
General-services/
├── public/
│   ├── icons/
│   └── ...
├── src/
│   ├── app/
│   │   ├── (private)/
│   │   ├── globals.css
│   │   └── ...
│   ├── components/
│   ├── hooks/
│   ├── server-actions/
│   ├── store/
│   ├── types/
│   └── utils/
├── package.json
├── tailwind.config.ts
└── README.md
```

- **public/**: Main images.
    - **icons/**: Icons for the website.
- **src/**: Contains the project's source code.
    - **app/**: All routes of the application.
        - **(private)/**: Private routes only.
        - **globals.css**: Global and reusable styles.
    - **components/**: Reusable components of the application (for Layout, Pages, forms, no-ssr and ui).
    - **hooks/**: Reusable code for the project.
    - **server-actions/**: Server actions, and API endpoints.
    - **store/**: Redux and global state management of the application.
    - **types**: Types, enums and interfaces.
    - **utils/**: Global variables.
- **package.json**: npm configuration file.
- **tailwind.config.ts**: tailwind configuration file (Contains the entire color palette for this project.).

## Usage

First, create a .env file (Environment Variables) at the root of the Frontend project with the following variable:

```
//replace it with the url you have
NEXT_PUBLIC_API = 
```

To start the application in development mode, run:

```bash
npm run dev
```

This will open the application in your default browser at `http://localhost:3000`.

## Contribution

If you want to contribute to this project, **fork** the repository and then create a **pull request**.
