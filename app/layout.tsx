import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sukhraj Purewal Personal Website',
  description: 'Website made to highlight my skills and expirence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/imgs/logo.jpeg" sizes="<generated>" />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}