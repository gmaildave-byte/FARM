import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Printer,
  X,
  FileCheck
} from 'lucide-react';
import { coursesData } from '../data/courses';
import { Course, CourseModule } from '../types';
import { CertificateModal } from '../components/CertificateModal';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const LearningPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number>(0);

  // Quiz state
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Certificate Modal state
  const [certModalOpen, setCertModalOpen] = useState<boolean>(false);

  const handleStartQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizActive(true);
  };

  const handleSelectAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!activeCourse) return;
    let correctCount = 0;
    activeCourse.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / activeCourse.quiz.length) * 100);
    setQuizScore(percentage);
    setQuizSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <BookOpen className="w-3.5 h-3.5" />
            AgriAcademy • Practical Agricultural Learning Centre
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Agricultural Learning Centre
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Structured online courses tailored for commercial and smallholder farmers in Kenya. Study complete agronomic and livestock modules, test your skills with practical examinations, and earn verifiable certificates upon passing.
          </p>
        </div>
      </div>

      {/* Courses Catalog (when no active course selected) */}
      {!activeCourse && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-stone-900">Available Certified Courses</h2>
            <span className="text-xs font-medium text-stone-500">Passing score: 70% for Verified Certificate</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coursesData.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-950/85 backdrop-blur-xs text-emerald-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {course.level} Level
                    </span>
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-500" />
                      <span>{course.durationHours} Hours</span>
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition">
                      {course.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-600 space-y-1">
                      <div><strong>Curriculum:</strong> {course.modules.length} Core Modules</div>
                      <div><strong>Final Test:</strong> {course.quiz.length} Examination Questions</div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      setActiveCourse(course);
                      setActiveModuleIdx(0);
                      setQuizActive(false);
                      setQuizSubmitted(false);
                    }}
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Start Course Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Course Study View */}
      {activeCourse && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-8 shadow-xs">
          {/* Top Bar with Back Button */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-200 pb-4">
            <div>
              <button
                onClick={() => setActiveCourse(null)}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 mb-1"
              >
                ← Back to Courses Catalog
              </button>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">{activeCourse.title}</h2>
              <p className="text-xs text-stone-500">{activeCourse.durationHours} Hours Study • {activeCourse.level} Level</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleStartQuiz}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Award className="w-4 h-4 text-emerald-300" />
                <span>Take Course Final Exam</span>
              </button>
            </div>
          </div>

          {!quizActive ? (
            /* Module Lessons View */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Modules Left Index */}
              <div className="lg:col-span-4 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                  Curriculum Modules ({activeCourse.modules.length})
                </div>
                {activeCourse.modules.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveModuleIdx(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition text-xs ${
                      activeModuleIdx === idx
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{m.title}</span>
                      <span className="text-[10px] text-stone-400 shrink-0 ml-1">{m.durationMinutes} min</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Module Content Viewer */}
              <div className="lg:col-span-8 bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                    Module {activeModuleIdx + 1} of {activeCourse.modules.length}
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mt-2">
                    {activeCourse.modules[activeModuleIdx].title}
                  </h3>
                </div>

                <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 bg-white p-5 rounded-xl border border-stone-200">
                  <p>{activeCourse.modules[activeModuleIdx].content}</p>
                </div>

                {/* Practical Field Checklist */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    Practical On-Farm Field Action Checklist
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/60">
                    {activeCourse.modules[activeModuleIdx].fieldChecklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Navigation between modules */}
                <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                  <button
                    disabled={activeModuleIdx === 0}
                    onClick={() => setActiveModuleIdx(prev => prev - 1)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border bg-white disabled:opacity-40"
                  >
                    ← Previous Module
                  </button>
                  {activeModuleIdx < activeCourse.modules.length - 1 ? (
                    <button
                      onClick={() => setActiveModuleIdx(prev => prev + 1)}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-800 text-white"
                    >
                      Next Module →
                    </button>
                  ) : (
                    <button
                      onClick={handleStartQuiz}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-600 text-white"
                    >
                      Take Final Exam →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Interactive Quiz Mode */
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Final Examination
                </span>
                <h3 className="text-xl font-bold text-stone-900">
                  {activeCourse.title} Comprehensive Assessment
                </h3>
                <p className="text-xs text-stone-500">Passing score of 70% or higher generates a verifiable certificate.</p>
              </div>

              {activeCourse.quiz.map((q, qIdx) => (
                <div
                  key={qIdx}
                  className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3 text-xs"
                >
                  <div className="font-bold text-stone-900 text-sm">
                    {qIdx + 1}. {q.question}
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      const isCorrect = q.correctIndex === optIdx;
                      let optionClass = 'bg-white border-stone-200 hover:border-emerald-500';

                      if (quizSubmitted) {
                        if (isCorrect) optionClass = 'bg-emerald-100 border-emerald-600 font-bold text-emerald-950';
                        else if (isSelected && !isCorrect) optionClass = 'bg-red-100 border-red-500 text-red-900';
                      } else if (isSelected) {
                        optionClass = 'bg-emerald-50 border-emerald-600 font-bold text-emerald-900';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectAnswer(qIdx, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between ${optionClass}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && <span className="text-emerald-700 font-bold">✓ Correct</span>}
                          {quizSubmitted && isSelected && !isCorrect && <span className="text-red-700 font-bold">✗ Incorrect</span>}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="text-[11px] text-stone-600 bg-white p-3 rounded-xl border border-stone-200 italic">
                      <strong>Agronomic Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}

              {/* Submit or Score Banner */}
              {!quizSubmitted ? (
                <div className="text-center pt-2">
                  <button
                    disabled={Object.keys(selectedAnswers).length < activeCourse.quiz.length}
                    onClick={handleSubmitQuiz}
                    className="px-8 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-sm font-bold transition shadow-sm disabled:opacity-40"
                  >
                    Submit Answers for Scoring
                  </button>
                </div>
              ) : (
                <div className="bg-emerald-900 text-white rounded-2xl p-6 text-center space-y-4">
                  <div>
                    <span className="text-xs uppercase font-bold text-emerald-300">Examination Score</span>
                    <div className="text-4xl font-black mt-1">{quizScore}%</div>
                  </div>

                  {quizScore >= 70 ? (
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-emerald-200">
                        Hongera! You passed with {quizScore}% and earned your Verified Course Certificate!
                      </div>
                      <button
                        onClick={() => setCertModalOpen(true)}
                        className="px-6 py-2.5 bg-white text-emerald-950 font-bold rounded-xl text-xs transition shadow-md inline-flex items-center gap-1.5"
                      >
                        <Award className="w-4 h-4 text-emerald-800" />
                        <span>View & Print Official Certificate</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-amber-200">
                        Score was below the 70% passing threshold. Review the lesson modules and retake the exam.
                      </div>
                      <button
                        onClick={handleStartQuiz}
                        className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
                      >
                        Retake Examination
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Verified Certificate Modal */}
      {activeCourse && (
        <CertificateModal
          course={activeCourse}
          studentName={user?.name || 'Registered Farmer'}
          score={quizScore}
          isOpen={certModalOpen}
          onClose={() => setCertModalOpen(false)}
        />
      )}
    </div>
  );
};
