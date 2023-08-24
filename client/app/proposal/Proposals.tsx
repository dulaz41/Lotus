import Image from "next/image";
import React, { useEffect, useState } from "react";
import user from "../../public/assets/Ellipse2.png";
import Link from "next/link";
import logo from "../../public/images/logo.png";
import { useRouter } from "next/navigation";

interface Project {
  id: number;
  proposalId: number;
  name: string;
  projectName: string;
  coverDescription: string;
  proposalAmount: number;
  fundingCompleted: boolean;
  funded: string;
  message: string;
  description: string;
}

const Proposals = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const router = useRouter();

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrollingUp(currentScrollPos < prevScrollPos);
      prevScrollPos = currentScrollPos;
    };

    async function fetchFormData() {
      try {
        const response = await fetch(`https://opgrant.vercel.app/proposals/`);
        if (response.ok) {
          const data: Project[] = await response.json();
          const formattedProjects = data?.map((project) => ({
            ...project,
            fundingGoal: Math.floor(project.proposalAmount),
            funded: project.fundingCompleted ? "Funded" : "In Review",
          }));
          setProjects(formattedProjects);
        } else {
          console.error("Failed to fetch form data");
        }
      } catch (error) {
        console.error("Error while fetching form data:", error);
      }
    }

    fetchFormData();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleViewClick(proposalId: number) {
    router.push(`/proposal/${proposalId}`);
  }

  return (
    <>
      <div className="flex items-start flex-col bg-white w-[100%] mt-[68px]  -ml-4">
        <header className="fixed inset-x-0 mb-12 top-0 sm-custom:z-50">
          <nav
            className={`flex  items-center justify-between p-6  ${
              isScrollingUp ? "bg-white" : "bg-white"
            }`}
            aria-label="Global"
          >
            <div className="flex lg:min-w-0 lg:flex-1">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Lotus</span>
                <Image
                  className="flex-shrink-0 lg:w-[180px] lg:h-[60px] md:w-[182px] md:h-[52px] w-[120px] h-[32px]"
                  src={logo}
                  alt="logo"
                />
              </a>
            </div>
          </nav>
        </header>
        <div
          className="w-[100%] lg:flex justify-between px-4 lg:bg-cover   items-center "
          style={{ backgroundImage: `url('/images/dashframe.png')` }}
        >
          <div className="flex flex-col justify-center  h-[64px] ">
            <p className=" lg:text-[24px] text-base text-white -mb-2">
              Welcome, Innovator ✨
            </p>
          </div>
        </div>
        <div className="w-[100%]  flex flex-col">
          <div className="flex flex-col lg:mt-[12px] mt-[18px] bg-[#BCD7CB]   gap-y-[12px]">
            <div className="lg:h-[90%] w-[111.2%] mr-0 ">
              <div className="lg:h-[90%] w-[90%] border-[2px]  lg:px-[30px] lg:py-[20px] justify-between  border-[#00EF8B] p-[8px] ">
                {projects.map((project) => (
                  <div key={project.projectName} className="mb-4">
                    <div key={project.id} className="flex justify-between ">
                      <div className="space-x-6 flex items-center">
                        <Image
                          src={user}
                          alt=""
                          className="lg:h-[120px] mt-1 h-[50px] w-[50px] lg:w-[120px]"
                        />
                        <div className="flex gap-y-[10px] flex-col">
                          <h3 className="text-[#FFFFFF] lg:text-[40px] text-[18px] font-semibold">
                            {project.name}
                          </h3>
                          <p className=" text-[#626262] lg:text-[30px] text-[16px] text-center font-semibold ">
                            {project.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col lg:pt-[18px] pt-[6px] gap-y-4">
                        <p className=" text-black lg:text-[24px] text-[12px] text-center font-semibold ">
                          $ETH <span>{project.proposalAmount}</span>{" "}
                        </p>
                      </div>
                    </div>
                    <div
                      key={project.id}
                      className="my-[43px] lg:h-[116px] lg:w-[915px]"
                    >
                      <p className="text-[#303030] lg:text-2xl text-sm">
                        {project.description}
                      </p>
                    </div>
                    <div
                      key={project.id}
                      className="flex justify-end  items-end"
                    >
                      <button
                        className="mb-3"
                        onClick={() => handleViewClick(project.proposalId)}
                      >
                        <a className="text-center text-black font-semibold lg:py-[10px] cursor-pointer p-2 lg:px-[30px] bg-[#00EF8B] hover:bg-[#44d196] text-[20px] lg:text-[30px]">
                          View
                        </a>
                      </button>
                    </div>
                    <div className="lg:w-[109%] w-[124%]   -ml-10 -mr-0 my-4  bg-white h-[30px]"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Proposals;
