import React, { useState, useEffect } from "react";
import GridPattern from "@/components/ui/grid-pattern";
import knight from "@/assets/knight_half.png";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

const Contactme = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.name || !formData.email || !formData.message) {
      alert("All fields are required!");
      return;
    }

    // Simulate form submission or API call
    console.log("Form submitted:", formData);

    // Clear form and show success message
    setFormData({ name: "", email: "", message: "" });
    setSuccessMessage("Thank you for your message!");
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint is 768px in Tailwind
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full"
      id="contact"
      style={
        isMobile
          ? {}
          : {
            background:
              "linear-gradient(to bottom right, transparent 70%, black 100%)",
          }
      }
    >
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
      />
      <div
        className="absolute top-0 right-0 bg-no-repeat hidden md:block"
        style={{
          backgroundImage: `url(${knight.src})`,
          backgroundSize: "50% 100%",
          backgroundPosition: "right",
          minHeight: "100vh",
          height: "100%",
          width: "100%",
        }}
      ></div>
      <div className="relative w-full h-full flex flex-col items-center justify-center mx-auto pt-20 pb-8">
        <h1 className="text-center text-5xl font-bold mb-20">CONTACT ME</h1>
        <div className="relative w-full h-full flex md:flex-row flex-col items-center justify-center mx-auto gap-5">
          <div className="w-[5%] h-full hidden md:flex flex-col gap-6 justify-center items-center">
            <a
              href="https://www.linkedin.com/in/vishnu293/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="hover:text-yellow-500">
                <FaLinkedin className="text-4xl" />
              </button>
            </a>
            <a
              href="https://github.com/Vishnu293"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="hover:text-yellow-500">
                <SiGithub className="text-4xl" />
              </button>
            </a>
            <a
              href="https://www.facebook.com/Vishnu293"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="hover:text-yellow-500">
                <FaFacebook className="text-4xl" />
              </button>
            </a>
            <a
              href="https://x.com/vishnuu_here"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="hover:text-yellow-500">
                <FaSquareXTwitter className="text-4xl" />
              </button>
            </a>
          </div>
          <div className="w-0.5 h-96 bg-black hidden md:block"></div>
          <div
            className="relative w-[80%] md:w-[70%] h-full"
            style={
              isMobile
                ? {
                  background:
                    "linear-gradient(to bottom right, transparent 5%, white 50%, black 100%)",
                }
                : {}
            }
          >
            <form
              onSubmit={handleSubmit}
              className=" shadow-md md:shadow-none p-10 w-full h-full flex flex-col justify-between"
              style={
                isMobile
                  ? {
                    backgroundImage: `url(${knight.src})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right",
                  }
                  : {}
              }
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  className="mt-1 block w-[60%] md:w-[70%] px-3 py-2 border shadow-sm text-white bg-black outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="mt-1 block w-[60%] md:w-[70%] px-3 py-2 border shadow-sm text-white bg-black outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message"
                  required
                  className="mt-1 block w-[60%] md:w-[70%] px-3 py-2 border shadow-sm text-white bg-black outline-none"
                ></textarea>
              </div>
              <div className="flex justify-center mt-4 md:justify-start">
                <button
                  type="submit"
                  className="w-20 bg-yellow-500 text-black font-medium py-2 px-4 focus:bg-black focus:text-white hover:bg-white hover:text-black"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="md:hidden">
            <div className="text-center mb-4">
              ---------------- OR ----------------
            </div>
            <div className="text-center mb-3">CONTACT ME AT</div>
            <div className="w-full flex gap-6 justify-center items-center">
              <a
                href="https://www.linkedin.com/in/vishnu293/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hover:text-yellow-500">
                  <FaLinkedin className="text-3xl" />
                </button>
              </a>
              <a
                href="https://github.com/Vishnu293"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hover:text-yellow-500">
                  <SiGithub className="text-3xl" />
                </button>
              </a>
              <a
                href="https://www.facebook.com/Vishnu293"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hover:text-yellow-500">
                  <FaFacebook className="text-3xl" />
                </button>
              </a>
              <a
                href="https://x.com/vishnuu_here"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hover:text-yellow-500">
                  <FaSquareXTwitter className="text-3xl" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactme;
