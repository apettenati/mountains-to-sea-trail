# Mountains to Sea Trail

## Waypoint to Trackpoint Converter

[Live Link](https://apettenati.github.io/mountains-to-sea-trail/)

Conversion tool for the Mountain's to Sea trail to map waypoint data to the closest corresponding trackpoint. Output contains the original waypoint data, the distance in miles to the closest trackpoint, and the corresponding trackpoint data.

###  Instructions

Note: You can test this tool with the two csv files in the `upload-data` folder and skip steps 1-4 below.

1. Download waypoint data to CSV format
2. Remove rows before and after all of the data and headers so that the headers are in the first row and the data follows with no blank rows
3. Ensure columns with names `ID` `lat` and `lon` are present in the file. These are the only columns that will be used. Other columns will be ignored.
4. Repeat this process for the corresponding trackpoint data
5. Upload the CSV files into the tool in their corresponding labels
6. Click `convert` and the process will start. Note there is no indicator that this is running at this time. The process takes about 5 seconds to run with the Segment 8 trail data.
7. Once the process is complete, a file with the new data will automatically be downloaded. Additionally, a button to re-download the data will appear below the convert button if needed.
8. The data output is in JSON format and will contain the original waypoint along with the closest trackpoint and corresponding distance between the waypoint and trackpoint in miles.

