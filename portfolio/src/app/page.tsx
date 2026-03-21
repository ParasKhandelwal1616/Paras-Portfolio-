"use client"

import Loading from "./loading/page";
import { useEffect, useState } from "react";
import Landing from "./landing/page";
import About from "./About/page";
import Experience from "./Experience/page";
import Technical from "./Technical/page";
import Projects from "./Projects/page";





export default  function Home() {
  // Artificial delay to see the loading.tsx in action

const [isloading ,setIsloading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() =>{
    setIsloading(false);
  },2000);
  return () => clearTimeout(timer);
},[]);

if(isloading){
  return<Loading/>
}

 return (
    <>
      <Landing />
      <About/>
      <Experience/>
      <Technical/>
      <Projects/>
    </>
  );
}