import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Projects() {
  // Sample data for projects
  const projects = [
    {
      name: 'Project 1',
      description: 'Description for Project 1',
      images: [
        'imgs/projects/aidiscord-bot/aibot-ai.png',
        // Add more image URLs here
      ],
    },
    {
      name: 'Project 2',
      description: 'Description for Project 2',
      images: [
        'imgs/projects/knight-run/knight-run-demo1.png',
        
        // Add more image URLs here
      ],
    },
    // Add more projects here
  ];

  // Slick settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {projects.map((project, index) => (
          <div key={index}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <div>
              {project.images.map((image, imgIndex) => (
                <img key={imgIndex} src={image} alt={`Image ${imgIndex + 1}`} />
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
