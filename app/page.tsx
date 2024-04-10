"use client"
import Image from 'next/image';
import Link from 'next/link';


export default function Home() {

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      
      <div className="w-full grid place-content-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center relative z-20 mb-40">
        <h1 className="font-bold max-w-[320px] sm:max-w-96 md:max-w-[420px] lg:max-w-[500px] xl:max-w-[620px]">
           Building solutions that <span className="text-transparent bg-gradient-to-r from-Primary to-Secondary bg-clip-text">connect and inspire.</span> 
        </h1>
      </div>
      <div className='p-2 grid gap-4 md:grid-cols-2 mb-20'>
        
        {/* React */}
        <div className="card card-side bg-Secondary shadow-xl px-3">
          <figure>
            <Image priority src="/React.svg" alt="React" width={100} height={100}/>
          </figure>
            <div className="card-body">
              <h2 className="card-title">React</h2>
              <p>Developing modern & dynamic web sites.</p>
            </div>
        </div>

        {/* Next.js */}

        <div className="card card-side bg-Primary shadow-xl px-3">
          <figure>
            <Image priority src="/Vercel.svg" alt="Vercel" width={100} height={100}/>
          </figure>
            <div className="card-body">
              <h2 className="card-title">Next JS</h2>
              <p className='text-Background'>Building fast and scalable web apps.</p>
            </div>
        </div>

        {/* MERN Stack */}

        <div className="card card-side bg-Accent shadow-xl px-3">
          <figure>
            <Image priority src="/Mongo.svg" alt="MERN" width={100} height={100}/>
          </figure>
            <div className="card-body">
              <h2 className="card-title">MERN</h2>
              <p>Full stack web apps with MERN.</p>
            </div>
        </div>
        
        {/* React Native  */}

        <div className="card card-side bg-Secondary shadow-xl px-3">
          <figure>
            <Image priority src="/Native.svg" alt="React Native" width={100} height={100}/>
          </figure>
            <div className="card-body">
              <h2 className="card-title">React Native</h2>
              <p>Beautiful mobile apps for both iOS and Android..</p>
            </div>
        </div>

      </div>
      <Link href={'/contact'} className='relative z-20 mb-10'>
        <button className='flex items-center justify-center gap-2 bg-Accent py-3 px-12 rounded-xs'>
          <div >Contact</div>
          <Image priority src={'/arrowRight.svg'} width={24} height={24} alt='arrow'/>
        </button>
      </Link>
      

      
    </main>
  );
}
