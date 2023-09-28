import React from 'react';
import { useMeasureContext } from '../Measure/measureContext';
import { useObstructionContext } from '../Obstruction/ObstructionContext'; // Import the custom hook
import { useApplianceContext } from '../Appliance/ApplianceContext';
import { useCabinetsContext } from '../Cabinets/CabinetsContext';
import wallA from '../../assets/wallA.png'
import wallB from '../../assets/wallB.png'
const Overview: React.FC = () => {
  const { wallMeasurements } = useMeasureContext();
  const { wallObstructionData } = useObstructionContext(); // Use the custom hook to access the context data
  const { wallApplianceData } = useApplianceContext();
  const { selectedImages } = useCabinetsContext();
  const outerBoxStyle: React.CSSProperties = {
    width: '100%',
    // maxWidth: '1101px',
    height: '200px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };
  const imagesContainerStyle: React.CSSProperties = {
    width: '100%',
    // maxWidth: '449px',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    
    alignItems: 'center',
    left:'30px',
    marginTop: '100px', // Adjust the spacing between the "Wall Dimensions" box and the images
  };

  const innerBoxStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '449px',
    height: '62px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const imagesPairStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px', // Adjust the spacing between image pairs
  };
  const headingStyle: React.CSSProperties = {
    fontFamily: 'Actor',
    fontSize: '30px',
    fontWeight: 400,
    lineHeight: '36px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
  };

  const subheadingStyle: React.CSSProperties = {
    fontFamily: 'Actor',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '26px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
    color: '#656362',
  };

  const wallDimensionsBoxStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '120px',
    height: '27px',

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const wallDimensionsTextStyle: React.CSSProperties = {
    fontFamily: 'Actor',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.02em',
    textAlign: 'left',
  };

  // const wallMeasurementsContainerStyle: React.CSSProperties = {
  //   marginTop: '20px', // Adjust the spacing between the "Wall Dimensions" box and the measurements list
  // };
  return (
    <div>
      {/* Header Section */}
      <div style={outerBoxStyle}>
        {/* Inner Header Section */}
        <div style={innerBoxStyle}>
          <div style={{ width: '100%', maxWidth: '426px' }}>
            <p style={headingStyle}>Ryan’s Kitchen Overview:</p>
          </div>
          <div style={{ width: '100%', maxWidth: '449px' }}>
            <p style={subheadingStyle}>Please review all of your information.</p>
          </div>
        </div>
      </div>

      {/* Wall Dimensions Section */}
      <div style={wallDimensionsBoxStyle}>
        <p style={wallDimensionsTextStyle}>Wall Dimensions:</p>
      </div>
      <div style={imagesContainerStyle}>
        {/* Render your images here */}
        <img
            
            src={wallA}
            alt={`wallA`}
            style={{ maxWidth: '100%', marginBottom: '10px' }}
          />
          <img
            
            src={wallB}
            alt={`wallB`}
            style={{ maxWidth: '100%', marginBottom: '10px' }}
          />
      </div>
      
    </div>
  );
};

export default Overview;





// how to use contexts -->
/*
<ul>
        {wallMeasurements.map((measurement, index) => (
          <li key={index}>
            Wall {String.fromCharCode(65 + index)} - Length: {measurement.length}, Height: {measurement.height}
          </li>
        ))}
      </ul>

      
      {wallObstructionData.map((wallData, index) => (
        <div key={index}>
          <h2>Wall {String.fromCharCode(65 + index)} Obstruction Data:</h2>
          <p>Door Selected: {wallData.doorData.selected ? 'Yes' : 'No'}</p>
          <p>Window Selected: {wallData.windowData.selected ? 'Yes' : 'No'}</p>
          <p>Beam Selected: {wallData.beamData.selected ? 'Yes' : 'No'}</p>
          <p>Other Selected: {wallData.otherData.selected ? 'Yes' : 'No'}</p>
          {/* Add more details here as needed 
        </div>
      ))}

      
      {wallApplianceData.map((wallData, index) => (
        <div key={index}>
          <h2>Wall {String.fromCharCode(65 + index)} Appliance Data:</h2>
          <p>Refrigerator Selected: {wallData.refrigeratorData.selected ? 'Yes' : 'No'}</p>
          <p>Sink Selected: {wallData.sinkData.selected ? 'Yes' : 'No'}</p>
          <p>Range Selected: {wallData.rangeData.selected ? 'Yes' : 'No'}</p>
          <p>Dish Selected: {wallData.dishData.selected ? 'Yes' : 'No'}</p>
          <p>{wallData.refrigeratorData.height}</p>
          {/* Add more details here as needed 
        </div>
      ))}

     
      <div>
        <p>Cabinet 1: {selectedImages.cabinet1}</p>
        <p>Cabinet 2: {selectedImages.cabinet2}</p>
        <p>Cabinet 3: {selectedImages.cabinet3}</p>
        <p>Cabinet 4: {selectedImages.cabinet4}</p>
      </div>
    </div> */
  
;












