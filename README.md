# Running the Application Using Docker Compose

To run the application locally, please follow these steps:

1. **Clone the Repository**:
   Open your terminal and clone the repository with the command:
   Then, navigate to the project directory: git clone <your_repository_link>

2. **Create the `.env` File**:
   Copy the `.env.example` file to a new `.env` file:

Open the `.env` file in your editor and fill in the necessary environment variables.

3. **Launch Docker Desktop**:
   Ensure Docker Desktop is installed and running on your machine. If it's not installed, download and install it from Docker's official website.

4. **Run the Application Using Docker Compose**:
   In the terminal, while in the root of your project, execute the command:

This command will build and start your application and all its related services.

5. **Accessing the Application**:
   Once successfully launched, the application will be available at `http://localhost:3000`.

## Notes

- All MongoDB data will be stored in the Docker volume (`mongo_data`) and will not be lost upon restarting containers.
- You can adjust the environment variables in the `.env` file as per your requirements.
- To stop the application, use the `Ctrl+C` key combination in the terminal, followed by the `docker-compose down` command to stop and remove the containers.
