'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import "./Gallery.css";
import ItalicTitle from "@/components/reusables/ItalicTitle";
import SectionHeading from "@/components/reusables/SectionHeading";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchGallery } from "@/redux/features/gallery/gallerySlice";

const filters = [
  "All",
  "Reunion",
  "Weddings",
  "Birthdays",
  "Charity drives",
  "School Projects",
  "Visitations",
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const dispatch = useAppDispatch();
  const { gallery, loading } = useAppSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  const filteredGalleryData =
    activeFilter === "All"
      ? gallery
      : gallery.filter((item) => item.category === activeFilter);
  
  // Helper to get full image URL
  const getImageUrl = (path: string) => {
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    return `${baseUrl}${path}`;
  };

  return (
    <section className="gallery-section bg-[#e3f4ff] px-4 lg:px-[5rem] xl:px-[13rem] py-[3rem]">
      <div className="gallery-container">
        <SectionHeading title="GALLERY" className="text-xs md:text-[18px] mb-[8px] !text-[#1260ad]"/>

        <h2 className="gallery-title text-[2rem] sm:text-[3.25rem]">
          <ItalicTitle title="Memories" colorClass="text-[#f8a44a] text-[2rem] sm:text-[3.25rem]"/>
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
          {loading && filteredGalleryData.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">Loading gallery...</div>
          ) : filteredGalleryData.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">No gallery items found.</div>
          ) : (
            filteredGalleryData.map((item) => (
              <div key={item._id} className="gallery-card">
                <Image
                  src={getImageUrl(item.image)}
                  alt={item.category}
                  width={300}
                  height={200}
                  loading="lazy"
                  unoptimized
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
