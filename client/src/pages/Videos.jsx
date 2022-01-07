import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCreateVideo from "../components/ModalCreateVideo";
import { getAllVideos } from "../redux/actions/videos";
import Media from "../components/Media";

export default function Videos() {
  const dispatch = useDispatch();
  const [callback, setCallback] = useState(false);
  // const [callback, setCallback] = useState(false);

  const { allVideos } = useSelector((state) => state.videos);
  // const { loading } = useSelector((state) => state.videos);
  // if (loading) {
  //   return <div>Loading...!</div>;
  // }

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch, callback]);

  console.log(allVideos);
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mt-3 mb-5">Page videos</h5>

        <div>
          <ModalCreateVideo setCallback={setCallback} callback={callback} />
        </div>
      </div>

      <div className="row">
        {allVideos.length > 0
          ? allVideos.map((media, i) => (
              <div key={i} className="col-4 p-3">
                <Media media={media} />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
