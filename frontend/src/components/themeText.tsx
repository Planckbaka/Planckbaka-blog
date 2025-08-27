import BlurText from "@/components/reactbits-animations/BlurText";

const handleAnimationComplete = () => {
    console.log('Animation completed!');
};

<BlurText
    text="Isn't this so cool?!"
    delay={150}
    animateBy="words"
    direction="top"
    onAnimationComplete={handleAnimationComplete}
    className="text-2xl mb-8"
/>