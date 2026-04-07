import type { Movie } from '$lib/types/index';

export const movies: Movie[] = [
	// Action
	{ title: 'Die Hard', year: 1988, genres: ['Action', 'Thriller'], imdbRating: 8.2 },
	{ title: 'The Dark Knight', year: 2008, genres: ['Action', 'Crime', 'Drama'], imdbRating: 9.0 },
	{
		title: 'Mad Max: Fury Road',
		year: 2015,
		genres: ['Action', 'Adventure', 'Sci-Fi'],
		imdbRating: 8.1
	},
	{ title: 'Gladiator', year: 2000, genres: ['Action', 'Adventure', 'Drama'], imdbRating: 8.5 },
	{ title: 'The Bourne Identity', year: 2002, genres: ['Action', 'Thriller'], imdbRating: 7.9 },
	{ title: 'John Wick', year: 2014, genres: ['Action', 'Crime', 'Thriller'], imdbRating: 7.4 },
	{
		title: 'Casino Royale',
		year: 2006,
		genres: ['Action', 'Adventure', 'Thriller'],
		imdbRating: 8.0
	},
	{ title: 'The Matrix', year: 1999, genres: ['Action', 'Sci-Fi'], imdbRating: 8.7 },
	{ title: 'Inception', year: 2010, genres: ['Action', 'Adventure', 'Sci-Fi'], imdbRating: 8.8 },
	{ title: 'Interstellar', year: 2014, genres: ['Adventure', 'Drama', 'Sci-Fi'], imdbRating: 8.6 },
	{ title: 'The Avengers', year: 2012, genres: ['Action', 'Sci-Fi'], imdbRating: 8.0 },
	{
		title: 'Guardians of the Galaxy',
		year: 2014,
		genres: ['Action', 'Adventure', 'Sci-Fi'],
		imdbRating: 8.0
	},
	{
		title: 'Spider-Man: Into the Spider-Verse',
		year: 2018,
		genres: ['Action', 'Adventure', 'Animation'],
		imdbRating: 8.4
	},
	{
		title: 'Black Panther',
		year: 2018,
		genres: ['Action', 'Adventure', 'Sci-Fi'],
		imdbRating: 7.3
	},
	{
		title: 'Wonder Woman',
		year: 2017,
		genres: ['Action', 'Adventure', 'Fantasy'],
		imdbRating: 7.4
	},
	{
		title: 'Captain America: The Winter Soldier',
		year: 2014,
		genres: ['Action', 'Adventure', 'Sci-Fi'],
		imdbRating: 7.7
	},
	{ title: 'The Raid 2', year: 2014, genres: ['Action', 'Crime', 'Thriller'], imdbRating: 7.6 },
	{ title: 'Edge of Tomorrow', year: 2014, genres: ['Action', 'Sci-Fi'], imdbRating: 7.9 },
	{
		title: 'Kingsman: The Secret Service',
		year: 2014,
		genres: ['Action', 'Adventure', 'Comedy'],
		imdbRating: 7.0
	},
	{
		title: 'Mission: Impossible - Fallout',
		year: 2018,
		genres: ['Action', 'Adventure', 'Thriller'],
		imdbRating: 7.7
	},

	// Adventure
	{ title: 'Jurassic Park', year: 1993, genres: ['Adventure', 'Sci-Fi'], imdbRating: 8.1 },
	{
		title: 'Indiana Jones and the Last Crusade',
		year: 1989,
		genres: ['Adventure', 'Action'],
		imdbRating: 8.3
	},
	{ title: 'The Goonies', year: 1985, genres: ['Adventure', 'Comedy', 'Family'], imdbRating: 7.9 },
	{
		title: 'Back to the Future',
		year: 1985,
		genres: ['Adventure', 'Comedy', 'Sci-Fi'],
		imdbRating: 8.5
	},
	{ title: 'Up', year: 2009, genres: ['Adventure', 'Animation', 'Comedy'], imdbRating: 8.3 },
	{
		title: 'The Princess Bride',
		year: 1987,
		genres: ['Adventure', 'Comedy', 'Fantasy'],
		imdbRating: 8.0
	},
	{ title: "Pan's Labyrinth", year: 2006, genres: ['Drama', 'Fantasy', 'War'], imdbRating: 8.2 },
	{ title: 'Stardust', year: 2007, genres: ['Adventure', 'Fantasy', 'Romance'], imdbRating: 7.6 },
	{
		title: 'How to Train Your Dragon',
		year: 2010,
		genres: ['Adventure', 'Animation', 'Family'],
		imdbRating: 8.1
	},
	{ title: 'Moana', year: 2016, genres: ['Adventure', 'Animation', 'Comedy'], imdbRating: 7.6 },
	{ title: 'Coco', year: 2017, genres: ['Adventure', 'Animation', 'Drama'], imdbRating: 8.4 },
	{
		title: 'Ratatouille',
		year: 2007,
		genres: ['Adventure', 'Animation', 'Comedy'],
		imdbRating: 8.1
	},
	{ title: 'Soul', year: 2020, genres: ['Adventure', 'Animation', 'Comedy'], imdbRating: 8.0 },
	{
		title: 'The Secret Life of Walter Mitty',
		year: 2013,
		genres: ['Adventure', 'Comedy', 'Drama'],
		imdbRating: 7.3
	},
	{ title: 'Wild', year: 2014, genres: ['Adventure', 'Drama'], imdbRating: 7.1 },
	{
		title: 'The Grand Budapest Hotel',
		year: 2014,
		genres: ['Adventure', 'Comedy', 'Crime'],
		imdbRating: 8.1
	},
	{
		title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
		year: 2003,
		genres: ['Adventure', 'Fantasy', 'Action'],
		imdbRating: 8.0
	},
	{
		title: 'Fantastic Beasts and Where to Find Them',
		year: 2016,
		genres: ['Adventure', 'Family', 'Fantasy'],
		imdbRating: 7.2
	},
	{
		title: 'National Treasure',
		year: 2004,
		genres: ['Adventure', 'Action', 'Mystery'],
		imdbRating: 6.5
	},
	{
		title: 'The Jungle Book',
		year: 2016,
		genres: ['Adventure', 'Family', 'Fantasy'],
		imdbRating: 7.4
	},

	// Animation
	{
		title: 'Spirited Away',
		year: 2001,
		genres: ['Animation', 'Adventure', 'Family'],
		imdbRating: 8.6
	},
	{ title: 'Toy Story', year: 1995, genres: ['Animation', 'Adventure', 'Comedy'], imdbRating: 8.3 },
	{
		title: 'Toy Story 3',
		year: 2010,
		genres: ['Animation', 'Adventure', 'Comedy'],
		imdbRating: 8.3
	},
	{
		title: 'Inside Out',
		year: 2015,
		genres: ['Animation', 'Adventure', 'Comedy'],
		imdbRating: 8.1
	},
	{ title: 'WALL-E', year: 2008, genres: ['Animation', 'Adventure', 'Family'], imdbRating: 8.3 },
	{
		title: 'The Incredibles',
		year: 2004,
		genres: ['Animation', 'Adventure', 'Action'],
		imdbRating: 8.0
	},
	{
		title: 'Finding Nemo',
		year: 2003,
		genres: ['Animation', 'Adventure', 'Comedy'],
		imdbRating: 8.2
	},
	{ title: 'Shrek', year: 2001, genres: ['Animation', 'Adventure', 'Comedy'], imdbRating: 8.1 },
	{ title: 'Shrek 2', year: 2004, genres: ['Animation', 'Adventure', 'Comedy'], imdbRating: 7.2 },
	{
		title: 'Kung Fu Panda',
		year: 2008,
		genres: ['Animation', 'Adventure', 'Action'],
		imdbRating: 7.6
	},
	{ title: 'Ice Age', year: 2002, genres: ['Animation', 'Adventure', 'Comedy'], imdbRating: 7.5 },
	{
		title: 'Despicable Me',
		year: 2010,
		genres: ['Animation', 'Adventure', 'Comedy'],
		imdbRating: 7.6
	},
	{ title: 'Frozen', year: 2013, genres: ['Animation', 'Adventure', 'Comedy'], imdbRating: 7.4 },
	{ title: 'Zootopia', year: 2016, genres: ['Animation', 'Adventure', 'Comedy'], imdbRating: 8.0 },
	{
		title: 'Big Hero 6',
		year: 2014,
		genres: ['Animation', 'Adventure', 'Comedy'],
		imdbRating: 7.8
	},
	{
		title: 'The Lion King',
		year: 1994,
		genres: ['Animation', 'Adventure', 'Drama'],
		imdbRating: 8.5
	},
	{
		title: 'Beauty and the Beast',
		year: 1991,
		genres: ['Animation', 'Family', 'Fantasy'],
		imdbRating: 8.0
	},
	{ title: 'Aladdin', year: 1992, genres: ['Animation', 'Adventure', 'Family'], imdbRating: 8.0 },
	{ title: 'Mulan', year: 1998, genres: ['Animation', 'Adventure', 'Family'], imdbRating: 7.6 },
	{
		title: 'The Nightmare Before Christmas',
		year: 1993,
		genres: ['Animation', 'Family', 'Fantasy'],
		imdbRating: 8.0
	},

	// Comedy
	{ title: 'Superbad', year: 2007, genres: ['Comedy'], imdbRating: 7.6 },
	{ title: 'The Hangover', year: 2009, genres: ['Comedy'], imdbRating: 7.7 },
	{ title: 'Step Brothers', year: 2008, genres: ['Comedy'], imdbRating: 6.9 },
	{
		title: 'Anchorman: The Legend of Ron Burgundy',
		year: 2004,
		genres: ['Comedy'],
		imdbRating: 6.9
	},
	{ title: 'Tropic Thunder', year: 2008, genres: ['Action', 'Comedy'], imdbRating: 7.2 },
	{ title: 'Hot Fuzz', year: 2007, genres: ['Action', 'Comedy', 'Crime'], imdbRating: 7.6 },
	{ title: 'Shaun of the Dead', year: 2004, genres: ['Comedy', 'Horror'], imdbRating: 7.9 },
	{
		title: 'Monty Python and the Holy Grail',
		year: 1975,
		genres: ['Adventure', 'Comedy', 'Fantasy'],
		imdbRating: 8.2
	},
	{ title: 'Airplane!', year: 1980, genres: ['Comedy'], imdbRating: 7.7 },
	{ title: 'Dr. Strangelove', year: 1964, genres: ['Comedy', 'War'], imdbRating: 8.4 },
	{ title: 'Blazing Saddles', year: 1974, genres: ['Comedy', 'Western'], imdbRating: 7.5 },
	{
		title: 'Young Frankenstein',
		year: 1974,
		genres: ['Comedy', 'Horror', 'Sci-Fi'],
		imdbRating: 8.0
	},
	{ title: 'This Is Spinal Tap', year: 1984, genres: ['Comedy', 'Music'], imdbRating: 7.9 },
	{ title: 'The Big Lebowski', year: 1998, genres: ['Comedy', 'Crime', 'Sport'], imdbRating: 8.1 },
	{ title: 'Office Space', year: 1999, genres: ['Comedy'], imdbRating: 7.7 },
	{ title: 'Dodgeball: A True Underdog Story', year: 2004, genres: ['Comedy'], imdbRating: 6.7 },
	{ title: 'Wedding Crashers', year: 2005, genres: ['Comedy', 'Romance'], imdbRating: 6.9 },
	{ title: 'Borat', year: 2006, genres: ['Comedy'], imdbRating: 7.3 },

	// Crime
	{ title: 'Pulp Fiction', year: 1994, genres: ['Crime', 'Drama'], imdbRating: 8.9 },
	{ title: 'The Godfather', year: 1972, genres: ['Crime', 'Drama'], imdbRating: 9.2 },
	{ title: 'The Godfather Part II', year: 1974, genres: ['Crime', 'Drama'], imdbRating: 9.0 },
	{ title: 'Goodfellas', year: 1990, genres: ['Crime', 'Drama'], imdbRating: 8.7 },
	{ title: 'Reservoir Dogs', year: 1992, genres: ['Crime', 'Thriller'], imdbRating: 8.3 },
	{ title: 'Se7en', year: 1995, genres: ['Crime', 'Drama', 'Mystery'], imdbRating: 8.6 },
	{ title: 'The Departed', year: 2006, genres: ['Crime', 'Drama', 'Thriller'], imdbRating: 8.5 },
	{
		title: 'No Country for Old Men',
		year: 2007,
		genres: ['Crime', 'Drama', 'Thriller'],
		imdbRating: 8.1
	},
	{ title: 'Heat', year: 1995, genres: ['Action', 'Crime', 'Drama'], imdbRating: 8.2 },
	{
		title: 'The Usual Suspects',
		year: 1995,
		genres: ['Crime', 'Mystery', 'Thriller'],
		imdbRating: 8.5
	},
	{ title: 'Django Unchained', year: 2012, genres: ['Drama', 'Western'], imdbRating: 8.4 },
	{ title: 'Sicario', year: 2015, genres: ['Action', 'Crime', 'Drama'], imdbRating: 7.6 },
	{ title: 'Spotlight', year: 2015, genres: ['Crime', 'Drama', 'History'], imdbRating: 8.1 },
	{ title: 'Nightcrawler', year: 2014, genres: ['Crime', 'Thriller'], imdbRating: 7.9 },
	{ title: 'Zodiac', year: 2007, genres: ['Crime', 'Drama', 'Mystery'], imdbRating: 7.7 },
	{ title: 'Prisoners', year: 2013, genres: ['Crime', 'Drama', 'Mystery'], imdbRating: 8.1 },
	{ title: 'The Irishman', year: 2019, genres: ['Crime', 'Drama'], imdbRating: 7.8 },
	{
		title: 'Once Upon a Time in Hollywood',
		year: 2019,
		genres: ['Crime', 'Drama'],
		imdbRating: 7.6
	},
	{ title: 'Knives Out', year: 2019, genres: ['Crime', 'Comedy', 'Mystery'], imdbRating: 7.9 },
	{ title: 'Drive', year: 2011, genres: ['Crime', 'Drama'], imdbRating: 7.8 },

	// Drama
	{ title: 'The Shawshank Redemption', year: 1994, genres: ['Drama'], imdbRating: 9.3 },
	{ title: 'Forrest Gump', year: 1994, genres: ['Drama', 'Romance'], imdbRating: 8.8 },
	{ title: 'The Green Mile', year: 1999, genres: ['Crime', 'Drama', 'Fantasy'], imdbRating: 8.6 },
	{ title: 'Saving Private Ryan', year: 1998, genres: ['Drama', 'War'], imdbRating: 8.6 },
	{ title: 'The Social Network', year: 2010, genres: ['Biography', 'Drama'], imdbRating: 7.8 },
	{ title: 'A Beautiful Mind', year: 2001, genres: ['Biography', 'Drama'], imdbRating: 8.2 },
	{
		title: "The King's Speech",
		year: 2010,
		genres: ['Biography', 'Drama', 'History'],
		imdbRating: 8.0
	},
	{
		title: '12 Years a Slave',
		year: 2013,
		genres: ['Biography', 'Drama', 'History'],
		imdbRating: 8.1
	},
	{ title: 'The Revenant', year: 2015, genres: ['Action', 'Adventure', 'Drama'], imdbRating: 8.0 },
	{ title: 'The Martian', year: 2015, genres: ['Adventure', 'Drama', 'Sci-Fi'], imdbRating: 8.0 },
	{ title: 'Gravity', year: 2013, genres: ['Drama', 'Sci-Fi', 'Thriller'], imdbRating: 7.7 },
	{ title: 'Birdman', year: 2014, genres: ['Comedy', 'Drama'], imdbRating: 7.7 },
	{ title: 'Moonlight', year: 2016, genres: ['Drama'], imdbRating: 7.4 },
	{ title: 'La La Land', year: 2016, genres: ['Comedy', 'Drama', 'Music'], imdbRating: 8.0 },
	{ title: 'Manchester by the Sea', year: 2016, genres: ['Drama'], imdbRating: 7.8 },
	{ title: 'Call Me by Your Name', year: 2017, genres: ['Drama', 'Romance'], imdbRating: 7.8 },
	{
		title: 'Three Billboards Outside Ebbing, Missouri',
		year: 2017,
		genres: ['Comedy', 'Crime', 'Drama'],
		imdbRating: 8.1
	},
	{ title: 'Get Out', year: 2017, genres: ['Horror', 'Mystery', 'Thriller'], imdbRating: 7.7 },
	{ title: 'A Quiet Place', year: 2018, genres: ['Horror', 'Drama', 'Sci-Fi'], imdbRating: 7.5 },

	// Horror
	{ title: 'The Exorcist', year: 1973, genres: ['Horror'], imdbRating: 8.0 },
	{ title: 'Hereditary', year: 2018, genres: ['Horror', 'Drama', 'Mystery'], imdbRating: 7.3 },
	{ title: 'The Witch', year: 2015, genres: ['Horror', 'Mystery'], imdbRating: 6.9 },
	{ title: 'It Follows', year: 2014, genres: ['Horror', 'Mystery', 'Thriller'], imdbRating: 6.8 },
	{ title: 'The Babadook', year: 2014, genres: ['Horror', 'Drama'], imdbRating: 6.8 },
	{ title: 'Annihilation', year: 2018, genres: ['Adventure', 'Drama', 'Horror'], imdbRating: 6.8 },
	{ title: 'The Ring', year: 2002, genres: ['Horror', 'Mystery'], imdbRating: 7.1 },
	{
		title: 'The Conjuring',
		year: 2013,
		genres: ['Horror', 'Mystery', 'Thriller'],
		imdbRating: 7.5
	},
	{ title: 'Insidious', year: 2010, genres: ['Horror', 'Mystery', 'Thriller'], imdbRating: 6.6 },
	{ title: 'Sinister', year: 2012, genres: ['Horror', 'Mystery', 'Thriller'], imdbRating: 6.8 },
	{ title: 'The Others', year: 2001, genres: ['Horror', 'Mystery', 'Thriller'], imdbRating: 7.6 },
	{
		title: 'Let the Right One In',
		year: 2008,
		genres: ['Drama', 'Horror', 'Romance'],
		imdbRating: 7.9
	},
	{ title: 'Tucker and Dale vs. Evil', year: 2010, genres: ['Comedy', 'Horror'], imdbRating: 7.0 },
	{
		title: 'Cabin in the Woods',
		year: 2012,
		genres: ['Horror', 'Mystery', 'Thriller'],
		imdbRating: 7.0
	},
	{
		title: 'What We Do in the Shadows',
		year: 2014,
		genres: ['Comedy', 'Fantasy', 'Horror'],
		imdbRating: 7.5
	},
	{
		title: 'Train to Busan',
		year: 2016,
		genres: ['Action', 'Horror', 'Thriller'],
		imdbRating: 7.6
	},
	{ title: 'Raw', year: 2016, genres: ['Drama', 'Horror'], imdbRating: 7.0 },

	// Romance
	{ title: 'Titanic', year: 1997, genres: ['Drama', 'Romance'], imdbRating: 7.9 },
	{
		title: 'The Shape of Water',
		year: 2017,
		genres: ['Drama', 'Fantasy', 'Romance'],
		imdbRating: 7.3
	},
	{
		title: 'Crazy, Stupid, Love',
		year: 2011,
		genres: ['Comedy', 'Drama', 'Romance'],
		imdbRating: 7.4
	},
	{
		title: 'Scott Pilgrim vs. The World',
		year: 2010,
		genres: ['Action', 'Comedy', 'Fantasy'],
		imdbRating: 7.5
	},
	{
		title: 'Silver Linings Playbook',
		year: 2012,
		genres: ['Comedy', 'Drama', 'Romance'],
		imdbRating: 7.7
	},
	{
		title: '500 Days of Summer',
		year: 2009,
		genres: ['Comedy', 'Drama', 'Romance'],
		imdbRating: 7.7
	},
	{
		title: 'Eternal Sunshine of the Spotless Mind',
		year: 2004,
		genres: ['Drama', 'Romance', 'Sci-Fi'],
		imdbRating: 8.3
	},
	{ title: 'Lost in Translation', year: 2003, genres: ['Drama', 'Romance'], imdbRating: 7.4 },
	{ title: 'The Big Sick', year: 2017, genres: ['Comedy', 'Drama', 'Romance'], imdbRating: 7.5 },
	{ title: 'The Before Trilogy', year: 1995, genres: ['Drama', 'Romance'], imdbRating: 8.1 },
	{ title: 'Amelie', year: 2001, genres: ['Comedy', 'Romance'], imdbRating: 8.3 },
	{
		title: 'Romancing the Stone',
		year: 1984,
		genres: ['Action', 'Adventure', 'Comedy'],
		imdbRating: 6.9
	},
	{ title: 'Groundhog Day', year: 1993, genres: ['Comedy', 'Fantasy', 'Romance'], imdbRating: 8.0 },
	{ title: 'Notting Hill', year: 1999, genres: ['Comedy', 'Romance'], imdbRating: 7.0 },
	{ title: 'Love, Actually', year: 2003, genres: ['Comedy', 'Drama', 'Romance'], imdbRating: 7.6 },
	{ title: 'The Holiday', year: 2006, genres: ['Comedy', 'Romance'], imdbRating: 6.9 },
	{
		title: "Bridget Jones's Diary",
		year: 2001,
		genres: ['Comedy', 'Drama', 'Romance'],
		imdbRating: 6.7
	},

	// Sci-Fi
	{
		title: 'Blade Runner 2049',
		year: 2017,
		genres: ['Drama', 'Mystery', 'Sci-Fi'],
		imdbRating: 8.0
	},
	{ title: 'Arrival', year: 2016, genres: ['Drama', 'Mystery', 'Sci-Fi'], imdbRating: 7.9 },
	{ title: 'Ex Machina', year: 2014, genres: ['Drama', 'Sci-Fi', 'Thriller'], imdbRating: 7.7 },
	{ title: 'Dune', year: 2021, genres: ['Action', 'Adventure', 'Sci-Fi'], imdbRating: 8.0 },
	{
		title: 'Everything Everywhere All at Once',
		year: 2022,
		genres: ['Action', 'Adventure', 'Comedy'],
		imdbRating: 7.8
	},
	{ title: 'Minority Report', year: 2002, genres: ['Action', 'Crime', 'Mystery'], imdbRating: 7.6 },
	{ title: 'Looper', year: 2012, genres: ['Action', 'Crime', 'Sci-Fi'], imdbRating: 7.4 },
	{ title: 'Moon', year: 2009, genres: ['Drama', 'Mystery', 'Sci-Fi'], imdbRating: 7.8 },
	{ title: 'Her', year: 2013, genres: ['Drama', 'Romance', 'Sci-Fi'], imdbRating: 8.0 },
	{ title: 'District 9', year: 2009, genres: ['Action', 'Sci-Fi', 'Thriller'], imdbRating: 7.9 },
	{
		title: 'Children of Men',
		year: 2006,
		genres: ['Drama', 'Sci-Fi', 'Thriller'],
		imdbRating: 7.9
	},
	{ title: 'Coherence', year: 2013, genres: ['Drama', 'Sci-Fi', 'Thriller'], imdbRating: 6.9 },
	{ title: 'Primer', year: 2004, genres: ['Drama', 'Sci-Fi', 'Thriller'], imdbRating: 7.0 },
	{ title: 'Predestination', year: 2014, genres: ['Action', 'Drama', 'Sci-Fi'], imdbRating: 7.4 },
	{ title: 'Starship Troopers', year: 1997, genres: ['Action', 'Sci-Fi'], imdbRating: 7.2 },
	{
		title: 'Back to the Future Part II',
		year: 1989,
		genres: ['Adventure', 'Comedy', 'Sci-Fi'],
		imdbRating: 7.8
	},
	{
		title: 'Terminator 2: Judgment Day',
		year: 1991,
		genres: ['Action', 'Sci-Fi'],
		imdbRating: 8.5
	},
	{ title: 'Aliens', year: 1986, genres: ['Action', 'Sci-Fi', 'Thriller'], imdbRating: 8.3 },

	// Thriller
	{
		title: 'The Girl with the Dragon Tattoo',
		year: 2011,
		genres: ['Crime', 'Drama', 'Mystery'],
		imdbRating: 7.8
	},
	{ title: 'Shutter Island', year: 2010, genres: ['Mystery', 'Thriller'], imdbRating: 8.2 },
	{ title: 'Vertigo', year: 1958, genres: ['Mystery', 'Romance', 'Thriller'], imdbRating: 8.3 },
	{ title: 'Rear Window', year: 1954, genres: ['Mystery', 'Thriller'], imdbRating: 8.5 },
	{ title: 'The Sixth Sense', year: 1999, genres: ['Drama', 'Mystery', 'Sci-Fi'], imdbRating: 8.1 },
	{ title: 'Memento', year: 2000, genres: ['Mystery', 'Thriller'], imdbRating: 8.4 },
	{
		title: 'The Silence of the Lambs',
		year: 1991,
		genres: ['Crime', 'Drama', 'Thriller'],
		imdbRating: 8.6
	},
	{ title: 'Fight Club', year: 1999, genres: ['Drama', 'Thriller'], imdbRating: 8.8 },
	{ title: 'Oldboy', year: 2003, genres: ['Action', 'Drama', 'Mystery'], imdbRating: 8.4 },
	{ title: 'Donnie Darko', year: 2001, genres: ['Drama', 'Mystery', 'Sci-Fi'], imdbRating: 8.1 },
	{ title: 'Black Swan', year: 2010, genres: ['Drama', 'Thriller'], imdbRating: 8.0 },
	{ title: 'Nocturnal Animals', year: 2016, genres: ['Drama', 'Thriller'], imdbRating: 7.5 }
];
