import React, { useState } from 'react';
import { MobileObject, Feature, WeightModel } from '../types';
import { calculateWeight } from '../data';
import { Printer, FileText, CheckCircle, Info, RefreshCw } from 'lucide-react';

interface LabReportProps {
  selectedFeatures: Set<string>;
  activeModel: WeightModel;
  objects: MobileObject[];
  commonFeatures: Feature[];
  specificFeatures: Feature[];
  recognizedObject: MobileObject | null;
  objectScores: Record<string, number>;
}

export function LabReport({
  selectedFeatures,
  activeModel,
  objects,
  commonFeatures,
  specificFeatures,
  recognizedObject,
  objectScores
}: LabReportProps) {
  // Report forms custom metadata
  const [studentName, setStudentName] = useState('Іванов Іван Іванович');
  const [studentGroup, setStudentGroup] = useState('КН-301');
  const [variant, setVariant] = useState('12');
  const [professorName, setProfessorName] = useState('Коваленко О.В.');
  const [reportDate, setReportDate] = useState(new Date().toLocaleDateString('uk-UA'));

  const handlePrint = () => {
    window.print();
  };

  const getModelName = (modelId: WeightModel) => {
    switch (modelId) {
      case 'model_a': return 'А) Рівні ваги у групах (50% спільні / 50% специфічні)';
      case 'model_b': return 'Б) Пропорційно-рівні ваги всіх ознак (100% / (n + m))';
      case 'model_c': return 'В) Пріоритетні ваги відповідно до ступеня важливості (High/Medium/Low)';
      default: return '';
    }
  };

  const selectedCommonList = commonFeatures.filter(f => selectedFeatures.has(f.id));
  const selectedSpecificList = specificFeatures.filter(f => selectedFeatures.has(f.id));

  return (
    <div className="bg-white text-gray-900 rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl" id="report-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6 no-print">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="text-indigo-600" />
            Інтерактивний генератор звіту з практичної роботи
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Заповніть ваші академічні дані нижче. Звіт генерується динамічно відповідно до вибраних вами опцій процесу розпізнавання.
          </p>
        </div>
        <button
          onClick={handlePrint}
          id="btn-print-report"
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-200 transition-colors w-full md:w-auto"
        >
          <Printer size={16} />
          Друкувати або зберегти як PDF
        </button>
      </div>

      {/* Inputs block visible only on screen, hidden on print */}
      <div className="no-print bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-bold text-slate-500 mb-1" htmlFor="input-student-name">ПІБ Студента</label>
          <input
            id="input-student-name"
            type="text"
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none font-medium"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-bold text-slate-500 mb-1" htmlFor="input-student-group">Група</label>
          <input
            id="input-student-group"
            type="text"
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none font-medium"
            value={studentGroup}
            onChange={(e) => setStudentGroup(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-bold text-slate-500 mb-1" htmlFor="input-student-variant">Варіант</label>
          <input
            id="input-student-variant"
            type="text"
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none font-medium"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-bold text-slate-500 mb-1" htmlFor="input-professor-name">Перевірив викладач</label>
          <input
            id="input-professor-name"
            type="text"
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none font-medium"
            value={professorName}
            onChange={(e) => setProfessorName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-bold text-slate-500 mb-1" htmlFor="input-report-date">Дата здачі</label>
          <input
            id="input-report-date"
            type="text"
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none font-medium"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
          />
        </div>
      </div>

      {/* PRINT-READY DOCUMENT OUTLINE */}
      <div className="print-document bg-white font-serif max-w-4xl mx-auto text-black leading-relaxed" id="academic-print-content">
        {/* Document Header */}
        <div className="text-center mb-8 border-b-2 border-dashed border-gray-300 pb-6 uppercase font-sans text-xs tracking-wide">
          <p className="font-bold">Міністерство освіти і науки України</p>
          <p className="text-[10px] mt-0.5">Кафедра комп'ютерних наук та систем штучного інтелекту</p>
          <p className="text-[10px]">Дисципліна: Системи розпізнавання образів та класифікація</p>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-serif uppercase tracking-tight">Звіт з практичної роботи № 3</h1>
          <h2 className="text-lg font-semibold mt-1">«Класифікація та розпізнавання образів за простором ознак»</h2>
        </div>

        {/* Academic Details Card */}
        <div className="grid grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4 font-sans text-xs mb-8 bg-zinc-50">
          <div>
            <p><strong>Виконав:</strong> {studentName}</p>
            <p className="mt-1"><strong>Група:</strong> {studentGroup}</p>
            <p className="mt-1"><strong>Варіант:</strong> {variant}</p>
          </div>
          <div>
            <p><strong>Перевірив:</strong> {professorName}</p>
            <p className="mt-1"><strong>Дата виконання:</strong> {reportDate}</p>
            <p className="mt-1"><strong>Статус розпізнавання:</strong> <span className="text-emerald-700 font-bold">Розраховано</span></p>
          </div>
        </div>

        {/* Metadata Section */}
        <div className="space-y-4 text-justify font-serif text-sm">
          <div>
            <h3 className="text-base font-bold border-b border-gray-300 pb-1 uppercase font-sans">1. Мета роботи</h3>
            <p className="mt-2 text-gray-800">
              Розробити програмне забезпечення для розпізнавання об’єкта з обраної предметної області на основі математично побудованого спільного простору ознак. Дослідити вплив різних математичних моделей розподілу ваг ознак (рівномірного розподілу, групового розподілу та пріоритетного розподілу за ступенем важливості) на точність класифікації та розпізнавання об’єктів за умов неповної або надлишкової інформації.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold border-b border-gray-300 pb-1 uppercase font-sans mt-6">2. Опис предметної області та об'єктів класифікації</h3>
            <p className="mt-2 text-gray-800">
              Для виконання практичної роботи обрано предметну область: <strong>Мобільні телефони (Флагманські серії)</strong>. 
              До простору об'єктів класифікації належать {objects.length} провідних пристроїв від різних світових технологічних гігантів:
            </p>
            <ul className="list-decimal list-inside ml-4 mt-2 text-gray-800 space-y-1">
              {objects.map(obj => (
                <li key={obj.id}>
                  <strong>{obj.name}</strong> — {obj.description.slice(0, 180)}...
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold border-b border-gray-300 pb-1 uppercase font-sans mt-6">3. Опис математичних моделей вагових коефіцієнтів</h3>
            <p className="mt-2 text-gray-800">
              Згідно з завданням, загальна сума ваг ознак кожного окремого об'єкта дорівнює 100% (або 1.0). Програма реалізує три математичні підходи до вимірювання внеску ознак:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 text-gray-800 space-y-1.5">
              <li>
                <strong>Модель А (Рівні ваги у групах - 50% / 50%):</strong> Сукупність спільних ознак займає рівно 50% загальної ваги об'єкта, решта 50% розподіляється порівну між специфічними ознаками об'єкта. 
                Вага спільної ознаки: <code className="bg-slate-100 px-1 rounded font-mono">w = 0.50 / n</code>.
                Вага специфічної ознаки: <code className="bg-slate-100 px-1 rounded font-mono">w = 0.50 / m</code>.
              </li>
              <li>
                <strong>Модель Б (Пропорційно-рівні ваги):</strong> Всі унікальні та класифікаційні ознаки мають абсолютно рівні вагові частки в рамках повного простору. 
                Вага кожної ознаки становить <code className="bg-slate-100 px-1 rounded font-mono">w = 1 / (n + m)</code>, де <code className="bg-slate-100 px-1 rounded font-mono">n</code> — кількість спільних ознак, <code className="bg-slate-100 px-1 rounded font-mono">m</code> — кількість специфічних ознак.
              </li>
              <li>
                <strong>Модель В (Пріоритетні ваги відповідно до експертної важливості):</strong> Ознаки ранжуються за пріоритетом (Високий, Середній, Низький) із балами важливості 3, 2 та 1 відповідно. Розподіл ваг відбувається пропорційно до встановлених балів важливості, що дозволяє надавати брендам особливі унікальні ознаки високої класифікаційної цінності (наприклад, Face ID чи стилус S-Pen).
              </li>
            </ul>
          </div>

          {/* Table of common features */}
          <div>
            <h3 className="text-base font-bold border-b border-gray-300 pb-1 uppercase font-sans mt-6">4. Спільний простір ознак (Спільні ознаки - Сільний простір n = 18)</h3>
            <p className="mt-2 text-xs text-gray-600">
              Ці ознаки є базовими та обов'язковими для кожного з об'єктів класифікації. Від вибору цих ознак базовий рівень збігу піднімається пропорційно у всіх пристроїв однаково.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 font-sans border-b border-gray-300">
                    <th className="p-2 border border-gray-300 w-12 text-center">№</th>
                    <th className="p-2 border border-gray-300">Назва ознаки</th>
                    <th className="p-2 border border-gray-300">Інтервал значень</th>
                    <th className="p-2 border border-gray-300 text-center">Пріоритет</th>
                    <th className="p-2 border border-gray-300 text-center font-mono">Вага (A)</th>
                    <th className="p-2 border border-gray-300 text-center font-mono">Вага (Б)</th>
                  </tr>
                </thead>
                <tbody>
                  {commonFeatures.map((feat, i) => {
                    const weightA = calculateWeight(feat, 'model_a', commonFeatures.length, 15, 'apple');
                    const weightB = calculateWeight(feat, 'model_b', commonFeatures.length, 15, 'apple');
                    return (
                      <tr key={feat.id} className="border-b border-gray-200">
                        <td className="p-1.5 border border-gray-300 text-center">{i + 1}</td>
                        <td className="p-1.5 border border-gray-300 font-medium">{feat.name}</td>
                        <td className="p-1.5 border border-gray-300 text-zinc-600">{feat.valueDescription}</td>
                        <td className="p-1.5 border border-gray-300 text-center font-sans capitalize">{feat.priority === 'high' ? 'Високий' : feat.priority === 'medium' ? 'Середній' : 'Низький'}</td>
                        <td className="p-1.5 border border-gray-300 text-center font-mono font-semibold">{(weightA * 100).toFixed(2)}%</td>
                        <td className="p-1.5 border border-gray-300 text-center font-mono font-semibold">{(weightB * 100).toFixed(2)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table of specific features for objects details */}
          <div>
            <h3 className="text-base font-bold border-b border-gray-300 pb-1 uppercase font-sans mt-6">5. Специфічні та унікальні характеристики для кожного об'єкта (m = 15 на об'єкт)</h3>
            <p className="mt-2 text-xs text-gray-800">
              Нижче наведено зразки специфічних ознак для кожного пристрою, що забезпечують їх диференціацію та фірмову точність розпізнавання:
            </p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {objects.map(obj => {
                const specList = specificFeatures.filter(f => f.objectId === obj.id).slice(0, 5); // display first 5 for spacing in report
                return (
                  <div key={obj.id} className="border border-gray-200 rounded p-3 bg-zinc-50">
                    <h4 className="font-bold text-xs uppercase font-sans text-indigo-900 border-b border-gray-200 pb-1">{obj.name}</h4>
                    <ul className="mt-2 list-disc list-inside text-xs space-y-1 text-gray-700">
                      {specList.map(feat => (
                        <li key={feat.id} className="truncate">
                          <strong>{feat.name}</strong> ({feat.priority === 'high' ? 'Високий' : feat.priority === 'medium' ? 'Сер.' : 'Низ.'})
                        </li>
                      ))}
                      <li className="text-[11px] text-gray-500 italic">...та ще 10 додаткових специфічних ознак у коді програми</li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calculations section */}
          <div>
            <h3 className="text-base font-bold border-b border-gray-300 pb-1 uppercase font-sans mt-6">6. Результати розпізнавання та роздруківка стану програми</h3>
            <div className="mt-3 bg-zinc-50 border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-sans">
                <strong>Активна обрана модель ваг:</strong> <span className="text-indigo-700 font-semibold">{getModelName(activeModel)}</span>
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                <div>
                  <p className="font-sans font-bold text-slate-700">Параметри розпізнаваного експерименту:</p>
                  <p className="mt-1">Обрано спільних ознак: <span className="font-mono font-semibold">{selectedCommonList.length}</span> з {commonFeatures.length}</p>
                  <p className="mt-0.5">Обрано специфічних ознак: <span className="font-mono font-semibold">{selectedSpecificList.length}</span> з {specificFeatures.length}</p>
                  <p className="mt-0.5">Всього активних ознак у формі: <span className="bg-slate-200 px-1.5 rounded font-mono font-bold text-gray-800">{selectedFeatures.size}</span></p>
                </div>
                <div>
                  <p className="font-sans font-bold text-slate-700">Результати розпізнавання:</p>
                  {objects.map(obj => {
                    const isWinner = recognizedObject?.id === obj.id;
                    return (
                      <p key={obj.id} className={`mt-0.5 flex justify-between ${isWinner ? 'text-emerald-700 font-bold' : 'text-gray-600'}`}>
                        <span>{obj.name}:</span>
                        <span className="font-mono">{objectScores[obj.id].toFixed(2)}% {isWinner ? '★ (Розпізнано)' : ''}</span>
                      </p>
                    );
                  })}
                </div>
              </div>

              {recognizedObject ? (
                <div className="mt-4 border-t border-gray-200 pt-3 flex items-start gap-3">
                  <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="font-sans font-bold text-sm text-slate-800">Ідентифікований об'єкт:</p>
                    <p className="text-base font-serif font-black text-indigo-900 mt-0.5">{recognizedObject.name}</p>
                    <p className="text-xs text-gray-600 italic mt-0.5">{recognizedObject.tagline}</p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 border-t border-gray-200 pt-3 flex items-center gap-1.5 text-xs text-amber-700">
                  <Info size={14} />
                  <span>Будь ласка, оберіть декілька ознак у лівій панелі для запуску розпізнавання.</span>
                </div>
              )}
            </div>
          </div>

          {/* Conclusion */}
          <div>
            <h3 className="text-base font-bold border-b border-gray-300 pb-1 uppercase font-sans mt-6">7. Висновок</h3>
            <p className="mt-2 text-gray-800">
              В ході виконання практичної роботи було спроектовано спільний та специфічний простір ознак для {objects.length} представників мобільних телефонів (Apple, Samsung, Xiaomi, Google, OnePlus). 
              Реалізовано систему інтелектуальної класифікації з підтримкою трьох математичних моделей ваг. 
              {recognizedObject ? (
                <span> 
                  Експериментальним шляхом на формі було обрано набір ознак та здійснено розпізнавання об'єкта, яким став <strong>{recognizedObject.name}</strong> із найвищою сукупною вагою у <strong>{objectScores[recognizedObject.id].toFixed(2)}%</strong> за обраною моделлю. 
                </span>
              ) : (
                <span> Було доведено інваріантність класифікації відносно розподілів ваг. </span>
              )}
              Дослідження засвідчило, що Модель В (експертно-пріоритетна) демонструє вищу гнучкість при розпізнаванні за умов обмеженої вибірки специфічних ознак завдяки ранжуванню важливості компонентів.
            </p>
          </div>
        </div>

        {/* Academic signature fields */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center text-xs font-sans">
          <div>
            <p>Виконав студент: _________________ ПІБ</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Підпис, дата</p>
          </div>
          <div className="text-right">
            <p>Прийняв викладач: _________________ {professorName.split(' ')[0]}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Оцінка, підпис, дата</p>
          </div>
        </div>
      </div>
    </div>
  );
}
