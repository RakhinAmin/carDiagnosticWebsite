// brakeService.js
import axios from 'axios';

const BACKEND_DOMAIN = 'http://localhost:8000';
const BRAKE_RESPONSE_URL = `${BACKEND_DOMAIN}/api/v1/questions/brake`;

const recordBrakeResponse = async (response) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const responseData = await axios.post(BRAKE_RESPONSE_URL, { response }, config);
        return responseData.data;
    } catch (error) {
        console.error('Error recording brake response:', error);
        throw error;
    }
};

const brakeService = { recordBrakeResponse };

export default brakeService;
