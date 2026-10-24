import type { Metadata } from 'next';
import {Geist,Geist_Mono,Instrument_Serif} from 'next/font/google';
import './globals.css';
// next/font self-hosts these at build time: no runtime requests to Google.
const sans=Geist({subsets:['latin'],variable:'--font-sans',display:'swap'});
const mono=Geist_Mono({subsets:['latin'],variable:'--font-mono',display:'swap'});
const serif=Instrument_Serif({subsets:['latin'],weight:'400',style:['normal','italic'],variable:'--font-serif',display:'swap'});
export const metadata:Metadata={metadataBase:new URL('https://prudhviai.online'),title:'Prudhvi Reddy — Senior AI Software Engineer',description:'Portfolio of Prudhvi Reddy: agentic AI, generative AI, machine learning, and enterprise software engineering.',openGraph:{title:'Prudhvi Reddy | Senior AI Software Engineer',images:['/images/prudhvi-portrait.jpg']}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning><body>{children}</body></html>}
