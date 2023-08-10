import {AiFillHeart} from 'react-icons/ai'
const Footer = () => {
  return (
    <main className="w-full h-16 bg-[#7629a0] backdrop-blur-sm flex justify-center items-center text-white">
        Made with &nbsp; <AiFillHeart className='text-red-600'/> &nbsp; by &nbsp; 
        <a href="https://sarthak-roy.vercel.app/" target='blank' className='font-semibold hover:underline'>Sarthak Roy</a>
    </main>
  )
}

export default Footer