
const Footer = () => {
    const year = new Date().getFullYear()
  return (
    <div className="bg-base-100 grid place-content-center p-2 text-sm relative z-20">
      <p>
      Kaan Chinar {year}. Made with Next JS
      </p>
     
    </div>
  )
}

export default Footer