'use client';

import { useState } from "react";
import Image from "next/image";
import "./Gallery.css";
import { galleryData } from "./GalleryData";
import ItalicTitle from "@/components/reusables/ItalicTitle";
import SectionHeading from "@/components/reusables/SectionHeading";


const filters = [
  "All",
  "Reunion",
  "Weddings",
  "Birthdays",
  "Charity",
  "School Projects",
  "Visitations",
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredGalleryData =
    activeFilter === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === activeFilter);

  return (
    <section className="gallery-section bg-[#e3f4ff] px-4 lg:px-[5rem] xl:px-[13rem] py-[3rem]">
      <div className="gallery-container">
              {/* <span className="gallery-label">GALLERY</span> */}
        <SectionHeading title="GALLERY" className="text-[15px] mb-[18px] !text-[#1260ad]"/>

        <h2 className="gallery-title">
          <ItalicTitle title="Memories" colorClass="text-[#f8a44a]"/>
          <span className="gallery-title-white"> in Frame</span>
        </h2>

        <p className="gallery-description text-sm">
          Reunion photos, weddings, birthdays, charity events, school
          projects and visitations.
        </p>

        <div className="gallery-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn px-4 py-1 ${activeFilter === filter ? "active" : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredGalleryData.map((item) => (
            <div key={item.id} className="gallery-card">
              <Image src={item.image} alt={item.category} width={300} height={200} loading="eager"/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
