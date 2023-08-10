import yuten from '../assets/yuten.svg'
const Navbar = () => {
  return (
    <main className='w-full flex justify-center items-center h-16 border-b border-black/10'>
        <div>
            <img className='h-8 object-cover' src={yuten} alt="" />
        </div>
    </main>
  )
}

export default Navbar