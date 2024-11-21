import streamlit as st
import requests
import time
import pickle
from datetime import datetime, timedelta
import os

TMDB_API_KEY = '5177cf0f498db7d0934403c3fb49d409'

class Movie:
    def __init__(self, title, poster_path, overview, release_date, vote_average, vote_count, popularity, adult=None, **kwargs):
        self.title = title
        self.poster_path = poster_path
        self.overview = overview
        self.release_date = release_date
        self.vote_average = vote_average
        self.vote_count = vote_count
        self.popularity = popularity
        self.adult = adult


def get_top_movies():
    data_load_state = st.text('Fetching top movies...')
    url = 'https://api.themoviedb.org/3/movie/top_rated'
    params = {'api_key': TMDB_API_KEY}
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data_load_state.text('Done fetching top movies!')
        return [Movie(**movie_data) for movie_data in response.json().get('results', [])]
    else:
        st.error(f"Error fetching top movies from TMDb API. Status code: {response.status_code}")
        return []


def save_to_binary(data, file_path):
    with open(file_path, 'wb') as binary_file:
        pickle.dump(data, binary_file)

def load_from_binary(file_path):
    try:
        with open(file_path, 'rb') as binary_file:
            return pickle.load(binary_file)
    except FileNotFoundError:
        return []

def is_file_old(file_path, days=1):
    try:
        mod_time = os.path.getmtime(file_path)
        age = time.time() - mod_time
        return age > (days * 24 * 60 * 60)
    except FileNotFoundError:
        return True

def main():
    st.title('Top 10 Movies')
    binary_file_path = 'top_movies.pkl'

    if is_file_old(binary_file_path, days=1) or not os.path.exists(binary_file_path):
        top_movies = get_top_movies()
        save_to_binary(top_movies, binary_file_path)
    else:
        top_movies = load_from_binary(binary_file_path)

    if not top_movies:
        return

    placeholder = st.empty()
    for movie in top_movies:
        with placeholder.container():
            st.image(f"https://image.tmdb.org/t/p/w500{movie.poster_path}", caption='Movie Poster', use_column_width=True)
            st.write(f"**Overview:** {movie.overview}")
            st.write(f"**Release Date:** {movie.release_date}")
            st.write(f"**Vote Average:** {movie.vote_average}")
            st.write(f"**Vote Count:** {movie.vote_count}")
            st.write(f"**Popularity:** {movie.popularity}")

        time.sleep(3)
        placeholder.empty()


if __name__ == '__main__':
    main()


