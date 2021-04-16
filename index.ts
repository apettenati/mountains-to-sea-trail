// import {
//   totalDistance, associateWaypointsWithTrackpoints,
//   checkOutliers, getTrackpointData, getWaypointData, calcDistance
// } from './convert-waypoints'
// import { inspect } from 'util'
import { parse } from 'papaparse'

async function main() {
  // const trackpointFile = './segment-8-data/trackpoints-segment8.csv'
  // const waypointFile = './segment-8-data/waypoints-segment8.csv'
  // const trackpoints = await getTrackpointData(trackpointFile)
  // const waypoints = await getWaypointData(waypointFile)
  // const dist = calcDistance(trackpoints[0].coordinate, trackpoints[6574].coordinate)
  // const totalMiles = totalDistance(trackpoints)
  // console.log({ dist, totalMiles })
  // const newWaypoints = associateWaypointsWithTrackpoints(waypoints, trackpoints)
  // console.log(inspect({ newWaypoints }, { depth: 5, colors: true, maxArrayLength: 180 }))
  // const outliers = checkOutliers(newWaypoints, 0.05)
  // console.log(inspect({ outliers }, { depth: 5, colors: true }))
  // console.log(inspect({ test: "some string!!!" }, { depth: 5 }))
  console.log('abc')

  const trackpointFile = document.querySelector('.trackpoint-data')
  const waypointFile = document.querySelector('.waypoint-data')
  const convertSubmit = document.querySelector('[type="submit"]')
  convertSubmit?.addEventListener('click', (event) => {
    console.log(event)
    const trackpointData = (trackpointFile as any).files[0]
    const waypointData = (waypointFile as any).files[0]
    // console.log(trackpointFile.files[0])
    const trackpointParser = parse(trackpointData, {
      header: true,
      complete: function(results, file) {
        console.log("Parsing complete:", results, file);
      },
    })

    const waypointParser = parse(waypointData, {
      header: true,
      complete: function(results, file) {
        console.log("Parsing complete:", results, file);
      }
    })
  })
}

main()
