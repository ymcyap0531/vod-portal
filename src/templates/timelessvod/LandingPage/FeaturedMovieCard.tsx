import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { Movie } from "../../../types";

export interface FeaturedMovieCardProps {
  title: string;
  year?: number;
  duration?: string;
  description?: string;
  poster_url: string;
}

const FeaturedMovieCard: React.FC<FeaturedMovieCardProps> = (props) => {
  return (
    <div className="col moviecolumn drama">
      <div className="moviecover">
        <Image
          height={410}
          width={300}
          src={`${process.env.NEXT_PUBLIC_CONTENT_IMAGE_URL}poster-image-files/${props.poster_url}`}
          alt={props.title}
        />
      </div>
      <div className="movietitle -mt-2">{props.title}</div>
      {/* <div className="movietitle-year">
        {props.year}
        <span className="text-white">
          <FontAwesomeIcon icon={faClock} />
          &nbsp;{props.duration}
        </span>
      </div>
      <div className="moviestory">{props.description}</div> */}
    </div>
  );
};

export default FeaturedMovieCard;
