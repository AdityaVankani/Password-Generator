import { useState, useEffect, useCallback, useRef } from 'react'

function App() {
  const [len, setlen] = useState(8)
  const [numallow, setnumallow] = useState(false)
  const [charallow, setcharallow] = useState(false)
  const [password, setpassword] = useState("")

  const passref = useRef(null)

  const Generator = useCallback(() => {
    let password = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (charallow) str += "!@#$%^&*"
    if (numallow) str += "0123456789"
    for (let i = 1; i <= len; i++) {
      let temp = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(temp);
    }

    setpassword(password)

  }, [numallow, len, charallow, setpassword])


  function copytoclip(){
    passref.current?.select()
    window.navigator.clipboard.writeText(password)
    // alert("Password copied successfully.")
  }


  useEffect(() => {
    Generator()

  }, [len, Generator, numallow, charallow])
  return (
    <>
      <div className='items-center justify-center py-36'>
        <h1 className=' text-white text-4xl text-center my-10'>Password Generator</h1>
        <div className='text-center align-middle justify-center text-white m-11 bg-gray-700 rounded-xl p-4'>
          <div>
            <input type="text" placeholder="password" className='text-2xl rounded-xl p-1 text-orange-400 w-1/2' value={password} readOnly ref={passref} />
            <button className='bg-blue-400 border-black m-2 rounded-xl text-xl p-2 hover:bg-blue-700 transition-transform: ease-in hover:scale-110'
              onClick={copytoclip}
            >Copy</button>
          </div>
          <div className='flex gap-3 items-center justify-center text-white my-5'>
            <div className='flex items-center gap-x-3'>
              <input type="range"
                value={len}
                min={6}
                max={100}
                className='cursor-pointer'
                onChange={(e) => { setlen(e.target.value) }}
              ></input>
              <label> Length:{len} </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input type="checkbox" id="number" className='flex items-center gap-x-1' defaultChecked={numallow} onChange={() => {
                setnumallow((prev) => !prev)
              }} />
              <label htmlFor="number">Number</label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input type="checkbox" id="char" className='flex items-center gap-x-1' defaultChecked={charallow} onChange={() => {
                setcharallow((prev) => !prev)
              }} />
              <label htmlFor="char">Charactor</label>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
