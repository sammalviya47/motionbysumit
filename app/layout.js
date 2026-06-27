import './globals.css';

export const metadata = {
  title: 'Atlas Mori — Motion Designer for SaaS, AI & Web3',
  description: 'Cinematic motion graphics & product films crafted for ambitious SaaS, AI and Web3 brands.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#060606] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
