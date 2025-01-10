import { useState, useEffect, useRef } from 'react'
import { storage } from './firebase'
import { ref, getDownloadURL, listAll, getMetadata } from 'firebase/storage'
import Profile from '../src/assets/profile.jpg'
import { CiLink } from "react-icons/ci"
import { FiDownload } from "react-icons/fi";
import Resume from '/public/Kenneth L. Espela_Resume.pdf'

const skillsData = [
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/html5.svg' },  
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/css3.svg' },  
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/tailwindcss.svg' },  
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/javascript.svg' },  
  { name: 'React.js', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/react.svg' },  
  { name: 'shadcn', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/vercel.svg' },  
  { name: 'Next UI', icon: 'UI' },  
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/laravel.svg' },  
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/php.svg' }
]

function App() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const sectionRefs = {
    about: useRef(null),
    expertise: useRef(null),
    projects: useRef(null),
    demo: useRef(null),
  }

  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current.scrollIntoView({ behavior: 'smooth' })
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
    const fetchFiles = async () => {
      try {
        setLoading(true)
        const storageRef = ref(storage, 'files')
        const result = await listAll(storageRef)
        
        const fileList = await Promise.all(result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef)
          const metadata = await getMetadata(itemRef)
          return {
            name: itemRef.name,
            size: metadata.size,
            type: metadata.contentType,
            lastModified: metadata.updated,
            url: url
          }
        }))
        
        setFiles(fileList)
      } catch (err) {
        console.error("Error fetching files:", err)
        setError("Failed to load files. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-xl font-semibold text-red-500">{error}</p>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white text-gray-800 py-6 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold">Kenneth Espela</h1>
          <p className="text-lg md:text-xl mt-2 text-blue-600">Frontend Developer</p>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end items-center space-x-4">
          <button
            onClick={() => scrollToSection("about")}
            className="px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("expertise")}
            className="px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Projects
          </button>
          <a
            href={Resume}
            download
            className="px-4 py-2 bg-blue-600 text-white flex items-center gap-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <FiDownload className="text-lg" />
            Download CV
          </a>
        </nav>
      </div>
    </header>

      <main className="container mx-auto px-4 py-16">
        <section id="about" ref={sectionRefs.about} className="mb-20 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Hey, I'm a <span className="text-blue-600">Frontend</span> Web Developer.</h2>
            <p className="text-gray-600 mb-8 text-lg">I am an aspiring Frontend Developer with a solid foundation in HTML, CSS, and Tailwind CSS. I have a basic understanding of JavaScript and React.js, and I have integrated UI libraries like shadcn and Next UI to enhance user interfaces. I'm eager to grow my skills and contribute to impactful projects.</p>
          </div>
          <div className="w-full md:w-1/2">
            <img src={Profile} alt="Kenneth Espela" className="rounded-full w-64 h-64 md:w-80 md:h-80 mx-auto object-cover shadow-lg" />
          </div>
        </section>

        <section id="expertise" ref={sectionRefs.expertise} className="mb-20">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skillsData.map((skill, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transition duration-300 hover:shadow-lg">
                {typeof skill.icon === 'string' && skill.icon.startsWith('http') ? (
                  <img src={skill.icon} alt={`${skill.name} icon`} className="w-16 h-16 mb-4" style={{filter: 'invert(0.5)'}} />
                ) : (
                  <div className="w-16 h-16 mb-4 flex items-center justify-center text-4xl font-bold text-gray-600">{skill.icon}</div>
                )}
                <h3 className="text-xl font-semibold text-center">{skill.name}</h3>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" ref={sectionRefs.projects} className="mb-20">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Payl",
                link: "https://ias2-f7656.web.app/",
                description: "This website is a file management system I created during my 3rd year of college, with some security features. You can create a dummy account to explore the entire UI. Tools used: React.js, Tailwind CSS, and Firebase."
              },
              {
                title: "Alepse Portfolio (1st version)",
                link: "https://alepse.netlify.app/",
                description: "This portfolio website was created during my 2nd year of college. I used HTML, CSS, and JavaScript in this project. You can also view my other projects from my 1st and 2nd years of college here."
              },
              {
                title: "Spa-ntaneous",
                link: "https://spantaneous.netlify.app/",
                description: "This is an e-commerce platform website featuring booking services. It was a project for my E-commerce curriculum. I used React.js and Tailwind CSS for the frontend."
              }
            ].map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between transition duration-300 hover:shadow-xl">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-gray-800 font-semibold">View Project</span>
                  <a href={project.link} className="text-3xl text-blue-600 hover:text-blue-800 transition duration-300" target="_blank" rel="noopener noreferrer">
                    <CiLink />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-4xl font-semibold mb-4 text-center">RabaSorsogon</h3>
              <div className="grid grid-cols-1 gap-6">
                {files
                  .filter(file => file.name === "Rabasorsogon.mp4") // Replace with your video file name
                  .map((file, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md">
                      <video
                        className="w-full h-[700px] object-cover object-center"
                        src={file.url}
                        controls
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
              </div>
              <p className="text-gray-600 mt-6 text-lg">
                This project is a capstone curriculum project. It's a tourism website platform called RabaSorsogon, developed for the Sorsogon Province to promote tourism in the region. It utilizes React.js, Tailwind CSS, shadcn, and Next UI libraries to enhance the user experience. The platform is inspired by websites like Agoda, TripAdvisor, and Airbnb. It also features a Facebook-like business page editor, allowing business owners to manage their listings.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-20">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-4xl font-semibold mb-4 text-center">The Latte Lane</h3>
              <div className="grid grid-cols-1 gap-6">
                {files
                  .filter(file => file.name === "TheLatteLane.mp4") // Replace with your video file name
                  .map((file, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md">
                      <video
                        className="w-full h-[700px] object-cover object-center"
                        src={file.url}
                        controls
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
              </div>
              <p className="text-gray-600 mt-6 text-lg">
                This Project is an E-commerce cafe website project. It was a project for my Web Development curriculum. It is a FullStack project that I made using Laravel with crud functionality.I used bootstrap for the frontend and Laravel Php for backend and with Database support using Mysql
              </p>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">Contact: kenespela@gmail.com</p>
          <p className="text-sm text-gray-400">&copy; 2023 Kenneth Espela. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

