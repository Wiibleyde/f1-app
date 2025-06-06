import { useEffect, useState } from 'react'


interface useSliderProps {
    position: number;
}

const useSlider = ({
    position
}: useSliderProps) => {
    const [sliderValue, setSliderValue] = useState(position);

    useEffect(() => {
        setSliderValue(position);
    }, [position]);

    return {
        sliderValue,
        setSliderValue,
    };
}

export default useSlider