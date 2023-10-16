import React, { useEffect, useState } from 'react';
import {FaGithub} from 'react-icons/fa';
import { MdChevronLeft, MdChevronRight, MdKeyboardArrowUp, MdKeyboardArrowDown} from 'react-icons/md';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import '@styles/projects.css';
//<img src='https://i.imgur.com/r0VFFep.png' className="blurry-gradient absolute -z-50"></img>
export default function Projects(props:any) {

  const projectData = [
    { 
      title: 'Expense Manager',
      skills: ['Microsoft Azure |','| ASP.NET MVC |','| HTML5 |','| C# |', '| SQL'],
      skillsmove:'ml-64',
      color: "bg-indigo-500",
      move: "ml-10",
      description: [
        'The Expense Manager Web App facilitates efficient expense management, including tracking, analysis, and visualization.',
        'Create expenses, visualize data with charts, set expense limits, and deploy securely on Microsoft Azure.',
        `The app is built with ASP.NET Core and Entity Framework Core for web development and database access. It's hosted on Microsoft Azure for scalability and uses Chart.js for interactive data visualization with robust error handling and data validation.`,
        'The Expense Manager Web App empowers users to stay organized, make informed financial decisions, and control expenses, enhancing financial management and budgeting.'
      ],
      githublink: "https://github.com/sus194/Expense-Manager",

      slides: {
        "Website's Homepage Contains User Profile and Green Colored SearchBox":"/imgs/projects/expense-manager/home.png",
        "Create an Expense":'/imgs/projects/expense-manager/create.png',
        "Set a budget": '/imgs/projects/expense-manager/limit.png',
        "Bar graph for Showing the Expense over time":'/imgs/projects/expense-manager/graph1.png',
        "Dot graph for Showing the Expense over time": '/imgs/projects/expense-manager/graph2.png',
        "Pie graph for Showing the Expense over time": '/imgs/projects/expense-manager/graph3.png',
        "Search for Previous expenses using the SearchBar": '/imgs/projects/expense-manager/search.png',
      }

    },
    {
      title: 'StudyBuddy',
      skills: ['REST APIs |','| React.js |','| Express.js |','| MongoDB |', '| Apache |', '| Google Maps API'],
      skillsmove:'ml-40',
      color: "bg-green-500",
      move: "ml-60",
      description: [
        'Created a student-focused web app for studying and peer connections.', 
        'Constructed an Express JS server with a React front-end and MongoDB storage for login/sign-up, chat, and user management.',
        'Enabled real-time communication between users with chat rooms and account creation.',
        'Implemented a web socket feature for updating meeting locations and times in real time.',
        'Utilized Google Maps API to display an interactive map showcasing nearby users.', 
      ],
      githublink: "https://github.com/sus194/StuddyBuddy",

      slides: {
        "StudyBuddy HomePage":"/imgs/projects/study-buddy/studdybuddy-home.png",
        "Login Page": "/imgs/projects/study-buddy/studdybuddy-login.png",
        "Profile Settings":'/imgs/projects/study-buddy/studdybuddy-profile.png',
        "Chat Room of Paired Buddies": '/imgs/projects/study-buddy/studdybuddy-chat.png',
      }
    },
    {
      title: 'AI Discord Bot',
      skills: ['Python |','| Discord API |','| PyQt5 |','| multiprocessing/threading'],
      skillsmove:'ml-48',
      color: "bg-sky-500",
      move: "ml-44",
      description: [
        'Developed a multifunctional Discord bot using APIs and libraries for weather, stocks, chess, and math.',
        `Utilized advanced technologies such as OpenAI for natural language processing, the Stockfish chess engine for chess-related tasks, Weather and Stock APIs for real-time data retrieval, and the SymPy library in Python for mathematical operations. This tech stack ensured the bot's versatility and intelligence.`,
        'Integrated PyQt5 framework with Discord API to enable viewing of current chess game status on Discord.',
        `To ensure the bot's responsiveness and efficiency, implemented multiprocessing and threading techniques, enabling the bot to handle multiple user requests simultaneously. This optimization significantly improved the bot's overall performance.`, 
      ],
      githublink: "https://github.com/sus194/Discord-AI-bot",
      
      slides: {
        "Holding a Conversation":"/imgs/projects/aidiscord-bot/aibot-ai.png",
        "Playing Chess":'/imgs/projects/aidiscord-bot/aibot-chess.png',
        "Giving the Current Stock Prices": '/imgs/projects/aidiscord-bot/aibot-stock.png',
        "Giving the Current Weather":'/imgs/projects/aidiscord-bot/aibot-weather.png',
        "Solving Math Equations": '/imgs/projects/aidiscord-bot/aibot-math.png',
      }
    },
    {
      title: 'Knight Run',
      skills: ['Maven |','| Software Design Patterns |','| Java |','| Object-Oriented Programming'],
      skillsmove:'ml-36',
      color: "bg-pink-500",
      move: "ml-60",
      description: [
        'Designed a challenging maze-solving game featuring dynamic obstacles and enemies.',
        `Implemented Factory method design pattern for creating game components, including enemies, main player, and maze walls.`,
        `Utilized Java libraries like java.awt and javax.swing to develop the game's UI and implement collision detection and movement logic.`,
        'Created a custom-made design pattern to program enemy movement behaviour while chasing the player knight through the maze.', 
      ],
      githublink: "https://github.com/sus194/Knight-run",

      slides: {
        "Start GamePage":"/imgs/projects/knight-run/knight-run-start.png",
        "Objects That Make up the Game":'/imgs/projects/knight-run/knight-run-info.png',
        "Game Start And End Points": '/imgs/projects/knight-run/knight-run-home.png',
        "End GamePage":'/imgs/projects/knight-run/knight-run-over.png',
      }
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedName, setSelectedName] = useState('');

  const openModal = (img: React.SetStateAction<string>, name: React.SetStateAction<string>) => {
    setSelectedImage(img);
    setSelectedName(name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
    setSelectedName('');
  };
  
  const slideUp = (name:string)=>{
    var slider: any = document.getElementById(name);
    slider.scrollTop -= 400;
  }

  const slideDown = (name: string)=>{
    var slider: any = document.getElementById(name);
    slider.scrollTop += 400;
  }

  const slideLeft = (newIndex: number) => {
    setCanScroll(true)
    if(newIndex>=0){
      setCurrentIndex(newIndex);
      console.log(currentIndex)
    }
    var slider:any = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 1000;
    setCanScroll(false)
  };

  const slideRight = (newIndex: number) => {
    setCanScroll(true)
    if(newIndex<4){
      setCurrentIndex(newIndex);
      console.log(currentIndex)
    }
    var slider:any = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 1000;
    setCanScroll(false)
  };
/*
  useEffect(() => {
    // This will run every time canScroll changes
    if(props.activesection == "section4"){
      console.log(props.activesection)
      var slider: any = document.getElementById('slider');
      slider.style.overflowX = canScroll ? 'scroll' : 'hidden';
    }
  }, [canScroll, props.activesection]);
*/
  return (
    <>
      <div className=' w-full h-full'>
        <h3 className=" w-full object-cover select-none pl-[20px] text-center text-2xl uppercase tracking-[20px] text-gray-500 mt-28">Projects</h3>
        <div className='w-full h-full relative flex items-center ml-44 -mt-20'>
          {currentIndex!=0?
            (
              <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={()=>slideLeft(currentIndex-1)} size={40} />
            ):
            (
              <div/>
            )
          }
          <div
            id='slider'
            className={`w-[1000px] h-[500px] no-scrollbar overflow-hidden scroll whitespace-nowrap scroll-smooth snap-x shadow-2xl`}
          >

            {projectData.map((project, index) => (
              <div key={index} className={`project_container snap-center w-[1000px] h-[500px] inline-block p-2 cursor-pointer ${(index!=3)?"mr-5":""}`}
              >
                <h2 className='text-2xl ml-96 mt-3 mb-4 inline-block'>{project.title}</h2>
                <Link href={project.githublink} title="GitHub">
                  <IconContext.Provider value={{ className: 'inline-block ml-6 w-[2rem] h-[2rem]' }}>
                    <FaGithub />
                  </IconContext.Provider>
                </Link>
                <div className={`${project.skillsmove} mb-3`}>
                  {project.skills.map((skill,index)=>(
                    <div key={index} className='inline-block uppercase text-gray-500'>
                      {skill}
                    </div>
                  ))}
                </div>
                <div className='slide-content w-[1000px] h-[400px]'>
                  <ul className='list-disc ml-20 pl-5 w-[880px] h-[400px] overflow-hidden whitespace-pre-line'>
                    {project.description.map((line, index)=>(
                      <li key={index} className='mb-5'>{line}</li>
                    ))}
                  </ul>
                  <div 
                  className={`${project.move} -mt-20 image_slider w-[1000px] overflow-hidden`}
                  id={project.title}
                  >
                    {Object.entries(project.slides).map(([name, img]) => (
                      <div key = {name} className= {` mr-20 rounded-full content-center inline-block overflow-hidden w-[60px] h-[60px] ${project.color}`}>
                        <img className='hover:opacity-60  hover:shadow-2xl rounded-full w-[50px] h-[50px] ml-1 mt-1' src={img} width={100} height={100} alt='' onClick={() => openModal(img,name)}/>
                        {/*<h1 className='mb-1 font-serif'>{name}</h1>*/}
                      </div>
                    ))}
                    {isModalOpen && (
                     <div className="fixed inset-0 z-50 flex items-center justify-center">
                     <div className="fixed inset-0 bg-black opacity-50"></div>
                     <div className={`z-50 ${project.color} p-8 max-w-screen-md mx-auto rounded-2xl shadow-lg relative`}>
                       <button onClick={closeModal} className="absolute top-2 right-2 hover:text-red-700 cursor-pointer">
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                         >
                           <line x1="18" y1="6" x2="6" y2="18"></line>
                           <line x1="6" y1="6" x2="18" y2="18"></line>
                         </svg>
                       </button>
                       <p className="text-center text-white mb-3 text-xl">{selectedName}</p>
                       <div className="overflow-y-scroll max-h-[400px] rounded-xl">
                         <img src={selectedImage} alt="" className="w-full" />
                       </div>
                     </div>
                   </div>
                   
                    )}
                  </div>
                </div>
              </div>
            ))}

          </div>
          {
            currentIndex!=3?(
              <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={()=>slideRight(currentIndex+1)} size={40} />
            ):(
              <div/>
            )
          }
          <div className= {`top-0 left-56 css-blurry-gradient gradient-${currentIndex}`}></div>
          <div className={`top-0 -right-40 css-blurry-gradient gradient-${currentIndex}`}></div>
        </div>
      </div>
    </>
  );
}
