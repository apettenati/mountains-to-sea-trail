import { 
  totalDistance, associateWaypointsWithTrackpoints, 
  checkOutliers, getTrackpointData, getWaypointData, calcDistance 
} from './convert-waypoints'

async function main() {
  const trackpointFile = './segment-8-data/trackpoints-segment8.csv'
  const waypointFile = './segment-8-data/waypoints-segment8.csv'
  const trackpoints = await getTrackpointData(trackpointFile)
  const waypoints = await getWaypointData(waypointFile)
  const dist = calcDistance(trackpoints[0].coordinate, trackpoints[6574].coordinate)
  const totalMiles = totalDistance(trackpoints)
  // console.log({ dist, totalMiles })
  const newWaypoints = associateWaypointsWithTrackpoints(waypoints, trackpoints)
  // console.log({ newWaypoints })
  const outliers = checkOutliers(newWaypoints, 0.05)
  // console.log({ outliers })
}

main()
