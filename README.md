# Project Setup Guide

This README guide provides instructions on how to set up the "shop-backend" project. Below you will find the necessary steps to get the project up and running on your local machine.

## Prerequisites

Before you proceed with the setup, please ensure you have the following installed on your system:

- Node.js (version 14 or above)
- npm (Node Package Manager)
- MySQL server (either installed locally or accessible remotely)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/izzeddin62/shop-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd shop-backend
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```
   or
   ```
   npm install --legacy-peer-deps
   ```

## Configuration

### Environment Variables

The project uses environment variables to manage configuration settings. Create a `.env` file in the root of the project and paste the following contents:

```env
DATABASE_URL=
SECRET_KEY=
PORT=
```

Replace the `DATABASE_URL` value with your actual MySQL database connection URL.
### Database Setup

1. Ensure your MySQL server is running.
2. Run the following command to perform database migrations:

   ```bash
   npm run migrate:dev
   ```

## Usage

To start the application in development mode, run the following command:

```bash
npm run dev
```

This command will start the server using `nodemon` and `babel-node` to enable ES6/ES7 features.

## Building for Production

To build the project for production, use the following command:

```bash
npm run build
```

The above command will compile the code using Babel and output the transpiled files in the `build` directory.

To start the production server, use the following command:

```bash
npm start
```

## Issues

If you encounter any issues or want to report a bug, please visit the [issue tracker](https://github.com/izzeddin62/shop-backend/issues) on GitHub.


## Acknowledgments

- The project uses various open-source dependencies, which we acknowledge and are grateful for.
