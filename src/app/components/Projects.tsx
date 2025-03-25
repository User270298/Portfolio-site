"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaTelegram } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
  features: string[];
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'telegram'>('all');
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

  const projects: Project[] = [
    {
      title: "Сайт Academy of Business",
      description: "Корпоративный сайт, разработанный с использованием React и Next.js.",
      image: "/images/projects/academy.png",
      technologies: ["React", "Next.js"],
      link: "https://academyofbusiness.ru/",
      features: [
        "Современный адаптивный дизайн",
        "Оптимизация для SEO",
        "Интерактивные элементы"
      ]
    },
    {
      title: "Телеграм бот для совместных поездок",
      description: "Бот для организации совместных поездок между пользователями.",
      image: "/images/projects/way.jpg",
      technologies: ["Python", "Aiogram", "SQLite", "SQLAlchemy", 'Docker'],
      link: "https://t.me/on_the_way_rnd_bot",
      features: [
        "Система поиска попутчиков",
        "Пользовательские профили",
        "Автоматические уведомления",
        "Система рейтингов пользователей"
      ]
    },
    {
      title: "Телеграм бот интернет-магазин",
      description: "Интернет-магазин агропродукции в Telegram с системой заказов.",
      image: "/images/projects/market.jpg",
      technologies: ["Python", "Aiogram", "SQLite", "SQLAlchemy", 'Docker'],
      link: "https://t.me/agrocor_market_bot",
      features: [
        "Каталог товаров с категориями",
        "Система корзины и заказов",
        "Интеграция с платежными системами",
        "Система администрирования"
      ]
    },
    {
      title: "AI Telegram бот-ассистент",
      description: "Телеграм бот на основе OpenAI для помощи пользователям.",
      image: "/images/projects/agro.jpg",
      technologies: ["Python", "Aiogram", "OpenAI API"],
      link: "https://t.me/agrocorassistant_bot",
      features: [
        "Интеграция с OpenAI API",
        "Контекстные ответы на вопросы",
        "Аналитика запросов пользователей",
        "Генерация отчетов и рекомендаций"
      ]
    }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'all') return true;
    if (activeTab === 'web' && project.technologies.some(tech => ['React', 'Next.js'].includes(tech))) return true;
    if (activeTab === 'telegram' && project.technologies.some(tech => ['Aiogram'].includes(tech))) return true;
    return false;
  });

  return (
    <section className="section-container" id="projects" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title gradient-text font-heading">Мои проекты</h2>
          <p className="section-subtitle">
            Вот некоторые из моих проектов, демонстрирующих мои навыки и опыт в разработке.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <div className="inline-flex bg-dark-800 rounded-full p-1 border border-dark-700">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'all' ? 'bg-primary-600 text-secondary-50' : 'text-primary-400 hover:bg-dark-700'
              }`}
            >
              Все проекты
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'web' ? 'bg-primary-600 text-secondary-50' : 'text-primary-400 hover:bg-dark-700'
              }`}
            >
              Веб-разработка
            </button>
            <button
              onClick={() => setActiveTab('telegram')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'telegram' ? 'bg-primary-600 text-secondary-50' : 'text-primary-400 hover:bg-dark-700'
              }`}
            >
              Telegram боты
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              className="glass-card overflow-hidden rounded-xl hover-lift"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 flex items-end">
                  <div className="p-4 text-secondary-50">
                    <div className="flex gap-4">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-700/50 rounded-full hover:bg-primary-600/80 transition-colors">
                          <FaGithub className="text-lg" />
                        </a>
                      )}
                      {project.link && project.link.includes('t.me') && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-700/50 rounded-full hover:bg-primary-600/80 transition-colors">
                          <FaTelegram className="text-lg" />
                        </a>
                      )}
                      {project.link && !project.link.includes('t.me') && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-700/50 rounded-full hover:bg-primary-600/80 transition-colors">
                          <FaExternalLinkAlt className="text-lg" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div 
                  className="h-full w-full bg-cover bg-center" 
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 gradient-text font-heading">{project.title}</h3>
                <p className="text-secondary-300 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs text-primary-300 bg-dark-700 px-3 py-1 rounded-full border border-dark-600">
                      {tech}
                    </span>
                  ))}
                </div>
                <details className="text-sm text-secondary-300">
                  <summary className="cursor-pointer font-medium text-primary-400 hover:text-primary-300">
                    Ключевые особенности
                  </summary>
                  <ul className="mt-2 space-y-1 pl-5 list-disc">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </details>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-12">
          <a 
            href="https://github.com/User270298"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn btn-outline hover-lift"
          >
            <FaGithub className="text-lg" />
            <span>Посмотреть больше на GitHub</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}