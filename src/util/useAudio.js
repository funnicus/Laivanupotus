import { useEffect, useState } from "react";

export const useSfx = ({ url, volume }) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audio.volume = volume ?? 0.05;
  }, []);

  useEffect(() => {
    if (playing) audio.play();
    if (!playing) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [playing]);

  // update status of playing
  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [playing]);

  const play = () => setPlaying(true);
  const stop = () => setPlaying(false);
  return [play, stop];
};
