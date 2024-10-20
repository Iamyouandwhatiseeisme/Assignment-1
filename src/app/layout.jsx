import './styles/global.css'
export const metadata = {
    title: 'Medical Mushroom Market app',
    description: 'Web site created with Next.js.',
  }
export default function RootLayout({ children }) {
    return (
        <html lang="en">
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
  
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">{children}</div>
    
  </body>
</html>
    )
  }