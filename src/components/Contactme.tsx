"use client"
import React, { useState, useEffect } from "react";
import GridPattern from "@/components/ui/grid-pattern";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import ShimmerButton from "./ui/shimmer-button";

const Contactme = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("All fields are required!");
      return;
    }

    const serviceID = "service_zy3zm8u";
    const templateID = "template_2jryl28";
    const publicKey = "ng7iZ0vBtaazy-ind";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    try {
      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );
      console.log("Email sent successfully!", response.status, response.text);

      setFormData({ name: "", email: "", message: "" });

      setSuccessMessage(true);
      setErrorMessage(false);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Something went wrong. Please try again.");
      setErrorMessage(true);
      setSuccessMessage(false);
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success("Thank you, your message was sent successfully!");
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error("Error: Your message could not be sent!");
    }
  }, [errorMessage]);

  return (
    <div
      className={`relative min-h-screen w-full ${isMobile
        ? ""
        : "bg-gradient-to-br from-transparent via-white to-black dark:via-black dark:to-white"
        }`}
      id="contact"
    >
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
      />
      <div
        className="absolute bg-[url('../assets/knight_half.png')] dark:bg-[url('../assets/knightb.png')] top-0 right-0 bg-no-repeat hidden md:block"
        style={{
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
              <button className="hover:text-gold">
                <FaLinkedin className="text-4xl" />
              </button>
            </a>
            <a
              href="https://github.com/Vishnu293"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="hover:text-gold">
                <SiGithub className="text-4xl" />
              </button>
            </a>
            <a
              href="https://www.facebook.com/Vishnu293"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="hover:text-gold">
                <FaFacebook className="text-4xl" />
              </button>
            </a>
            <a
              href="https://x.com/vishnuu_here"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="hover:text-gold">
                <FaSquareXTwitter className="text-4xl" />
              </button>
            </a>
          </div>
          <div className="w-0.5 h-96 bg-black dark:bg-white hidden md:block"></div>
          <div
            className={`relative w-[80%] md:w-[70%] h-full ${isMobile
              ? "bg-gradient-to-br from-transparent via-white to-black dark:via-black dark:to-white"
              : ""
              }`}
          >
            <form
              onSubmit={handleSubmit}
              className={`${isMobile
                ? "bg-[url('../assets/knight_half.png')] dark:bg-[url('../assets/knightb.png')]"
                : ""
                } shadow-md md:shadow-none p-10 w-full h-full flex flex-col justify-between`}
              style={
                isMobile
                  ? {
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
                  className="block text-sm font-medium text-black dark:text-white"
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
                  className="mt-1 block w-[60%] md:w-[70%] px-3 py-2 border shadow-sm text-white dark:text-black bg-black dark:bg-white outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black dark:text-white"
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
                  className="mt-1 block w-[60%] md:w-[70%] px-3 py-2 border shadow-sm text-white dark:text-black bg-black dark:bg-white outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black dark:text-white"
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
                  className="mt-1 block w-[60%] md:w-[70%] px-3 py-2 border shadow-sm text-white dark:text-black bg-black dark:bg-white outline-none"
                ></textarea>
              </div>
              <div className="flex justify-center mt-4 md:justify-start">
                <ShimmerButton
                  type="submit"
                  borderRadius="0"
                  shimmerColor="black"
                  background="gold"
                  className="w-20 shadow-2xl text-black font-medium py-2 px-4"
                >
                  Submit
                </ShimmerButton>
              </div>
            </form>
          </div>
          <div className="md:hidden">
            <div className="text-center mb-4">
              ------------ OR ------------
            </div>
            <div className="text-center mb-3">CONTACT ME AT</div>
            <div className="w-full flex gap-6 justify-center items-center">
              <a
                href="https://www.linkedin.com/in/vishnu293/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hover:text-gold">
                  <FaLinkedin className="text-3xl" />
                </button>
              </a>
              <a
                href="https://github.com/Vishnu293"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hover:text-gold">
                  <SiGithub className="text-3xl" />
                </button>
              </a>
              <a
                href="https://www.facebook.com/Vishnu293"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hover:text-gold">
                  <FaFacebook className="text-3xl" />
                </button>
              </a>
              <a
                href="https://x.com/vishnuu_here"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hover:text-gold">
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
