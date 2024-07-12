/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

import './PinInput.css';

const PinInput = ({ length = 4, onPinSubmit }) => {
    const [pin, setPin] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newPin = [...pin];
        // allow only one input
        newPin[index] = value.substring(value.length - 1);
        setPin(newPin);

        // submit trigger
        const combinedPin = newPin.join("");
        if (combinedPin.length === length) onPinSubmit(combinedPin);

        // Move to next input if current field is filled
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        // optional
        if (index > 0 && !pin[index - 1]) {
            inputRefs.current[pin.indexOf("")].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (
            e.key === "Backspace" &&
            !pin[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            // Move focus to the previous input field on backspace
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="pin-input-div">
            {pin.map((value, index) => {
                return (
                    <input
                        key={index}
                        type="text"
                        ref={(input) => (inputRefs.current[index] = input)}
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="pin-inputs"
                    />
                );
            })}
        </div>
    );
};

export default PinInput;