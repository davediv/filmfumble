// PG-13, ≤180 chars, no title/character/actor names
export const fallbacks: Record<string, string> = {
	// Action
	'Die Hard':
		'An off-duty officer must save his wife from terrorists in a building. The elevator is broken. Lots of climbing ensues.',
	'The Dark Knight':
		'A man in a cape fights a clown who somehow has infinite bombs. Also there is a ferry.',
	'Mad Max: Fury Road':
		'Extremely long car chase across a desert. Everyone is angry and covered in dust.',
	Gladiator:
		'A general loses his family, becomes a slave, then fights to the death in an arena for some reason.',
	'The Bourne Identity':
		'A man with no memory realizes he has very specific skills. He runs everywhere.',
	'John Wick':
		'A retired assassin returns to action after someone kills his dog. This is personal.',
	'Casino Royale':
		'A spy gambles at a card game to stop a terrorist. The villain has an unusual name.',
	'The Matrix':
		'A man discovers that reality is fake and fights lots of agents while wearing a long coat.',
	Inception:
		'Scientists enter dreams to steal secrets. Or is it the opposite? Something about a spinning top.',
	Interstellar: 'Astronauts travel through a black hole to find a new home. There is corn.',
	'The Avengers':
		'A group of powerful people argue a lot before eventually agreeing to work together.',
	'Guardians of the Galaxy':
		'A group of misfits escape from a villain and save the galaxy. There is a dancing raccoon.',
	'Spider-Man: Into the Spider-Verse':
		'Multiple spider people from different dimensions team up to stop a portal.',
	'Black Panther':
		'A king in a futuristic African nation fights his cousin for the throne using advanced technology.',
	'Wonder Woman':
		'A warrior woman leaves her island to stop a war. She carries a shield and has a lasso.',
	'Captain America: The Winter Soldier':
		'A super-soldier uncovers a conspiracy and fights his brainwashed best friend.',
	'The Raid 2': "SWAT team fights assassins and a crime lord's son in a carwash. Very long sequel.",
	'Edge of Tomorrow':
		'A soldier relives the same alien invasion over and over until he gets it right.',
	'Kingsman: The Secret Service':
		'A young recruit and his mentor fight a tech billionaire with an eccentric plan.',
	'Mission: Impossible - Fallout':
		'An agent must track down stolen weapons while his team questions his loyalty.',

	// Adventure
	'Jurassic Park':
		'Scientists visit a theme park full of dinosaurs. The security systems fail immediately.',
	'Indiana Jones and the Last Crusade':
		'An archaeologist searches for a holy artifact with his estranged father.',
	'The Goonies': 'Kids find a treasure map and race a criminal gang to hidden pirate treasure.',
	'Back to the Future':
		"A teenager travels back to 1955 and accidentally interferes with his parents' first meeting.",
	Up: 'An elderly man ties thousands of balloons to his house to go on an adventure with a young scout.',
	'The Princess Bride':
		'A farmhand is kidnapped and multiple people search for him. It is mostly a love story.',
	"Pan's Labyrinth":
		'A girl in wartime Spain enters a magical labyrinth and completes dangerous tasks.',
	Stardust:
		'A young man seeks a fallen star and encounters witches, pirates, and magical creatures.',
	'How to Train Your Dragon':
		'A Viking befriends a dragon instead of killing it. They revolutionise dragon training.',
	Moana: "A chief's daughter sails across the ocean to return a relic and befriends a demigod.",
	Coco: 'A boy enters the Land of the Dead on Dia de los Muertos and discovers his great-great-grandfather.',
	Ratatouille: 'A rat who can cook works in a Parisian restaurant. His friend is a garbage boy.',
	Soul: "A musician's soul leaves his body before his big performance and meets an unborn soul.",
	'The Secret Life of Walter Mitty':
		'A man escapes his boring life by going on real adventures. He also touches a Greenlandic dog.',
	Wild: 'A woman hikes 1,100 miles alone after a personal crisis. She wears very big boots.',
	'The Grand Budapest Hotel':
		'A concierge and his apprentice get tangled up in a paint-by-numbers art theft.',
	'Pirates of the Caribbean: The Curse of the Black Pearl':
		'A pirate captain searches for his cursed treasure while a blacksmith courts his daughter.',
	'Fantastic Beasts and Where to Find Them':
		'A wizard opens his case full of magical creatures in 1920s New York.',
	'National Treasure':
		'A historian hunts for treasure using secret clues on the Declaration of Independence.',
	'The Jungle Book':
		'A boy raised by wolves must defeat a tiger with the help of a bear and a panther.',

	// Animation
	'Spirited Away': 'A girl works in a bathhouse for spirits after her parents turn into pigs.',
	'Toy Story':
		'A cowboy and a spaceman argue about who is the favourite toy. Lots of storage closet adventures.',
	'Toy Story 3':
		'Old toys are donated to a daycare and almost get destroyed. There is a fiery sacrifice sequence.',
	'Inside Out': "Emotions inside a girl's head try to help her adjust to a new city.",
	'WALL-E': 'A robot who cleans up garbage falls in love with a sleek Explorer unit.',
	'The Incredibles':
		'A family of superheroes is forced to hide their powers and fights a villain with a hypnodagger.',
	'Finding Nemo':
		'An overprotective fish searches for his son across the ocean with help from a forgetful companion.',
	Shrek: 'An ogre rescues a princess from a tower and learns to love himself. There are donkeys.',
	'Shrek 2': 'The ogre and donkey go to a land of fairy tale characters and face a cat assassin.',
	'Kung Fu Panda': 'A panda learns kung fu and defeats the villain. Lots of noodle jokes.',
	'Ice Age':
		'Three prehistoric animals try to return a human baby to its tribe. A sloth talks slowly.',
	'Despicable Me': 'A villain adopts three girls and uses them in his plan to steal the moon.',
	Frozen:
		'Two royal sisters are separated by a magical accident and a queen accidentally traps the kingdom in eternal winter.',
	Zootopia:
		'A rabbit and a fox solve a missing-animal case in a city where predator and prey live together.',
	'Big Hero 6':
		'A boy and his healthcare robot team up to fight a masked villain who killed his brother.',
	'The Lion King': 'A young lion must defeat his evil uncle after his father dies in a stampede.',
	'Beauty and the Beast':
		'A prince is turned into a beast and must learn to love someone before the rose wilts.',
	Aladdin: "A street thief uses a genie's wish to court a princess and fight a vizier.",
	Mulan: 'A Chinese woman cuts her hair and joins the army in place of her father.',
	'The Nightmare Before Christmas':
		'A skeleton from Halloween Town opens a portal to Christmas Town.',

	// Comedy
	Superbad:
		'Two high school friends throw a party before college. Their teacher gets involved somehow.',
	'The Hangover':
		'Three men wake up after a bachelor party in Las Vegas with no memory and a baby.',
	'Step Brothers':
		'Two middle-aged men become stepbrothers and refuse to get along until they form a drum circle.',
	'Anchorman: The Legend of Ron Burgundy':
		'A news anchor battles a female rival and encounters a secret channel.',
	'Tropic Thunder':
		'Actors make a war movie and encounter real enemy forces. Someone plays a character who plays a character.',
	'Hot Fuzz': 'A big-city cop in a quiet English village uncovers a dark conspiracy.',
	'Shaun of the Dead':
		'A man fails to break up with his girlfriend, then has to fight zombies in London.',
	'Monty Python and the Holy Grail':
		'Knights search for a Grail while avoiding a persistent Black Knight.',
	'Airplane!': 'A pilot with a drinking problem must land a plane full of passengers.',
	'Dr. Strangelove': 'A general goes insane and orders a nuclear attack on the Soviet Union.',
	'Blazing Saddles':
		'A black sheriff helps a town defeat a villainous businessman with the help of a crazy old codger.',
	'Young Frankenstein':
		'A doctor brings a corpse back to life and must hide it from angry villagers.',
	'This Is Spinal Tap':
		'A rock band tours and tries to record their new album. Their amplifier goes to eleven.',
	'The Big Lebowski': 'A bowler gets mistaken for a millionaire and has to retrieve a rug.',
	'Office Space':
		'A worker tries to steal money from his company after being subjected to a new software system.',
	'Dodgeball: A True Underdog Story':
		'A gym owner enters a dodgeball tournament to save his business from a rival.',
	'Wedding Crashers':
		'Two lawyers spend a summer crashing weddings until one of them falls in love.',
	Borat:
		'A journalist from Kazakhstan makes a documentary in the United States and behaves very badly.',

	// Crime
	'Pulp Fiction':
		"Two gangsters, a boxer, and a gangster's wife have interconnected storylines. Lots of dancing.",
	'The Godfather':
		'The ageing head of a crime dynasty plans to retire and must choose his successor.',
	'The Godfather Part II':
		"The son of a mafia boss takes over while flashbacks show the father's rise to power.",
	Goodfellas:
		'A young man rises through the ranks of a crime family and eventually betrays everyone.',
	'Reservoir Dogs': 'Diamonds are stolen and the thieves argue about a police informant.',
	Se7en:
		'Two detectives hunt a serial killer who is committing murders based on the seven deadly sins.',
	'The Departed': 'An undercover cop and a mole in the police try to identify each other.',
	'No Country for Old Men':
		'A hunter finds a suitcase full of money and is pursued by a hitman with a captive bolt.',
	Heat: 'A detective and a career criminal engage in a long game of cat and mouse across Los Angeles.',
	'The Usual Suspects':
		'A detective interrogates a criminal about an explosion on a boat. Keyser Sóze.',
	'Django Unchained':
		'A freed slave teams up with a German bounty hunter to rescue his wife from a plantation owner.',
	Sicario: 'An FBI agent works with a mysterious government operative to fight a drug cartel.',
	Spotlight: 'Journalists uncover a massive scandal involving the Catholic Church in Boston.',
	Nightcrawler:
		'A man starts filming crimes at night and manipulates his way into the news industry.',
	Zodiac: 'A cartoonist and journalists join the police hunt for the Zodiac Killer for years.',
	Prisoners: 'A father kidnaps a suspect when the police fail to find his missing daughter.',
	'The Irishman':
		'Hitman tells stories about his involvement with the Bufalino crime family and Jimmy Hoffa.',
	'Once Upon a Time in Hollywood':
		'A faded TV actor and his stunt double spend time in 1969 Los Angeles.',
	'Knives Out': 'A detective investigates the death of a wealthy patriarch at a family gathering.',
	Drive: 'A man who does stunt work and drives for criminals gets involved in a heist gone wrong.',

	// Drama
	'The Shawshank Redemption':
		'A banker and a lifer form a friendship during a long prison sentence. Hope is a thing.',
	'Forrest Gump':
		'A simple man with a low IQ accidentally influences several major historical events.',
	'The Green Mile': 'A prison guard befriends a death row inmate with supernatural healing powers.',
	'Saving Private Ryan':
		'Eight men are sent to find and bring home a paratrooper whose three brothers died in action.',
	'The Social Network':
		'Harvard student invents a website that changes the world. It is mostly about lawyers.',
	'A Beautiful Mind':
		'A mathematician wins a Nobel Prize but suffers from hallucinations throughout his life.',
	"The King's Speech": 'A British king works with a speech therapist to overcome his stammer.',
	'12 Years a Slave': 'A free black man is kidnapped and sold into slavery in the American South.',
	'The Revenant':
		'A frontiersman fights a bear and seeks revenge after being left to die by his team.',
	'The Martian':
		'An astronaut is stranded on Mars and must survive alone using science and potatoes.',
	Gravity:
		'Two astronauts are stranded in orbit after debris destroys their shuttle and must get home.',
	Birdman: 'A washed-up actor attempts to direct a play while his career is falling apart.',
	Moonlight: 'A young black man navigates his identity and a difficult life in three acts.',
	'La La Land': 'A jazz musician and an actress fall in love while trying to achieve their dreams.',
	'Manchester by the Sea':
		"A man returns home after his brother's death and must care for his nephew.",
	'Call Me by Your Name':
		"A teenager falls in love with his father's visiting assistant one summer in Italy.",
	'Three Billboards Outside Ebbing, Missouri':
		"A mother rents billboards to pressure police after her daughter's murder.",
	'Get Out': "A young man meets his white girlfriend's family and discovers a disturbing secret.",
	'A Quiet Place': 'A family must survive in a world where monsters hunt by sound.',

	// Horror
	'The Exorcist':
		"A priest is sent to help a possessed child. The child's head spins around a lot.",
	Hereditary:
		'A family experiences terrifying events after the death of their secretive grandmother.',
	'The Witch': 'A Puritan family living near a forest suffers a series of mysterious events.',
	'It Follows':
		'Something pursues a young woman after every sexual encounter. It always catches up.',
	'The Babadook': 'A mother and son deal with a creature from a bedtime story.',
	Annihilation:
		'A team of scientists enters a mysterious zone where the rules of biology do not apply.',
	'The Ring': 'A journalist investigates a cursed videotape and has seven days before she dies.',
	'The Conjuring':
		'A paranormal investigator and his wife help a family being terrorised by a dark presence.',
	Insidious: 'A family must save their son who is in a coma and has become a portal for demons.',
	Sinister:
		'A crime writer discovers a folder of snuff films in the attic of the house he is investigating.',
	'The Others': 'A woman and her two children live in a haunted house and wait for something.',
	'Let the Right One In': 'A boy befriends a vampire girl in a Swedish suburb in winter.',
	'Cabin in the Woods':
		'Five friends visit a remote cabin and are manipulated by a secret organisation.',
	'What We Do in the Shadows': 'Three vampires share a flat in New Zealand and go to a nightclub.',
	'Train to Busan':
		'Zombies overrun a high-speed train in South Korea and passengers must survive.',
	Raw: 'A vegetarian student at a veterinary school discovers a disturbing hunger after a hazing ritual.',

	// Romance
	Titanic:
		'A poor artist and a wealthy woman fall in love aboard a ship that will sink tragically.',
	'The Shape of Water':
		'A cleaning woman befriends a mysterious aquatic creature in a government laboratory.',
	'Crazy, Stupid, Love':
		'A man learns how to pick up women from a smooth-talking character while his wife has an affair.',
	'Scott Pilgrim vs. The World':
		"A musician must defeat his new girlfriend's seven evil exes to be allowed to date her.",
	'Silver Linings Playbook':
		'A man with bipolar disorder and a woman with emotional problems form a strange friendship.',
	'500 Days of Summer':
		'A man reflects on his relationship with a woman who believed in love but did not feel it.',
	'Eternal Sunshine of the Spotless Mind':
		'A couple erases each other from their memories but still find their way back.',
	'Lost in Translation':
		'Two strangers meet in Tokyo and form an unlikely connection during insomnia.',
	'The Big Sick':
		'A Pakistani-American comedian falls in love with a Chicago graduate student. Her parents do not approve.',
	Amelie: 'A shy waitress decides to secretly improve the lives of those around her in Paris.',
	'Groundhog Day':
		'A weatherman is forced to relive the same day in a small town until he gets it right.',
	'Notting Hill':
		'A travel bookshop owner meets a famous actress and they have a improbable romance.',
	'Love, Actually': 'Several couples in London navigate their relationships at Christmas time.',
	'The Holiday': 'Two women swap homes for the holidays and find romance in new locations.',
	"Bridget Jones's Diary":
		'A single British woman tries to improve her life while obsessing over two men.',

	// Sci-Fi
	'Blade Runner 2049':
		'A blade runner uncovers a secret that could destabilise society and goes on the run.',
	Arrival:
		'Linguists attempt to communicate with aliens who have landed and gifted humanity a strange language.',
	'Ex Machina':
		'A programmer is invited to administer a Turing test to an artificial intelligence.',
	Dune: 'A young nobleman travels to a desert planet and becomes the prophesied leader of indigenous people.',
	'Everything Everywhere All at Once':
		'A woman discovers she must save the multiverse and also manage her family.',
	'Minority Report': 'A police officer is accused of a future crime and must prove his innocence.',
	Looper:
		'Assassins called loopers kill people sent back in time. One loops future version of himself.',
	Moon: 'An astronaut on a lunar base discovers he may not be who he thinks he is after a breakdown.',
	Her: 'A man falls in love with an artificial intelligence operating system after his wife leaves him.',
	'District 9':
		'Aliens are stranded on Earth and live in a concentration camp. One befriends a human.',
	'Children of Men':
		'In a dystopian future where humans have become infertile, one woman becomes pregnant.',
	Coherence:
		'Comets pass overhead and dinner party guests experience increasingly strange and terrifying events.',
	Primer:
		'Two engineers accidentally invent a time machine and use it for business and personal gain.',
	Predestination:
		'A temporal agent hunts a terrorist across time and meets himself multiple times.',
	'Starship Troopers':
		'Humans fight giant insects on other planets. The propaganda is extremely cheerful.',
	'Back to the Future Part II':
		"Marty and Doc go to 2015 and must fix a future where Marty's son is in trouble.",
	'Terminator 2: Judgment Day':
		'A woman and a reprogrammed robot protect a boy from an advanced killer robot from the future.',
	Aliens: 'A woman returns to the alien planet and fights a queen with a big power loader.',

	// Thriller
	'Gone Girl':
		'A man becomes the prime suspect when his wife disappears on their wedding anniversary.',
	'The Silence of the Lambs':
		'An FBI trainee seeks help from an imprisoned cannibal to catch another serial killer.',
	'Fight Club':
		'A man and a soap maker form an underground fight club that evolves into an anarchist group.',
	Oldboy:
		'A man is released after fifteen years of captivity and must find his captor for revenge.',
	'Donnie Darko':
		'A teenager behaves erratically after a jet engine falls from the sky and he meets a man in a rabbit suit.',
	'Black Swan':
		'A ballet dancer must play both the white and black swan and loses her grip on reality.',
	'Nocturnal Animals':
		'A man sends his ex-wife a book about a man seeking revenge. She reads it and reflects.',
	Vertigo:
		'A detective retires after his fear of heights ruins an investigation and is hired to follow a woman.',
	'Rear Window': 'A photographer spies on neighbours and thinks one of them has murdered his wife.',
	'The Sixth Sense': 'A child psychologist tries to help a boy who says he can see dead people.',
	Memento: "A man with anterograde amnesia writes notes on his body to avenge his wife's murder."
};
