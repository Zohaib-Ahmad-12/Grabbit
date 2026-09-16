"use client"
import { useState } from "react";
import { note } from "./utils/types";
import { useEffect } from "react";
import Popup from "@/components/Popup";



const Home = () => {

  useEffect(() => {
    fetchNotes();
  }, [])

  const [note, setnote] = useState<note>({ title: "", text: "" })
  const [Allnotes, setAllnotes] = useState<note[]>([])
  const [search, setsearch] = useState<string>("")
  const [popup, setpopup] = useState<boolean>(false)
  const [selectedNote, setselectedNote] = useState<note | null>(null)

  async function fetchNotes() {

    try {
      const res = await fetch('/api/fetchnotes');

      if (!res.ok){
         console.log(`response was not ok , error ${res.status}`)
      }
      const data = await res.json()
      console.log(data);

      setAllnotes(data.result ?? []); 
      
    } catch (error:unknown) {
      if (error instanceof Error){
            alert('something went wrong')
      }
      else{
        alert('something was thrown ')
      }
        
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setnote({ ...note, [e.target.name]: e.target.value })
    console.log(note)
  }

  async function handleNotefn(): Promise<void> {
    try {

      const finalNote = {
        ...note,
        title: note.title?.trim() === "" ? "Unknown" : note.title
      }
      // did not need to set the state again as ux will be degraded

      if (finalNote.text.trim() === '') {
        alert('please enter the text')
        return;
      }

      const response = await fetch('/api/savenote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalNote),
      })

      const data = await response.json();

      if (data.success) {
        fetchNotes()
        setnote({ text: "", title: "" })
      }
      // alert(data.message)


    } catch (error: unknown) {

      if (error instanceof Error) {
        //  alert('something went wrong')
        console.log(error, 'from line 20 ') // toberemoved
      }
      else {
        console.log('something was thrown')
      }

    }
    
  }

  const filtered=Allnotes.filter((element) => {
    return element.title?.trim().toLowerCase().includes(search.trim().toLowerCase())
  }
  )
  
  return (
  <>
    {popup ? (
      <Popup note={selectedNote} onGoback={()=> {setpopup(false)}} />
    ) : (
      <div className="maincont min-h-screen bg-zinc-950 text-zinc-100 flex">

       
        <div className="left flex h-screen w-[34%] flex-col px-14 py-12">

          <input
            onChange={handleChange}
            type="text"
            name="title"
            value={note.title}
            placeholder="Enter Title..."
            className="
              w-full
              bg-transparent
              border-none
              outline-none
              text-4xl
              font-semibold
              text-zinc-100
              placeholder:text-zinc-500
              placeholder:font-semibold
            "
          />

          <textarea
            onChange={handleChange}
            placeholder="Text here"
            name="text"
            value={note.text}
            className="
              mt-10
              w-full
              flex-1
              resize-none
              bg-transparent
              border-none
              outline-none
              text-lg
              leading-8
              text-zinc-300
              placeholder:text-zinc-500
            "
          />

          <button
            onClick={handleNotefn}
            type="button"
            className="
              self-start
              mt-8
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              px-6
              py-3
              text-sm
              font-medium
              text-zinc-200
              transition
              hover:border-zinc-700
              hover:bg-zinc-800
              cursor-pointer
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
                d="M5 13l4 4L19 7"
              />
            </svg>

            Save note
          </button>

        </div>


      
        <div className="right min-h-screen w-[66%] px-14 py-12">

          
          <div className="topsearchbar relative w-full">

            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setsearch(e.target.value)
              }}
              value={search}
              placeholder="Search your notes..."
              aria-label="Search your notes"
              className="
                h-14
                w-full
                rounded-xl
                border
                border-zinc-800
                bg-zinc-900/70
                px-5
                pr-12
                text-sm
                text-zinc-100
                outline-none
                transition
                placeholder:text-zinc-600
                focus:border-zinc-700
              "
            />

            <svg
              className="
                absolute
                right-5
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                text-zinc-400
                pointer-events-none
              "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

          </div>


         
          <div className="boxes mt-11 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">

            {filtered.map((note) => {
              return (
                <div
                  key={note.id}
                  className=" box
                    h-36
                    cursor-pointer
                    rounded-xl
                    border
                    border-zinc-800/80
                    bg-zinc-900/50
                    p-6
                    text-xl
                    font-semibold
                    text-zinc-300
                    transition
                    hover:border-zinc-700
                    hover:bg-zinc-900
                  "
                  onClick={() => {
                    setselectedNote(note) 
                    setpopup(true)
                  }}
                >
                  {note.title}
                </div>
              )
            })}

          </div>

        </div>

      </div>
    )}
  </>
);;
};

export default Home;
