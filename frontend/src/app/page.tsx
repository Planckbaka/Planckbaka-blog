//import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle";
import NavigationMenuDemo from "@/components/NavigationMenuDemo";
import ThemeText from "@/components/themeText";
import PlasmaBackground from "@/components/plasma";


export default function Home() {
  return (
      <PlasmaBackground height="100vh" className=''>
          <div className="flex flex-col min-h-screen w-full h-full">
              <header className="accent-slate-900 p-2 ">
                  <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                          <div>
                              <Avatar>
                                  <AvatarImage src="https://github.com/shadcn.png" />
                                  <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                          </div>
                          <div>
                              <NavigationMenuDemo />
                          </div>
                      </div>
                      <div>
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
