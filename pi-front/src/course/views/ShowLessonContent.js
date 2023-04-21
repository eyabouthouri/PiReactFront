import React from "react";

function ShowLessonContent({ lesson , width=250, height=250}) {
  const lien = new URLSearchParams(lesson.content?.split("?")[1]);
  const videoId = lien?.get("v");

  return (
    <>
      {lesson.type === "image" && <img src={lesson.content}  width={width} height={height} />}
      {lesson.type === "text" && lesson.content}
      {lesson.type === "youtube" && <iframe width={width} height={height} src={"https://www.youtube.com/embed/" + videoId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>}
      {lesson.type === "video" && <video controls width={width} src={lesson.content} />}
    </>
  );
}

export default ShowLessonContent;
