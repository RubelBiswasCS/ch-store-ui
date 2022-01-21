import axios from 'axios';

const baseUrl = "http://localhost:8000/api/";

const axiosInstance = axios.create({
        baseURL: baseUrl,
        timeout: 5000,
        headers: {
            Authorization: localStorage.getItem('access_token')
			? 'JWT ' + localStorage.getItem('access_token')
			: null,
            'Content-Type': 'application/json',
            accept: 'application/json',
        }
    });

axiosInstance.interceptors.response.use(
        (response) => (response),
        async (error) => {
            const originalRequest = error.config;
		    console.log('error: ',error);
            console.log('original request: ',originalRequest)
            console.log("original request url",originalRequest.url)
            console.log("response : ",error.response)
            console.log("response status: ",error.response.status)
            if (typeof error.response === 'undefined') {
                alert(
                    'A server/network error occurred. ' +
                        'Looks like CORS might be the problem. ' +
                        'Sorry about this - we will get it fixed shortly.'
                );
                return Promise.reject(error);
            }
            if (error.response.status === 401 && 
                originalRequest.url === '/token/refresh/'){
                    localStorage.setItem('username', '');
                    window.location.href = '/signin/';
                    return Promise.reject(error);  
            }
            if (error.response.status === 401){
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken){
                    window.location.href = '/signin/';
                    return Promise.reject(error);
                }
            }
            if (error.response.data.code === 'token_not_valid' &&
                    error.response.status === 401 &&
                    error.response.statusText === 'Unauthorized'){
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken){
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                    const now = Math.ceil(Date.now()/1000);

                    if (tokenParts.exp > now){
                        return axiosInstance.post('/token/refresh/',{
                            refresh:refreshToken,
                        })
                        .then((response) => {
                            console.log(response.data)
                            localStorage.setItem('access_token',response.data.access);
                            localStorage.setItem('refresh_token',response.data.refresh);
                            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + response.data.access;
                            axiosInstance.headers['Authorization'] = 'JWT '+response.data.access;
                            return axiosInstance(originalRequest);
                        }).catch((err) => {
                            console.log('error on post request with refreshToken : ',err.response)
                        });
                    }
                    else {
                        console.log('Refresh Token is expired');
                        localStorage.setItem('username', '');
                        window.location.href = '/signin/';
                    }
                }
                else {
                    console.log("Refresh token is not available.");
                    localStorage.setItem('username', '');
                    window.location.href = '/singin/';
                }
                }
                return Promise.reject(error);
            }

        
    );

export default axiosInstance;