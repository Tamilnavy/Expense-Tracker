import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";


const uploadImage = async (imageFile) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(imageFile);

        fileReader.onload = () => {
            // Returns an object matching the expected structure: { imageUrl: base64String }
            resolve({ imageUrl: fileReader.result });
        };

        fileReader.onerror = (error) => {
            console.error('Error converting image to Base64:', error);
            reject(error);
        };
    });
};

36
export default uploadImage;