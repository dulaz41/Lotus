import React, { useState, ChangeEvent, FormEvent, MouseEvent, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import logo from "../public/images/logo.png";
import Image from 'next/image';
import { useAccount } from "wagmi";

const Profile = () => {
    const [isScrollingUp, setIsScrollingUp] = useState(false);

    const [formData, setFormData] = useState<{
        FirstName: string;
        MiddleName: string;
        LastName: string;
        email: string;
        GitHub: string;
        country: string;
        state: string;
        address: string;
        phone: string;
    }>({
        FirstName: '',
        LastName: '',
        GitHub: '',
        MiddleName: '',
        email: '',
        country: '',
        state: '',
        address: '',
        phone: '',
    });


    const [submittedData, setSubmittedData] = useState<{
        FirstName: string;
        MiddleName: string;
        LastName: string;
        email: string;
        GitHub: string;
        country: string;
        state: string;
        address: string;
        phone: string;
    } | null>(null);
    const [editMode, setEditMode] = useState(true);
    const [profileExists, setProfileExists] = useState(false);
    const { address }: any = useAccount()

    useEffect(() => {
        const checkProfileExists = async () => {
            try {
                const response = await fetch(`https://opgrant.vercel.app/profile/${address}`);
                if (response.ok) {
                    const data = await response.json();
                    setProfileExists(data.length > 0);
                } else {
                    console.error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error while fetching profile data:', error);
            }
        };

        checkProfileExists();
    }, [address]);


    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await fetch(`https://opgrant.vercel.app/profile/${address}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    console.error('Failed to fetch form data');
                }
            } catch (error) {
                console.error('Error while fetching form data:', error);
            }
        };

        fetchFormData();
    }, []);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (profileExists) {
            // Profile already exists, no need to submit again
            alert('Profile already exists! You cannot submit the form again.');
            return;
        
        // Create a new profile

    } else {
        
        console.log("Trying to create")
         await fetch('https://opgrant.vercel.app/profile/', {
            method: 'POST',
            body: JSON.stringify({
                walletAddress: address,
                FirstName: formData.FirstName,
                MiddleName: formData.MiddleName,
                LastName: formData.LastName,
                email: formData.email,
                GitHub: formData.GitHub,
                country: formData.country,
                state: formData.state,
                address: formData.address,
                phone: formData.phone,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {

                setSubmittedData({ ...formData });
            })
            .catch((err) => {
                console.log(err.message);
            });

       

    setEditMode(false);
        }
};

useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        setIsScrollingUp(currentScrollPos < prevScrollPos);
        prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
}, []);


const handleEdit = () => {
    setEditMode((prevState) => !prevState);
};


return (
    <>
        <div className="flex items-start flex-col bg-white w-[100%] mt-[68px]  -ml-4">
            <header className="fixed inset-x-0 mb-12 top-0 sm-custom:z-50">
                <nav
                    className={`flex  items-center justify-between p-6  ${isScrollingUp ? 'bg-white' : 'bg-white'
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
                    <p className="lg:text-[24px] text-base text-white -mb-2">
                        Welcome, Innovator ✨
                    </p>
                </div>
            </div>
            <div className="w-[100%]">
                <div className="flex flex-col lg:mt-[12px] mt-[18px]  gap-y-[12px]">
                    <div className="lg:h-[980px] w-[100%] border-[2px]  lg:px-[30px] mb-2 lg:py-[20px] justify-between  border-[#00EF8B] p-[8px] ">
                        <h1 className="text-[40px] text-center text-[#00EF8B] font-extrabold mb-4">
                            Create profile
                        </h1>

                        <div>

                            <div className="mt-6 ">
                                <form onSubmit={handleSubmit}>
                                    {/* Form inputs */}
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            id="FirstName"
                                            name="FirstName"
                                            placeholder="First name"
                                            onChange={handleChange}
                                            value={formData.FirstName}
                                            className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                                            required
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            id="MiddleName"
                                            name="MiddleName"
                                            placeholder="Middle name"
                                            onChange={handleChange}
                                            value={formData.MiddleName}
                                            className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            id="LastName"
                                            name="LastName"
                                            placeholder="Last name"
                                            onChange={handleChange}
                                            value={formData.LastName}
                                            className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                                            required
                                            disabled={!editMode}
                                        />
                                    </div>
                                    {/* Rest of the form inputs */}
                                    {/* ... */}
                                    <div className="mb-6">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                            className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                                            required
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="url"
                                            id="GitHub"
                                            name="GitHub"
                                            value={formData.GitHub}
                                            onChange={handleChange}
                                            placeholder="GitHub Profile link"
                                            className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                                            required
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            placeholder="Country of residence"
                                            className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                                            required
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="State of residence"
                                            className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                                            required
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Address"
                                            className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                                            required
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone"
                                            className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                                            required
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="flex items-center mt-[190px] mb-[12px] justify-center">
                                        <button
                                            type="submit"
                                            className="bg-[#00EF8B] hover:bg-[#07a261]  text-black text-[15px] lg:text-[25px]  font-semibold py-3 px-8 rounded-sm"
                                            disabled={profileExists}
                                        >
                                            {profileExists ? 'Profile Exists' : 'Submit'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);
};

export default Profile;
