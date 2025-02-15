// import SidebarLink from "@/components/Docs/SidebarLink";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Docs Page  ",
//   description: "This is Docs page ",
//   // other metadata
// };

// export default function DocsPage() {
//   return (
//     <>
//       <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
//         <div className="container mx-auto">
//           <div className="-mx-4 flex flex-wrap">
//             <div className="w-full px-4 lg:w-1/4">
//               <div className="sticky top-[74px] rounded-lg border border-white p-4 shadow-solid-4  transition-all  dark:border-strokedark dark:bg-blacksection">
//                 <ul className="space-y-2">
//                   <SidebarLink />
//                 </ul>
//               </div>
//             </div>

//             <div className="w-full px-4 lg:w-3/4">
//               <div className="blog-details blog-details-docs shadow-three dark:bg-gray-dark rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
//                 <h1>Welcome to Startup Documentation</h1>

//                 <p className="text-body-color dark:text-body-color-dark text-base">
//                   This document serves as a simple template to showcase a sample
//                   layout and format. It is solely created for demonstration
//                   purposes and is not intended for any official use.
//                 </p>
 
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
import React from 'react';
import Doc from './docs';

const DocsPage = () => {
    const doctors = [
        {
            name: 'Ram',
            spec: 'Orthopedic',
            img: '/images/doc/8.jpg',// Update the image paths
        },
        {
            name: 'Kadambini',
            spec: 'Neurologist',
            img: '/images/doc/1.jpg',
        },
        {
            name: 'Jemison',
            spec: 'Pediatrician',
            img: '/images/doc/2.jpg',
        },
        {
            name: 'Roberta',
            spec: 'Physician',
            img: '/images/doc/3.jpg',
        },
        {
            name: 'Samu',
            spec: 'Paramedic',
            img: '/images/doc/4.jpg',
        },
        {
            name: 'Tafadzwa',
            spec: 'Surgeon',
            img: '/images/doc/5.jpg',
        },
        {
            name: 'Capricia',
            spec: 'ENT',
            img: '/images/doc/6.jpg',
        },
        {
            name: 'Vlasis',
            spec: 'Nurse',  
            img: '/images/doc/7.jpg',
        },
    ];

    return (
        <div className='pt-25 pb-15 mx-5 md:mx-20 md:pt-40 md:pb-30 flex flex-col '>
            <h3>These are Your Docs</h3>
            <div className='p-3 flex flex-wrap gap-3 justify-between'>
                {doctors.map((doctor, index) => (
                    <Doc key={index} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};

export default DocsPage;
