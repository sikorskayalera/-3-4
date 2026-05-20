import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Check, Cpu, Shield, Sparkles, Sliders, BatteryCharging, Award } from 'lucide-react';

interface DeviceMockupProps {
  id: string;
  name: string;
  brand: string;
  color: string;
  tagline: string;
  description: string;
  specifications: string[];
  score: number;
}

export function DeviceMockup({ id, name, brand, color, tagline, description, specifications, score }: DeviceMockupProps) {
  // Brand specific styling helper
  const getBrandLogo = () => {
    switch (id) {
      case 'apple':
        return (
          <div className="flex items-center justify-center bg-zinc-900 text-white rounded-full w-12 h-12 shadow-lg mb-3">
            <span className="font-sans font-bold text-lg"></span>
          </div>
        );
      case 'samsung':
        return (
          <div className="flex items-center justify-center bg-blue-600 text-white rounded-full w-12 h-12 shadow-lg mb-3 font-sans font-bold text-xs tracking-wider">
            SAMS
          </div>
        );
      case 'google':
        return (
          <div className="flex items-center justify-center bg-white border border-gray-200 text-gray-800 rounded-full w-12 h-12 shadow-md mb-3 font-sans font-semibold text-xl">
            G
          </div>
        );
      case 'xiaomi':
        return (
          <div className="flex items-center justify-center bg-orange-500 text-white rounded-lg w-12 h-12 shadow-lg mb-3 font-sans font-extrabold text-xs">
            mi
          </div>
        );
      case 'oneplus':
        return (
          <div className="flex items-center justify-center bg-red-600 text-white rounded-full w-12 h-12 shadow-lg mb-3 font-sans font-black text-sm">
            1+
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center bg-slate-200 text-slate-800 rounded-full w-12 h-12 shadow-lg mb-3">
            <Smartphone size={24} />
          </div>
        );
    }
  };

  const getAccentBgClass = () => {
    switch (id) {
      case 'apple': return 'from-stone-800 to-zinc-900 border-zinc-700';
      case 'samsung': return 'from-blue-900 to-slate-900 border-blue-800';
      case 'google': return 'from-sky-900 to-slate-900 border-sky-800';
      case 'xiaomi': return 'from-amber-900 to-stone-900 border-amber-800';
      case 'oneplus': return 'from-red-950 to-neutral-900 border-red-900';
      default: return 'from-slate-800 to-slate-950 border-slate-700';
    }
  };

  const getGlowColor = () => {
    switch (id) {
      case 'apple': return 'rgba(255, 255, 255, 0.1)';
      case 'samsung': return 'rgba(59, 130, 246, 0.3)';
      case 'google': return 'rgba(14, 165, 233, 0.3)';
      case 'xiaomi': return 'rgba(249, 115, 22, 0.3)';
      case 'oneplus': return 'rgba(239, 68, 68, 0.3)';
      default: return 'rgba(148, 163, 184, 0.2)';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className={`relative rounded-3xl p-6 bg-gradient-to-br ${getAccentBgClass()} text-white border-2 shadow-2xl overflow-hidden`}
      style={{ boxShadow: `0 20px 40px -15px ${getGlowColor()}` }}
      id={`recognized-device-card-${id}`}
    >
      {/* Absolute top badge representing match score */}
      <div className="absolute top-4 right-4 bg-emerald-500/90 text-white text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow">
        <Award size={14} />
        {score.toFixed(1)}% Збіг
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Phone Physical Mockup Interactive Visual */}
        <div className="relative w-40 h-72 bg-black rounded-[2.5rem] p-3 border-4 border-slate-800 flex-shrink-0 shadow-inner">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black rounded-full z-20 flex items-center justify-center p-[2px]">
            {id === 'apple' ? (
              <div className="w-14 h-3.5 bg-zinc-950 rounded-full border border-zinc-800/50 flex justify-end px-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-indigo-900 rounded-full" />
              </div>
            ) : (
              <div className="w-3 h-3 bg-zinc-950 rounded-full border border-zinc-800 flex items-center justify-center">
                <div className="w-1 h-1 bg-sky-900 rounded-full" />
              </div>
            )}
          </div>

          {/* Speaker ear slit */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-zinc-800 rounded-full z-20" />

          {/* Screen Content Wrapper */}
          <div className="w-full h-full bg-slate-950 rounded-[2.1rem] overflow-hidden relative flex flex-col justify-between p-4 border border-zinc-900">
            {/* Ambient Background Glow matching brand */}
            <div 
              className="absolute inset-0 opacity-40 blur-2xl rounded-full"
              style={{
                background: `radial-gradient(circle at 50% 30%, ${color}, transparent 70%)`
              }}
            />

            {/* Top Info Bar inside device */}
            <div className="flex justify-between items-center text-[10px] font-mono opacity-80 z-10">
              <span>09:41</span>
              <div className="flex items-center gap-1">
                <span className="text-[8px] bg-white/20 px-1 rounded">5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Middle Screen Display Info */}
            <div className="flex flex-col items-center text-center my-auto z-10">
              <span className="text-[10px] tracking-widest uppercase text-white/60 font-medium">Об'єкт</span>
              <h4 className="text-sm font-bold tracking-tight mt-0.5">{brand}</h4>
              <p className="text-[10px] font-medium text-white/80 line-clamp-2 px-1 mt-1 leading-normal">{name}</p>
              
              <div className="mt-3 flex flex-col items-center">
                <div className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/15 border border-white/10 flex items-center gap-1">
                  <Sparkles size={10} className="text-amber-300 animate-pulse" />
                  <span>Розпізнано</span>
                </div>
              </div>
            </div>

            {/* Bottom Screen Bar */}
            <div className="w-16 h-1 bg-white/40 mx-auto rounded-full z-10" />
          </div>

          {/* Side action button visual overlays (Apple Action or OnePlus Slider) */}
          {id === 'apple' && (
            <div className="absolute left-[-5px] top-16 w-[2px] h-6 bg-amber-400 rounded-r z-0" />
          )}
          {id === 'oneplus' && (
            <div className="absolute right-[-5px] top-14 w-[2px] h-8 bg-slate-400 rounded-l z-0" />
          )}
        </div>

        {/* Brand details and structured attributes listing */}
        <div className="flex-1 w-full">
          <div className="flex flex-col items-center md:items-start">
            {getBrandLogo()}
            <span className="text-xs uppercase tracking-widest text-slate-400 font-mono font-bold">Успішна Ідентифікація</span>
            <h3 className="text-2xl font-bold tracking-tight text-white mt-1">{name}</h3>
            <p className="text-indigo-300 font-serif italic text-sm mt-0.5">{tagline}</p>
            <p className="text-slate-300 text-xs mt-3 leading-relaxed md:text-left text-center">
              {description}
            </p>
          </div>

          {/* Key hardware attributes */}
          <div className="mt-5 bg-black/30 rounded-2xl p-4 border border-white/5">
            <h5 className="text-xs font-mono uppercase text-slate-400 font-bold mb-3 flex items-center gap-1.5">
              <Sliders size={12} />
              Визначальні технічні ознаки
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {specifications.map((spec, index) => (
                <div key={index} className="flex items-start gap-2 text-slate-200">
                  <div className="mt-1 bg-white/10 p-0.5 rounded-full text-emerald-400 flex-shrink-0">
                    <Check size={10} />
                  </div>
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
