import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>NavBar</nav>
        </header>

        <main>{children}</main>

        <footer>Footer</footer>
      </body>
    </html>
  );
}
