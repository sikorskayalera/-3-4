/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MOBILE_OBJECTS, 
  COMMON_FEATURES, 
  SPECIFIC_FEATURES, 
  calculateWeight 
} from './data';
import { DeviceMockup } from './components/DeviceMockup';
import { LabReport } from './components/LabReport';
import { MobileObject, WeightModel } from './types';
import { 
  Smartphone, 
  Check, 
  Search, 
  Sparkles, 
  RotateCcw, 
  FileText, 
  TrendingUp, 
  Info, 
  Sliders, 
  Bookmark,
  CheckCircle2,
  ListFilter
} from 'lucide-react';

export default function App() {
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [activeModel, setActiveModel] = useState<WeightModel>('model_c');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'classifier' | 'report'>('classifier');
  const [selectedSpecificTab, setSelectedSpecificTab] = useState<string>('all');

  // Fast preset configurations
  const applyPreset = (presetType: 'clear' | 'common' | 'apple' | 'samsung' | 'google' | 'xiaomi' | 'oneplus') => {
    const newSelection = new Set<string>();
    
    if (presetType === 'clear') {
      setSelectedFeatures(newSelection);
      return;
    }

    // All presets (other than 'clear' which returned early) include common features
    COMMON_FEATURES.forEach(f => newSelection.add(f.id));

    if (presetType !== 'common') {
      // Add specific features for designated brand
      SPECIFIC_FEATURES.filter(f => f.objectId === presetType).forEach(f => newSelection.add(f.id));
    }

    setSelectedFeatures(newSelection);
  };

  // Toggle individual feature selection
  const toggleFeature = (id: string) => {
    const updated = new Set(selectedFeatures);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSelectedFeatures(updated);
  };

  // Calculate scores for all objects in real-time
  const objectScores = useMemo(() => {
    const scores: Record<string, number> = {};

    MOBILE_OBJECTS.forEach(obj => {
      let totalWeight = 0;
      
      // Calculate selected common weights
      COMMON_FEATURES.forEach(f => {
        if (selectedFeatures.has(f.id)) {
          totalWeight += calculateWeight(f, activeModel, COMMON_FEATURES.length, 15, obj.id);
        }
      });

      // Calculate selected specific weights
      SPECIFIC_FEATURES.forEach(f => {
        if (f.objectId === obj.id && selectedFeatures.has(f.id)) {
          totalWeight += calculateWeight(f, activeModel, COMMON_FEATURES.length, 15, obj.id);
        }
      });

      // Clamp to maximum 100% due to floating precision and display as percentage
      scores[obj.id] = Math.min(totalWeight * 100, 100);
    });

    return scores;
  }, [selectedFeatures, activeModel]);

  // Identify the recognized object (highest score, must be > 0)
  const recognizedObject = useMemo(() => {
    let bestId = '';
    let maxScore = 0;

    MOBILE_OBJECTS.forEach(obj => {
      const val = objectScores[obj.id] || 0;
      if (val > maxScore) {
        maxScore = val;
        bestId = obj.id;
      }
    });

    // Only recognize if at least some features are picked to avoid defaulting
    if (maxScore > 0 && bestId) {
      return MOBILE_OBJECTS.find(o => o.id === bestId) || null;
    }
    return null;
  }, [objectScores]);

  // Filters feature space list based on search and subtabs
  const filteredCommonFeatures = useMemo(() => {
    return COMMON_FEATURES.filter(f => 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.valueDescription.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredSpecificFeatures = useMemo(() => {
    return SPECIFIC_FEATURES.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            f.valueDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = selectedSpecificTab === 'all' || f.objectId === selectedSpecificTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, selectedSpecificTab]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans transition-colors antialiased select-none">
      
      {/* Decorative colored visual ambient blurred backgrounds */}
      <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[24rem] h-[24rem] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main header block */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur sticky top-0 z-40 px-4 py-3.5 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600/25 p-2 rounded-xl border border-indigo-500/20 text-indigo-400">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 font-bold border border-indigo-500/20">
                  Практична робота № 3
                </span>
                <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">
                  Об'єкти: {MOBILE_OBJECTS.length}
                </span>
              </div>
              <h1 className="text-base md:text-lg font-extrabold tracking-tight mt-0.5">
                Класифікація та розпізнавання мобільних телефонів
              </h1>
            </div>
          </div>

          {/* Tab Navigation Controller */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
            <button
              onClick={() => setActiveTab('classifier')}
              id="tab-btn-classifier"
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'classifier' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone size={14} />
              Розпізнавання пристроїв
            </button>
            <button
              onClick={() => setActiveTab('report')}
              id="tab-btn-report"
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'report' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText size={14} />
              Генератор Звітів
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8">
        
        {/* TAB 1: CLASSIFIER AND SIMULATOR SCREEN */}
        {activeTab === 'classifier' && (
          <div className="space-y-6 md:space-y-8">
            
            {/* Quick configuration bar for fast grading */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-xs font-mono uppercase text-indigo-400 font-bold tracking-wide">Академічні пресети тестування</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">В один клік застосовуйте унікальні ознаки для перевірки точності та чутливості алгоритму:</p>
              </div>
              <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                <button
                  onClick={() => applyPreset('clear')}
                  id="preset-clear"
                  className="flex items-center gap-1 bg-slate-900 hover:bg-slate-850 px-3 py-1.5 text-[11px] font-bold rounded-lg border border-slate-850 transition-colors"
                >
                  <RotateCcw size={12} />
                  Скинути все
                </button>
                <button
                  onClick={() => applyPreset('common')}
                  id="preset-common"
                  className="bg-indigo-950/40 hover:bg-indigo-950/70 text-indigo-300 px-3 py-1.5 text-[11px] font-bold rounded-lg border border-indigo-900/30 transition-colors"
                >
                  Лише Спільні (Усі рівні)
                </button>
                <button
                  onClick={() => applyPreset('apple')}
                  id="preset-apple"
                  className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 text-[11px] font-bold rounded-lg border border-stone-700/60 transition-colors"
                >
                  Еталон iPhone
                </button>
                <button
                  onClick={() => applyPreset('samsung')}
                  id="preset-samsung"
                  className="bg-blue-950/50 hover:bg-blue-900/40 text-blue-300 px-3 py-1.5 text-[11px] font-bold rounded-lg border border-blue-900/40 transition-colors"
                >
                  Еталон Galaxy
                </button>
                <button
                  onClick={() => applyPreset('google')}
                  id="preset-google"
                  className="bg-sky-950/50 hover:bg-sky-900/40 text-sky-300 px-3 py-1.5 text-[11px] font-bold rounded-lg border border-sky-900/40 transition-colors"
                >
                  Еталон Pixel
                </button>
                <button
                  onClick={() => applyPreset('xiaomi')}
                  id="preset-xiaomi"
                  className="bg-orange-950/50 hover:bg-orange-900/40 text-orange-300 px-3 py-1.5 text-[11px] font-bold rounded-lg border border-orange-900/40 transition-colors"
                >
                  Еталон Redmi
                </button>
                <button
                  onClick={() => applyPreset('oneplus')}
                  id="preset-oneplus"
                  className="bg-red-950/50 hover:bg-red-900/40 text-red-300 px-3 py-1.5 text-[11px] font-bold rounded-lg border border-red-900/40 transition-colors"
                >
                  Еталон OnePlus
                </button>
              </div>
            </div>

            {/* Core Classification Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
              
              {/* Left Column: Feature checklist selector (7 cols on big screens) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Search and Math Weight Model selector */}
                <div className="bg-slate-950/80 border border-slate-805 p-5 rounded-3xl space-y-4 shadow-xl">
                  
                  {/* Select weights distribution algorithm */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
                        <Sliders size={13} className="text-indigo-400" />
                        Математична модель ваг
                      </label>
                      <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded font-bold">
                        ∑=100% (1.0)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <button
                        onClick={() => setActiveModel('model_a')}
                        id="model-select-a"
                        className={`p-3 rounded-xl border text-left transition-all ${
                          activeModel === 'model_a'
                            ? 'bg-indigo-600/15 border-indigo-500 text-white'
                            : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <p className="text-[11px] font-bold flex items-center gap-1">
                          <span>Розділ 50% / 50%</span>
                          {activeModel === 'model_a' && <span className="bg-emerald-500 text-[8px] text-white px-1.5 py-0.2 rounded font-mono uppercase">ON</span>}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                          Спільна група важить 50% загалом, а специфічна забирає інші 50%.
                        </p>
                      </button>

                      <button
                        onClick={() => setActiveModel('model_b')}
                        id="model-select-b"
                        className={`p-3 rounded-xl border text-left transition-all ${
                          activeModel === 'model_b'
                            ? 'bg-indigo-600/15 border-indigo-500 text-white'
                            : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <p className="text-[11px] font-bold flex items-center gap-1">
                          <span>Пропорційно рівні</span>
                          {activeModel === 'model_b' && <span className="bg-emerald-500 text-[8px] text-white px-1.5 py-0.2 rounded font-mono uppercase">ON</span>}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                          Кожна ознака має повністю ідентичну вагу: 100% / (n + m).
                        </p>
                      </button>

                      <button
                        onClick={() => setActiveModel('model_c')}
                        id="model-select-c"
                        className={`p-3 rounded-xl border text-left transition-all ${
                          activeModel === 'model_c'
                            ? 'bg-indigo-600/15 border-indigo-500 text-white'
                            : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        <p className="text-[11px] font-bold flex items-center gap-1">
                          <span>Пріоритетні ваги</span>
                          {activeModel === 'model_c' && <span className="bg-emerald-500 text-[8px] text-white px-1.5 py-0.2 rounded font-mono uppercase">ON</span>}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                          Експертна модель: вага залежить від Важливості (High/Med/Low).
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Feature search and filtering input */}
                  <div className="relative pt-1">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      id="search-features-input"
                      type="text"
                      placeholder="Пошук у просторі ознак за ключовим словом (наприклад, 120Вт, Face ID, NFC)..."
                      className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 focus:ring-1 focus:ring-indigo-500 focus:outline-none rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 h-10 transition-all font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                </div>

                {/* Common features block checklist */}
                <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center bg-indigo-500/10 text-indigo-400 w-6 h-6 rounded-lg text-xs font-mono font-bold">1</span>
                      <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-slate-300">Спільний простір ознак (Спільні ознаки)</h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-medium">всього {COMMON_FEATURES.length}</span>
                  </div>

                  {filteredCommonFeatures.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs">Ознак за вашим запитом не знайдено</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[28rem] overflow-y-auto pr-1">
                      {filteredCommonFeatures.map(feat => {
                        const isSelected = selectedFeatures.has(feat.id);
                        // calculate dynamic weight percentage for info display
                        const weight = calculateWeight(feat, activeModel, COMMON_FEATURES.length, 15, 'apple');
                        
                        return (
                          <div
                            key={feat.id}
                            id={`feature-card-${feat.id}`}
                            onClick={() => toggleFeature(feat.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected 
                                ? 'bg-indigo-600/10 border-indigo-500/70 text-indigo-100 shadow-sm' 
                                : 'bg-slate-900/40 border-slate-850 hover:border-slate-800 text-slate-300 hover:bg-slate-900/70'
                            }`}
                          >
                            <div className="flex items-start gap-2.5 max-w-[80%]">
                              <div className={`mt-0.5 rounded border transition-colors flex items-center justify-center flex-shrink-0 ${
                                isSelected ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-700 bg-slate-900 text-transparent'
                              }`} style={{ width: '15px', height: '15px' }}>
                                <Check size={11} strokeWidth={3} />
                              </div>
                              <div className="leading-tight">
                                <p className="text-[11px] font-bold line-clamp-2">{feat.name}</p>
                                <p className="text-[9px] text-slate-400 mt-0.5">{feat.valueDescription}</p>
                              </div>
                            </div>

                            {/* Priority tags representing visual weights distribution */}
                            <div className="flex flex-col items-end gap-1.5">
                              <span className="text-[9px] font-mono font-bold text-slate-400">
                                +{(weight * 100).toFixed(1)}%
                              </span>
                              <span className={`text-[8px] uppercase font-mono font-bold px-1.5 py-0.2 rounded font-bold ${
                                feat.priority === 'high' 
                                  ? 'bg-emerald-500/10 text-emerald-400' 
                                  : feat.priority === 'medium' 
                                  ? 'bg-amber-500/10 text-amber-300' 
                                  : 'bg-slate-800 text-slate-400'
                              }`}>
                                {feat.priority === 'high' ? 'High' : feat.priority === 'medium' ? 'Med' : 'Low'}
                              </span>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>

                {/* Specific features block checkbox selectors */}
                <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center bg-indigo-500/10 text-indigo-400 w-6 h-6 rounded-lg text-xs font-mono font-bold">2</span>
                      <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-slate-300">Специфічні та диференціальні ознаки об'єктів</h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-medium">всього {SPECIFIC_FEATURES.length}</span>
                  </div>

                  {/* Brand tabs within specific features panel for comfort filtration */}
                  <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-850">
                    <button
                      onClick={() => setSelectedSpecificTab('all')}
                      id="spec-tab-all"
                      className={`px-3 py-1.5 text-[10px] font-mono font-bold rounded-lg transition-all ${
                        selectedSpecificTab === 'all' 
                          ? 'bg-slate-800 text-white shadow' 
                          : 'text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      Всі бренди
                    </button>
                    {MOBILE_OBJECTS.map(obj => (
                      <button
                        key={obj.id}
                        id={`spec-tab-${obj.id}`}
                        onClick={() => setSelectedSpecificTab(obj.id)}
                        className={`px-3 py-1.5 text-[10px] font-mono font-bold rounded-lg transition-all ${
                          selectedSpecificTab === obj.id 
                            ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-300' 
                            : 'text-slate-400 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        {obj.brand}
                      </button>
                    ))}
                  </div>

                  {filteredSpecificFeatures.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs">Ознак за вашим запитом не знайдено</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[28rem] overflow-y-auto pr-1">
                      {filteredSpecificFeatures.map(feat => {
                        const isSelected = selectedFeatures.has(feat.id);
                        const associatedObject = MOBILE_OBJECTS.find(o => o.id === feat.objectId);
                        // calculate dynamic weight percentage for info display
                        const weight = calculateWeight(feat, activeModel, COMMON_FEATURES.length, 15, feat.objectId || 'apple');
                        
                        return (
                          <div
                            key={feat.id}
                            id={`feature-card-${feat.id}`}
                            onClick={() => toggleFeature(feat.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected 
                                ? 'bg-indigo-600/10 border-indigo-500/70 text-indigo-100 shadow-sm' 
                                : 'bg-slate-900/40 border-slate-850 hover:border-slate-800 text-slate-300 hover:bg-slate-900/70'
                            }`}
                          >
                            <div className="flex items-start gap-2.5 max-w-[80%]">
                              <div className={`mt-0.5 rounded border transition-colors flex items-center justify-center flex-shrink-0 ${
                                isSelected ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-700 bg-slate-900 text-transparent'
                              }`} style={{ width: '15px', height: '15px' }}>
                                <Check size={11} strokeWidth={3} />
                              </div>
                              <div className="leading-tight">
                                <div className="flex items-center gap-1.5">
                                  <p className="text-[11px] font-bold line-clamp-1">{feat.name}</p>
                                  {associatedObject && (
                                    <span 
                                      className="text-[8px] font-mono font-semibold px-1 py-0.1 rounded text-white"
                                      style={{ backgroundColor: associatedObject.color + '40', border: `1px solid ${associatedObject.color}60`, color: associatedObject.color }}
                                    >
                                      {associatedObject.brand}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[9px] text-slate-400 mt-0.5">{feat.valueDescription}</p>
                              </div>
                            </div>

                            {/* Weight badge representing visual weights distribution */}
                            <div className="flex flex-col items-end gap-1.5">
                              <span className="text-[9px] font-mono font-bold text-slate-400">
                                +{(weight * 100).toFixed(1)}%
                              </span>
                              <span className={`text-[8px] uppercase font-mono font-bold px-1.5 py-0.2 rounded font-bold ${
                                feat.priority === 'high' 
                                  ? 'bg-emerald-500/10 text-emerald-400' 
                                  : feat.priority === 'medium' 
                                  ? 'bg-amber-500/10 text-amber-300' 
                                  : 'bg-slate-800 text-slate-400'
                              }`}>
                                {feat.priority === 'high' ? 'High' : feat.priority === 'medium' ? 'Med' : 'Low'}
                              </span>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>

              </div>

              {/* Right Column: Calculations, dynamic metrics (5 cols on big screens) */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                
                {/* Real-time Matching Score Progress dashboard */}
                <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
                  <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-slate-300 flex items-center gap-2">
                    <TrendingUp size={14} className="text-indigo-400" />
                    Результати класифікації (Сума ваг)
                  </h4>

                  <div className="space-y-3.5">
                    {MOBILE_OBJECTS.map(obj => {
                      const score = objectScores[obj.id] || 0;
                      const isWinner = recognizedObject?.id === obj.id;
                      
                      return (
                        <div key={obj.id} className="space-y-1.5" id={`score-row-${obj.id}`}>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold flex items-center gap-1.5">
                              {isWinner ? (
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block flex-shrink-0" />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-slate-700 inline-block flex-shrink-0" />
                              )}
                              {obj.name}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-200">
                              {score.toFixed(2)}%
                            </span>
                          </div>
                          
                          {/* Animated progress bar */}
                          <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800/30">
                            <motion.div 
                              className="h-full rounded-full transition-all"
                              initial={{ width: 0 }}
                              animate={{ width: `${score}%` }}
                              style={{ 
                                background: isWinner
                                  ? `linear-gradient(90deg, ${obj.color}, #10b981)`
                                  : obj.color,
                                boxShadow: isWinner ? `0 0 10px ${obj.color}50` : 'none'
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Math models explanation text box */}
                  <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-850 flex gap-2.5">
                    <Info size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div className="text-[10px] text-slate-400 leading-relaxed font-mono">
                      <p className="text-slate-300 font-bold mb-1">Формула прийняття рішення:</p>
                      <p>Розпізнається об'єкт j, для якого сума ваг активованих вами ознак є максимальною.</p>
                      <p className="mt-1">
                        Поточна сума ознак на формі: <span className="font-bold text-indigo-300">{selectedFeatures.size} шт.</span>
                      </p>
                    </div>
                  </div>

                </div>

                {/* Main Dynamic Recognized Object Showcard box */}
                <div>
                  <AnimatePresence mode="wait">
                    {recognizedObject ? (
                      <div key={recognizedObject.id}>
                        <DeviceMockup
                          id={recognizedObject.id}
                          name={recognizedObject.name}
                          brand={recognizedObject.brand}
                          color={recognizedObject.color}
                          tagline={recognizedObject.tagline}
                          description={recognizedObject.description}
                          specifications={recognizedObject.specifications}
                          score={objectScores[recognizedObject.id]}
                        />
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-3xl p-8 bg-slate-950/40 border border-slate-800 border-dashed text-center flex flex-col items-center justify-center min-h-[16rem]"
                        id="no-recognized-placeholder"
                      >
                        <div className="p-3 bg-slate-900 rounded-full border border-slate-800 text-slate-500 mb-3">
                          <Smartphone size={28} className="animate-pulse" />
                        </div>
                        <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-slate-400">Очікування ознак розпізнавання</h4>
                        <p className="text-[11px] text-slate-500 mt-2 max-w-xs leading-normal">
                          Виберіть будь-які базові та специфічні наліпки у лівій частині екрану. Математичний простір автоматично розпізнає телефон із найвищою відповідністю.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: ACADEMIC LAB REPORT SCREEN */}
        {activeTab === 'report' && (
          <div className="space-y-6">
            <LabReport
              selectedFeatures={selectedFeatures}
              activeModel={activeModel}
              objects={MOBILE_OBJECTS}
              commonFeatures={COMMON_FEATURES}
              specificFeatures={SPECIFIC_FEATURES}
              recognizedObject={recognizedObject}
              objectScores={objectScores}
            />
          </div>
        )}

      </main>

      {/* Elegant Academic Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/40 py-5 px-4 text-center text-[10px] font-mono text-slate-500 select-none no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Комп’ютерні науки — Практична робота № 3</p>
          <p>Система спроектована та оптимізована згідно з навчальним планом класифікації та кластеризації</p>
        </div>
      </footer>

    </div>
  );
}
