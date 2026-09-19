'use client'
import React from 'react'
import type { UserAccess } from './utils/types'
import { useState } from 'react'
import { encryptPassword } from './utils/algorithms'

const Home = () => {
  const [form, setform] = useState<UserAccess>({username:"",password:""})

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    setform({...form,[e.target.name]:e.target.value})
    // console.log(form)
  }

async function handleLoginReq():Promise<void> {
  
  const passer = encryptPassword(form.password);

  const newObject:UserAccess={
   ...form,    
    password:passer
  }

  const response = await fetch('/api/authorizeuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newObject),
      })

      if (!response.ok){
        alert('something went wrong')
        console.log(response.status)
      }

      const data=await response.json();

      if (data.success){
        console.log('successssss')
      }

}



  
  return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6">

     
      <div
        className="
          w-full
          max-w-md
          rounded-xl
          border
          border-zinc-800/80
          bg-zinc-950
          p-5
          shadow-2xl
          sm:p-8
        "
      >

       
        <div className="mb-7 flex flex-col items-center text-center sm:mb-8">

       
          <div
  className="
    mb-4
    flex
    h-14
    w-14
    items-center
    justify-center
    rounded-xl
    border
    border-zinc-800
    bg-zinc-900/50
    sm:h-16
    sm:w-16
  "
>
  <svg
    className="h-9 w-9 text-zinc-100 sm:h-10 sm:w-10"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    
    <path
      d="M21 25C17 18 15 8 19 6C24 4 27 15 28 23"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />

    <path
      d="M36 23C37 14 40 5 45 7C49 9 46 19 42 26"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />

    <path
      d="
        M16 30
        C16 23 21 19 29 19
        H34
        C42 19 48 24 48 32
        V39
        C48 48 41 54 32 54
        H28
        C19 54 13 48 13 39
        V32
        C13 31 14 30 16 30
        Z
      "
      fill="currentColor"
    />


    <circle
      cx="24"
      cy="32"
      r="2"
      fill="rgb(24 24 27)"
    />

    <circle
      cx="39"
      cy="32"
      r="2"
      fill="rgb(24 24 27)"
    />

    
    <path
      d="M29 38C30 37 34 37 35 38C34 40 30 40 29 38Z"
      fill="rgb(24 24 27)"
    />

    <path
      d="M32 40V43M32 43C29 46 27 44 26 43M32 43C35 46 37 44 38 43"
      stroke="rgb(24 24 27)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
</div>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Grabbit
          </h1>

          <p className="mt-1.5 text-sm text-zinc-500 sm:mt-2">
            Admin Login
          </p>

        </div>


      
        <form className="space-y-5">

          
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-zinc-400"
            >
              Username
            </label>

            <div className="relative">

              <svg
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  h-5
                  w-5
                  -translate-y-1/2
                  text-zinc-500
                "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M20 21a8 8 0 00-16 0M12 13a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>

              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="
                  h-13
                  w-full
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-900/50
                  pl-12
                  pr-4
                  text-sm
                  text-zinc-100
                  outline-none
                  transition-colors
                  placeholder:text-zinc-600
                  focus:border-zinc-700
                "
              />

            </div>
          </div>


          
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-zinc-400"
            >
              Password
            </label>

            <div className="relative">

              <svg
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  h-5
                  w-5
                  -translate-y-1/2
                  text-zinc-500
                "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="11"
                  rx="2"
                  strokeWidth="1.8"
                />

                <path
                  strokeLinecap="round"
                  strokeWidth="1.8"
                  d="M8 10V7a4 4 0 018 0v3"
                />
              </svg>

              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="
                  h-13
                  w-full
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-900/50
                  pl-12
                  pr-12
                  text-sm
                  text-zinc-100
                  outline-none
                  transition-colors
                  placeholder:text-zinc-600
                  focus:border-zinc-700
                "
              />

              {/* Password visibility */}
              <button
                type="button"
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  cursor-pointer
                  text-zinc-500
                  transition-colors
                  hover:text-zinc-300
                "
                aria-label="Show password"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="2.5"
                    strokeWidth="1.8"
                  />
                </svg>
              </button>

            </div>
          </div>


          {/* Login Button */}
          <button
          onClick={handleLoginReq}
            type="submit"
            className="
              mt-2
              flex
              h-13
              w-full
              cursor-pointer
              items-center
              justify-center
              gap-3
              rounded-xl
              border
              border-zinc-700
              bg-zinc-900
              text-sm
              font-semibold
              text-zinc-100
              transition-colors
              hover:border-zinc-600
              hover:bg-zinc-800
            "
          >
            Login

            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-6-6l6 6-6 6"
              />
            </svg>
          </button>

        </form>

      </div>

    </main>
  )
}

export default Home
