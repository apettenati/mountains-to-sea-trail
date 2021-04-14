# from geopy.distance import distance
import csv
import time
from math import sin, cos, sqrt, atan2, radians

def distance():
    # approximate radius of earth in km
    R = 6373.0

    lat1 = radians(52.2296756)
    lon1 = radians(21.0122287)
    lat2 = radians(52.406374)
    lon2 = radians(16.9251681)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c

    print("Result:", distance)
    print("Should be:", 278.546, "km")


def get_trackpoint_data(filename):
    with open(filename) as trackpoint_csv:
        reader = csv.reader(trackpoint_csv)
        trackpoints = []
        for row in reader:
            trackpoints.append({
                'trackpoint_id': row[0],
                'trackpoint_lat': row[2],
                'trackpoint_long': row[3]
            })
        return trackpoints[1:]


def get_waypoint_data(filename):
    with open(filename) as waypoints_csv:
        reader = csv.reader(waypoints_csv)
        waypoints = []
        for row in reader:
            waypoints.append({
                'waypoint_id': row[0],
                'waypoint_lat': row[1],
                'waypoint_long': row[2]
            })
        return waypoints[1:]

def get_closest_trackpoint(trackpoint_data, waypoint_data):
    start = time.perf_counter()
    for waypoint in waypoint_data:
        closest_trackpoint_distance = 100
        for trackpoint in trackpoint_data:
            point_distance = distance((waypoint['waypoint_lat'], waypoint['waypoint_long']), (trackpoint['trackpoint_lat'], trackpoint['trackpoint_long'])).miles
            if point_distance < closest_trackpoint_distance:
                closest_trackpoint_distance = point_distance
                waypoint['closest_trackpoint_distance'] = closest_trackpoint_distance
                waypoint['closest_trackpoint_lat'] = trackpoint['trackpoint_lat']
                waypoint['closest_trackpoint_long'] = trackpoint['trackpoint_long']
    end = time.perf_counter()
    print(f'calculated closes trackpoints in {end - start:0.4f} seconds')
    return waypoint_data

def write_new_waypoint_csv(waypoint_data):
    with open('new_waypoints-segment8.csv', 'w') as f:
        writer = csv.writer(f)
        for waypoint in waypoint_data:
            # print(waypoint)
            # for key, values in waypoint.items():
            writer.writerow([waypoint])
        
def total_distance(trackpoint_data):
    total = 0
    for i in range(len(trackpoint_data)):
        if i == len(trackpoint_data) - 1:
            print(total)
            return total
        else:
            point_distance = distance((trackpoint_data[i]['trackpoint_lat'], trackpoint_data[i]['trackpoint_long']), (trackpoint_data[i+1]['trackpoint_lat'], trackpoint_data[i+1]['trackpoint_long'])).miles
            total += point_distance

if __name__ == "__main__":
    trackpoint_data = get_trackpoint_data('trackpoints-segment8 copy.csv')
    waypoint_data = get_waypoint_data('waypoints-segment8 copy.csv')
    # trackpoint_data = get_trackpoint_data('trackpoints-segment8.csv')
    # waypoint_data = get_waypoint_data('waypoints-segment8.csv')
    # print(trackpoint_data[0])
    # print(trackpoint_data[len(trackpoint_data) - 1])
    # print(waypoint_data[0])
    # print(waypoint_data[len(waypoint_data) - 1])

    # trackpoint_start = (trackpoint_data[0]['trackpoint_lat'], trackpoint_data[0]['trackpoint_long'])
    # waypoint_start = (waypoint_data[0]['waypoint_lat'], waypoint_data[0]['waypoint_long'])
    # trackpoint_end = (trackpoint_data[len(trackpoint_data) - 1]['trackpoint_lat'], trackpoint_data[len(trackpoint_data) - 1]['trackpoint_long'])
    # waypoint_end = (waypoint_data[len(waypoint_data) - 1]['waypoint_lat'], waypoint_data[len(waypoint_data) - 1]['waypoint_long'])
    # print(distance(trackpoint_start, trackpoint_end).miles)
    # print(distance(waypoint_start, waypoint_end).miles)

    # new_waypoint_data = get_closest_trackpoint(trackpoint_data, waypoint_data)
    # print(new_waypoint_data)
    # write_new_waypoint_csv(new_waypoint_data)

    distance()
