import React from "react";

export default function Media({ media }) {
  //`http://localhost:5000${media.video[0]}
  console.log(media);

  return (
    <div className="text-center">
      {media && (
        <video preload="auto" width="400" height="300" controls>
          <source src={`http://localhost:5000${media.videos[0]}`} />
        </video>
      )}

      <h6 className="text-center">{media.name}</h6>
      <p>{media.description}</p>
    </div>
  );
}
