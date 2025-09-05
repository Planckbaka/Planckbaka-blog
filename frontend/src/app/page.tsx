import LogoLoopDemo from '@/components/logo-loop-demo';
import ConnectIcons from '@/components/ui/connect-icons';
import GradientText from '@/components/GradientText';
import CarouselList from '@/components/carousel-list';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen w-full h-full md:mt-20'>
      {/*<header className="accent-slate-900 p-2 ">*/}
      {/*    <div className="flex justify-between items-center">*/}
      {/*        <div className="flex items-center gap-2">*/}
      {/*            <div onClick={() => router.push("#about")}>*/}
      {/*                <Avatar>*/}
      {/*                    <AvatarImage src="https://github.com/Planckbaka.png" />*/}
      {/*                    <AvatarFallback>CN</AvatarFallback>*/}
      {/*                </Avatar>*/}
      {/*            </div>*/}
      {/*            <div>*/}
      {/*                <NavigationMenuDemo />*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*        <div className="flex flex-row items-center gap-2">*/}
      {/*            <Button*/}
      {/*                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"*/}
      {/*                onClick={() => {router.push("http://github.com/Planckbaka")}}*/}
      {/*            >*/}
      {/*                <Github className="h-4 w-4" />*/}
      {/*                <span className="text-sm">GitHub</span>*/}
      {/*            </Button>*/}
      {/*            <ModeToggle />*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</header>*/}
      <main className='flex flex-grow flex-col p-4'>
        <section
          id='home'
          className='flex flex-col max-w-5xl mx-auto md:py-24 pb-14'
        >
          <p className='text-md md:text-lg font-mono text text-muted-foreground'>
            Hi I am Aki Wayne
          </p>
          <div className='flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-8 md:gap-4'>
            <h1 className='text-5xl md:text-6xl text-pretty leading-none'>
              <GradientText
                colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
                animationSpeed={8}
                showBorder={false}
                className='custom-class'
              >
                Software Developer
              </GradientText>
            </h1>
            <p className='md:text-2xl font-mono text-muted-foreground'>
              Transforming ideas into interactive and seamless digital
              experiences with cutting-edge frontend development.
            </p>
          </div>
          <ConnectIcons />
          <LogoLoopDemo />
          <div className='flex flex-row '>
            <CarouselList />
          </div>
        </section>
      </main>
      <footer className='flex py-4 items-center justify-between px-4'>
        <div className='flex flex-row justify-center gap-1 text-center p-1 font-medium text-xs leading-loose sm:text-sm text-gray-500 w-full'>
          <p>Aki Wayne </p>
          <a
            href='https://github.com/Planckbaka'
            target='_blank'
            rel='noreferrer'
            className='font-medium underline underline-offset-4'
          >
            Github
          </a>
        </div>
      </footer>
    </div>
  );
}
