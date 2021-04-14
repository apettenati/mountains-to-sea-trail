import {inspect} from 'util'
import { calcDistance, Miles} from './distance'
import { Point, getTrackpointData, getWaypointData} from './import-data'

interface Output {
  waypoint: Point
  trackpointDistance: Miles
  trackpoint: Point
}

function totalDistance(trackpoints: Point[]) {
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

function getClosestTrackpoint(waypoint: Point, trackpoints: Point[]) {
  const distances = trackpoints.map((trackpoint) => {
    const trackpointDistance = calcDistance(waypoint.coordinate, trackpoint.coordinate)
    return {trackpointDistance, trackpoint}
  })
  distances.sort((a, b) => a.trackpointDistance - b.trackpointDistance)
  return distances[0]
}

function associateWaypointsWithTrackpoints(waypoints: Point[], trackpoints: Point[]) {
  const newWaypoints = waypoints.map((waypoint) => {
    const closestTrackpoint = getClosestTrackpoint(waypoint, trackpoints)
    return {waypoint, ...closestTrackpoint}
  })
  return newWaypoints
}

function checkOutliers(newWaypoints: Output[], errorMargin: number) {
  let outliers: Output[] = []
  newWaypoints.forEach((waypoint) => {
    if (waypoint.trackpointDistance > errorMargin) {
      outliers.push(waypoint)
    }
  })
  return outliers
}

async function main() {
  const trackpointFile = './trackpoints-segment8.csv'
  const waypointFile = './waypoints-segment8.csv'
  const trackpoints = await getTrackpointData(trackpointFile)
  const waypoints = await getWaypointData(waypointFile)
  const dist = calcDistance(trackpoints[0].coordinate, trackpoints[6574].coordinate)
  const totalMiles = totalDistance(trackpoints)
  console.log({dist, totalMiles})
  const newWaypoints = associateWaypointsWithTrackpoints(waypoints, trackpoints)
  console.log(inspect({newWaypoints}, {depth: 5, colors: true, maxArrayLength: 180}))
  const outliers = checkOutliers(newWaypoints, 0.07)
  console.log(inspect({outliers}, {depth: 5, colors: true}))
}

main()