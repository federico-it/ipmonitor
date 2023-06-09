# IP Monitor

IP Monitor is an application that allows you to monitor the status of IP addresses in real-time.


![Screenshot 2023-05-17 alle 20 58 10](https://github.com/federico-it/ipmonitor/assets/113976723/7e95cc48-8f43-4b01-a8e2-2a4c0f4646f4)
![Screenshot 2023-05-17 alle 20 58 49](https://github.com/federico-it/ipmonitor/assets/113976723/060d5135-2357-4fcc-9d2f-9cca8f485d29)
![Screenshot 2023-05-17 alle 20 59 21](https://github.com/federico-it/ipmonitor/assets/113976723/139bf2af-000a-46be-a101-938625f9f744)


## Features

- Real-time monitoring of IP addresses
- Track the online/offline status of IP addresses
- View latency history of IP addresses
- Customizable monitoring intervals
- User authentication for secure access

## Technologies Used

- Angular: Front-end development framework
- Node.js: Server-side runtime environment
- Express: Web application framework
- MongoDB: NoSQL database for storing IP address and user data
- Socket.IO: Real-time communication between the server and clients
- Chart.js: Charting library for visualizing latency history
- Material Angular: UI components and styling

## Installation

1. Clone the repository: `git clone https://github.com/federico-it/ipmonitor.git`
2. Navigate to the server directory: `cd ipmonitor/server`
3. Install server dependencies: `npm install`
4. Create a `.env` file based on the provided `.env.example` and configure your environment variables
5. Start the server: `npm start`
6. Open a new terminal window
7. Navigate to the client directory: `cd ipmonitor/client`
8. Install client dependencies: `npm install`
9. Navigate to environments folder : `cd src/environments` and create a `environment.ts` file based on the provided `example.environment.ts` and configure your environment variables
9. Start the client: `ng serve`

Make sure you have MongoDB installed and running locally or provide the connection details in the `.env` file.

## Usage

1. Open your web browser and go to `http://localhost:4200` or `http://<your-local-ip>:4200`
2. Register a new account or log in if you already have an account
3. Add IP addresses to monitor by clicking on the "Add IP Address" button
4. Select the monitoring interval and enter the IP address
5. View the status and latency history of the monitored IP addresses in real-time

## License

This project is licensed under the [MIT License](LICENSE).

![ipmonitor](https://github.com/federico-it/ipmonitor/assets/113976723/44f5908e-8e37-4095-9193-520931a5e75b)

