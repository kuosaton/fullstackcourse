# Puhelinluettelo

A phonebook app for adding, deleting, and searching contacts by name and phone number. Includes input validation for empty or invalid inputs.

## Docker

Build:

```bash
docker build -t puhelinluettelo .
```

Run:

```bash
docker run -p 3001:3001 -e PORT=3001 -e MONGODB_URI=<your mongodb uri> puhelinluettelo
```

The app will be available at `http://localhost:3001`.
