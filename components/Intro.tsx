import Image from 'next/image';
import React from 'react';
import '@styles/intro.css';

export default function Intro() {
  return (
    <div className="intro-container">
      <h1 className="intro-title">About Me</h1>
      <div className="intro-content">
        <div className="intro-image">
          <Image src="/imgs/photo-2.png" alt="My Image" width={300} height={300} />
        </div>
        <div className="intro-description">
          <h3>Description</h3>
        </div>
      </div>
    </div>
  );
}
