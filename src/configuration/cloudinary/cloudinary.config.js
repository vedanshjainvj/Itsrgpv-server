import { v2 as cloudinary } from 'cloudinary';
import { envProvider } from '../../constants.js';

cloudinary.config({ 
    cloud_name: envProvider.CloudName, 
    api_key:  envProvider.CloudApiKey, 
    api_secret:  envProvider.CloudApiSecret
});

export default cloudinary;