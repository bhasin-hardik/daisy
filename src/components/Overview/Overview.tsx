import React from 'react';
import { useMeasureContext } from '../Measure/measureContext';
import { useObstructionContext } from '../Obstruction/ObstructionContext'; // Import the custom hook
import { useApplianceContext } from '../Appliance/ApplianceContext';
import { useCabinetsContext } from '../Cabinets/CabinetsContext';
import { useLayoutContext } from '../Layout/LayoutContext';
import a from '../../assets/a.png';
import b from '../../assets/b.png';
import either from '../../assets/either.png';
import { useNavigate } from 'react-router-dom';
const Overview: React.FC = () => {
  const navigate = useNavigate();

  const { wallMeasurements } = useMeasureContext();
  // const { calculateWallsNeeded } = useLayoutContext();
  const wallsNeededFromStorage = JSON.parse(localStorage.getItem('wallsNeeded') || 'null');
  const numWalls = wallsNeededFromStorage;
  const { wallObstructionData } = useObstructionContext(); // Use the custom hook to access the context data
  const { wallApplianceData } = useApplianceContext();
  const { selectedImages } = useCabinetsContext();

  const outerBoxStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '1101px', // Adjust as needed for your design
    margin: '0 auto', // Center the content horizontally
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '100%',
    marginTop: '64px',
    padding: '0 20px', // Add responsive padding
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

  const headingStyle: React.CSSProperties = {
    // fontFamily: 'Actor',
    fontSize: '30px',
    fontWeight: 400,
    lineHeight: '36px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
  };

  const subheadingStyle: React.CSSProperties = {
    // fontFamily: 'Actor',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '26px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
    color: '#656362',
  };

  const wallDimensionsBoxStyle: React.CSSProperties = {
    width: '100%',

    height: '27px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',
    textAlign: 'center', // Center the text horizontally
  };
  const layoutBoxStyle: React.CSSProperties = {
    width: '295px',
    height: '58px',
    margin: '20px 0', // Add responsive margin
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  };


  const layoutTextStyle: React.CSSProperties = {

    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.02em',
    textAlign: 'left',
    margin: '8px', // Add margin for spacing
    opacity: 0.6,
  };
 

  const selectedImage: React.CSSProperties = {

    border: '1px solid #7F56D9',
    backgroundColor: '#000'
  };
  const unselectedImage: React.CSSProperties = {
    backgroundColor: '#fff',


  }



  const wallDimensionsTextStyle: React.CSSProperties = {
    // fontFamily: 'Actor',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.02em',
    textAlign: 'left',
  };

  
  const gridContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Two columns
    gridTemplateRows: 'auto auto', // Two rows
    gap: '20px', // Adjust the gap as needed
    maxWidth: '100%', // Adjust as needed for your design
    margin: '0 auto', // Center the content horizontally
    marginTop: '35px',
    padding: '0 20px', // Add responsive padding
  };
  const handelSubmit = () => {
    navigate('/nextPage');
  }
  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={outerBoxStyle}>
        {/* Inner Header Section */}
        <div style={innerBoxStyle}>
          <div style={{ maxWidth: '426px' }}>
            <p style={headingStyle}>Ryan’s Kitchen Overview:</p>
          </div>
          <div style={{ maxWidth: '449px', marginTop: '10px' }}>
            <p style={subheadingStyle}>Please review all of your information.</p>
          </div>
        </div>
      </div>


      <div style={wallDimensionsBoxStyle}>
        <p style={wallDimensionsTextStyle}>Wall Dimensions:</p>
      </div>

      <div style={gridContainerStyle}>

        <div style={{ ...layoutBoxStyle }}>
          <p style={layoutTextStyle}>Wall A:</p>
        </div>


        <div style={layoutBoxStyle}>
          <p style={layoutTextStyle}>Refrigerator Height: {wallMeasurements[0].height}</p>
        </div>
        <div></div>
        <div style={layoutBoxStyle}>
          <p style={layoutTextStyle}>Refrigerator Width: {wallMeasurements[0].length}</p>
        </div>


        <div style={layoutBoxStyle}>
          <p style={layoutTextStyle}>Wall B:</p>
        </div>
        <div style={layoutBoxStyle}>
          {numWalls === 1 ? (
            <p style={layoutTextStyle}>Refrigerator Height:</p>
          ) : (
            <p style={layoutTextStyle}>Refrigerator Height: {wallMeasurements[1].height}</p>
          )}
        </div>
        <div></div>
        <div style={layoutBoxStyle}>
          {numWalls === 1 ? (
            <p style={layoutTextStyle}>Refrigerator Length:</p>
          ) : (
            <p style={layoutTextStyle}>Refrigerator Length: {wallMeasurements[1].length}</p>
          )}
        </div>








      </div>
      <div style={wallDimensionsBoxStyle}>
        <p style={wallDimensionsTextStyle}>Obstructions:</p>
      </div>
      <div style={gridContainerStyle}>

        <div style={{ ...layoutBoxStyle }}>
          <p style={layoutTextStyle}>Door - Wall A:</p>
        </div>


        <div style={layoutBoxStyle}>
          {
            wallObstructionData[0].doorData.selected === true ? (
              <p style={layoutTextStyle}>Door Height: {wallObstructionData[0].doorData.height}</p>

            ) :
              <p style={layoutTextStyle}>Door Height: </p>
          }

        </div>
        <div></div>
        <div style={layoutBoxStyle}>
          {
            wallObstructionData[0].doorData.selected === true ? (
              <p style={layoutTextStyle}>Door Width: {wallObstructionData[0].doorData.width}</p>

            ) :
              <p style={layoutTextStyle}>Door Width: </p>
          }
        </div>
        <div></div>
        <div style={layoutBoxStyle}>
          {
            wallObstructionData[0].doorData.selected === true ? (
              <p style={layoutTextStyle}>Door Center: {wallObstructionData[0].doorData.center}</p>

            ) :
              <p style={layoutTextStyle}>Door Center: </p>
          }
        </div>


        <div style={layoutBoxStyle}>
          <p style={layoutTextStyle}>Window - Wall B:</p>
        </div>
        <div style={layoutBoxStyle}>
          {numWalls === 1 && wallObstructionData[1].doorData.selected === false ? (
            <p style={layoutTextStyle}>Door Height:</p>
          ) : (
            <p style={layoutTextStyle}>Door Height: {wallObstructionData[1].doorData.height}</p>
          )}
        </div>
        <div></div>
        <div style={layoutBoxStyle}>
          {numWalls === 1 && wallObstructionData[1].doorData.selected === false ? (
            <p style={layoutTextStyle}>Door Width:</p>
          ) : (
            <p style={layoutTextStyle}>Door Width: {wallObstructionData[1].doorData.width}</p>
          )}
        </div>
        <div></div>
        <div style={layoutBoxStyle}>
          {numWalls === 1 && wallObstructionData[1].doorData.selected === false ? (
            <p style={layoutTextStyle}>Door Center:</p>
          ) : (
            <p style={layoutTextStyle}>Door Center: {wallObstructionData[1].doorData.center}</p>
          )}
        </div>
      </div>
      <div style={wallDimensionsBoxStyle}>
        <p style={wallDimensionsTextStyle}>Appliances:</p>
      </div>
      <div style={gridContainerStyle}>

        <div style={{ ...layoutBoxStyle }}>
          <p style={layoutTextStyle}>Dishwasher - Wall A:</p>
        </div>


        <div style={layoutBoxStyle}>
          <p style={layoutTextStyle}>Dishwasher Width: {wallApplianceData[0].dishData.width}</p>
        </div>
        <div></div>
        <div style={layoutBoxStyle}>
          <p style={layoutTextStyle}>Dishwasher Center: {wallApplianceData[0].dishData.center}</p>
        </div>
        <div style={layoutBoxStyle}>
          <p style={layoutTextStyle}>Range - Wall B:</p>
        </div>
        <div style={layoutBoxStyle}>
          {numWalls === 1 && wallApplianceData[1].dishData.selected === false ? (
            <p style={layoutTextStyle}>Dishwasher Width:</p>
          ) : (
            <p style={layoutTextStyle}>Dishwasher Width: {wallApplianceData[1].dishData.width}</p>
          )}
        </div>
        <div></div>
        <div style={layoutBoxStyle}>
          {numWalls === 1 && wallApplianceData[1].dishData.selected === false ? (
            <p style={layoutTextStyle}>Dishwasher Center:</p>
          ) : (
            <p style={layoutTextStyle}>Dishwasher Center: {wallApplianceData[1].dishData.center}</p>
          )}
        </div>
      </div>
      <div style={wallDimensionsBoxStyle}>
        <p style={wallDimensionsTextStyle}>Speciality Cabinets:</p>
      </div>
      <div style={gridContainerStyle}>

        <div style={{ ...layoutBoxStyle }}>
          <p style={layoutTextStyle}>Pantry</p>
        </div>
        <div style={{ display: 'flex', width: '53px', height: '58px', margin: '20px 20px', gap: '40px' }}>

          <img src={a} alt="Image 1" style={{
            border: selectedImages['cabinet3'] === 'a' ? '1px solid #7F56D9' : 'none',

          }} />
          <img src={b} alt="Image 2" style={{
            border: selectedImages['cabinet3'] === 'b' ? '1px solid #7F56D9' : 'none',

          }} />
          <img src={either} alt="Image 4" style={{
            border: selectedImages['cabinet3'] === 'either' ? '1px solid #7F56D9' : 'none',

          }} />
        </div>



        <div style={layoutBoxStyle}>
          <p style={layoutTextStyle}>Spice Rack</p>
        </div>
        <div style={{ display: 'flex', width: '53px', height: '58px', margin: '20px 20px', gap: '40px' }}>
          <img src={a} alt="Image 1" style={{
            border: selectedImages['cabinet2'] === 'a' ? '1px solid #7F56D9' : 'none',

          }} />
          <img src={b} alt="Image 2"
            style={{
              border: selectedImages['cabinet2'] === 'b' ? '1px solid #7F56D9' : 'none',

            }} />
          <img src={either} alt="Image 4"
            style={{
              border: selectedImages['cabinet2'] === 'either' ? '1px solid #7F56D9' : 'none',

            }} />
        </div>
        <div style={layoutBoxStyle}>
          <p style={layoutTextStyle}>Trashbin pullout</p>
        </div>
        <div style={{ display: 'flex', width: '53px', height: '58px', margin: '20px 20px', gap: '40px' }}>
          <img src={a} alt="Image 1"
            style={{
              border: selectedImages['cabinet1'] === 'a' ? '1px solid #7F56D9' : 'none',

            }} />
          <img src={b} alt="Image 2" style={{
            border: selectedImages['cabinet1'] === 'b' ? '1px solid #7F56D9' : 'none',

          }} />
          <img src={either} alt="Image 4"
            style={{
              border: selectedImages['cabinet1'] === 'either' ? '1px solid #7F56D9' : 'none',


            }} />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={handelSubmit}
          className="w-80 h-12 mt-2 rounded-md text-white"
          style={{ background: '#7F56D9', marginBottom: '100px' }}
        >
          Submit Details
        </button>
      </div>


    </div>

  );
};

export default Overview;

















