import LogoLoopDemo from '@/components/logo-loop-demo';
import ConnectIcons from '@/components/ui/connect-icons';
import GradientText from '@/components/GradientText';
import CarouselList from '@/components/carousel-list';
import TextRotating from '@/components/text-rotating';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen w-full h-full md:mt-20'>
      <main className='flex flex-grow flex-col p-4'>
        <section
          id='home'
          className='flex flex-col max-w-5xl mx-auto md:py-24 pb-4'
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
          <div className='flex flex-col lg:flex-row items-center gap-8 '>
            <div>
              <CarouselList />
            </div>

            <div>
              <TextRotating />
            </div>
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
