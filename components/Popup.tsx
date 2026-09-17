import React from 'react'
import type { PopupProps } from '@/app/utils/types'
const Popup = ({note,onGoback,onDelete}:PopupProps) => {

 // not an ai , copy fn

 async function copyClipboard(str:string ) {
    await navigator.clipboard.writeText(str);
 }

 // delete the note

 async function deleteNotefn(id:number) {
      try {
      const response = await fetch('/api/deletenote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id),
      })

      if (!response.ok){
        console.log('something went wrong')
      }
      const data=await response.json();

      if (data.success){
        onDelete(id)
        onGoback()
         
      }
      }
      catch (error:unknown) {
        console.log(error)
      }
       
      }

 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-[2px]">

  <div className="w-full max-w-4xl rounded-xl border border-zinc-800/80 bg-zinc-950 p-8 shadow-2xl">

   
    <div className="mb-8 flex items-center justify-between">

      <h2 className="text-3xl font-semibold text-zinc-100">
        Note Details
      </h2>

      <button
        onClick={onGoback}
        className="cursor-pointer text-zinc-500 transition-colors hover:text-zinc-200"
        aria-label="Close"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

    </div>


   
    <div className="mb-7">

      <label className="mb-2 block text-sm font-medium text-zinc-500">
        Title
      </label>

      <div className="
        w-full
        rounded-xl
        border
        border-zinc-800/80
        bg-zinc-900/50
        px-5
        py-4
        text-lg
        font-semibold
        text-zinc-200
      ">
        {note?.title}
      </div>

    </div>


  
    <div className="mb-8">

      <label className="mb-2 block text-sm font-medium text-zinc-500">
        Content
      </label>

      <div className="
        min-h-[300px]
        w-full
        whitespace-pre-wrap
        rounded-xl
        border
        border-zinc-800/80
        bg-zinc-900/50
        px-5
        py-5
        text-base
        leading-7
        text-zinc-300
      ">
        {note?.text}
      </div>

    </div>


   
    <div className="flex items-center justify-between">

    
      <button
        onClick={onGoback}
        className="
          flex
          cursor-pointer
          items-center
          gap-2
          rounded-xl
          border
          border-zinc-800
          bg-zinc-900/50
          px-5
          py-3
          text-sm
          font-medium
          text-zinc-300
          transition-colors
          hover:border-zinc-700
          hover:bg-zinc-900
          hover:text-zinc-100
        "
      >

        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 12H5m7 7l-7-7 7-7"
          />
        </svg>

        Go Back

      </button>


      
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            copyClipboard(note?.text!)
          }}
          className="
            flex
            cursor-pointer
            items-center
            gap-2
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900/50
            px-5
            py-3
            text-sm
            font-medium
            text-zinc-300
            transition-colors
            hover:border-zinc-700
            hover:bg-zinc-900
            hover:text-zinc-100
          "
        >

          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 8h10v10H8z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 16H5a2 2 0 01-2-2V5a2 2 0 012-2h9a2 2 0 012 2v1"
            />
          </svg>

          Copy

        </button>

        <button

        onClick={() => {
          deleteNotefn(note?.id!)
        }
        }
          type="button"
          className="
            flex
            cursor-pointer
            items-center
            gap-2
            rounded-xl
            border
            border-red-900/70
            bg-red-950/30
            px-5
            py-3
            text-sm
            font-medium
            text-red-300
            transition-colors
            hover:border-red-800
            hover:bg-red-950/60
            hover:text-red-200
          "
          aria-label="Delete note"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-8 0h10"
            />
          </svg>

          Delete
        </button>
      </div>

    </div>

  </div>

</div>
  )
}

export default Popup
