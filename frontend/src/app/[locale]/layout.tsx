export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  // НЕ создаем html/body - они уже есть в корневом layout
  return (
    <div className="min-h-screen" lang={locale}>
      {children}
    </div>
  )
}