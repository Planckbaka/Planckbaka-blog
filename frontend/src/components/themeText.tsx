"use client"
import BlurText from "@/components/reactbits-animations/BlurText";

const handleAnimationComplete = () => {
    console.log('Animation completed!');
};
export default function ThemeText() {
    return (
        <BlurText
            text="Hello  world! "
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-8xl mb-8 mt-16"
        />
    )
}
