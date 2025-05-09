export const metadata = {
  title: 'Barlovento',
  description: 'El ecommerce del pequeño comercio'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
