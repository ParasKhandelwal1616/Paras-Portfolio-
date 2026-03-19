'use client'
import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px', position: 'relative' }}>
      <Spline
        scene="https://prod.spline.design/AMky1TygRJ1mN1Ez/scene.splinecode"
        style={{
          width: '90%',
          height: '90%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}