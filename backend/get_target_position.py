from skyfield.api import load, wgs84
import os

sat_name = {}

def get_file():
    url = 'https://celestrak.org/NORAD/elements/stations.txt'
    all_sat = load.tle_file(url)
    global sat_name
    sat_name = {sat.name: sat for sat in all_sat}


def calculate(lat, long, elevation, target) -> tuple:
    time_now = load.timescale().now()
    user_pos = wgs84.latlon(lat, long, elevation_m = elevation)
    vector_sum = sat_name[target] - user_pos
    sat_location = vector_sum.at(time_now).altaz()
    horizontal_angle = sat_location[0].degrees
    vertical_angle = sat_location[1].degrees
    return (horizontal_angle, vertical_angle)


def remove_file():
    if os.path.exists("stations.txt"):
        os.remove("stations.txt")