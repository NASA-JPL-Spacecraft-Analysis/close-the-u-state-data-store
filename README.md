# Clipper State Data Store

## Running the Clipper State Data Store locally

1. Clone the repository locally.
2. Create a file at the root of the application called `ormconfig.json`.
3. Copy the contents of `ormconfig_template.json` but change to the database you're connecting to.
4. Run `npm i` in the root of the application to download dependencies.
5. Start the application by running `npm run start`.

## Building the Clipper State Data Store

1. Copy `ormconfig_template.json` and name the file `ormconfig.json`.
2. Fill `ormconfig.json` with your DB information.
3. Build the Docker image, `docker build --tag clipper_state_data_store .`.
4. To run the image use the following command: `docker run -p 4000:4000 clipper_state_data_store`.
