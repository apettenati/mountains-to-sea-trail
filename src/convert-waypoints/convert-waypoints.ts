import { calcDistance} from './distance'

export type Miles = number

export interface Coordinate {
  latitude: number
  longitude: number
}
export interface Point {
  id: number
  coordinate: Coordinate
}

interface Output {
  waypoint: Point
  trackpointDistance: Miles
  trackpoint: Point
}

export function cleanWaypointData(data: any) {
  const waypoints = data.map((waypoint: any) => {
    const point = {
      id: Number(waypoint['ID']),
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


export function cleanTrackpointData(data: any) {
  const trackpoints = data.map((trackpoint: any) => {
    const point = {
      id: Number(trackpoint['ID']),
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

export function totalDistance(trackpoints: Point[]) {
  let total = 0
  trackpoints.forEach((trackpoint, index) => {
    if (index + 1 >= trackpoints.length) return

    const nextTrackpoint = trackpoints[index + 1]
    const dist = calcDistance(
      trackpoint.coordinate,
      nextTrackpoint.coordinate
    )
    total += dist
    // console.log({nextTrackpoint, dist, total})
  })
  return total
}

export function getClosestTrackpoint(waypoint: Point, trackpoints: Point[]) {
  const distances = trackpoints.map((trackpoint) => {
    const trackpointDistance = calcDistance(waypoint.coordinate, trackpoint.coordinate)
    return { trackpointDistance, trackpoint }
  })
  distances.sort((a, b) => a.trackpointDistance - b.trackpointDistance)
  return distances[0]
}

export function associateWaypointsWithTrackpoints(waypoints: Point[], trackpoints: Point[]) {
  const newWaypoints = waypoints.map((waypoint) => {
    const closestTrackpoint = getClosestTrackpoint(waypoint, trackpoints)
    return { waypoint, ...closestTrackpoint }
  })
  return newWaypoints
}

export function checkOutliers(newWaypoints: Output[], errorMargin: Miles) {
  let outliers: Output[] = []
  newWaypoints.forEach((waypoint) => {
    if (waypoint.trackpointDistance > errorMargin) {
      outliers.push(waypoint)
    }
  })
  return outliers
}
