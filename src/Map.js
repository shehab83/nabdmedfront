// import React, { useState } from "react";
// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

// const containerStyle = {
//   width: "90%",
//   height: "400px",
// };

// const center = {
//   lat: 24.714265,
//   lng: 46.67586,
// };

// function Map() {
//   const [location, setLocation] = useState(center);
//   const [address, setAddress] = useState("");
//   const [error, setError] = useState(null);

//   const handlePlaceChange = (event) => {
//     setAddress(event.target.value);
//   };

//   const handleSearch = () => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ address: address }, (results, status) => {
//       if (status === "OK") {
//         setLocation({
//           lat: results[0].geometry.location.lat(),
//           lng: results[0].geometry.location.lng(),
//         });
//       } else {
//         alert("Geocode was not successful for the following reason: " + status);
//       }
//     });
//   };

//   const handleLocate = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ lat: latitude, lng: longitude });
//         },
//         (err) => {
//           setError(err.message);
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by this browser.");
//     }
//   };

//   return (
//     <div>
//       {error && <p>Error: {error}</p>}
//       <LoadScript googleMapsApiKey="AIzaSyAW9CUpn1_1jeNPW5HsLAhUI7qEbMkMv90">
//         <input
//           type="text"
//           value={address}
//           onChange={handlePlaceChange}
//           placeholder="أدخل عنوان الموقع"
//         />
//         <button onClick={handleSearch}>بحث</button>
//         <button onClick={handleLocate}>تحديد موقعي</button>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={location}
//           zoom={15}
//         >
//           <Marker position={location} />
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// }

// export default Map;
// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import axios from 'axios'; // تأكد من تثبيت axios باستخدام npm install axios
// import './App.css';  // لملف CSS المخصص

// // حل مشكلة الأيقونة الافتراضية لـ Marker
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// const MapComponent = () => {
//   const [markerPosition, setMarkerPosition] = useState([23.8859, 45.0792]); // وسط المملكة العربية السعودية
//   const [locationFound, setLocationFound] = useState(false);
//   const [permissionGranted, setPermissionGranted] = useState(null);

//   // دالة لتحديد الموقع الجغرافي
//   const handleLocateUser = () => {
//     // إعادة تعيين الموقع لإجبار طلب إذن جديد
//     setLocationFound(false);

//     // تحقق من إذن الوصول للموقع
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const newPosition = [position.coords.latitude, position.coords.longitude];
//           setMarkerPosition(newPosition);
//           setLocationFound(true);
//           setPermissionGranted(true);
//           console.log('User location:', newPosition); // طباعة الموقع في وحدة التحكم
//           sendLocationToAPI(newPosition); // إرسال الموقع إلى API
//         },
//         (error) => {
//           console.error('Error fetching geolocation', error);
//           setPermissionGranted(false);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   // دالة لإرسال الموقع إلى API
//   const sendLocationToAPI = async (position) => {
//     const [latitude, longitude] = position;
    
//     try {
//       const response = await axios.post('https://your-api-endpoint.com/endpoint', {
//         latitude,
//         longitude,
//       });
//       console.log('Location sent successfully:', response.data);
//     } catch (error) {
//       console.error('Error sending location to API:', error);
//     }
//   };

//   // مكون لاستخدام الخريطة من Leaflet
//   function MyMapComponent() {
//     const map = useMap();

//     useEffect(() => {
//       if (locationFound) {
//         map.flyTo(markerPosition, 13); // نقل الخريطة إلى الموقع الجديد
//       }
//     }, [locationFound, map, markerPosition]);

//     return null;
//   }

//   return (
//     <div style={{ position: 'relative', height: '400px', width: '100%' }}>
//       {/* زر تحديد الموقع */}
//       <button onClick={handleLocateUser} className="locate-button">
//         Locate Me
//       </button>

//       {/* عرض رسالة إذا لم يتم منح الإذن */}
//       {permissionGranted === false && (
//         <div style={{ color: 'red', margin: '10px' }}>
//           Please allow location access in your browser settings.
//         </div>
//       )}

//       {/* مكون الخريطة */}
//       <MapContainer center={markerPosition} zoom={6} style={{ height: "100%", width: "100%" }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={markerPosition}>
//           <Popup>You are here! Latitude: {markerPosition[0]}, Longitude: {markerPosition[1]}</Popup>
//         </Marker>
//         <MyMapComponent />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapComponent;
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import './App.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = () => {
  const [markerPosition, setMarkerPosition] = useState([23.8859, 45.0792]); // موقع أولي
  const [locationFound, setLocationFound] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [canProceed, setCanProceed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleLocateUser = () => {
    setLocationFound(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = [position.coords.latitude, position.coords.longitude];
          setMarkerPosition(newPosition);
          setLocationFound(true);
          setPermissionGranted(true);
          setCanProceed(true);
          const locationURL = `https://www.google.com/maps?q=${newPosition[0]},${newPosition[1]}`;
          sendLocationToAPI(locationURL);

          // طباعة الإحداثيات في وحدة التحكم
          console.log('Current Location (Auto):', newPosition);
        },
        (error) => {
          console.error('Error fetching geolocation', error);
          setPermissionGranted(false);
          setCanProceed(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const sendLocationToAPI = async (locationURL) => {
    try {
      const response = await axios.post('https://your-api-endpoint.com/endpoint', {
        locationURL,
      });
      console.log('Location URL sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending location to API:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
      if (response.data.length > 0) {
        const location = response.data[0];
        const newPosition = [parseFloat(location.lat), parseFloat(location.lon)];
        setMarkerPosition(newPosition);
        setSearchResult(location.display_name);
        setLocationFound(true);

        // طباعة الإحداثيات عند البحث
        console.log('Current Location (Search):', newPosition);
      } else {
        alert('Location not found. Try another search term.');
      }
    } catch (error) {
      console.error('Error fetching location', error);
    }
  };

  function MyMapComponent() {
    const map = useMap();
    useEffect(() => {
      if (locationFound) {
        map.flyTo(markerPosition, 13);
      }
    }, [locationFound, map, markerPosition]);
    return null;
  }

  // مكون لتحديد الموقع يدوياً عند النقر على الخريطة
  function ManualMarkerSetter() {
    useMapEvent('click', (e) => {
      const newPosition = [e.latlng.lat, e.latlng.lng];
      setMarkerPosition(newPosition);
      setLocationFound(true);
      setCanProceed(true);

      // طباعة الإحداثيات عند التحديد اليدوي
      console.log('Current Location (Manual):', newPosition);
    });
    return null;
  }

  const handleProceed = () => {
    if (canProceed) {
      window.location.href = "/next-page";
    } else {
      alert("Please locate your position before proceeding.");
    }
  };

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a place"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      <button onClick={handleLocateUser} className="locate-button">
        Locate Me
      </button>

      {permissionGranted === false && (
        <div style={{ color: 'red', margin: '10px' }}>
          Please allow location access in your browser settings.
        </div>
      )}

      <MapContainer center={markerPosition} zoom={6} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* عرض موقع الـ Marker */}
        <Marker position={markerPosition}>
          <Popup>You are here! Latitude: {markerPosition[0]}, Longitude: {markerPosition[1]}</Popup>
        </Marker>
        
        <MyMapComponent />
        <ManualMarkerSetter /> {/* إضافة مكون التحديد اليدوي */}
      </MapContainer>

      {searchResult && (
        <div className="search-result">
          Result found: {searchResult}
        </div>
      )}

      <button onClick={handleProceed} disabled={!canProceed} className="proceed-button">
        Go to Next Page
      </button>
    </div>
  );
};

export default MapComponent;

// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import axios from 'axios';
// import './App.css';

// // حل مشكلة الأيقونة الافتراضية لـ Marker
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// const MapComponent = () => {
//   const [markerPosition, setMarkerPosition] = useState(null); // تعيين الحالة الافتراضية للموقع كـ null
//   const [locationFound, setLocationFound] = useState(false);
//   const [permissionGranted, setPermissionGranted] = useState(null);
//   const [address, setAddress] = useState(''); // حالة لإدارة عنوان البحث

//   // دالة لتحديد الموقع الجغرافي
//   const handleLocateUser = () => {
//     setLocationFound(false);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const newPosition = [position.coords.latitude, position.coords.longitude];
//           setMarkerPosition(newPosition);
//           setLocationFound(true);
//           setPermissionGranted(true);
          
//           const locationURL = `https://www.google.com/maps?q=${newPosition[0]},${newPosition[1]}`;
//           console.log('User location URL:', locationURL);
//           sendLocationToAPI(locationURL);
//         },
//         (error) => {
//           console.error('Error fetching geolocation', error);
//           setPermissionGranted(false);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   // دالة للبحث عن العنوان وتحويله إلى إحداثيات
//   const handleSearchAddress = async () => {
//     try {
//       const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
//       if (response.data.length > 0) {
//         const { lat, lon } = response.data[0];
//         const newPosition = [lat, lon];
//         setMarkerPosition(newPosition);
//         setLocationFound(true);
//         console.log('Searched location URL:', `https://www.google.com/maps?q=${lat},${lon}`);
//       } else {
//         alert('Location not found');
//       }
//     } catch (error) {
//       console.error('Error searching for address:', error);
//     }
//   };

//   // دالة لإرسال الموقع إلى API
//   const sendLocationToAPI = async (locationURL) => {
//     try {
//       const response = await axios.post('https://your-api-endpoint.com/endpoint', {
//         locationURL,
//       });
//       console.log('Location URL sent successfully:', response.data);
//     } catch (error) {
//       console.error('Error sending location to API:', error);
//     }
//   };

//   // مكون لإضافة حدث النقر على الخريطة
//   function LocationMarker() {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setMarkerPosition([lat, lng]);
//         setLocationFound(true);
//         console.log('Map clicked at:', lat, lng);
//       },
//     });
//     return null;
//   }

//   // دالة للانتقال إلى الصفحة التالية إذا تم تحديد الموقع
//   const handleNextPage = () => {
//     if (!markerPosition) {
//       alert("Please select a location on the map before proceeding.");
//       return;
//     }

//     // قم بالتنقل إلى الصفحة التالية أو تنفيذ العملية المطلوبة
//     console.log("Proceeding to the next page with location:", markerPosition);
//     // يمكنك استخدام react-router-dom للتنقل أو أي مكتبة أخرى
//   };

//   return (
//     <div style={{ position: 'relative', height: '400px', width: '100%' }}>
//       {/* حقل إدخال البحث */}
//       <input 
//         type="text" 
//         value={address} 
//         onChange={(e) => setAddress(e.target.value)} 
//         placeholder="Enter an address"
//         style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
//       />
//       <button onClick={handleSearchAddress} className="search-button">
//         Search
//       </button>

//       {/* زر تحديد الموقع */}
//       <button onClick={handleLocateUser} className="locate-button">
//         Locate Me
//       </button>

//       {/* زر الانتقال إلى الصفحة التالية */}
//       <button onClick={handleNextPage} className="next-button">
//         Next
//       </button>

//       {/* عرض رسالة إذا لم يتم منح الإذن */}
//       {permissionGranted === false && (
//         <div style={{ color: 'red', margin: '10px' }}>
//           Please allow location access in your browser settings.
//         </div>
//       )}

//       {/* مكون الخريطة */}
//       <MapContainer center={markerPosition || [23.8859, 45.0792]} zoom={6} style={{ height: "100%", width: "100%" }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {markerPosition && (
//           <Marker position={markerPosition}>
//             <Popup>You are here! Latitude: {markerPosition[0]}, Longitude: {markerPosition[1]}</Popup>
//           </Marker>
//         )}
//         <LocationMarker />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapComponent;
