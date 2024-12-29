import "./globals.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="./globals.css" rel="stylesheet" />
      </head>
      <body className={`min-h-screen w-screen bg-white`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
