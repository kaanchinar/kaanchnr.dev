import Link from "next/link"
import Image from 'next/image';
import { SiGithub,SiLinkedin,SiInstagram } from "react-icons/si";


const About = () => {
    return (
      <main className="min-h-screen relative z-20 grid md:grid-cols-2">
          <div className="hidden md:flex md:items-end md:justify-end w-full h-full relative">
            {/**
             * // TODO: Add image here.
            */}
            <Image src={'/memoji.png'} alt="Memoji" layout="fill" objectFit="contain"/>
          </div>

          <div className="flex items-center md:items-start justify-center flex-col gap-6 p-2 md:pr-[10%]">
            <div>
            <h1 className="font-bold text-2xl md:text-4xl">Hello, I&apos;m <span className="text-Primary">Kaan Chinar</span></h1>
            <h2 className="font-semibold text-Accent text-xl md:text-2xl">Web Developer</h2>
            {/**
             * 
             * //TODO: Add more content here.
             */}
             <p className=" mt-14">Dedicated and innovative Full Stack Web Developer with expertise in React, React Native, Redux, and the
              MERN stack. Proficient in C++, Dart, Express.js, and experienced with Linux environments, particularly
              Arch Linux and Ubuntu. Skilled in crafting seamless user experiences using React and Next.js and
              developing dynamic applications with the MERN stack.</p>
              <p className="mt-2">Familiar with Linux server administration tasks,
              proficient in Git and Bash scripting, and experienced in Docker for creating and managing containers at an
              entry level. Experienced in collaborative project environments with strong communication skills. Eager to
              contribute to innovative projects and further refine skills in a dynamic team setting.</p>
            </div>
            <div className="flex flex-col items-center md:items-start justify-center gap-2">
              <Link href="/contact" className="rounded-xs hover:bg-Secondary py-3 px-12 transition-colors bg-Accent">Get in touch!</Link>
              <a href="mailto:kaanc645@gmail.com" className="outline-none transition-all  hover:text-transparent hover:bg-gradient-to-r hover:from-Primary hover:to-Accent bg-Text bg-clip-text text-sm">kaanc645@gmail.com</a>
              <div className="flex gap-6 items-center justify-center max-h-6">
                <a href="https://github.com/zurnadurumm" target="_blank">
                  <SiGithub className="outline-none transition-all text-Text hover:text-Accent" size={24} />
                </a>
                <a href="https://www.linkedin.com/in/kaan-chinar/" target="_blank">
                  <SiLinkedin className="outline-none transition-all text-Text hover:text-Accent" size={24} />
                </a>
                <a href="https://instagram.com/kaan.chnrr" target="_blank">
                  <SiInstagram className="outline-none transition-all text-Text hover:text-Accent" size={24} />
                </a>
              </div>
            </div>
          </div>
          
      </main>
    )
  }
  
  export default About