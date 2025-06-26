'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';

function Model({ spotlight }) {
  const ref = useRef();
  const { scene } = useGLTF('/my_computer.glb'); // Ensure this file is in /public



  return (
    <>
      <primitive ref={ref} object={scene} position={[-2.5, 1, 7]}  rotation={[0,Math.PI,0]} />
      {spotlight && (
        <spotLight position={[0, 5, 5]} angle={0.3} penumbra={0.5} intensity={5} color="green" />
      )}
    </>
  );
}

export default function HomePage() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showLight, setShowLight] = useState(false);
  const textRef = useRef();
  const contactRef = useRef();

  const handleVisitClick = () => {
    setShowLight(true);
    gsap.fromTo(
      textRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  };

  useEffect(() => {
    gsap.fromTo(
      contactRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', background: 'black', color: 'white', overflowX: 'hidden' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem',
        background: 'black', color: 'white', position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Suraj</div>
        <div style={{
          display: isNavOpen ? 'flex' : 'none',
          flexDirection: 'column',
          position: 'absolute',
          top: '3.5rem',
          right: 0,
          background: 'black',
          padding: '1rem',
          gap: '0.5rem',
          zIndex: 99
        }}>
          <a href="#hero" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
        </div>
        <div
          onClick={() => setIsNavOpen(!isNavOpen)}
          style={{ cursor: 'pointer', fontSize: '1.5rem' }}
        >
          ☰
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" style={{ height: '100vh', width: '100%', position: 'relative' }}>
        <Canvas camera={{ position: [0, 2, 5] }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={10} />
          <directionalLight position={[-5, 5, -5]} intensity={10} />
          <Model spotlight={showLight} />
          <OrbitControls />
        </Canvas>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '10%',
          zIndex: 10
        }}>
          <h1 ref={textRef} style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Hi, my name is Suraj
          </h1>
          <button
            onClick={handleVisitClick}
            style={{
              padding: '0.8rem 1.5rem',
              background: 'green',
              color: 'white',
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Visit Me
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        style={{
          background: '#111',
          color: 'white',
          padding: '3rem 2rem',
          textAlign: 'center'
        }}
      >
        <h2>Contact Us</h2>
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '400px',
          margin: 'auto',
          gap: '1rem'
        }}>
          <input type="text" placeholder="Your Name" required style={{
            padding: '0.8rem', border: 'none', borderRadius: '4px'
          }} />
          <input type="email" placeholder="Email Address" required style={{
            padding: '0.8rem', border: 'none', borderRadius: '4px'
          }} />
          <textarea placeholder="Your Message" rows="4" required style={{
            padding: '0.8rem', border: 'none', borderRadius: '4px'
          }} />
          <button type="submit" style={{
            padding: '0.8rem',
            background: 'green',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}>Send</button>
        </form>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '1rem',
        background: '#000',
        color: '#fff'
      }}>
        &copy; {new Date().getFullYear()} Suraj. All rights reserved.
      </footer>
    </div>
  );
}
