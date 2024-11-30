import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Users, Target, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-[#1428A0]" />
              <span className="text-2xl font-bold text-[#1428A0]">ADAPTIQ</span>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-[#1428A0] text-white rounded-full font-medium hover:bg-[#0075C9] transition-colors"
              >
                Mulai Belajar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1428A0] to-[#0075C9] text-white pt-32">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Personalized Learning Platform</span>
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Belajar Lebih Cerdas dengan AI
              </h1>
              <p className="text-xl text-blue-100">
                Platform pembelajaran adaptif yang menyesuaikan dengan gaya dan kecepatan belajar setiap individu.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-white text-[#1428A0] px-8 py-4 rounded-full font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  Mulai Perjalanan Anda
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-30"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-xl">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img src="/images/12345.jpg" alt="AI Learning Platform"  className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="relative h-24">
          <svg className="absolute bottom-0 w-full h-24 -mb-1" preserveAspectRatio="none" viewBox="0 0 1440 54">
            <path fill="white" d="M0 54H1440V0C1440 0 1088 54 720 54C352 54 0 0 0 0V54Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Mengapa Memilih ADAPTIQ?</h2>
            <p className="mt-4 text-xl text-gray-600">Platform kami menggunakan AI untuk menciptakan pengalaman belajar yang unik</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Brain,
                title: "Pembelajaran Berbasis AI",
                description: "Algoritma canggih yang menyesuaikan dengan gaya dan kecepatan belajar Anda"
              },
              {
                icon: Target,
                title: "Jalur Pembelajaran Personal",
                description: "Kurikulum yang disesuaikan berdasarkan tujuan dan kemajuan Anda"
              },
              {
                icon: Users,
                title: "Pembelajaran Kolaboratif",
                description: "Terhubung dengan rekan belajar dan mentor dalam perjalanan Anda"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1428A0] to-[#0075C9] opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-[#1428A0]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "95%", label: "Tingkat Penyelesaian" },
              { number: "40%", label: "Peningkatan Kecepatan Belajar" },
              { number: "50k+", label: "Pengguna Aktif" },
              { number: "4.9/5", label: "Kepuasan Pengguna" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="text-4xl font-bold bg-gradient-to-r from-[#1428A0] to-[#0075C9] text-transparent bg-clip-text">
                  {stat.number}
                </div>
                <div className="mt-2 text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;