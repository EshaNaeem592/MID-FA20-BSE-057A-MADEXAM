import axios from "axios";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const ApiComponent = () => {

	useEffect(() => {
		// Define the API endpoint
		
		AsyncStorage.getItem("data").then((data) => {
			if (data !== null) {
				
				console.log("Data Fetching from Local Storage ")
				console.log(data );
				return;
			}
			else {
				console.log("Data Fetching From API")
				const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json"; 
				// Make an API request
				axios
					.get(apiUrl)
					.then((response) => {
						console.log("API Response:", response.data);
						const getBit = async () => {
							const bit = await AsyncStorage.setItem("data", JSON.stringify([{"symbol": response.data.bpi.EUR.code,  "rate" : response.data.bpi.EUR.rate },{"symbol": response.data.bpi.GBP.code,  "rate" : response.data.bpi.GBP.rate }]));
							console.log(await AsyncStorage.getItem("data"));
						}
						getBit();

					})
					.catch((error) => {
						console.error("API Error:", error);
					});
			}
		})

	}, []);

	return (
		<View>
			<Text>My  API response</Text>
		</View>
	);
};

export default ApiComponent;
