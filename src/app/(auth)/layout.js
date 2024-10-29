"use client";
import { useEffect, useState } from "react";
import "../../app/styles/global.css";
import { redirect } from "next/navigation";
import "../styles/global.css";
// export const metadata = {
//   title: "Medical Mushroom Market app",
//   description: "Web site created with Next.js.",
// };

export default function RootLayout({ children, params }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const authenticated = !(accessToken === null || refreshToken === null);

    if (!authenticated) {
      redirect("/login");
    } else {
      setIsAuthenticated(authenticated);
    }
  }, [isAuthenticated]);

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root" className="background">
          {children}
        </div>
      </body>
    </html>
  );
}
