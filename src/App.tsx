import { useState } from 'react'
import { ActiveTab } from './types'
import { Navbar } from './components/layout/Navbar'
import { TabNav } from './components/layout/TabNav'
import { CompressorView } from './components/compressor/CompressorView'
import { EnhancerView } from './components/enhancer/EnhancerView'
import { ShieldCheck, Zap, Sparkles } from 'lucide-react'

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('compress')

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Subtle Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pb-20">
        {/* Hero Section */}
        <div className="text-center pt-8 pb-2 space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-indigo-300 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Alat Pengolahan Gambar Praktis & Cepat</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Kompres Lebih Kecil,{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
              Perjelas Lebih Tajam
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Optimalkan gambar website & media sosial Anda secara instan langsung di perangkat tanpa antre dan tanpa ribet.
          </p>
        </div>

        {/* Tab Switcher */}
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Dynamic Feature Views */}
        <div className="transition-all duration-300">
          {activeTab === 'compress' ? <CompressorView /> : <EnhancerView />}
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-20 pt-10 border-t border-slate-900">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0 border border-indigo-500/20">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Kompresi Instan</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Pangkas hingga 90% ukuran berkas gambar dalam sekejap tanpa mengorbankan kualitas visual.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Peningkat Kualitas</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tingkatkan resolusi 2x/4x dan perjelas detail foto buram menjadi jauh lebih jernih.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0 border border-purple-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Aman & Terlindungi</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Berkas diproses langsung di perangkat Anda dan tidak disimpan ke server luar.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Bersih (Tanpa Tech Stack) */}
      <footer className="border-t border-slate-900/80 bg-slate-950/80 backdrop-blur-md py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>&copy; {new Date().getFullYear()} ImageCraft. Semua proses berjalan langsung di perangkat Anda.</span>
          <span>Aman, Cepat & Bebas Digunakan</span>
        </div>
      </footer>
    </div>
  )
}

export default App
