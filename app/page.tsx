"use client"
import { useState } from "react";
import { note } from "./utils/types";
import { useEffect } from "react";



const Home = () => {

  useEffect(() => {
     fetchNotes();
  }, [])
  
  const [note, setnote] = useState<note>({ title: "", text: "" })
  const [Allnotes, setAllnotes] = useState<note[]>([])

  async function fetchNotes() {
    const res=await fetch('/api/fetchnotes');
    const data=await res.json()
    console.log(data);

    setAllnotes(data.result); // add checks to it
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

  return (
    <div className="maincont flex items-start justify-center bg-zinc-950 text-zinc-100">

      <div className="left flex h-screen w-[30%] flex-col items-center gap-4 bg-zinc-950 px-10 pt-10">



        <input onChange={handleChange}
          type="text" name="title" value={note.title} placeholder="Enter Title..." className="h-12 w-full shrink-0 text-center text-2xl placeholder:text-3xl placeholder:font-bold" />




        <textarea onChange={handleChange}  placeholder="Text here" name="text" value={note.text} className="mt-12 h-[50%] w-full shrink-0 text-center -indent-5 placeholder:text-2xl placeholder:font-bold"></textarea>

        <button onClick={handleNotefn} type="button" className="shrink-0 rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800 cursor-pointer">
          Save note
        </button>



      </div>
      <div className="right flex min-h-screen w-[70%] flex-col items-center bg-zinc-950 px-10 py-10">

        <div className="topsearchbar flex h-12 w-full max-w-3xl gap-3">

          <input type="text" placeholder="Search your notes..." aria-label="Search your notes" className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-5 text-left text-sm text-zinc-100 transition-colors placeholder:font-medium placeholder:text-zinc-600" />

          <button type="button" className="rounded-lg border border-zinc-700 bg-zinc-900 px-6 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800 cursor-pointer">
            Search
          </button>



        </div>


        <div className="boxes mt-16 grid h-screen w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="box h-32 rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-900">Your saved notes will appear here.
        </div>

          <div className="box h-32 rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-900">A quiet place for your next idea.
          
        </div>


        </div>



      </div>


    </div>
  );
};

export default Home;
