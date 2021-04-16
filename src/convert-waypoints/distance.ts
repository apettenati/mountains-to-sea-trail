import { getDistance, convertDistance } from 'geolib'
import { Coordinate, Miles} from './convert-waypoints'

export function calcDistance(a: Coordinate, b: Coordinate): Miles {
  const distMeters = getDistance(a, b)
  const distMiles = convertDistance(distMeters, 'mi')
  return distMiles
}