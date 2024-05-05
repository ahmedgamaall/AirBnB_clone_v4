#!/usr/bin/python3
""" Script that  Starts a Flash Web Application """

from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid
app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/4-hbnb/', strict_slashes=False)
def hbnb():
    # Retrieve states, amenities, and places from storage
    states = sorted(storage.all(State).values(), key=lambda st: st.name)
    amenities = sorted(storage.all(Amenity).values(), key=lambda am: am.name)
    places = sorted(storage.all(Place).values(), key=lambda pl: pl.name)
    
    sta_cit = []
    # Organize states and their cities into a list of tuples
    sta_cit = [(state, sorted(state.cities, key=lambda city: city.name)) for state in states]

    # Generate a random cache ID
    cache_id = uuid.uuid4()

    # Render the template with the retrieved data
    return render_template('4-hbnb.html',
                           states=sta_cit,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
