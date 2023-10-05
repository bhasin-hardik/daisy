import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cab1 from '../../assets/cab1.png';
import cab2 from '../../assets/cab2.png';
import cab3 from '../../assets/cab3.png';
import cab4 from '../../assets/cab4.png';


import { useCabinetsContext } from './CabinetsContext';

const Cabinets: React.FC = () => {
  const imageSpacing = 10; // Adjust this value as needed
  const navigate = useNavigate();
  const { selectedImages, toggleSelection } = useCabinetsContext();

  // Function to toggle the selection status of an image for a specific cabinet
  const toggleSelectionForCabinet = (cabinet: string, image: string) => {
    toggleSelection(cabinet, image);
  };

  // Function to handle image selection for a specific cabinet
  // Function to handle image selection for a specific cabinet
  const handleImageSelection = (cabinet: string, image: string) => {
    const currentSelection = selectedImages[cabinet];
  
    // If the current selection is the same as the clicked image, deselect it
    if (currentSelection === image) {
      toggleSelectionForCabinet(cabinet, ''); // Deselect the image
      localStorage.removeItem(cabinet);
    } else {
      toggleSelectionForCabinet(cabinet, image); // Select the image
      localStorage.setItem(cabinet, image);
    }
  };
  
  useEffect(() => {
    cabinets.forEach((cabinet) => {
      const selectedImage = localStorage.getItem(cabinet.name);
      if (selectedImage) {
        toggleSelectionForCabinet(cabinet.name, selectedImage);
      }
    });
  }, []);

  // Function to get the CSS class for selected or deselected images
  const getImageClass = (isSelected: boolean) => {
    return isSelected ? 'selectedImage' : 'deselectedImage';
  };

  const handleSubmit = () => {
    navigate('/overview');
  }

  // Define your cabinet and image data
  const cabinets = [
    { name: 'cabinet1', image: cab1 },
    { name: 'cabinet2', image: cab2 },
    { name: 'cabinet3', image: cab3 },
    { name: 'cabinet4', image: cab4 },
  ];


  const images = [
    { name: 'a', label: 'Image A' },
    { name: 'b', label: 'Image B' },
    { name: 'either', label: 'Either' },
  ];
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
 
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg" style={{ height: '90px', marginTop: '180px', marginLeft: '169px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '28px' }}>
        <div style={{width:'100%', maxWidth: '449px', height: '88px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width:'100%',maxWidth: '449px', height: '52px', background: 'none', fontFamily: 'Actor', fontSize: '30px', fontWeight: 400, lineHeight: '36px', letterSpacing: '-0.02em', textAlign: 'center' }}>Specialty Cabinets:</div>
          <div style={{marginTop: '20px',width:'100%', maxWidth: '426px', height: '36px', background: 'none', fontFamily: 'Actor', fontSize: '18px', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.02em', textAlign: 'center', color: '#656362' }}>Please select any specialty cabinets you would like to add to your kitchen.</div>
        </div>

        <div style={{width:'100%', maxWidth: '137px', height: '21px', marginTop: '70px', top: '365px', left: '475px', fontFamily: 'Actor', fontSize: '16px', fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.02em', textAlign: 'center', position: 'absolute' }}>Specialty Cabinet</div>
        <div style={{ width:'100%',maxWidth: '105px', height: '21px', marginTop: '70px', top: '365px', left: '871px', fontFamily: 'Actor', fontSize: '16px', fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.02em', textAlign: 'center', position: 'absolute' }}>Wall preference</div>
        
        {cabinets.map((cabinet, index) => (
          <React.Fragment key={cabinet.name}>
            
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: `${490 + 80 * index}px`, left: '830px', gap: '40px' }}>
              {images.map((image) => (
                <div key={image.name} style={{ position: 'relative' }}>
                  <input
                    type="checkbox"
                    name={`cabinet_${cabinet.name}`}
                    id={`radio_${cabinet.name}_${image.name}`}
                    checked={selectedImages[cabinet.name] === image.name}
                    onChange={() => handleImageSelection(cabinet.name, image.name)}
                    style={{ display: 'none' }} // Hide the radio button
                  />
                  <label
                    htmlFor={`radio_${cabinet.name}_${image.name}`}
                    className={getImageClass(selectedImages[cabinet.name] === image.name)}
                  >
                    {image.name === 'a' && (
                      <svg width="53" height="58" viewBox="0 0 53 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Add the SVG path for your image */}
                        <path
                          d="M0 7C0 3.13401 3.13401 0 7 0H46C49.866 0 53 3.13401 53 7V51C53 54.866 49.866 58 46 58H7C3.13401 58 0 54.866 0 51V7Z"
                          fill={selectedImages[cabinet.name] === image.name ? '#84FFAE75' : "#F9FAFB"} // Change the fill color when selected
                        />
                        <path opacity="0.6" d="M23.7722 22.5986H25.4362L29.1802 33.5106H27.7882L26.8282 30.5986H22.3962L21.4202 33.5106H20.0282L23.7722 22.5986ZM26.3962 29.3186L24.6362 23.8786H24.5882L22.8122 29.3186H26.3962Z" fill="#0E180A" />
                      </svg>
                    )}
                    {image.name === 'b' && (
                      <svg width="53" height="58" viewBox="0 0 53 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Add the SVG path for your image */}
                        <path
                          d="M0 7C0 3.13401 3.13401 0 7 0H46C49.866 0 53 3.13401 53 7V51C53 54.866 49.866 58 46 58H7C3.13401 58 0 54.866 0 51V7Z"
                          fill={selectedImages[cabinet.name] === image.name ? '#84FFAE75' : "#F9FAFB"} // Change the fill color when selected

                        />
                        <path opacity="0.6" d="M21.4132 22.5987H24.3252C25.4772 22.5987 26.3092 22.8121 26.8212 23.2387C27.3439 23.6654 27.6052 24.3161 27.6052 25.1907C27.6052 25.5961 27.5465 25.9481 27.4292 26.2467C27.3225 26.5454 27.1999 26.7961 27.0612 26.9987C26.9012 27.2334 26.7252 27.4361 26.5332 27.6067C26.7892 27.7027 27.0292 27.8254 27.2532 27.9747C27.4772 28.1241 27.6745 28.3054 27.8452 28.5187C28.0159 28.7321 28.1492 28.9881 28.2452 29.2867C28.3519 29.5747 28.4052 29.9161 28.4052 30.3107C28.4052 30.7481 28.3465 31.1641 28.2292 31.5587C28.1119 31.9427 27.9145 32.2787 27.6372 32.5667C27.3599 32.8547 26.9919 33.0841 26.5332 33.2547C26.0745 33.4254 25.5039 33.5107 24.8212 33.5107H21.4132V22.5987ZM22.7572 27.3347H25.4292C25.5785 27.2174 25.7119 27.0627 25.8292 26.8707C25.9359 26.7107 26.0319 26.5134 26.1172 26.2787C26.2025 26.0334 26.2452 25.7401 26.2452 25.3987C26.2452 24.7694 26.0799 24.3481 25.7492 24.1347C25.4292 23.9107 24.9759 23.7987 24.3892 23.7987H22.7572V27.3347ZM22.7572 32.3107H24.9332C25.6372 32.3107 26.1652 32.1294 26.5172 31.7667C26.8692 31.4041 27.0452 30.9187 27.0452 30.3107C27.0452 30.0441 27.0079 29.7987 26.9332 29.5747C26.8692 29.3507 26.7519 29.1587 26.5812 28.9987C26.4105 28.8281 26.1812 28.6947 25.8932 28.5987C25.6052 28.5027 25.2479 28.4547 24.8212 28.4547H22.7572V32.3107Z" fill="#0E180A" />
                      </svg>
                    )}
                    {image.name === 'either' && (
                      <svg width="53" height="58" viewBox="0 0 53 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Add the SVG path for your image */}
                        <path
                          d="M0 7C0 3.13401 3.13401 0 7 0H46C49.866 0 53 3.13401 53 7V51C53 54.866 49.866 58 46 58H7C3.13401 58 0 54.866 0 51V7Z" fill={selectedImages[cabinet.name] === image.name ? '#84FFAE75' : "#F9FAFB"} />
                        <path opacity="0.6" d="M8.37987 23.088H15.0679V24.32H9.72387V27.808H14.6839V29.008H9.72387V32.768H15.2279V34H8.37987V23.088ZM16.8351 25.936L18.1151 25.792V34H16.8351V25.936ZM16.6271 23.648C16.6271 23.4027 16.7071 23.2 16.8671 23.04C17.0378 22.8693 17.2458 22.784 17.4911 22.784C17.7471 22.784 17.9605 22.8693 18.1311 23.04C18.3125 23.2 18.4031 23.4027 18.4031 23.648C18.4031 23.8933 18.3125 24.1013 18.1311 24.272C17.9605 24.432 17.7471 24.512 17.4911 24.512C17.2458 24.512 17.0378 24.432 16.8671 24.272C16.7071 24.1013 16.6271 23.8933 16.6271 23.648ZM21.9653 23.552V25.952H24.2853V26.992H21.9653V31.264C21.9653 31.616 21.9706 31.9093 21.9813 32.144C22.0026 32.3787 22.0399 32.5653 22.0933 32.704C22.1466 32.8427 22.2212 32.944 22.3173 33.008C22.4133 33.0613 22.5359 33.088 22.6853 33.088C23.0906 33.0773 23.5599 32.928 24.0933 32.64L24.4773 33.616C24.1253 33.8507 23.7946 34.0053 23.4852 34.08C23.1866 34.1653 22.8879 34.208 22.5893 34.208C21.8852 34.208 21.3892 34.0107 21.1012 33.616C20.8239 33.2107 20.6852 32.544 20.685"
                          fill={selectedImages[cabinet.name] === image.name ? '#84FFAE75' : "#F9FAFB"} // Change the fill color when selected

                        />
                        <path opacity="0.6" d="M8.37987 23.088H15.0679V24.32H9.72387V27.808H14.6839V29.008H9.72387V32.768H15.2279V34H8.37987V23.088ZM16.8351 25.936L18.1151 25.792V34H16.8351V25.936ZM16.6271 23.648C16.6271 23.4027 16.7071 23.2 16.8671 23.04C17.0378 22.8693 17.2458 22.784 17.4911 22.784C17.7471 22.784 17.9605 22.8693 18.1311 23.04C18.3125 23.2 18.4031 23.4027 18.4031 23.648C18.4031 23.8933 18.3125 24.1013 18.1311 24.272C17.9605 24.432 17.7471 24.512 17.4911 24.512C17.2458 24.512 17.0378 24.432 16.8671 24.272C16.7071 24.1013 16.6271 23.8933 16.6271 23.648ZM21.9653 23.552V25.952H24.2853V26.992H21.9653V31.264C21.9653 31.616 21.9706 31.9093 21.9813 32.144C22.0026 32.3787 22.0399 32.5653 22.0933 32.704C22.1466 32.8427 22.2212 32.944 22.3173 33.008C22.4133 33.0613 22.5359 33.088 22.6853 33.088C23.0906 33.0773 23.5599 32.928 24.0933 32.64L24.4773 33.616C24.1253 33.8507 23.7946 34.0053 23.4852 34.08C23.1866 34.1653 22.8879 34.208 22.5893 34.208C21.8852 34.208 21.3892 34.0107 21.1012 33.616C20.8239 33.2107 20.6852 32.544 20.6852 31.616V26.992H19.2132V25.952H20.6852V23.712L21.9653 23.552ZM25.6014 22.016L26.8814 21.872V26.96C27.2014 26.7467 27.516 26.56 27.8254 26.4C28.1454 26.24 28.4707 26.1013 28.8014 25.984C29.132 25.856 29.452 25.792 29.7614 25.792C30.1987 25.792 30.5614 25.8453 30.8494 25.952C31.148 26.048 31.388 26.2133 31.5694 26.448C31.7507 26.6827 31.8787 26.992 31.9534 27.376C32.0387 27.76 32.0814 28.24 32.0814 28.816V34H30.8014V28.96C30.8014 28.64 30.796 28.3573 30.7854 28.112C30.7747 27.856 30.7267 27.6427 30.6414 27.472C30.5667 27.2907 30.444 27.152 30.2734 27.056C30.1134 26.96 29.884 26.912 29.5854 26.912C29.308 26.912 29.0094 26.976 28.6894 27.104C28.3694 27.2213 28.0654 27.36 27.7774 27.52C27.4894 27.68 27.1907 27.8667 26.8814 28.08V34H25.6014V22.016ZM39.9677 33.808C39.7224 33.8827 39.4664 33.9467 39.1997 34C38.9437 34.0533 38.6557 34.1013 38.3357 34.144C38.0264 34.1867 37.7011 34.208 37.3597 34.208C36.8264 34.208 36.3304 34.1333 35.8717 33.984C35.4131 33.8347 35.0131 33.5947 34.6717 33.264C34.3304 32.9333 34.0584 32.5067 33.8557 31.984C33.6637 31.4507 33.5677 30.8 33.5677 30.032C33.5677 29.3387 33.6637 28.7307 33.8557 28.208C34.0477 27.6747 34.3091 27.232 34.6397 26.88C34.9811 26.5173 35.3757 26.2453 35.8237 26.064C36.2824 25.8827 36.7784 25.792 37.3117 25.792C37.8344 25.792 38.2877 25.8933 38.6717 26.096C39.0557 26.2987 39.3704 26.576 39.6157 26.928C39.8717 27.2693 40.0584 27.6747 40.1757 28.144C40.3037 28.6027 40.3677 29.088 40.3677 29.6L40.1277 30.304H34.9597C34.9597 30.6347 35.0024 30.9653 35.0877 31.296C35.1731 31.6267 35.3171 31.9253 35.5197 32.192C35.7331 32.4587 36.0051 32.6773 36.3357 32.848C36.6771 33.008 37.0984 33.088 37.5997 33.088C37.9197 33.088 38.2131 33.072 38.4797 33.04C38.7464 32.9973 38.9757 32.9547 39.1677 32.912C39.3704 32.8587 39.5571 32.8 39.7277 32.736L39.9677 33.808ZM39.0397 29.28C39.0397 29.2053 39.0237 29.04 38.9917 28.784C38.9597 28.528 38.8851 28.2613 38.7677 27.984C38.6504 27.7067 38.4691 27.4613 38.2237 27.248C37.9784 27.024 37.6531 26.912 37.2477 26.912C36.7997 26.912 36.4317 27.008 36.1437 27.2C35.8557 27.3813 35.6264 27.6 35.4557 27.856C35.2851 28.112 35.1677 28.3733 35.1037 28.64C35.0397 28.9067 35.0077 29.12 35.0077 29.28H39.0397ZM41.8055 27.248C41.8055 27.0027 41.7788 26.6187 41.7255 26.096L42.9095 25.936L43.0375 27.104H43.0535C43.2455 26.8587 43.4322 26.6453 43.6135 26.464C43.7948 26.2827 43.9815 26.128 44.1735 26C44.3762 25.8613 44.5682 25.792 44.7495 25.792C44.9948 25.7813 45.3362 25.808 45.7735 25.872L45.4855 27.104C45.1335 27.04 44.8882 27.0133 44.7495 27.024C44.5682 27.024 44.3762 27.1093 44.1735 27.28C43.9708 27.4507 43.7948 27.632 43.6455 27.824C43.4535 28.0587 43.2668 28.3253 43.0855 28.624V34H41.8055V27.248Z" fill="#0E180A" />
                      </svg>
                    )}


                  </label>
                </div>
              ))}
            </div>
              <div style={{ position: 'absolute', top: `${490 + 80 * index}px`, left: '475px' }}>
              <img src={cabinet.image} alt={cabinet.name} />
            </div> 

          </React.Fragment>
        ))}
         
        


      </div>
      <button
        onClick={handleSubmit}
        className="w-80 h-12 mt-4 rounded-md text-white"
        style={{ background: '#7F56D9', position: 'absolute', top: '850px', bottom: '20px', left: '800px', transform: 'translateX(-50%)' }}
      >
        Submit Details
      </button>
    </div>
  );
};

export default Cabinets;
