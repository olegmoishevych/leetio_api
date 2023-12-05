# Running an application using Docker Compose

To run the application locally, follow these steps:

1. Clone the repository.
2. Create a `.env` file based on `.env.example`, specifying the necessary environment variables in it.
3. Run the application using Docker Compose:
4. After successful launch, the application will be available on `http://localhost:3000`.

## Note

- All MongoDB data will be saved in the Docker volume and will not be lost when containers are restarted.
- You can change the environment variables in the `.env` file according to your needs.
