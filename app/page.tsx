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
  const [search, setsearch] = useState<string>("")

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
    <div className="maincont flex items-start justify-center bg-zinc-950 text-zinc-100">

      <div className="left flex h-screen w-[30%] flex-col items-center gap-4 bg-zinc-950 px-10 pt-10">



        <input onChange={handleChange}
          type="text" name="title" value={note.title} placeholder="Enter Title..." className="h-12 w-full shrink-0 text-center text-2xl placeholder:text-3xl placeholder:font-bold" />




        <textarea onChange={handleChange} placeholder="Text here" name="text" value={note.text} className="mt-12 h-[50%] w-full shrink-0 text-center -indent-5 placeholder:text-2xl placeholder:font-bold"></textarea>

        <button onClick={handleNotefn} type="button" className="shrink-0 rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800 cursor-pointer">
          Save note
        </button>



      </div>
      <div className="right flex min-h-screen w-[70%] flex-col items-center bg-zinc-950 px-10 py-10">

        <div className="topsearchbar flex h-12 w-full max-w-3xl gap-3">

          <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
              setsearch(e.target.value)
              console.log(search)
          }
          } value={search} placeholder="Search your notes..." aria-label="Search your notes" className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-5 text-left text-sm text-zinc-100 transition-colors placeholder:font-medium placeholder:text-zinc-600" />

         



        </div>


        <div className="boxes mt-16 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">

          {filtered.map((note) => {
            return <div key={note.id} className="box h-32 font-semibold text-xl cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900/60 p-5  text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-900">{note.title}</div>
          }
          ) }

          


        </div>



      </div>


    </div>
  );
};

export default Home;
