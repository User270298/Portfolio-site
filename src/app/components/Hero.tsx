"use client";

import Image from 'next/image';
import { FaGithub, FaTelegram, FaEnvelope, FaLinkedin, FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Hero() {
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

  const floatingAnimation = {
    y: ["-0.5rem", "0.5rem", "-0.5rem"],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut"
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="w-full md:w-1/2 order-2 md:order-1"
            variants={itemVariants}
            animate={floatingAnimation}
          >
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl h-72 w-72 md:h-96 md:w-96 lg:h-[32rem] lg:w-[28rem] mx-auto shadow-2xl">
                <Image
                  src="/images/projects/profile1.jpg"
                  alt="Олег Овсянников"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 order-1 md:order-2 space-y-8"
            variants={itemVariants}
          >
            <motion.div 
              className="glass-card p-6 rounded-2xl"
              variants={itemVariants}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-3 gradient-text font-heading">
                Олег Овсянников
              </h1>
              <p className="text-2xl text-secondary-200 mb-2">Python & JavaScript Developer</p>
              <div className="flex items-center text-secondary-300">
                <span className="inline-flex items-center text-lg">
                  <span className="mr-2">26 лет</span>
                  <span className="mx-2">•</span>
                  <span>Ростов-на-Дону</span>
                </span>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-3"
              variants={itemVariants}
            >
              <motion.a 
                href="https://github.com/User270298" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover-lift flex items-center gap-2 text-secondary-200 hover:text-primary-400 glass-card rounded-full px-5 py-2.5 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="text-xl" />
                <span>Github</span>
              </motion.a>
              <motion.a 
                href="https://t.me/olegarhovs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover-lift flex items-center gap-2 text-secondary-200 hover:text-primary-400 glass-card rounded-full px-5 py-2.5 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTelegram className="text-xl" />
                <span>Telegram</span>
              </motion.a>
              <motion.a 
                href="mailto:oleg.ovsyannikov@example.com" 
                className="hover-lift flex items-center gap-2 text-secondary-200 hover:text-primary-400 glass-card rounded-full px-5 py-2.5 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope className="text-xl" />
                <span>Email</span>
              </motion.a>
              <motion.a 
                href="https://rostov.hh.ru/resume/56f0d687ff0c9694ab0039ed1f767463396742"
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover-lift flex items-center gap-2 text-secondary-200 hover:text-primary-400 glass-card rounded-full px-5 py-2.5 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* <FaLinkedin className="text-2xl" /> */}
                <span>HH.ru</span>
              </motion.a>
            </motion.div>

            <motion.div 
              className="glass-card rounded-2xl p-8"
              variants={itemVariants}
            >
              <p className="text-lg text-secondary-200 leading-relaxed">
                <span className="font-semibold gradient-text">Full-stack разработчик</span>  создающий современные веб-приложения с полным циклом разработки. Специализируюсь на экосистемах Python и JavaScript, проектирую эффективные и масштабируемые решения с применением передовых технологий. В работе использую Django и FastAPI для бэкенда, React и Next.js для фронтенда, а также PostgreSQL, SQLite и MongoDB в качестве баз данных. Опытен в настройке DevOps-инфраструктуры с Docker и VPS.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.a 
            href="#skills" 
            className="animate-bounce inline-flex items-center justify-center w-12 h-12 rounded-full bg-dark-800 text-primary-400 hover:bg-dark-700 transition-colors border border-dark-700"
            animate={{ y: ["0px", "8px", "0px"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaArrowDown />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 