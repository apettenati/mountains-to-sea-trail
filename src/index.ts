import { 
  totalDistance, associateWaypointsWithTrackpoints, 
  checkOutliers, getTrackpointData, getWaypointData, calcDistance 
} from './convert-waypoints'
import { inspect } from 'util'

async function main() {
  const trackpointFile = './segment-8-data/trackpoints-segment8.csv'
  const waypointFile = './segment-8-data/waypoints-segment8.csv'
  const trackpoints = await getTrackpointData(trackpointFile)
  const waypoints = await getWaypointData(waypointFile)
  const dist = calcDistance(trackpoints[0].coordinate, trackpoints[6574].coordinate)
  const totalMiles = totalDistance(trackpoints)
  // console.log({ dist, totalMiles })
  const newWaypoints = associateWaypointsWithTrackpoints(waypoints, trackpoints)
  // console.log(inspect({ newWaypoints }, { depth: 5, colors: true, maxArrayLength: 180 }))
  const outliers = checkOutliers(newWaypoints, 0.05)
  // console.log(inspect({ outliers }, { depth: 5, colors: true }))

  const hike = require('./mygeodata.json')
  const features = hike.features
  console.log(features[9])

}

main()