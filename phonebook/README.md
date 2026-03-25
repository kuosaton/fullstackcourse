# Phonebook

A phonebook app for adding, deleting, and searching contacts by name and phone number. Includes input validation for empty or invalid inputs.

## Demo

A live version is available at <https://phonebook-e81c.onrender.com>

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- A MongoDB instance (e.g., [MongoDB Atlas](https://www.mongodb.com/atlas))

## Usage

Clone the repository to a chosen location:

```bash
git clone https://github.com/kuosaton/fullstackcourse.git
```

Navigate to the phonebook root directory (`fullstackcourse/phonebook`) and build the Docker image:

```bash
docker build -t phonebook .
```

Run the application using the built image:

```bash
docker run --init --rm -p 3001:3001 -e PORT=3001 -e MONGODB_URI=<your mongodb uri> phonebook
```

> [!TIP]
> Your MongoDB connection string, `MONGODB_URI`, should look something like `mongodb+srv://username:db_password@cluster.mongodb.net/databasename`. Further details: [An Introduction to MongoDB Connection Strings](https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string).

The app will be available at `http://localhost:3001`.

### Phonebook image on Docker Hub

You can also opt to pull the [kuosaton/phonebook](https://hub.docker.com/r/kuosaton/phonebook) image from Docker Hub.

Pull the image from Docker Hub:

```bash
docker pull kuosaton/phonebook
```

Run the application using the pulled image:

```bash
docker run --init --rm -p 3001:3001 -e PORT=3001 -e MONGODB_URI=<your mongodb uri> kuosaton/phonebook

```
