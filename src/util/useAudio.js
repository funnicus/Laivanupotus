import { useEffect, useState } from "react";

/**
 * Custom React hook to play sound effects in a component.
 * Returns two functions to start and stop playback of the audio clip.
 * @param {object} opts { url, volume, resetOnPlay }
 * url (string): path to audio file,
 * volume (number): between 0 and 1
 * @returns {[play, stop]} [play, stop]
 */
export const useSfx = ({ url, volume }) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audio.volume = volume ?? 0.075; // default to 7.5% volume
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
