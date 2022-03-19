import * as React from 'react';
import { useEffect } from 'react';
import axiosInstance from '../../Axios';
import {useNavigate} from 'react-router-dom';

export default function Signout() {
    let navigate = useNavigate();
	useEffect(() => {
		const response = axiosInstance.post('/signout/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('user');
		axiosInstance.defaults.headers['Authorization'] = null;
		console.log('signed out');
		console.log(response);
        navigate('/signin/')
	});
	return (<div>Logout</div>);
}