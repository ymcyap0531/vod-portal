import React, { useState } from "react";
import Link from "next/link";

export interface CategoryProps {
  handleChange: (e: any) => void;
  catParam: string | undefined;
  styles: any;
}
const Category = ({ handleChange, catParam, styles }: CategoryProps) => {
  const btnStyle = `${styles.category_butn} mx-0.5`;

  return (
    <div className={styles.portal}>
      <select
        className="selectCategory sm:hidden text-black"
        onChange={handleChange}
      >
        <option value="All">All</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Horror">Horror</option>
        <option value="Thriller">Thriller</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Western">Western</option>
        <option value="Romance">Romance</option>
        <option value="Crime">Crime</option>
      </select>
      <div className="flex justify-between items-center hidden sm:block">
        <span>
          <Link href="/Portal?page=1">
            <a
              className={`${btnStyle} ${
                typeof catParam === "undefined"
                  ? `${styles.category_active}`
                  : ""
              }`}
            >
              <span>All</span>
            </a>
          </Link>
        </span>

        <span>
          <Link href="/Portal/?category=Action&page=1">
            <a
              className={`${btnStyle} ${
                catParam?.toUpperCase() === "ACTION"
                  ? `${styles.category_active}`
                  : ""
              }`}
            >
              <span>Action</span>
            </a>
          </Link>
        </span>

        <span>
          <Link href="/Portal/?category=Comedy&page=1">
            <a
              className={`${btnStyle} ${
                catParam?.toUpperCase() === "COMEDY"
                  ? `${styles.category_active}`
                  : ""
              }`}
            >
              <span>Comedy</span>
            </a>
          </Link>
        </span>

        <span>
          <Link href="/Portal/?category=Drama&page=1">
            <a
              className={`${btnStyle} ${
                catParam?.toUpperCase() === "DRAMA"
                  ? `${styles.category_active}`
                  : ""
              }`}
            >
              <span>Drama</span>
            </a>
          </Link>
        </span>

        <span>
          <Link href="/Portal/?category=Horror&page=1">
            <a
              className={`${btnStyle} ${
                catParam?.toUpperCase() === "HORROR"
                  ? `${styles.category_active}`
                  : ""
              }`}
            >
              <span>Horror</span>
            </a>
          </Link>
        </span>

        <span>
          <Link href="/Portal/?category=Thriller&page=1">
            <a
              className={`${btnStyle} ${
                catParam?.toUpperCase() === "THRILLER"
                  ? `${styles.category_active}`
                  : ""
              }`}
            >
              <span>Thriller</span>
            </a>
          </Link>
        </span>

        <span>
          <Link href="/Portal/?category=Sci-Fi&page=1">
            <a
              className={`${btnStyle} ${
                catParam?.toUpperCase() === "SCI-FI"
                  ? `${styles.category_active}`
                  : ""
              }`}
            >
              <span>Sci-Fi</span>
            </a>
          </Link>
        </span>

        <span>
          <Link href="/Portal/?category=Western&page=1">
            <a
              className={`${btnStyle} ${
                catParam?.toUpperCase() === "WESTERN"
                  ? `${styles.category_active}`
                  : ""
              }`}
            >
              <span>Western</span>
            </a>
          </Link>
        </span>

        <span>
          <Link href="/Portal/?category=Romance&page=1">
            <a
              className={`${btnStyle} ${
                catParam?.toUpperCase() === "ROMANCE"
                  ? `${styles.category_active}`
                  : ""
              }`}
            >
              <span>Romance</span>
            </a>
          </Link>
        </span>
        <span>
          <Link href="/Portal/?category=Crime&page=1">
            <a
              className={`${btnStyle} ${
                catParam?.toUpperCase() === "CRIME"
                  ? `${styles.category_active}`
                  : ""
              }`}
            >
              <span>Crime</span>
            </a>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Category;
