# AssentifyLogoDetector

AssentifyLogoDetector is a project that focuses on creating a compact and efficient logo detection model capable of identifying the Assentify logo in various images.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Docker and Docker Compose:** The project uses Docker to containerize the Flask backend and Next.js frontend. and Docker Compose to manage multi-container applications. Make sure you have both Docker and Docker Compose installed on your system

- **Git:** You'll need Git to clone the project repository and manage your contributions.

## Getting Started

### Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ghassan-bounni/AssentifyLogoDetector.git
   ```

2. Navigate to the project directory:

   ```bash
   cd AssentifyLogoDetector
   ```

3. Build and run the Docker containers:

   ```bash
   docker-compose up --build
   ```

### Usage

Once the Docker containers are up and running, you can access the application:

- The Flask backend API is accessible at `http://127.0.0.1:5000`.
- The Next.js frontend UI is accessible at `http://localhost:3000`.

## API Endpoints

- `GET /`: Ping the server.
- `POST /detect`: Detect Assentify logos in uploaded images.
- `GET /images/<image_id>`: Get detected images from the server.
