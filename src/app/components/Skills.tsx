"use client";

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaPython, FaJs, FaReact, FaDatabase, FaDocker, FaLinux } from 'react-icons/fa';
import { SiDjango, SiFastapi, SiSqlite, SiPostgresql, SiTailwindcss, SiNextdotjs } from 'react-icons/si';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Array<{
    name: string;
    icon: React.ReactNode;
    level: number;
  }>;
}

export default function Skills() {
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

  const skillCategories: SkillCategory[] = [
    {
      title: "Языки программирования",
      icon: <FaPython className="text-3xl text-primary-500" />,
      skills: [
        { name: "Python", icon: <FaPython />, level: 90 },
        { name: "JavaScript", icon: <FaJs />, level: 85 },
      ]
    },
    {
      title: "Фреймворки",
      icon: <SiDjango className="text-3xl text-primary-500" />,
      skills: [
        { name: "FastAPI", icon: <SiFastapi />, level: 90 },
        { name: "Django", icon: <SiDjango />, level: 85 },
        { name: "React", icon: <FaReact />, level: 80 },
      ]
    },
    {
      title: "Базы данных",
      icon: <FaDatabase className="text-3xl text-primary-500" />,
      skills: [
        { name: "SQLAlchemy", icon: <FaDatabase />, level: 90 },
        { name: "SQLite", icon: <SiSqlite />, level: 90 },
        { name: "PostgreSQL", icon: <SiPostgresql />, level: 85 },
      ]
    },
    {
      title: "DevOps и инструменты",
      icon: <FaDocker className="text-3xl text-primary-500" />,
      skills: [
        { name: "Docker", icon: <FaDocker />, level: 80 },
        { name: "Linux", icon: <FaLinux />, level: 85 },
      ]
    }
  ];

  return (
    <section className="section-container" id="skills" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title gradient-text font-heading">Мои навыки</h2>
          <p className="section-subtitle">
            Профессиональные компетенции, которые я использую для создания эффективных и надежных решений.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index} 
              className="glass-card p-8 hover-lift"
              variants={itemVariants}
            >
              <div className="flex items-center mb-8">
                <div className="mr-4 p-4 bg-dark-700 rounded-xl border border-dark-600">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold gradient-text font-heading">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex} 
                    className="space-y-2"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : { width: 0 }}
                    transition={{ delay: index * 0.1 + skillIndex * 0.1 + 0.5, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-primary-400 mr-2 text-xl">{skill.icon}</span>
                        <span className="font-medium text-secondary-100">{skill.name}</span>
                      </div>
                      <span className="text-sm text-secondary-300">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.1 + 0.5, duration: 0.8, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-16"
          variants={itemVariants}
        >
          {["Python", "Django", "FastAPI", "JavaScript", "React", "Docker", "PostgreSQL", "SQLite", "Linux"].map((tag, index) => (
            <motion.span
              key={index}
              className="px-4 py-2 rounded-full bg-dark-700 text-primary-400 font-medium text-sm transition-colors hover:bg-primary-600 hover:text-secondary-50 border border-dark-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
} 