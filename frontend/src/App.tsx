import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './App.css'

const Page = ({ title }: { title: string }) => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold">{title}</h1>
    <p className="text-gray-500 mt-2">Coming soon.</p>
  </div>
)

function App() {
  const { t, i18n } = useTranslation()
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="font-bold">{t('app.title')}</div>
            <nav className="flex gap-4 text-sm">
              <Link to="/">{t('nav.dashboard')}</Link>
              <Link to="/invoices">{t('nav.invoices')}</Link>
              <Link to="/gst">{t('nav.gst')}</Link>
              <Link to="/bookkeeping">{t('nav.bookkeeping')}</Link>
              <Link to="/storage">{t('nav.storage')}</Link>
              <Link to="/ca">{t('nav.ca')}</Link>
            </nav>
            <div className="flex gap-2">
              <button className="px-2 py-1 border rounded" onClick={() => i18n.changeLanguage('en')}>EN</button>
              <button className="px-2 py-1 border rounded" onClick={() => i18n.changeLanguage('hi')}>हिं</button>
            </div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4">
          <Routes>
            <Route path="/" element={<Page title={t('nav.dashboard')} />} />
            <Route path="/invoices" element={<Page title={t('nav.invoices')} />} />
            <Route path="/gst" element={<Page title={t('nav.gst')} />} />
            <Route path="/bookkeeping" element={<Page title={t('nav.bookkeeping')} />} />
            <Route path="/storage" element={<Page title={t('nav.storage')} />} />
            <Route path="/ca" element={<Page title={t('nav.ca')} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
