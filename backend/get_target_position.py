from skyfield.api import load, wgs84
import os

sat_names = {}
planets = 0

def get_file():
    url = 'https://celestrak.org/NORAD/elements/stations.txt'
    all_sat = load.tle_file(url)
    global sat_names
    sat_names = {sat.name: sat for sat in all_sat}
    global planets
    planets = load('de421.bsp')

def calculate(lat, long, elevation, target) -> tuple:
    time_now = load.timescale().now()
    user_pos = wgs84.latlon(lat, long, elevation_m = elevation)
    if target == "ISS (ZARYA)" or target == "CSS (TIANHE)":
        vector_sum = sat_names[target] - user_pos
        sat_location = vector_sum.at(time_now).altaz()
        vertical_angle = sat_location[0].degrees
        horizontal_angle = sat_location[1].degrees
    else:
        planet = planets[target]
        earth = planets['earth']
        user_topocentric_pos = earth + user_pos
        planet_location = user_topocentric_pos.at(time_now).observe(planet).apparent().altaz()
        vertical_angle = planet_location[0].degrees
        horizontal_angle = planet_location[1].degrees
    print((horizontal_angle, vertical_angle))
    return (horizontal_angle, vertical_angle)

def remove_file():
    if os.path.exists("stations.txt"):
        os.remove("stations.txt")

# get_file()
# calculate(43.475, -80.529, 338, "venus")