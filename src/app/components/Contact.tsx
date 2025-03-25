"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaTelegram, FaEnvelope, FaPhone, FaFilePdf } from 'react-icons/fa';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const contactLinks = [
    {
      text: "User270298",
      href: "https://github.com/User270298",
      icon: <FaGithub className="text-2xl" />,
      label: "GitHub"
    },
    {
      text: "@Olegarhovs",
      href: "https://t.me/Olegarhovs",
      icon: <FaTelegram className="text-2xl" />,
      label: "Telegram"
    },
    {
      text: "ovsiannikov263@gmail.com",
      href: "mailto:ovsiannikov263@gmail.com",
      icon: <FaEnvelope className="text-2xl" />,
      label: "Email"
    },
    {
      text: "+7 (905) 644-01-80 ",
      href: "tel:+79056440180",
      icon: <FaPhone className="text-2xl" />,
      label: "Телефон"
    },
    {
      text: "Резюме на hh.ru",
      href: "https://rostov.hh.ru/resume/56f0d687ff0c9694ab0039ed1f767463396742",
      icon: <FaFilePdf className="text-2xl" />,
      label: "Резюме"
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <section className="section-container" id="contact" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="text-center mb-16 w-full">
          <h2 className="section-title gradient-text font-heading">Связаться со мной</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Заинтересованы в совместной работе? Свяжитесь со мной через контактные данные ниже.
          </p>
        </motion.div>

        <div className="w-full max-w-5xl mx-auto">
          <motion.div variants={itemVariants}>
            <div className="glass-card p-10 h-full rounded-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-secondary-50 font-heading text-center">Контактные данные</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {contactLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className={`flex items-center gap-5 bg-dark-900/50 p-5 rounded-xl hover:bg-dark-800 transition-all
                      ${index === contactLinks.length - 1 && contactLinks.length % 2 === 1 ? 'md:col-span-2' : ''}`}
                  >
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary-600/20 text-primary-500">
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-base text-secondary-300 mb-1">{link.label}</p>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary-100 hover:text-primary-400 transition-colors text-lg font-medium"
                      >
                        {link.text}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="border-t border-dark-700 pt-8 text-center">
                <h4 className="text-xl md:text-2xl font-medium mb-5 text-secondary-100 font-heading">Рабочее время</h4>
                <p className="text-xl text-secondary-200 mb-3">Понедельник - Пятница: 9:00 - 18:00</p>
                <p className="text-lg text-secondary-300">Выходные дни могу отвечать с задержкой</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 