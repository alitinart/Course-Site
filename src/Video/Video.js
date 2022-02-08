import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Video() {
  const [Video, setVideo] = useState();
  const [Course, setCourse] = useState();
  const { id, videoIndex } = useParams();

  useEffect(async () => {
    await axios.get(`http://localhost:8000/course/${id}`).then((course) => {
      setVideo({ ...course.data.videos[videoIndex] });
      setCourse({ ...course.data });
    });
    return () => {};
  }, []);

  return (
    <div className="video-page pt-20 mt-10">
      {Video && Course ? (
        <div className="video-content">
          <iframe
            src={Video.link}
            width="100%"
            height="840px"
            className="rounded-md"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <h1 className="font-bold text-5xl text-center mt-10 mb-5">
            {Video.title}
          </h1>
          <p className="font-bold text-3xl text-center">{Video.desc}</p>
          <div className="playlist inline-block">
            <h1 className="font-bold text-4xl mt-5 mb-5">Playlist</h1>
            <ul className="playlist-list">
              {Course.videos.map((video, index) => {
                if (index === +videoIndex) {
                  return (
                    <li className="video-item active-video">
                      <p>{video.title}</p>
                      <p>{video.desc}</p>
                    </li>
                  );
                } else {
                  return (
                    <li className="video-item">
                      <p>{video.title}</p>
                      <p>{video.desc}</p>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
