import React from "react";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-8">
   
        <div className="flex gap-12 md:flex-row flex-col">
            <button
                className="group px-16 py-6 text-xl font-medium rounded-2xl cursor-pointer transition-all duration-300 
                        relative overflow-hidden bg-white border-2 border-[#4285f4]
                        before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#4285f4] before:to-[#34a853]
                        before:transition-transform before:duration-300 before:-translate-x-full hover:before:translate-x-0
                        hover:shadow-lg hover:shadow-blue-200/50"
                onClick={() => navigate("/gdsc")}
                aria-label="Go to GDSC Certificate Generator"
            >
                <span className="relative z-10 text-[#4285f4] group-hover:text-white transition-colors duration-300">
                    GDSC Certificate
                </span>
            </button>

            <button
                className="group px-16 py-6 text-xl font-medium rounded-2xl cursor-pointer transition-all duration-300 
                        relative overflow-hidden bg-white border-2 border-[#7b2ff7]
                        before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#7b2ff7] before:to-[#f72f93]
                        before:transition-transform before:duration-300 before:-translate-x-full hover:before:translate-x-0
                        hover:shadow-lg hover:shadow-purple-200/50"
                onClick={() => navigate("/mlsc")}
                aria-label="Go to MLSC Certificate Generator"
            >
                <span className="relative z-10 text-[#7b2ff7] group-hover:text-white transition-colors duration-300">
                    MLSC Certificate
                </span>
            </button>
        </div>

        </div>
    );
};

export default Home;
