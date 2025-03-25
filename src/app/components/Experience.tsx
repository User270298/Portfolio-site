"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  responsibilities: string[];
}

export default function Experience() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const experiences: Experience[] = [
    {
      title: "Fullstack разработчик",
      company: "AgroCor",
      location: "Гибрид",
      period: "Февраль 2023 — По настоящее время",
      description: "Разработка и поддержка backend систем компании, а также создание Telegram-ботов для бизнес-процессов.",
      responsibilities: [
        "Разработка и поддержка внутренней ERP системы на Python/FastAPI",
        "Интеграция с платежными сервисами и внешними API",
        "Создание Telegram-ботов для автоматизации бизнес-процессов",
        "Оптимизация производительности баз данных PostgreSQL",
        "Создание корпоративных веб-сайтов на Next.js"
      ]
    },
    {
      title: "Python разработчик",
      company: "Фриланс",
      location: "Удаленно",
      period: "Июнь 2022 — Январь 2023",
      description: "Разработка веб-приложений и автоматизация процессов для клиентов на фрилансе.",
      responsibilities: [
        "Разработка веб-приложений на Django и FastAPI",
        "Создание скриптов для автоматизации бизнес-процессов",
        "Разработка парсеров данных и интеграция с внешними API",
        "Создание и оптимизация баз данных",
        "Техническая поддержка существующих проектов"
      ]
    }
  ];

  return (
    <section className="section-container" id="experience" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title gradient-text font-heading">Опыт работы</h2>
          <p className="section-subtitle">
            Моя профессиональная карьера и ключевые достижения.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-10">
          {experiences.map((job, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card p-6 hover-lift"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary-600/20 text-primary-500">
                  <FaBriefcase className="text-2xl" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-secondary-50 mb-1 font-heading">{job.title}</h3>
                  <h4 className="text-lg font-medium text-primary-400 mb-2">{job.company}</h4>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-secondary-300 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="opacity-70" /> 
                      <span>{job.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="opacity-70" /> 
                      <span>{job.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-secondary-200 mb-4">{job.description}</p>
                  
                  <div>
                    <h5 className="font-medium text-secondary-100 mb-2">Ключевые обязанности:</h5>
                    <ul className="list-disc pl-5 space-y-1 text-secondary-200">
                      {job.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
} 