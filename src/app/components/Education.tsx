"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCertificate, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
  description: string;
}

export default function Education() {
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

  const education: Education[] = [

    {
      institution: "Военный учебно-научный центр ВВС, Военно-воздушная академия имени профессора Н. Е. Жуковского и Ю. А. Гагарина",
      degree: "Метрологическое обеспечение",
      location: "Воронеж, Россия",
      period: "2016 — 2021",
      description: "Метрологическое обеспечение измерений и контроля параметров радиосистем и связи."
    }
  ];

  return (
    <section className="section-container" id="education" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title gradient-text font-heading">Образование</h2>
          <p className="section-subtitle">
            Моя образовательная квалификация и сертификаты.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-10">
          {education.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card p-6 hover-lift"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary-600/20 text-primary-500">
                  <FaGraduationCap className="text-2xl" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-secondary-50 mb-1 font-heading">{item.institution}</h3>
                  <h4 className="text-lg font-medium text-primary-400 mb-2">{item.degree}</h4>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-secondary-300 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="opacity-70" /> 
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="opacity-70" /> 
                      <span>{item.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-secondary-200">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 p-6 glass-card hover-lift">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary-600/20 text-primary-500">
              <FaCertificate className="text-2xl" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-secondary-50 mb-4 font-heading">Дополнительное образование</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-primary-400 mb-1">Курс "Python-разработчик"</h4>
                  <p className="text-sm text-secondary-300 mb-2">Академия TOP, 2022</p>
                  <p className="text-secondary-200">Углубленное изучение Python, включая ООП, работу с базами данных, и веб-разработку с использованием Django и FastAPI.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 