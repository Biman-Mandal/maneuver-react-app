import PropTypes from 'prop-types';
const LocatorButton = ({mapObject}) => {

    const getUserLocation = () => {
        if (navigator.geolocation) {
            const userLocation = {
                lat: '0',
                lng: '0',
            };
            mapObject.setCenter(userLocation); // ADDED
        } else {
            // code for legacy browsers
        }
    };

  return (
    <button
      type="button"
    >
    </button>
  );
};
LocatorButton.propTypes = {
  mapObject: PropTypes.object,
};
export default LocatorButton;