import { useState } from 'react';

export type UseTogglePasswordVisibilityProps = {
    passwordVisibility: boolean;
    rightIcon: "eye" | "eye-off";
    handlePasswordVisibility(): void;
}

export const useTogglePasswordVisibility = () : UseTogglePasswordVisibilityProps => {
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true)
    const [rightIcon, setRightIcon] = useState<"eye" | "eye-off">("eye")

    const handlePasswordVisibility = () : void => {
        if (rightIcon === "eye") {
            setRightIcon("eye-off")
            setPasswordVisibility(!passwordVisibility)
        } else if (rightIcon === "eye-off") {
            setRightIcon("eye")
            setPasswordVisibility(!passwordVisibility)
        }
    }

    return {
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility
    }
}