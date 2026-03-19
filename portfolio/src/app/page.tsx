"use client"

import Image from "next/image";
import Loading from "./loading/page";
import { useEffect, useState } from "react";
import Landing from "./landing/page";
import About from "./About/page";





export default  function Home() {
  // Artificial delay to see the loading.tsx in action

const [isloading ,setIsloading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() =>{
    setIsloading(false);
  },5000);
  return () => clearTimeout(timer);
},[]);

if(isloading){
  return<Loading/>
}

 return (
    <>
      <Landing />
      <About/>
    </>
  );
}