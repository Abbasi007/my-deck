import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const slides = [
  { id: "cover", header: "Monthly Report", kicker: "Kaleem Abbasi", bullets: ["Period: Last 30 days","Team: Monetize Media","Focus: Funnels, automations, creative, collaboration"]},
  { id: "highlights", header: "Highlights and Impact", bullets: ["Shipped new and updated funnels for Doria and Steven","Cleaned and organized Robert Allen automations","Resolved SMS delivery issues and improved reliability","Delivered creative assets and documentation"]},
  { id: "funnels", header: "Funnels and Web Pages", bullets: ["Affiliate Registration Funnel for Doria","Gift Funnel for Doria updates and fixes","Press Kit Funnel Page for Steven Golden","Lee Phillips - book funnel email fix and replay additions"]},
  { id: "automation", header: "Marketing Automation", bullets: ["Added promo and replay emails to Wealth Summit and Lee Phillips","Robert Allen automations cleanup","SMS troubleshooting and fixes","Contacts and segments imported for Peter Conti"]},
  { id: "creative", header: "Content and Creative", bullets: ["Superfan launch slides tweaked on Canva","Facebook banners for Doria launch party","Newsletter archive PDFs for Lee Phillips"]},
  { id: "media", header: "Video and Media", bullets: ["Live session recordings added to ClickFunnels","Author Accelerator bonus session upload","Wealth Summit videos edited and published"]},
  { id: "collab", header: "Collaboration", bullets: ["Huddles with Hamza and tech team","Shared Google Sheet for Robert Allen automation tracking","Coordinated with Lyndsey on assignments and urgent updates"]},
  { id: "close", header: "Outcome & Reflection", bullets: ["Funnels are launch ready and stable","Automations are cleaner and easier to maintain","Creative and content support marketing velocity","Team is aligned through clear communication","I enjoyed working with the team and learned complex automations","Recordings were helpful and accelerated my learning","I hope you also enjoyed working with me"]}
];

const fadeUp = {initial: { opacity: 0, y: 24 },in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" }},};

export default function MonthlyReportDeck(){
 const containerRef = useRef(null);
 const { scrollYProgress } = useScroll({ container: containerRef });
 const progress = useSpring(scrollYProgress,{ stiffness:90,damping:20 });
 const [active,setActive] = useState(0);
 useEffect(()=>{
   const el=containerRef.current; if(!el) return;
   const sections=Array.from(el.querySelectorAll("section[data-slide]"));
   const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const idx=Number(e.target.dataset.index||0);setActive(idx);}})},{root:el,threshold:0.6});
   sections.forEach(s=>io.observe(s));
   return ()=>io.disconnect();
 },[]);
 useEffect(()=>{
   const handler=(e)=>{const delta=e.key==="ArrowDown"||e.key==="PageDown"?1:e.key==="ArrowUp"||e.key==="PageUp"?-1:0;if(delta!==0){const next=Math.max(0,Math.min(slides.length-1,active+delta));const id=slides[next].id;document.getElementById(id)?.scrollIntoView({behavior:"smooth"});}}
   window.addEventListener("keydown",handler);
   return ()=>window.removeEventListener("keydown",handler);
 },[active]);
 const goTo=(i)=>{document.getElementById(slides[i].id)?.scrollIntoView({behavior:"smooth"});};
 return(
 <div className="bg-[#181818] text-white min-h-screen">
 <motion.div style={{scaleX:progress}} className="fixed left-0 top-0 h-1 w-full origin-left bg-[#ccff00] z-50"/>
 <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">{slides.map((_,i)=>(<button key={i} onClick={()=>goTo(i)} className={`h-3 w-3 rounded-full ring-1 ring-white/40 transition ${active===i?"bg-[#ccff00] scale-125":"bg-white/20 hover:bg-white/50"}`}/>))}</div>
 <div ref={containerRef} className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth pb-24 md:pb-0">{slides.map((slide,idx)=>(<section key={slide.id} id={slide.id} data-slide data-index={idx} className={`relative flex h-screen snap-start items-center justify-center px-4 md:px-8 transition-colors duration-700 ${idx%2===0?"bg-white text-[#181818]":"bg-[#181818] text-white"}`}><SlideCard index={idx} header={slide.header} kicker={slide.kicker} bullets={slide.bullets} dark={idx%2!==0}/></section>))}</div>
 <Footer/>
 </div>);
}
function SlideCard({index,header,kicker,bullets,dark}){
 return(
  <motion.div initial={fadeUp.initial} whileInView={fadeUp.in} viewport={{amount:0.5,once:false}} className="relative w-full max-w-5xl">
   <div className={`rounded-3xl border p-6 md:p-14 shadow-2xl ${dark?"border-[#ccff00]/30 bg-[#181818]":"border-[#181818]/30 bg-white"}`}>
    {kicker&&<div className={`mb-3 md:mb-4 text-lg md:text-xl font-semibold tracking-wide ${dark?"text-[#ccff00]":"text-[#181818]"}`}>{kicker}</div>}
    <h2 className={`text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight break-words ${dark?"text-white":"text-[#181818]"}`}>{index+1<10?`0${index+1}`:index+1}<span className="mx-2 md:mx-3 text-[#ccff00]">|</span>{header}</h2>
    {bullets&&bullets.length>0&&(<ul className={`mt-6 md:mt-8 grid gap-4 md:gap-5 text-base sm:text-lg md:text-2xl ${dark?"text-white/90":"text-[#181818]/90"}`}>{bullets.map((b,i)=>(<li key={i} className="flex items-start gap-3 md:gap-4"><span className="mt-1 md:mt-2 h-2 w-2 md:h-3 md:w-3 rounded-full bg-[#ccff00]"/><span>{b}</span></li>))}</ul>)}
   </div>
  </motion.div>
 );
}
function Footer(){
 return(
   <div className="sticky bottom-0 z-30 mx-auto mt-6 flex max-w-6xl flex-col md:flex-row items-center justify-between px-4 md:px-6 py-2 bg-[#181818] text-xs sm:text-sm text-white/70">
     <div className="mb-2 md:mb-0">Use mouse wheel or Page Up and Page Down keys</div>
     <div className="mb-2 md:mb-0 hidden md:block">Press number keys to jump to slides</div>
     <div className="text-center text-white/80">Created by <span className="text-[#ccff00] font-semibold">Kaleem Abbasi</span> —<a href="https://kaleemabbasi.com" className="ml-1 md:ml-2 underline hover:text-[#ccff00]">Website</a> |<a href="https://www.linkedin.com/in/kaleem-abbasi/" className="ml-1 md:ml-2 underline hover:text-[#ccff00]">LinkedIn</a></div>
   </div>
 );
}
