import React from "react";
import Image from "next/image";

export interface MyAccountProps {
  title: string;
  poster_url: string;
  className: any;
}

const MovieCard: React.FC<MyAccountProps> = ({
  title,
  poster_url,
  className,
}) => {
  return (
    <div>
      <div className="col moviecolumn action">
        <div className="moviecover -mb-2">
          <Image
            height={410}
            width={300}
            // src={`process.env.NEXT_PUBLIC_CONTENT_MOVIE_URL/${poster_url}`}
            src={`${process.env.NEXT_PUBLIC_CONTENT_IMAGE_URL}poster-image-files/${poster_url}`}
            alt={title}
          />
        </div>
        <div className={className}>{title}</div>
      </div>
    </div>
  );
};

export default MovieCard;
