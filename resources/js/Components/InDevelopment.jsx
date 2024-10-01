import { getRndInteger } from "@/Base/RandomNumber"
import { useState } from "react"
import kittyA from "@/Kitty/cat1.jpg"
import kittyB from "@/Kitty/cat2.jpg"
import kittyC from "@/Kitty/cat3.jpg"
import kittyD from "@/Kitty/cat4.jpg"
import kittyE from "@/Kitty/cat5.jpg"

export default function InDevelopment(){
    const kitty = [kittyA, kittyB, kittyC, kittyD, kittyE]
    return(        
        <div className="bg-white text-center m-auto p-10 w-fit rounded-lg">
            <p className="text-red-500 font-bold text-lg uppercase">In Development</p>
            <p className="text-sm italic mb-5">Patient, please</p>
            <div className="max-w-sm m-auto">
                <img src={kitty[getRndInteger(0,4)]}/>
            </div>
        </div>        
    )
}