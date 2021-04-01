import { useEffect, useState } from "react";

export const useSfx = ({ url, volume, resetOnPlay }) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audio.volume = volume ?? 0.05;
  }, []);

  useEffect(() => {
    if (resetOnPlay) audio.currentTime = 0;
    if (playing) audio.play();
    if (!playing) audio.pause();
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
