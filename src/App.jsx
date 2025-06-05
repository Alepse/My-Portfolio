import { useState, useEffect, useRef, createContext, useContext } from 'react'
import Profile from '../src/assets/profile.jpg'

import { FiDownload, FiMoon, FiSun, FiGithub, FiMail, FiLinkedin, FiMenu, FiX, FiPhone, FiMapPin } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion"
import LoaderOverlay from './components/ui/LoaderOverlay'
import ProjectList from './components/ui/ProjectList'
import HeroSection from './components/ui/HeroSection'
import Resume from '/public/Kenneth L. Espela-Resume.pdf'

const ThemeContext = createContext()

const skillsData = [
  // Frontend Development
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/html5.svg', proficiency: 90, category: 'Frontend' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/css3.svg', proficiency: 85, category: 'Frontend' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/javascript.svg', proficiency: 75, category: 'Frontend' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/typescript.svg', proficiency: 70, category: 'Frontend' },
  { name: 'React.js', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/react.svg', proficiency: 75, category: 'Frontend' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/nextdotjs.svg', proficiency: 70, category: 'Frontend' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/bootstrap.svg', proficiency: 75, category: 'Frontend' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/tailwindcss.svg', proficiency: 90, category: 'Frontend' },
  
  // Backend Development
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/php.svg', proficiency: 40, category: 'Backend' },
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/laravel.svg', proficiency: 40, category: 'Backend' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/mysql.svg', proficiency: 50, category: 'Backend' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/firebase.svg', proficiency: 50, category: 'Backend' },

  // UI/UX Design
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/figma.svg', proficiency: 75, category: 'Design' },
  { name: 'UI Design', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/adobexd.svg', proficiency: 70, category: 'Design' },
  { name: 'UX Design', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/sketch.svg', proficiency: 70, category: 'Design' },

  // Development Tools
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/git.svg', proficiency: 85, category: 'Tools' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/github.svg', proficiency: 85, category: 'Tools' },
  { name: 'Netlify', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/netlify.svg', proficiency: 80, category: 'Tools' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/vercel.svg', proficiency: 70, category: 'Tools' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/vite.svg', proficiency: 75, category: 'Tools' }
]

const projectsData = [
  {
    title: "The Latte Lane",
    description: "An e-commerce cafe website with booking appointment, crud operations and ordering system.",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    type: "Full-Stack",
    videoUrl: "https://www.youtube.com/embed/4KLAuj0FehM",
    image: "thelattlane-thumbnail.png"
  },
  {
    title: "Inventory Manager",
    description: "A simple inventory management system that allows users to add, update, and delete inventory items.",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    type: "Full-Stack",
    videoUrl: "https://www.youtube.com/embed/eiPsCXTKLO8",
    image: "inventory-thumbnail.png"
  },
  {
    title: "Payl",
    link: "https://ias2-f7656.web.app/",
    description: "A file management system that incorporates basic security features like encryption standards and CRUD operations for managing files.",
    tech: ["Firebase", "React.js", "Tailwind CSS","Javascript"],
    type: "Full-Stack",
    image: "payl.png"
  },
  {
    title: "Spa-ntaneous",
    link: "https://spantaneous.netlify.app/",
    description: "An e-commerce spa services website with modern design and booking functionality.",
    tech: ["React.js", "Tailwind CSS", "MySQL","Javascript"],
    type: "Frontend",
    image: "spa.png"
  },
  {
    title: "Internship Blog",
    link: "https://blog-wfg8.vercel.app/",
    description: "A blog website for my documentation of my internship experience in a government agency, Department of Science and Technology Region 5 (DOST-V).",
    tech: ["React.js", "Tailwind CSS","Javascript"],
    type: "Frontend",
    image: "blog.png"
  },
  {
    title: "Syncko",
    description: "This is a knowledge sharing platform that allows employees to share their knowledge and expertise with other employees throughout the agency Department of Science and Technology Region 5 (DOST-V). This is a required project for my internship in DOST-V.",
    tech: ["Next.js","PostgreSQL","Prisma","Tailwind CSS","TypeScript","Chart.js","Shadcn"],
    type: "Frontend",
    videoUrl: "https://youtu.be/NSxgBuGNPpM",
    image: "syncko-thumbnail.png"
  },
  {
    title: "Basic Portfolio Website",
    link: "https://alepse.netlify.app/",
    description: "This is my first personal website, created during my second year of college. Within this portfolio, you can explore a collection of my early programming projects.",
    tech: ["HTML", "CSS", "JavaScript"],
    type: "Frontend",
    image: "portfolio.png"
  },
  {
    title: "Rabasorsogon",
    description: "A tourism website designed to enhance user experience with key features including a trip planning, an integrated chat system for real-time communication, and a booking system.",
    tech: ["React.js", "Tailwind CSS", "JavaScript", "Redux", "Shadcn","NextUI","Framer Motion","Node.js","MySQL"],
    type: "Frontend",
    videoUrl: "https://www.youtube.com/embed/DAR9A8SU58I",
    image: "rabasorsogon-thumbnail.png"
  }
]

function App() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState({
    about: true,
    expertise: false,
    projects: false,
    contact: false
  })
  const [activeCategory, setActiveCategory] = useState('All')
  const [initialLoading, setInitialLoading] = useState(false)
  const [modalImage, setModalImage] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const sectionRefs = {
    about: useRef(null),
    expertise: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  }

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setInitialLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }))
        })
      },
      { threshold: 0.1 }
    )

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const scrollToSection = (sectionId) => {
    const offset = 80;
    const section = sectionRefs[sectionId].current;
    const heading = section.querySelector('h2');
    const targetPosition = heading ? heading.getBoundingClientRect().top + window.scrollY - offset : section.offsetTop - offset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  }

  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']")
    if (!link) {
      const newLink = document.createElement('link')
      newLink.rel = 'icon'
      document.head.appendChild(newLink)
    }
    link.href = Profile
    document.title = "Alepse"
  }, [])

  useEffect(() => {
    const loadProjectFiles = async () => {
      try {
        setLoading(true);
        // Create static file data based on projectsData
        const staticFiles = projectsData.map(project => {
          const isVideo = project.image.endsWith('.mp4');
          return {
            name: project.image,
            url: isVideo ? `/project-videos/${project.image}` : `/project-images/${project.image}`,
            type: isVideo ? 'video/mp4' : 'image/png',
            title: project.title
          };
        });
        setFiles(staticFiles);
      } catch (err) {
        console.error("Error loading project files:", err);
        setError("Failed to load project files");
      } finally {
        setLoading(false);
      }
    };

    loadProjectFiles();
  }, []);

  if (initialLoading) {
    return <LoaderOverlay darkMode={darkMode} />;
  }
  if (loading) {
    return <LoaderOverlay darkMode={darkMode} />;
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold text-red-500"
        >
          {error}
        </motion.p>
      </div>
    )
  }

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {/* Image Modal */}
      {modalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setModalImage(null)}>
          <div className="relative max-w-3xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <img
              src={modalImage.url}
              alt={modalImage.title}
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border-4 border-white"
            />
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-2 shadow"
              aria-label="Close image preview"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}

      <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#F5F7F8] text-gray-900'}`}>
        <div className="mx-auto max-w-7xl">
          {/* Floating Navigation */}
          <div className='flex justify-center py-3 sm:py-5'>
            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`md:hidden fixed z-50 top-4 right-4 p-2 rounded-full ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              } shadow-lg`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FiX className="text-xl" />
              ) : (
                <FiMenu className="text-xl" />
              )}
            </motion.button>

            {/* Desktop Navigation */}
            <motion.nav 
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              className={`fixed z-50 px-3 sm:px-6 py-2 sm:py-3 rounded-full hidden md:flex ${
                darkMode ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
              } shadow-lg items-center space-x-2 sm:space-x-6`}
            >
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors duration-300 flex-shrink-0 ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {darkMode ? <FiSun className="text-lg sm:text-xl" /> : <FiMoon className="text-lg sm:text-xl" />}
              </button>
              {Object.keys(sectionRefs).map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize text-xs sm:text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                    darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                  }`}
                >
                  {section}
                </button>
              ))}
              <a
                href={Resume}
                download
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 transition-colors duration-300 flex-shrink-0 ${
                  darkMode 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <FiDownload className="text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm whitespace-nowrap">Resume</span>
              </a>
            </motion.nav>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className={`fixed inset-y-0 right-0 z-40 w-64 ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-xl flex flex-col md:hidden`}
                >
                  <div className="p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`p-2 rounded-full transition-colors duration-300 ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
                      </button>
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2"
                      >
                        <FiX className="text-xl" />
                      </button>
                    </div>
                    
                    {Object.keys(sectionRefs).map((section) => (
                      <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        className={`py-3 px-4 rounded-lg text-left capitalize font-medium transition-colors duration-300 ${
                          darkMode 
                            ? 'hover:bg-gray-700 hover:text-blue-400' 
                            : 'hover:bg-gray-100 hover:text-blue-600'
                        }`}
                      >
                        {section}
                      </button>
                    ))}
                    
                    <a
                      href={Resume}
                      download
                      className={`mt-4 py-3 px-4 rounded-lg flex items-center gap-2 transition-colors duration-300 ${
                        darkMode 
                          ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <FiDownload className="text-lg" />
                      <span>Download Resume</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Backdrop for mobile menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/50 z-30 md:hidden"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>

          <main className="container mx-auto px-4 sm:px-6">
            {/* Hero Section */}
            <motion.section
              id="about"
              ref={sectionRefs.about}
              initial={{ opacity: 0 }}
              animate={isVisible.about ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="min-h-[calc(100vh-4rem)] pt-16 md:pt-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-16 md:mb-32"
            >
              <HeroSection darkMode={darkMode} />
            </motion.section>

            {/* Skills Section */}
            <motion.section
              id="expertise"
              ref={sectionRefs.expertise}
              initial={{ opacity: 0 }}
              animate={isVisible.expertise ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="pt-16 md:pt-24 mb-16 md:mb-32"
            >
              <div className="text-center mb-8 md:mb-12">
                <motion.h2 
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="text-2xl md:text-4xl font-bold mb-3 md:mb-4"
                >
                  Skills & Expertise
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`text-sm md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Technologies and tools I work with
                </motion.p>
              </div>

              <div className="flex justify-center gap-2 md:gap-4 mb-6 md:mb-8 flex-wrap px-2 md:px-0">
                {['All', 'Frontend', 'Backend', 'Design', 'Tools'].map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? darkMode 
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                          : 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                        : darkMode
                          ? 'bg-gray-800 hover:bg-gray-700'
                          : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-6 px-2 md:px-0">
                <AnimatePresence mode="wait">
                  {skillsData
                    .filter(skill => activeCategory === 'All' || skill.category === activeCategory)
                    .map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`${
                          darkMode ? 'bg-gray-800' : 'bg-white'
                        } p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-3 rounded-lg ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                            <img
                              src={skill.icon}
                              alt={`${skill.name} icon`}
                              className="w-8 h-8"
                              style={{ filter: darkMode ? 'invert(1)' : 'invert(0.5)' }}
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{skill.name}</h3>
                            <span className={`text-sm ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {skill.category}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className={`text-sm font-medium ${
                              darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              Proficiency
                            </span>
                            <span className={`text-sm ${
                              darkMode ? 'text-blue-400' : 'text-blue-600'
                            }`}>
                              {skill.proficiency}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <motion.div
                              className={`h-2 rounded-full ${
                                darkMode 
                                  ? 'bg-gradient-to-r from-blue-500 to-blue-400' 
                                  : 'bg-gradient-to-r from-blue-600 to-blue-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
              id="projects"
              ref={sectionRefs.projects}
              initial={{ opacity: 0 }}
              animate={isVisible.projects ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="pt-16 md:pt-24 mb-16 md:mb-32"
            >
              <div className="text-center mb-8 md:mb-12">
                <motion.h2 
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="text-2xl md:text-4xl font-bold mb-3 md:mb-4"
                >
                  Featured Projects
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`text-sm md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Some of my recent work
                </motion.p>
              </div>

              <div className="px-2 md:px-0">
                <ProjectList
                  projects={projectsData}
                  files={files}
                  darkMode={darkMode}
                  expandedDescriptions={expandedDescriptions}
                  setExpandedDescriptions={setExpandedDescriptions}
                  setModalImage={setModalImage}
                />
              </div>
            </motion.section>

            {/* Featured Projects Section */}
            <motion.section className="mb-32">
              <div className="space-y-12">
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              id="contact"
              ref={sectionRefs.contact}
              initial={{ opacity: 0 }}
              animate={isVisible.contact ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="pt-16 md:pt-24 mb-16 md:mb-32"
            >
              <div className="max-w-4xl mx-auto text-center">
                <motion.h2 
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="text-2xl md:text-4xl font-bold mb-3 md:mb-4"
                >
                  Get in Touch
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`text-sm md:text-lg mb-8 md:mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Let's work together on your next project. I'm always open to discussing new opportunities and ideas.
                </motion.p>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12"
                >
                  {/* Contact Info */}
                  <div className={`p-6 rounded-2xl ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg`}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <FiMail className="text-xl text-blue-500" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium mb-1">Email</p>
                          <a 
                            href="mailto:kenespela@gmail.com"
                            className={`text-sm ${
                              darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                            }`}
                          >
                            kenespela@gmail.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <FiPhone className="text-xl text-blue-500" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium mb-1">Phone</p>
                          <a 
                            href="tel:+63969193201"
                            className={`text-sm ${
                              darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                            }`}
                          >
                            +63 969193201
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <FiMapPin className="text-xl text-blue-500" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium mb-1">Location</p>
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Daraga, Albay, Philippines
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className={`p-6 rounded-2xl ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg`}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <FiGithub className="text-xl text-blue-500" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium mb-1">GitHub</p>
                          <a 
                            href="https://github.com/alepse"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${
                              darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                            }`}
                          >
                            github.com/alepse
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <FiLinkedin className="text-xl text-blue-500" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium mb-1">LinkedIn</p>
                          <a 
                            href="https://linkedin.com/in/kenneth-espela"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${
                              darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                            }`}
                          >
                            linkedin.com/in/kenneth-espela
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
                >
                  <a
                    href="mailto:kenespela@gmail.com"
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    <FiMail className="text-xl" />
                    Email Me
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kenneth-espela"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-colors duration-300 ${
                      darkMode
                        ? 'bg-gray-800 hover:bg-gray-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    <FiLinkedin className="text-xl" />
                    LinkedIn
                  </a>
                </motion.div>
              </div>
            </motion.section>
          </main>
          
        </div>
        {/* Footer */}
          <footer className={`w-full py-8 md:py-12 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            <div className="w-full px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {/* About */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">About Me</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Frontend developer focused on creating intuitive and engaging web experiences. Currently studying at Bicol University.
                    </p>
                  </div>
                  {/* Quick Links */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <div className="space-y-2">
                      {Object.keys(sectionRefs).map((section) => (
                        <button
                          key={section}
                          onClick={() => scrollToSection(section)}
                          className={`block text-sm capitalize ${
                            darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                          }`}
                        >
                          {section}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <div className="space-y-2">
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <FiMail className="inline-block mr-2" />
                        kenespela@gmail.com
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <FiPhone className="inline-block mr-2" />
                        +63 969193201
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <FiMapPin className="inline-block mr-2" />
                        Daraga, Albay, Philippines
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      © {new Date().getFullYear()} Kenneth Espela. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                      <a
                        href="https://github.com/alepse"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xl ${
                          darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        <FiGithub />
                      </a>
                      <a
                        href="https://linkedin.com/in/kenneth-espela"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xl ${
                          darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        <FiLinkedin />
                      </a>
                      <a
                        href="mailto:kenespela@gmail.com"
                        className={`text-xl ${
                          darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        <FiMail />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
      </div>
    </ThemeContext.Provider>
  )
}

export default App

