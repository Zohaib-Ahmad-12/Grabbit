"use client"

const Home = () => {




  return (
      <div className="maincont flex justify-center h-screen items-center bg-green-500">
      
          <div className="left bg-zinc-950 h-screen w-[30%] flex flex-col  items-center gap-4">
            
            

                <input type="text" placeholder="Enter Title..." className="h-[20%] w-full text-center outline-none focus:outline-none focus:ring-0 placeholder:text-3xl placeholder:font-bold text-2xl" />




                <textarea placeholder="Text here" className="h-[80%] boder-2 border-red-500 w-full text-center -indent-5 outline-none focus:outline-none focus:ring-0 placeholder:text-2xl placeholder:font-bold"></textarea>

            
            
          </div>      
          <div className="right bg-zinc-800 h-screen w-[70%] flex justify-center items-center">
            
            right
            
          </div>


      </div>
  );
};

export default Home;
