import neatCsv from 'neat-csv'
import fs from 'fs'
import { Coordinate } from './distance'

export interface Point {
  id: number
  coordinate: Coordinate
}

export const getTrackpointData = async (file: string): Promise<Point[]> => {
  const data = await neatCsv(fs.readFileSync(file))
  const trackpoints = data.map((trackpoint) => {
    const point = {
      id: Number(trackpoint['Trackpoint ID']),
      coordinate:
      {
        latitude: Number(trackpoint['lat']),
        longitude: Number(trackpoint['lon'])
      }
    }
    return point
  })
  return trackpoints
}

export const getWaypointData = async (file: string): Promise<Point[]> => {
  const data = await neatCsv(fs.readFileSync(file))
  const waypoints = data.map((waypoint) => {
    const point = {
      id: Number(waypoint['Waypoint ID']),
      coordinate:
      {
        latitude: Number(waypoint['lat']),
        longitude: Number(waypoint['lon'])
      }
    }
    return point
  })
  return waypoints
}