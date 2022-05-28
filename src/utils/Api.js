import axios from 'axios';

let Api = axios.create({
	baseURL: 'https://transport-apii.herokuapp.com',
	headers: {
		'Content-Type': 'application/json',
		
	
	}
	//https://transport-apii.herokuapp.com/
	//'https://bus-api-testt.herokuapp.com',
	//'https://buss-api-test.herokuapp.com',
	// baseURL: 'http://192.168.1.198:8000/api'
});


export default Api;