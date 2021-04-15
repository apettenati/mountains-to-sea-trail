import { getDistance, convertDistance } from 'geolib'

export interface Coordinate {
  latitude: number
  longitude: number
}

export type Miles = number

export function calcDistance(a: Coordinate, b: Coordinate) {
  const distMeters = getDistance(a, b)
  const distMiles = convertDistance(distMeters, 'mi')
  return distMiles
}