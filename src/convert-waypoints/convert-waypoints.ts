import { calcDistance, Miles } from './distance'
import { Point } from './import-data'

interface Output {
  waypoint: Point
  trackpointDistance: Miles
  trackpoint: Point
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
