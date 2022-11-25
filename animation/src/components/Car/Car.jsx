import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import s from "./Car.module.scss";

gsap.registerPlugin(ScrollTrigger);
const Car = () => {
  const commonRef = useRef({});
  commonRef.current = {};

  useEffect(() => {
    const canvas = document.getElementById("carSection");
    const context = canvas.getContext("2d");

    canvas.width = 1500;
    canvas.height = 600;

    const totalFrame = 80;

    const currentFrame = (idx) => {
      if (idx < 10) {
        const srcVal = `/images/Car_9_Panamera_Tilt_v002_000${idx}.png`;
        return srcVal;
      } else {
        const srcVal = `/images/Car_9_Panamera_Tilt_v002_00${idx}.png`;
        return srcVal;
      }
    };

    const images = [];

    for (let i = 0; i < totalFrame; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.setAttribute("className", "imgWidth");
      images.push(img);
    }
    function getOffset(el) {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
      };
    }

    const handleScroll = () => {
      let scrollPixels = Math.min(
        Math.floor((getOffset(canvas).top + 0 - window.scrollY) / 4.5) + 1,
        80
      );
      scrollPixels = Math.min(80, 80 - scrollPixels);
      // console.log("scrollPixels", Math.min(52, 52 - scrollPixels));
      if (scrollPixels) {
        console.log(scrollPixels, "scrollPixels");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[scrollPixels - 1], 0, 0);
      }
    };
    context.drawImage(images[0], 0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div>
        <img
          src="https://cdn2.vectorstock.com/i/1000x1000/25/96/scroll-down-icon-scrolling-symbol-for-web-design-vector-23032596.jpg"
          alt=""
        />
      </div>
      <div
        className={s.carBox}
        ref={(el) => {
          commonRef.current["carContainer"] = el;
        }}
      >
        <canvas id="carSection" />
      </div>
    </>
  );
};

export default Car;
