//import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle";
import NavigationMenuDemo from "@/components/NavigationMenuDemo";
import ThemeText from "@/components/theme-text";
import PlasmaBackground from "@/components/plasma-damo";
import { Github } from "lucide-react";
import {Button} from "@/components/ui/button";


export default function Home() {
  return (
      <PlasmaBackground height="100vh" className=''>
          <div className="flex flex-col min-h-screen w-full h-full">
              <header className="accent-slate-900 p-2 ">
                  <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                          <div>
                              <Avatar>
                                  <AvatarImage src="https://github.com/Planckbaka.png" />
                                  <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                          </div>
                          <div>
                              <NavigationMenuDemo />
                          </div>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                          <Button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                              <Github className="h-4 w-4" />
                              <span className="text-sm">GitHub</span>
                          </Button>
                          <ModeToggle />
                      </div>
                  </div>
              </header>
              <main className="flex-grow p-4">
                  <div className="flex items-center justify-center ">
                      <ThemeText/>
                  </div>
              </main>
              <footer className="flex py-4 items-center justify-between px-4">
                  <div className="flex flex-row justify-center gap-1 text-center p-1 font-medium text-xs leading-loose sm:text-sm text-gray-500 w-full">
                      <p>Aki Wayne </p>
                      <a href="https://github.com/Planckbaka" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">Github</a>
                  </div>
                  </footer>
          </div>
      </PlasmaBackground>

  );
}
