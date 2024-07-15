// src/app/layout.js

import './globals.css';

export const metadata = {
  title: 'My Portfolio',
  description: 'My personal portfolio website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Preahvihear&display=swap" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
