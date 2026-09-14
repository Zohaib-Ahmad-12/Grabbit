"use client"
import { useState } from "react";
import { note } from "./utils/types";
import { title } from "process";


const Home = () => {
const [note, setnote] = useState<note>({title:"",text:""})

function handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
 setnote({...note,[e.target.name]:e.target.value} )
console.log(note)
}

async function handleNotefn():Promise<void>{
   try {
       
    const finalNote={
      ...note,
      title: note.title?.trim() === "" ? "Unknown" : note.title
    }
     // did not need to set the state again as ux will be degraded

    const response=await fetch('/api/savenote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(finalNote),
})    

    const data=await response.json();

    if (data.success){
      setnote({text:"",title:""})
    }
    // alert(data.message)

      
   } catch (error:unknown) {
       
    if (error instanceof Error){
      //  alert('something went wrong')
    console.log(error ,'from line 20 ') // toberemoved
    }
    else{
      console.log('something was thrown')
    }

   }
}

  return (
      <div className="maincont flex justify-center h-screen items-center bg-green-500">
      
          <div className="left bg-zinc-950 h-screen w-[30%] flex flex-col  items-center gap-4">
            
            

                <input onChange={handleChange}
                 type="text" name="title" value={note.title} placeholder="Enter Title..." className="h-[20%] w-full text-center outline-none focus:outline-none focus:ring-0 placeholder:text-3xl placeholder:font-bold text-2xl" />




                <textarea onChange={handleChange} placeholder="Text here" name="text" value={note.text} className="h-[65%]  w-full text-center -indent-5 outline-none focus:outline-none focus:ring-0 placeholder:text-2xl placeholder:font-bold"></textarea>

                <button onClick={handleNotefn} type="button" className="w-[85%] rounded-md bg-white px-6 py-3 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-zinc-200 cursor-pointer focus:outline-none  ">
                  Save note
                </button>

            
            
          </div>      
          <div className="right bg-zinc-800 h-screen w-[70%] flex justify-center items-center">
            
            right
            
          </div>


      </div>
  );
};

export default Home;
