"use client";

import { useState } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useCopyToClipboard } from "@uidotdev/usehooks";

import { videos } from "../../data/videoData";
import "./page.scss";
import Link from "next/link";

export default function CreateBreak() {
  const initialValues = {
    time: {
      opened: true,
      value: "",
    },
    position: {
      opened: false,
      value: "",
    },
    video: {
      opened: false,
      value: "",
    },
  };
  const [formData, setFormData] = useState(initialValues);
  const [scope, animate] = useAnimate();
  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const values = {
    time: formData.time.value,
    position: formData.position.value,
    video: formData.video.value,
  };
  const urlParams = new URLSearchParams(values);
  const generatedLink = `https://letempsdun.cafe/${urlParams}`;
  console.log(generatedLink);

  const toggleSection = (sectionName: "time" | "position" | "video") =>
    setFormData((prev) => ({
      ...prev,
      [sectionName]: { ...prev[sectionName], opened: !prev[sectionName].opened },
    }));

  const updateTimeButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const { value } = event.currentTarget;

    setFormData({ ...formData, time: { ...formData.time, value } });
    animate(
      ".time p",
      { transform: ["scale(1)", "scale(1.5)", "scale(1)"] },
      { duration: 0.5 }
    );
    toggleSection("time");
    !formData.position.opened && toggleSection("position");
  };

  const updatePositionButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const { value } = event.currentTarget;

    setFormData({ ...formData, position: { ...formData.position, value } });
    animate(
      ".position p",
      { transform: ["scale(1)", "scale(1.5)", "scale(1)"] },
      { duration: 0.5 }
    );
    toggleSection("position");
    !formData.video.opened && toggleSection("video");
  };
  const updateVideoButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const { value } = event.currentTarget;

    setFormData({ ...formData, video: { ...formData.video, value } });
    animate(
      ".video p",
      { transform: ["scale(1)", "scale(1.5)", "scale(1)"] },
      { duration: 0.5 }
    );
    toggleSection("video");
    // !formData.video.opened && toggleSection("video");
  };

  const updateTimeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { value } = event.currentTarget;
    setFormData({ ...formData, time: { ...formData.time, value } });
  };

  const submitTimeInput = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    animate(
      "p",
      { transform: ["scale(1)", "scale(1.5)", "scale(1)"] },
      { duration: 0.5 }
    );
    toggleSection("time");
    !formData.position.opened && toggleSection("position");
  };

  return (
    <>
      <main>
        <header>
          <h1>C'est le temps d'un café !</h1>
          <p>Customize your break video by clicking the options below.</p>
        </header>
        <form ref={scope}>
          <section className="time">
            <div>
              <h1 onClick={() => toggleSection("time")}>How long will the break be?</h1>
              <p>
                {formData.time.value} {formData.time.value && "minutes"}
              </p>
            </div>
            <motion.div
              initial={false}
              animate={
                formData.time.opened
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.5 }}
            >
              <button value="10" onClick={updateTimeButton}>
                10 mins
              </button>
              <button value="15" onClick={updateTimeButton}>
                15 mins
              </button>
              <button value="20" onClick={updateTimeButton}>
                20 mins
              </button>
              <button value="30" onClick={updateTimeButton}>
                30 mins
              </button>
              <p>-- Or --</p>
              <input
                type="number"
                min={0}
                placeholder="Enter an amount of minutes"
                value={formData.time.value}
                onChange={updateTimeInput}
              />
              <button onClick={submitTimeInput}>Set</button>
            </motion.div>
          </section>
          <section className="position">
            <div>
              <h1 onClick={() => toggleSection("position")}>
                Where should the timer be?
              </h1>
              <p>{formData.position.value}</p>
            </div>
            <motion.div
              initial={false}
              animate={
                formData.position.opened
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.5 }}
            >
              <button value="top-left" onClick={updatePositionButton}>
                Top left
              </button>
              <button value="top-right" onClick={updatePositionButton}>
                Top right
              </button>
              <button value="bottom-left" onClick={updatePositionButton}>
                Bottom left
              </button>
              <button value="bottom-right" onClick={updatePositionButton}>
                Bottom right
              </button>
            </motion.div>
          </section>
          <section className="video">
            <div>
              <h1 onClick={() => toggleSection("video")}>Which video should it be?</h1>
              <p>{formData.video.value}</p>
            </div>
            <motion.div
              initial={false}
              animate={
                formData.video.opened
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.5 }}
            >
              {Object.values(videos).map((video) => (
                <button
                  key={video.id}
                  value={video.id}
                  style={{ backgroundImage: `url(${video.thumbnailUrl})` }}
                  onClick={updateVideoButton}
                ></button>
              ))}
            </motion.div>
          </section>
        </form>
        {formData.position.value && formData.time.value && formData.video.value && (
          <section className="link">
            <h1>Link is ready !</h1>
            <div>
              <input type="text" value={generatedLink} readOnly onChange={() => {}} />
              <button onClick={() => copyToClipboard(generatedLink)}>
                {copiedText ? "Cool!" : "Copy"}
              </button>
              <Link href={generatedLink} target="_blank">
                <button>Visit</button>
              </Link>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
