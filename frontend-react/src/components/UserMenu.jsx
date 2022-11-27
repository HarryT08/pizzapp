import { useState, useRef, useEffect } from "react";
import { Transition } from ".";
import jwt_decode from "jwt-decode";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const UserMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // Cerrar menu si se presiona ESC
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        decodedUserName();
    }, []);

    const decodedUserName = () => {
        const token = localStorage.getItem("Authorization");
        const decoded = jwt_decode(token);
        return setUserName(decoded.nombre);
    };

    const getInitials = (name) => {
        const names = name.split(" ");
        const initials = names[0].substring(0, 1).toUpperCase();
        return initials;
    };

    const logout = () => {
        localStorage.removeItem("Authorization");
        navigate("/login");
    };
    return (
        <div className="relative inline-flex">
            <Tooltip title="Perfil" arrow>
                <button
                    ref={trigger}
                    className="inline-flex justify-center items-center group"
                    aria-haspopup="true"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                >
                    <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm font-medium">
                        {getInitials(userName)}
                    </span>
                    <div className="flex items-center truncate">
                        <svg
                            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 dark:text-white"
                            viewBox="0 0 12 12"
                        >
                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                        </svg>
                    </div>
                </button>
            </Tooltip>
            <Transition
                className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border dark:bg-[#191919]/95 border-slate-200 dark:border-gray-700 py-1.5 rounded shadow-lg overflow-hidden mt-1"
                show={dropdownOpen}
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
            >
                <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                >
                    <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-gray-700">
                        <div className="font-medium text-slate-800 dark:text-white">
                            {userName}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-gray-100 italic">
                            Cargo
                        </div>
                    </div>
                    <ul>
                        <li>
                            <span
                                className="font-medium cursor-pointer text-sm text-red-500 hover:underline hover:underline-offset-1 flex items-center py-1 px-3"
                                to="/"
                                onClick={logout}
                            >
                                Cerrar sesion
                            </span>
                        </li>
                    </ul>
                </div>
            </Transition>
        </div>
    );
};

export default UserMenu;
