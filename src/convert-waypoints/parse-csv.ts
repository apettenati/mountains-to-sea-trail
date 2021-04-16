import { Coordinate } from './distance'
import { Papa } from 'papaparse'

export interface Point {
  id: number
  coordinate: Coordinate
}

const trackpointFiles = document.querySelector<HTMLInputElement>('.trackpoint-data')?.files
const waypointFiles = document.querySelector<HTMLInputElement>('.waypoint-data')?.files
const convertSubmit = document.querySelector('[type="submit"]')

convertSubmit?.addEventListener('click', (event) => {
  console.log(event)
  if (!trackpointFiles) throw new Error('Trackpoint file not uploaded!')
  const trackpointData = trackpointFiles[0]
  if (!waypointFiles) throw new Error('Waypoint file not uploaded!')
  const waypointData = waypointFiles[0]

  const trackpointParser = Papa.parse(trackpointData, {
    header: true,
    complete: function(results: any, file: File) {
      console.log("Parsing complete:", results, file);
    },
    skipEmptyLines: true,
    })

  const waypointParser = Papa.parse(waypointData, {
    header: true,
    complete: function(results: any, file: File) {
      console.log("Parsing complete:", results, file);
    },
    skipEmptyLines: true,
  })
})