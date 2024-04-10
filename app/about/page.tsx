const About = () => {
    return (
      <main className="min-h-screen relative z-20 grid md:grid-cols-2">
          <div className="hidden md:block">
            {/**
             * // TODO: Add image here.
            */}
          </div>

          <div className="flex items-center md:items-start justify-center flex-col">
            <h1 className="font-bold text-xl md:text-3xl">Hello, I&apos;m <span className="text-Primary">Kaan Chinar</span></h1>
            <h2 className="font-semibold text-Accent">Web Developer</h2>
            {/**
             * 
             * //TODO: Add more content here.
             */}
          </div>
      </main>
    )
  }
  
  export default About