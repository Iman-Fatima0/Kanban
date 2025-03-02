import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <svg height={0} width={0} viewBox="0 0 64 64" className="absolute">
          <defs xmlns="http://www.w3.org/2000/svg">
          <linearGradient gradientUnits="userSpaceOnUse" y2={2} x2={0} y1={62} x1={0} id="b">
  <stop stopColor="#FF0000" /> 
  <stop stopColor="#B22222" offset={1} /> 
</linearGradient>

<linearGradient gradientUnits="userSpaceOnUse" y2={0} x2={0} y1={64} x1={0} id="c">
  <stop stopColor="#DC143C" />
  <stop stopColor="#8B0000" offset={1} /> 
</linearGradient>

<linearGradient gradientUnits="userSpaceOnUse" y2={2} x2={0} y1={62} x1={0} id="d">
  <stop stopColor="#FF4500" /> 
  <stop stopColor="#A52A2A" offset={1} /> 
</linearGradient>

          </defs>
        </svg>

        {['K', 'A', 'N', 'B', 'A', 'N'].map((letter, index) => (
          <svg key={index} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64} className="inline-block">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={8} stroke={`url(#${index % 2 === 0 ? 'b' : 'd'})`} 
              d={getLetterPath(letter)} className="dash" pathLength={360} />
          </svg>
        ))}
      </div>
    </StyledWrapper>
  );
}

const getLetterPath = (letter) => {
  const paths = {
'K': "M 10,60 L 10,10 M 10,35 L 40,10 M 10,35 L 40,60",
    'A': "M 10,60 L 30,10 L 50,60 M 20,40 L 40,40",
    'N': "M 10,60 L 10,10 L 50,60 L 50,10",
    'B': "M 10,60 L 10,10 L 40,10 C 50,10 50,30 40,30 C 50,30 50,50 40,50 L 10,50",
  };
  return paths[letter] || "";
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color:oklch(0.268 0.007 34.298); 

  .absolute {
    position: absolute;
  }
  .inline-block {
    display: inline-block;
  }
  .loader {
    display: flex;
    gap: 12px;
  }
  .dash {
    animation: dashArray 2s ease-in-out infinite, dashOffset 2s linear infinite;
  }
  @keyframes dashArray {
    0% { stroke-dasharray: 0 1 359 0; }
    50% { stroke-dasharray: 0 359 1 0; }
    100% { stroke-dasharray: 359 1 0 0; }
  }
  @keyframes dashOffset {
    0% { stroke-dashoffset: 365; }
    100% { stroke-dashoffset: 5; }
  }
`;

export default Loader;
