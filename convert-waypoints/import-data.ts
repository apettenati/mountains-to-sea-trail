// import neatCsv from 'neat-csv'
// import fs from 'fs'
import { Coordinate } from './distance'

export interface Point {
  id: number
  coordinate: Coordinate
}

export const getTrackpointData = async (file: File): Promise<Point[]> => {
  // const fileData = ''
  // const data = await neatCsv(fileData)
  // // const data = await neatCsv(fs.readFileSync(file))
  // const trackpoints = data.map((trackpoint) => {
  //   const point = {
  //     id: Number(trackpoint['Trackpoint ID']),
  //     coordinate:
  //     {
  //       latitude: Number(trackpoint['lat']),
  //       longitude: Number(trackpoint['lon'])
  //     }
  //   }
  //   return point
  // })
  // return trackpoints
  return []
}

export const getWaypointData = async (file: File): Promise<Point[]> => {
  // const fileData = ''
  // const data = await neatCsv(fileData)
  // // const data = await neatCsv(fs.readFileSync(file))
  // const waypoints = data.map((waypoint) => {
  //   const point = {
  //     id: Number(waypoint['Waypoint ID']),
  //     coordinate:
  //     {
  //       latitude: Number(waypoint['lat']),
  //       longitude: Number(waypoint['lon'])
  //     }
  //   }
  //   return point
  // })
  // return waypoints
  return []
}
