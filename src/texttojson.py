import json
import re

def format_text_as_json(text, description, external_url, image, name, title, chapter):
    """
    Formats the given structured text into a JSON object with predefined fields.
    Handles verses combined in a single paragraph.

    Args:
    text (str): The structured text with verses.
    description (str): The description.
    external_url (str): The external URL.
    image (str): The image URL.
    name (str): The name.
    title (str): The title of the book or section.
    chapter (str): The chapter number.

    Returns:
    str: A JSON-formatted string.
    """
    # Splitting the text into verses
    verses = re.split(r'(\d+:\d+)', text)
    verses = [verse for verse in verses if verse.strip()]  # Remove empty strings

    # Combining verse numbers with their texts
    combined_text = ""
    for i in range(0, len(verses), 2):
        combined_text += verses[i] + verses[i + 1].strip() + " "

    # Constructing the JSON object with predefined fields
    data = {
        "description": description,
        "external_url": external_url,
        "image": image,
        "name": name,
        "title": title,
        "chapter": chapter,
        "text": combined_text.strip()
    }

    return json.dumps(data, indent=4, ensure_ascii=False)

def write_json_to_file(json_data, filename):
    """
    Writes the given JSON data to a file.

    Args:
    json_data (str): The JSON-formatted string.
    filename (str): The name of the file to write to.
    """
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(json_data)

# Predefined fields
description = "The_Scroll, The future of publishing"
external_url = "http://thescroll.x"
image = "ipfs://QmV7i49zn8R3xfGoHQkjqPinZuGAprw2Zb7oUVFiUpvQeE"
name = "The Bible"
title = "The Bible"
chapter = "Genesis"

# Example usage
text = """1:1 And the LORD called unto Moses, and spake unto him out of the tabernacle of the congregation, saying, 1:2 Speak unto the children of Israel, and say unto them, If any man of you bring an offering unto the LORD, ye shall bring your offering of the cattle, even of the herd, and of the flock.

1:3 If his offering be a burnt sacrifice of the herd, let him offer a male without blemish: he shall offer it of his own voluntary will at the door of the tabernacle of the congregation before the LORD.

1:4 And he shall put his hand upon the head of the burnt offering; and it shall be accepted for him to make atonement for him.

1:5 And he shall kill the bullock before the LORD: and the priests, Aaron’s sons, shall bring the blood, and sprinkle the blood round about upon the altar that is by the door of the tabernacle of the congregation.

1:6 And he shall flay the burnt offering, and cut it into his pieces.

1:7 And the sons of Aaron the priest shall put fire upon the altar, and lay the wood in order upon the fire: 1:8 And the priests, Aaron’s sons, shall lay the parts, the head, and the fat, in order upon the wood that is on the fire which is upon the altar: 1:9 But his inwards and his legs shall he wash in water: and the priest shall burn all on the altar, to be a burnt sacrifice, an offering made by fire, of a sweet savour unto the LORD.

1:10 And if his offering be of the flocks, namely, of the sheep, or of the goats, for a burnt sacrifice; he shall bring it a male without blemish.

1:11 And he shall kill it on the side of the altar northward before the LORD: and the priests, Aaron’s sons, shall sprinkle his blood round about upon the altar.

1:12 And he shall cut it into his pieces, with his head and his fat: and the priest shall lay them in order on the wood that is on the fire which is upon the altar: 1:13 But he shall wash the inwards and the legs with water: and the priest shall bring it all, and burn it upon the altar: it is a burnt sacrifice, an offering made by fire, of a sweet savour unto the LORD.

1:14 And if the burnt sacrifice for his offering to the LORD be of fowls, then he shall bring his offering of turtledoves, or of young pigeons.

1:15 And the priest shall bring it unto the altar, and wring off his head, and burn it on the altar; and the blood thereof shall be wrung out at the side of the altar: 1:16 And he shall pluck away his crop with his feathers, and cast it beside the altar on the east part, by the place of the ashes: 1:17 And he shall cleave it with the wings thereof, but shall not divide it asunder: and the priest shall burn it upon the altar, upon the wood that is upon the fire: it is a burnt sacrifice, an offering made by fire, of a sweet savour unto the LORD.

2:1 And when any will offer a meat offering unto the LORD, his offering shall be of fine flour; and he shall pour oil upon it, and put frankincense thereon: 2:2 And he shall bring it to Aaron’s sons the priests: and he shall take thereout his handful of the flour thereof, and of the oil thereof, with all the frankincense thereof; and the priest shall burn the memorial of it upon the altar, to be an offering made by fire, of a sweet savour unto the LORD: 2:3 And the remnant of the meat offering shall be Aaron’s and his sons’: it is a thing most holy of the offerings of the LORD made by fire.

2:4 And if thou bring an oblation of a meat offering baken in the oven, it shall be unleavened cakes of fine flour mingled with oil, or unleavened wafers anointed with oil.

2:5 And if thy oblation be a meat offering baken in a pan, it shall be of fine flour unleavened, mingled with oil.

2:6 Thou shalt part it in pieces, and pour oil thereon: it is a meat offering.

2:7 And if thy oblation be a meat offering baken in the fryingpan, it shall be made of fine flour with oil.

2:8 And thou shalt bring the meat offering that is made of these things unto the LORD: and when it is presented unto the priest, he shall bring it unto the altar.

2:9 And the priest shall take from the meat offering a memorial thereof, and shall burn it upon the altar: it is an offering made by fire, of a sweet savour unto the LORD.

2:10 And that which is left of the meat offering shall be Aaron’s and his sons’: it is a thing most holy of the offerings of the LORD made by fire.

2:11 No meat offering, which ye shall bring unto the LORD, shall be made with leaven: for ye shall burn no leaven, nor any honey, in any offering of the LORD made by fire.

2:12 As for the oblation of the firstfruits, ye shall offer them unto the LORD: but they shall not be burnt on the altar for a sweet savour.

2:13 And every oblation of thy meat offering shalt thou season with salt; neither shalt thou suffer the salt of the covenant of thy God to be lacking from thy meat offering: with all thine offerings thou shalt offer salt.

2:14 And if thou offer a meat offering of thy firstfruits unto the LORD, thou shalt offer for the meat offering of thy firstfruits green ears of corn dried by the fire, even corn beaten out of full ears.

2:15 And thou shalt put oil upon it, and lay frankincense thereon: it is a meat offering.

2:16 And the priest shall burn the memorial of it, part of the beaten corn thereof, and part of the oil thereof, with all the frankincense thereof: it is an offering made by fire unto the LORD.

3:1 And if his oblation be a sacrifice of peace offering, if he offer it of the herd; whether it be a male or female, he shall offer it without blemish before the LORD.

3:2 And he shall lay his hand upon the head of his offering, and kill it at the door of the tabernacle of the congregation: and Aaron’s sons the priests shall sprinkle the blood upon the altar round about.

3:3 And he shall offer of the sacrifice of the peace offering an offering made by fire unto the LORD; the fat that covereth the inwards, and all the fat that is upon the inwards, 3:4 And the two kidneys, and the fat that is on them, which is by the flanks, and the caul above the liver, with the kidneys, it shall he take away.

3:5 And Aaron’s sons shall burn it on the altar upon the burnt sacrifice, which is upon the wood that is on the fire: it is an offering made by fire, of a sweet savour unto the LORD.

3:6 And if his offering for a sacrifice of peace offering unto the LORD be of the flock; male or female, he shall offer it without blemish.

3:7 If he offer a lamb for his offering, then shall he offer it before the LORD.

3:8 And he shall lay his hand upon the head of his offering, and kill it before the tabernacle of the congregation: and Aaron’s sons shall sprinkle the blood thereof round about upon the altar.

3:9 And he shall offer of the sacrifice of the peace offering an offering made by fire unto the LORD; the fat thereof, and the whole rump, it shall he take off hard by the backbone; and the fat that covereth the inwards, and all the fat that is upon the inwards, 3:10 And the two kidneys, and the fat that is upon them, which is by the flanks, and the caul above the liver, with the kidneys, it shall he take away.

3:11 And the priest shall burn it upon the altar: it is the food of the offering made by fire unto the LORD.

3:12 And if his offering be a goat, then he shall offer it before the LORD.

3:13 And he shall lay his hand upon the head of it, and kill it before the tabernacle of the congregation: and the sons of Aaron shall sprinkle the blood thereof upon the altar round about.

3:14 And he shall offer thereof his offering, even an offering made by fire unto the LORD; the fat that covereth the inwards, and all the fat that is upon the inwards, 3:15 And the two kidneys, and the fat that is upon them, which is by the flanks, and the caul above the liver, with the kidneys, it shall he take away.

3:16 And the priest shall burn them upon the altar: it is the food of the offering made by fire for a sweet savour: all the fat is the LORD’s.

3:17 It shall be a perpetual statute for your generations throughout all your dwellings, that ye eat neither fat nor blood.

4:1 And the LORD spake unto Moses, saying, 4:2 Speak unto the children of Israel, saying, If a soul shall sin through ignorance against any of the commandments of the LORD concerning things which ought not to be done, and shall do against any of them: 4:3 If the priest that is anointed do sin according to the sin of the people; then let him bring for his sin, which he hath sinned, a young bullock without blemish unto the LORD for a sin offering.

4:4 And he shall bring the bullock unto the door of the tabernacle of the congregation before the LORD; and shall lay his hand upon the bullock’s head, and kill the bullock before the LORD.

4:5 And the priest that is anointed shall take of the bullock’s blood, and bring it to the tabernacle of the congregation: 4:6 And the priest shall dip his finger in the blood, and sprinkle of the blood seven times before the LORD, before the vail of the sanctuary.

4:7 And the priest shall put some of the blood upon the horns of the altar of sweet incense before the LORD, which is in the tabernacle of the congregation; and shall pour all the blood of the bullock at the bottom of the altar of the burnt offering, which is at the door of the tabernacle of the congregation.

4:8 And he shall take off from it all the fat of the bullock for the sin offering; the fat that covereth the inwards, and all the fat that is upon the inwards, 4:9 And the two kidneys, and the fat that is upon them, which is by the flanks, and the caul above the liver, with the kidneys, it shall he take away, 4:10 As it was taken off from the bullock of the sacrifice of peace offerings: and the priest shall burn them upon the altar of the burnt offering.

4:11 And the skin of the bullock, and all his flesh, with his head, and with his legs, and his inwards, and his dung, 4:12 Even the whole bullock shall he carry forth without the camp unto a clean place, where the ashes are poured out, and burn him on the wood with fire: where the ashes are poured out shall he be burnt.

4:13 And if the whole congregation of Israel sin through ignorance, and the thing be hid from the eyes of the assembly, and they have done somewhat against any of the commandments of the LORD concerning things which should not be done, and are guilty; 4:14 When the sin, which they have sinned against it, is known, then the congregation shall offer a young bullock for the sin, and bring him before the tabernacle of the congregation.

4:15 And the elders of the congregation shall lay their hands upon the head of the bullock before the LORD: and the bullock shall be killed before the LORD.

4:16 And the priest that is anointed shall bring of the bullock’s blood to the tabernacle of the congregation: 4:17 And the priest shall dip his finger in some of the blood, and sprinkle it seven times before the LORD, even before the vail.

4:18 And he shall put some of the blood upon the horns of the altar which is before the LORD, that is in the tabernacle of the congregation, and shall pour out all the blood at the bottom of the altar of the burnt offering, which is at the door of the tabernacle of the congregation.

4:19 And he shall take all his fat from him, and burn it upon the altar.

4:20 And he shall do with the bullock as he did with the bullock for a sin offering, so shall he do with this: and the priest shall make an atonement for them, and it shall be forgiven them.

4:21 And he shall carry forth the bullock without the camp, and burn him as he burned the first bullock: it is a sin offering for the congregation.

4:22 When a ruler hath sinned, and done somewhat through ignorance against any of the commandments of the LORD his God concerning things which should not be done, and is guilty; 4:23 Or if his sin, wherein he hath sinned, come to his knowledge; he shall bring his offering, a kid of the goats, a male without blemish: 4:24 And he shall lay his hand upon the head of the goat, and kill it in the place where they kill the burnt offering before the LORD: it is a sin offering.

4:25 And the priest shall take of the blood of the sin offering with his finger, and put it upon the horns of the altar of burnt offering, and shall pour out his blood at the bottom of the altar of burnt offering.

4:26 And he shall burn all his fat upon the altar, as the fat of the sacrifice of peace offerings: and the priest shall make an atonement for him as concerning his sin, and it shall be forgiven him.

4:27 And if any one of the common people sin through ignorance, while he doeth somewhat against any of the commandments of the LORD concerning things which ought not to be done, and be guilty; 4:28 Or if his sin, which he hath sinned, come to his knowledge: then he shall bring his offering, a kid of the goats, a female without blemish, for his sin which he hath sinned.

4:29 And he shall lay his hand upon the head of the sin offering, and slay the sin offering in the place of the burnt offering.

4:30 And the priest shall take of the blood thereof with his finger, and put it upon the horns of the altar of burnt offering, and shall pour out all the blood thereof at the bottom of the altar.

4:31 And he shall take away all the fat thereof, as the fat is taken away from off the sacrifice of peace offerings; and the priest shall burn it upon the altar for a sweet savour unto the LORD; and the priest shall make an atonement for him, and it shall be forgiven him.

4:32 And if he bring a lamb for a sin offering, he shall bring it a female without blemish.

4:33 And he shall lay his hand upon the head of the sin offering, and slay it for a sin offering in the place where they kill the burnt offering.

4:34 And the priest shall take of the blood of the sin offering with his finger, and put it upon the horns of the altar of burnt offering, and shall pour out all the blood thereof at the bottom of the altar: 4:35 And he shall take away all the fat thereof, as the fat of the lamb is taken away from the sacrifice of the peace offerings; and the priest shall burn them upon the altar, according to the offerings made by fire unto the LORD: and the priest shall make an atonement for his sin that he hath committed, and it shall be forgiven him.

5:1 And if a soul sin, and hear the voice of swearing, and is a witness, whether he hath seen or known of it; if he do not utter it, then he shall bear his iniquity.

5:2 Or if a soul touch any unclean thing, whether it be a carcase of an unclean beast, or a carcase of unclean cattle, or the carcase of unclean creeping things, and if it be hidden from him; he also shall be unclean, and guilty.

5:3 Or if he touch the uncleanness of man, whatsoever uncleanness it be that a man shall be defiled withal, and it be hid from him; when he knoweth of it, then he shall be guilty.

5:4 Or if a soul swear, pronouncing with his lips to do evil, or to do good, whatsoever it be that a man shall pronounce with an oath, and it be hid from him; when he knoweth of it, then he shall be guilty in one of these.

5:5 And it shall be, when he shall be guilty in one of these things, that he shall confess that he hath sinned in that thing: 5:6 And he shall bring his trespass offering unto the LORD for his sin which he hath sinned, a female from the flock, a lamb or a kid of the goats, for a sin offering; and the priest shall make an atonement for him concerning his sin.

5:7 And if he be not able to bring a lamb, then he shall bring for his trespass, which he hath committed, two turtledoves, or two young pigeons, unto the LORD; one for a sin offering, and the other for a burnt offering.

5:8 And he shall bring them unto the priest, who shall offer that which is for the sin offering first, and wring off his head from his neck, but shall not divide it asunder: 5:9 And he shall sprinkle of the blood of the sin offering upon the side of the altar; and the rest of the blood shall be wrung out at the bottom of the altar: it is a sin offering.

5:10 And he shall offer the second for a burnt offering, according to the manner: and the priest shall make an atonement for him for his sin which he hath sinned, and it shall be forgiven him.

5:11 But if he be not able to bring two turtledoves, or two young pigeons, then he that sinned shall bring for his offering the tenth part of an ephah of fine flour for a sin offering; he shall put no oil upon it, neither shall he put any frankincense thereon: for it is a sin offering.

5:12 Then shall he bring it to the priest, and the priest shall take his handful of it, even a memorial thereof, and burn it on the altar, according to the offerings made by fire unto the LORD: it is a sin offering.

5:13 And the priest shall make an atonement for him as touching his sin that he hath sinned in one of these, and it shall be forgiven him: and the remnant shall be the priest’s, as a meat offering.

5:14 And the LORD spake unto Moses, saying, 5:15 If a soul commit a trespass, and sin through ignorance, in the holy things of the LORD; then he shall bring for his trespass unto the LORD a ram without blemish out of the flocks, with thy estimation by shekels of silver, after the shekel of the sanctuary, for a trespass offering.

5:16 And he shall make amends for the harm that he hath done in the holy thing, and shall add the fifth part thereto, and give it unto the priest: and the priest shall make an atonement for him with the ram of the trespass offering, and it shall be forgiven him.

5:17 And if a soul sin, and commit any of these things which are forbidden to be done by the commandments of the LORD; though he wist it not, yet is he guilty, and shall bear his iniquity.

5:18 And he shall bring a ram without blemish out of the flock, with thy estimation, for a trespass offering, unto the priest: and the priest shall make an atonement for him concerning his ignorance wherein he erred and wist it not, and it shall be forgiven him.

5:19 It is a trespass offering: he hath certainly trespassed against the LORD.

6:1 And the LORD spake unto Moses, saying, 6:2 If a soul sin, and commit a trespass against the LORD, and lie unto his neighbour in that which was delivered him to keep, or in fellowship, or in a thing taken away by violence, or hath deceived his neighbour; 6:3 Or have found that which was lost, and lieth concerning it, and sweareth falsely; in any of all these that a man doeth, sinning therein: 6:4 Then it shall be, because he hath sinned, and is guilty, that he shall restore that which he took violently away, or the thing which he hath deceitfully gotten, or that which was delivered him to keep, or the lost thing which he found, 6:5 Or all that about which he hath sworn falsely; he shall even restore it in the principal, and shall add the fifth part more thereto, and give it unto him to whom it appertaineth, in the day of his trespass offering.

6:6 And he shall bring his trespass offering unto the LORD, a ram without blemish out of the flock, with thy estimation, for a trespass offering, unto the priest: 6:7 And the priest shall make an atonement for him before the LORD: and it shall be forgiven him for any thing of all that he hath done in trespassing therein.

6:8 And the LORD spake unto Moses, saying, 6:9 Command Aaron and his sons, saying, This is the law of the burnt offering: It is the burnt offering, because of the burning upon the altar all night unto the morning, and the fire of the altar shall be burning in it.

6:10 And the priest shall put on his linen garment, and his linen breeches shall he put upon his flesh, and take up the ashes which the fire hath consumed with the burnt offering on the altar, and he shall put them beside the altar.

6:11 And he shall put off his garments, and put on other garments, and carry forth the ashes without the camp unto a clean place.

6:12 And the fire upon the altar shall be burning in it; it shall not be put out: and the priest shall burn wood on it every morning, and lay the burnt offering in order upon it; and he shall burn thereon the fat of the peace offerings.

6:13 The fire shall ever be burning upon the altar; it shall never go out.

6:14 And this is the law of the meat offering: the sons of Aaron shall offer it before the LORD, before the altar.

6:15 And he shall take of it his handful, of the flour of the meat offering, and of the oil thereof, and all the frankincense which is upon the meat offering, and shall burn it upon the altar for a sweet savour, even the memorial of it, unto the LORD.

6:16 And the remainder thereof shall Aaron and his sons eat: with unleavened bread shall it be eaten in the holy place; in the court of the tabernacle of the congregation they shall eat it.

6:17 It shall not be baken with leaven. I have given it unto them for their portion of my offerings made by fire; it is most holy, as is the sin offering, and as the trespass offering.

6:18 All the males among the children of Aaron shall eat of it. It shall be a statute for ever in your generations concerning the offerings of the LORD made by fire: every one that toucheth them shall be holy.

6:19 And the LORD spake unto Moses, saying, 6:20 This is the offering of Aaron and of his sons, which they shall offer unto the LORD in the day when he is anointed; the tenth part of an ephah of fine flour for a meat offering perpetual, half of it in the morning, and half thereof at night.

6:21 In a pan it shall be made with oil; and when it is baken, thou shalt bring it in: and the baken pieces of the meat offering shalt thou offer for a sweet savour unto the LORD.

6:22 And the priest of his sons that is anointed in his stead shall offer it: it is a statute for ever unto the LORD; it shall be wholly burnt.

6:23 For every meat offering for the priest shall be wholly burnt: it shall not be eaten.

6:24 And the LORD spake unto Moses, saying, 6:25 Speak unto Aaron and to his sons, saying, This is the law of the sin offering: In the place where the burnt offering is killed shall the sin offering be killed before the LORD: it is most holy.

6:26 The priest that offereth it for sin shall eat it: in the holy place shall it be eaten, in the court of the tabernacle of the congregation.

6:27 Whatsoever shall touch the flesh thereof shall be holy: and when there is sprinkled of the blood thereof upon any garment, thou shalt wash that whereon it was sprinkled in the holy place.

6:28 But the earthen vessel wherein it is sodden shall be broken: and if it be sodden in a brasen pot, it shall be both scoured, and rinsed in water.

6:29 All the males among the priests shall eat thereof: it is most holy.

6:30 And no sin offering, whereof any of the blood is brought into the tabernacle of the congregation to reconcile withal in the holy place, shall be eaten: it shall be burnt in the fire.

7:1 Likewise this is the law of the trespass offering: it is most holy.

7:2 In the place where they kill the burnt offering shall they kill the trespass offering: and the blood thereof shall he sprinkle round about upon the altar.

7:3 And he shall offer of it all the fat thereof; the rump, and the fat that covereth the inwards, 7:4 And the two kidneys, and the fat that is on them, which is by the flanks, and the caul that is above the liver, with the kidneys, it shall he take away: 7:5 And the priest shall burn them upon the altar for an offering made by fire unto the LORD: it is a trespass offering.

7:6 Every male among the priests shall eat thereof: it shall be eaten in the holy place: it is most holy.

7:7 As the sin offering is, so is the trespass offering: there is one law for them: the priest that maketh atonement therewith shall have it.

7:8 And the priest that offereth any man’s burnt offering, even the priest shall have to himself the skin of the burnt offering which he hath offered.

7:9 And all the meat offering that is baken in the oven, and all that is dressed in the fryingpan, and in the pan, shall be the priest’s that offereth it.

7:10 And every meat offering, mingled with oil, and dry, shall all the sons of Aaron have, one as much as another.

7:11 And this is the law of the sacrifice of peace offerings, which he shall offer unto the LORD.

7:12 If he offer it for a thanksgiving, then he shall offer with the sacrifice of thanksgiving unleavened cakes mingled with oil, and unleavened wafers anointed with oil, and cakes mingled with oil, of fine flour, fried.

7:13 Besides the cakes, he shall offer for his offering leavened bread with the sacrifice of thanksgiving of his peace offerings.

7:14 And of it he shall offer one out of the whole oblation for an heave offering unto the LORD, and it shall be the priest’s that sprinkleth the blood of the peace offerings.

7:15 And the flesh of the sacrifice of his peace offerings for thanksgiving shall be eaten the same day that it is offered; he shall not leave any of it until the morning.

7:16 But if the sacrifice of his offering be a vow, or a voluntary offering, it shall be eaten the same day that he offereth his sacrifice: and on the morrow also the remainder of it shall be eaten: 7:17 But the remainder of the flesh of the sacrifice on the third day shall be burnt with fire.

7:18 And if any of the flesh of the sacrifice of his peace offerings be eaten at all on the third day, it shall not be accepted, neither shall it be imputed unto him that offereth it: it shall be an abomination, and the soul that eateth of it shall bear his iniquity.

7:19 And the flesh that toucheth any unclean thing shall not be eaten; it shall be burnt with fire: and as for the flesh, all that be clean shall eat thereof.

7:20 But the soul that eateth of the flesh of the sacrifice of peace offerings, that pertain unto the LORD, having his uncleanness upon him, even that soul shall be cut off from his people.

7:21 Moreover the soul that shall touch any unclean thing, as the uncleanness of man, or any unclean beast, or any abominable unclean thing, and eat of the flesh of the sacrifice of peace offerings, which pertain unto the LORD, even that soul shall be cut off from his people.

7:22 And the LORD spake unto Moses, saying, 7:23 Speak unto the children of Israel, saying, Ye shall eat no manner of fat, of ox, or of sheep, or of goat.

7:24 And the fat of the beast that dieth of itself, and the fat of that which is torn with beasts, may be used in any other use: but ye shall in no wise eat of it.

7:25 For whosoever eateth the fat of the beast, of which men offer an offering made by fire unto the LORD, even the soul that eateth it shall be cut off from his people.

7:26 Moreover ye shall eat no manner of blood, whether it be of fowl or of beast, in any of your dwellings.

7:27 Whatsoever soul it be that eateth any manner of blood, even that soul shall be cut off from his people.

7:28 And the LORD spake unto Moses, saying, 7:29 Speak unto the children of Israel, saying, He that offereth the sacrifice of his peace offerings unto the LORD shall bring his oblation unto the LORD of the sacrifice of his peace offerings.

7:30 His own hands shall bring the offerings of the LORD made by fire, the fat with the breast, it shall he bring, that the breast may be waved for a wave offering before the LORD.

7:31 And the priest shall burn the fat upon the altar: but the breast shall be Aaron’s and his sons’.

7:32 And the right shoulder shall ye give unto the priest for an heave offering of the sacrifices of your peace offerings.

7:33 He among the sons of Aaron, that offereth the blood of the peace offerings, and the fat, shall have the right shoulder for his part.

7:34 For the wave breast and the heave shoulder have I taken of the children of Israel from off the sacrifices of their peace offerings, and have given them unto Aaron the priest and unto his sons by a statute for ever from among the children of Israel.

7:35 This is the portion of the anointing of Aaron, and of the anointing of his sons, out of the offerings of the LORD made by fire, in the day when he presented them to minister unto the LORD in the priest’s office; 7:36 Which the LORD commanded to be given them of the children of Israel, in the day that he anointed them, by a statute for ever throughout their generations.

7:37 This is the law of the burnt offering, of the meat offering, and of the sin offering, and of the trespass offering, and of the consecrations, and of the sacrifice of the peace offerings; 7:38 Which the LORD commanded Moses in mount Sinai, in the day that he commanded the children of Israel to offer their oblations unto the LORD, in the wilderness of Sinai.

8:1 And the LORD spake unto Moses, saying, 8:2 Take Aaron and his sons with him, and the garments, and the anointing oil, and a bullock for the sin offering, and two rams, and a basket of unleavened bread; 8:3 And gather thou all the congregation together unto the door of the tabernacle of the congregation.

8:4 And Moses did as the LORD commanded him; and the assembly was gathered together unto the door of the tabernacle of the congregation.

8:5 And Moses said unto the congregation, This is the thing which the LORD commanded to be done.

8:6 And Moses brought Aaron and his sons, and washed them with water.

8:7 And he put upon him the coat, and girded him with the girdle, and clothed him with the robe, and put the ephod upon him, and he girded him with the curious girdle of the ephod, and bound it unto him therewith.

8:8 And he put the breastplate upon him: also he put in the breastplate the Urim and the Thummim.

8:9 And he put the mitre upon his head; also upon the mitre, even upon his forefront, did he put the golden plate, the holy crown; as the LORD commanded Moses.

8:10 And Moses took the anointing oil, and anointed the tabernacle and all that was therein, and sanctified them.

8:11 And he sprinkled thereof upon the altar seven times, and anointed the altar and all his vessels, both the laver and his foot, to sanctify them.

8:12 And he poured of the anointing oil upon Aaron’s head, and anointed him, to sanctify him.

8:13 And Moses brought Aaron’s sons, and put coats upon them, and girded them with girdles, and put bonnets upon them; as the LORD commanded Moses.

8:14 And he brought the bullock for the sin offering: and Aaron and his sons laid their hands upon the head of the bullock for the sin offering.

8:15 And he slew it; and Moses took the blood, and put it upon the horns of the altar round about with his finger, and purified the altar, and poured the blood at the bottom of the altar, and sanctified it, to make reconciliation upon it.

8:16 And he took all the fat that was upon the inwards, and the caul above the liver, and the two kidneys, and their fat, and Moses burned it upon the altar.

8:17 But the bullock, and his hide, his flesh, and his dung, he burnt with fire without the camp; as the LORD commanded Moses.

8:18 And he brought the ram for the burnt offering: and Aaron and his sons laid their hands upon the head of the ram.

8:19 And he killed it; and Moses sprinkled the blood upon the altar round about.

8:20 And he cut the ram into pieces; and Moses burnt the head, and the pieces, and the fat.

8:21 And he washed the inwards and the legs in water; and Moses burnt the whole ram upon the altar: it was a burnt sacrifice for a sweet savour, and an offering made by fire unto the LORD; as the LORD commanded Moses.

8:22 And he brought the other ram, the ram of consecration: and Aaron and his sons laid their hands upon the head of the ram.

8:23 And he slew it; and Moses took of the blood of it, and put it upon the tip of Aaron’s right ear, and upon the thumb of his right hand, and upon the great toe of his right foot.

8:24 And he brought Aaron’s sons, and Moses put of the blood upon the tip of their right ear, and upon the thumbs of their right hands, and upon the great toes of their right feet: and Moses sprinkled the blood upon the altar round about.

8:25 And he took the fat, and the rump, and all the fat that was upon the inwards, and the caul above the liver, and the two kidneys, and their fat, and the right shoulder: 8:26 And out of the basket of unleavened bread, that was before the LORD, he took one unleavened cake, and a cake of oiled bread, and one wafer, and put them on the fat, and upon the right shoulder: 8:27 And he put all upon Aaron’s hands, and upon his sons’ hands, and waved them for a wave offering before the LORD.

8:28 And Moses took them from off their hands, and burnt them on the altar upon the burnt offering: they were consecrations for a sweet savour: it is an offering made by fire unto the LORD.

8:29 And Moses took the breast, and waved it for a wave offering before the LORD: for of the ram of consecration it was Moses’ part; as the LORD commanded Moses.

8:30 And Moses took of the anointing oil, and of the blood which was upon the altar, and sprinkled it upon Aaron, and upon his garments, and upon his sons, and upon his sons’ garments with him; and sanctified Aaron, and his garments, and his sons, and his sons’ garments with him.

8:31 And Moses said unto Aaron and to his sons, Boil the flesh at the door of the tabernacle of the congregation: and there eat it with the bread that is in the basket of consecrations, as I commanded, saying, Aaron and his sons shall eat it.

8:32 And that which remaineth of the flesh and of the bread shall ye burn with fire.

8:33 And ye shall not go out of the door of the tabernacle of the congregation in seven days, until the days of your consecration be at an end: for seven days shall he consecrate you.

8:34 As he hath done this day, so the LORD hath commanded to do, to make an atonement for you.

8:35 Therefore shall ye abide at the door of the tabernacle of the congregation day and night seven days, and keep the charge of the LORD, that ye die not: for so I am commanded.

8:36 So Aaron and his sons did all things which the LORD commanded by the hand of Moses.

9:1 And it came to pass on the eighth day, that Moses called Aaron and his sons, and the elders of Israel; 9:2 And he said unto Aaron, Take thee a young calf for a sin offering, and a ram for a burnt offering, without blemish, and offer them before the LORD.

9:3 And unto the children of Israel thou shalt speak, saying, Take ye a kid of the goats for a sin offering; and a calf and a lamb, both of the first year, without blemish, for a burnt offering; 9:4 Also a bullock and a ram for peace offerings, to sacrifice before the LORD; and a meat offering mingled with oil: for to day the LORD will appear unto you.

9:5 And they brought that which Moses commanded before the tabernacle of the congregation: and all the congregation drew near and stood before the LORD.

9:6 And Moses said, This is the thing which the LORD commanded that ye should do: and the glory of the LORD shall appear unto you.

9:7 And Moses said unto Aaron, Go unto the altar, and offer thy sin offering, and thy burnt offering, and make an atonement for thyself, and for the people: and offer the offering of the people, and make an atonement for them; as the LORD commanded.

9:8 Aaron therefore went unto the altar, and slew the calf of the sin offering, which was for himself.

9:9 And the sons of Aaron brought the blood unto him: and he dipped his finger in the blood, and put it upon the horns of the altar, and poured out the blood at the bottom of the altar: 9:10 But the fat, and the kidneys, and the caul above the liver of the sin offering, he burnt upon the altar; as the LORD commanded Moses.

9:11 And the flesh and the hide he burnt with fire without the camp.

9:12 And he slew the burnt offering; and Aaron’s sons presented unto him the blood, which he sprinkled round about upon the altar.

9:13 And they presented the burnt offering unto him, with the pieces thereof, and the head: and he burnt them upon the altar.

9:14 And he did wash the inwards and the legs, and burnt them upon the burnt offering on the altar.

9:15 And he brought the people’s offering, and took the goat, which was the sin offering for the people, and slew it, and offered it for sin, as the first.

9:16 And he brought the burnt offering, and offered it according to the manner.

9:17 And he brought the meat offering, and took an handful thereof, and burnt it upon the altar, beside the burnt sacrifice of the morning.

9:18 He slew also the bullock and the ram for a sacrifice of peace offerings, which was for the people: and Aaron’s sons presented unto him the blood, which he sprinkled upon the altar round about, 9:19 And the fat of the bullock and of the ram, the rump, and that which covereth the inwards, and the kidneys, and the caul above the liver: 9:20 And they put the fat upon the breasts, and he burnt the fat upon the altar: 9:21 And the breasts and the right shoulder Aaron waved for a wave offering before the LORD; as Moses commanded.

9:22 And Aaron lifted up his hand toward the people, and blessed them, and came down from offering of the sin offering, and the burnt offering, and peace offerings.

9:23 And Moses and Aaron went into the tabernacle of the congregation, and came out, and blessed the people: and the glory of the LORD appeared unto all the people.

9:24 And there came a fire out from before the LORD, and consumed upon the altar the burnt offering and the fat: which when all the people saw, they shouted, and fell on their faces.

10:1 And Nadab and Abihu, the sons of Aaron, took either of them his censer, and put fire therein, and put incense thereon, and offered strange fire before the LORD, which he commanded them not.

10:2 And there went out fire from the LORD, and devoured them, and they died before the LORD.

10:3 Then Moses said unto Aaron, This is it that the LORD spake, saying, I will be sanctified in them that come nigh me, and before all the people I will be glorified. And Aaron held his peace.

10:4 And Moses called Mishael and Elzaphan, the sons of Uzziel the uncle of Aaron, and said unto them, Come near, carry your brethren from before the sanctuary out of the camp.

10:5 So they went near, and carried them in their coats out of the camp; as Moses had said.

10:6 And Moses said unto Aaron, and unto Eleazar and unto Ithamar, his sons, Uncover not your heads, neither rend your clothes; lest ye die, and lest wrath come upon all the people: but let your brethren, the whole house of Israel, bewail the burning which the LORD hath kindled.

10:7 And ye shall not go out from the door of the tabernacle of the congregation, lest ye die: for the anointing oil of the LORD is upon you. And they did according to the word of Moses.

10:8 And the LORD spake unto Aaron, saying, 10:9 Do not drink wine nor strong drink, thou, nor thy sons with thee, when ye go into the tabernacle of the congregation, lest ye die: it shall be a statute for ever throughout your generations: 10:10 And that ye may put difference between holy and unholy, and between unclean and clean; 10:11 And that ye may teach the children of Israel all the statutes which the LORD hath spoken unto them by the hand of Moses.

10:12 And Moses spake unto Aaron, and unto Eleazar and unto Ithamar, his sons that were left, Take the meat offering that remaineth of the offerings of the LORD made by fire, and eat it without leaven beside the altar: for it is most holy: 10:13 And ye shall eat it in the holy place, because it is thy due, and thy sons’ due, of the sacrifices of the LORD made by fire: for so I am commanded.

10:14 And the wave breast and heave shoulder shall ye eat in a clean place; thou, and thy sons, and thy daughters with thee: for they be thy due, and thy sons’ due, which are given out of the sacrifices of peace offerings of the children of Israel.

10:15 The heave shoulder and the wave breast shall they bring with the offerings made by fire of the fat, to wave it for a wave offering before the LORD; and it shall be thine, and thy sons’ with thee, by a statute for ever; as the LORD hath commanded.

10:16 And Moses diligently sought the goat of the sin offering, and, behold, it was burnt: and he was angry with Eleazar and Ithamar, the sons of Aaron which were left alive, saying, 10:17 Wherefore have ye not eaten the sin offering in the holy place, seeing it is most holy, and God hath given it you to bear the iniquity of the congregation, to make atonement for them before the LORD? 10:18 Behold, the blood of it was not brought in within the holy place: ye should indeed have eaten it in the holy place, as I commanded.

10:19 And Aaron said unto Moses, Behold, this day have they offered their sin offering and their burnt offering before the LORD; and such things have befallen me: and if I had eaten the sin offering to day, should it have been accepted in the sight of the LORD? 10:20 And when Moses heard that, he was content.

11:1 And the LORD spake unto Moses and to Aaron, saying unto them, 11:2 Speak unto the children of Israel, saying, These are the beasts which ye shall eat among all the beasts that are on the earth.

11:3 Whatsoever parteth the hoof, and is clovenfooted, and cheweth the cud, among the beasts, that shall ye eat.

11:4 Nevertheless these shall ye not eat of them that chew the cud, or of them that divide the hoof: as the camel, because he cheweth the cud, but divideth not the hoof; he is unclean unto you.

11:5 And the coney, because he cheweth the cud, but divideth not the hoof; he is unclean unto you.

11:6 And the hare, because he cheweth the cud, but divideth not the hoof; he is unclean unto you.

11:7 And the swine, though he divide the hoof, and be clovenfooted, yet he cheweth not the cud; he is unclean to you.

11:8 Of their flesh shall ye not eat, and their carcase shall ye not touch; they are unclean to you.

11:9 These shall ye eat of all that are in the waters: whatsoever hath fins and scales in the waters, in the seas, and in the rivers, them shall ye eat.

11:10 And all that have not fins and scales in the seas, and in the rivers, of all that move in the waters, and of any living thing which is in the waters, they shall be an abomination unto you: 11:11 They shall be even an abomination unto you; ye shall not eat of their flesh, but ye shall have their carcases in abomination.

11:12 Whatsoever hath no fins nor scales in the waters, that shall be an abomination unto you.

11:13 And these are they which ye shall have in abomination among the fowls; they shall not be eaten, they are an abomination: the eagle, and the ossifrage, and the ospray, 11:14 And the vulture, and the kite after his kind; 11:15 Every raven after his kind; 11:16 And the owl, and the night hawk, and the cuckow, and the hawk after his kind, 11:17 And the little owl, and the cormorant, and the great owl, 11:18 And the swan, and the pelican, and the gier eagle, 11:19 And the stork, the heron after her kind, and the lapwing, and the bat.

11:20 All fowls that creep, going upon all four, shall be an abomination unto you.

11:21 Yet these may ye eat of every flying creeping thing that goeth upon all four, which have legs above their feet, to leap withal upon the earth; 11:22 Even these of them ye may eat; the locust after his kind, and the bald locust after his kind, and the beetle after his kind, and the grasshopper after his kind.

11:23 But all other flying creeping things, which have four feet, shall be an abomination unto you.

11:24 And for these ye shall be unclean: whosoever toucheth the carcase of them shall be unclean until the even.

11:25 And whosoever beareth ought of the carcase of them shall wash his clothes, and be unclean until the even.

11:26 The carcases of every beast which divideth the hoof, and is not clovenfooted, nor cheweth the cud, are unclean unto you: every one that toucheth them shall be unclean.

11:27 And whatsoever goeth upon his paws, among all manner of beasts that go on all four, those are unclean unto you: whoso toucheth their carcase shall be unclean until the even.

11:28 And he that beareth the carcase of them shall wash his clothes, and be unclean until the even: they are unclean unto you.

11:29 These also shall be unclean unto you among the creeping things that creep upon the earth; the weasel, and the mouse, and the tortoise after his kind, 11:30 And the ferret, and the chameleon, and the lizard, and the snail, and the mole.

11:31 These are unclean to you among all that creep: whosoever doth touch them, when they be dead, shall be unclean until the even.

11:32 And upon whatsoever any of them, when they are dead, doth fall, it shall be unclean; whether it be any vessel of wood, or raiment, or skin, or sack, whatsoever vessel it be, wherein any work is done, it must be put into water, and it shall be unclean until the even; so it shall be cleansed.

11:33 And every earthen vessel, whereinto any of them falleth, whatsoever is in it shall be unclean; and ye shall break it.

11:34 Of all meat which may be eaten, that on which such water cometh shall be unclean: and all drink that may be drunk in every such vessel shall be unclean.

11:35 And every thing whereupon any part of their carcase falleth shall be unclean; whether it be oven, or ranges for pots, they shall be broken down: for they are unclean and shall be unclean unto you.

11:36 Nevertheless a fountain or pit, wherein there is plenty of water, shall be clean: but that which toucheth their carcase shall be unclean.

11:37 And if any part of their carcase fall upon any sowing seed which is to be sown, it shall be clean.

11:38 But if any water be put upon the seed, and any part of their carcase fall thereon, it shall be unclean unto you.

11:39 And if any beast, of which ye may eat, die; he that toucheth the carcase thereof shall be unclean until the even.

11:40 And he that eateth of the carcase of it shall wash his clothes, and be unclean until the even: he also that beareth the carcase of it shall wash his clothes, and be unclean until the even.

11:41 And every creeping thing that creepeth upon the earth shall be an abomination; it shall not be eaten.

11:42 Whatsoever goeth upon the belly, and whatsoever goeth upon all four, or whatsoever hath more feet among all creeping things that creep upon the earth, them ye shall not eat; for they are an abomination.

11:43 Ye shall not make yourselves abominable with any creeping thing that creepeth, neither shall ye make yourselves unclean with them, that ye should be defiled thereby.

11:44 For I am the LORD your God: ye shall therefore sanctify yourselves, and ye shall be holy; for I am holy: neither shall ye defile yourselves with any manner of creeping thing that creepeth upon the earth.

11:45 For I am the LORD that bringeth you up out of the land of Egypt, to be your God: ye shall therefore be holy, for I am holy.

11:46 This is the law of the beasts, and of the fowl, and of every living creature that moveth in the waters, and of every creature that creepeth upon the earth: 11:47 To make a difference between the unclean and the clean, and between the beast that may be eaten and the beast that may not be eaten.

12:1 And the LORD spake unto Moses, saying, 12:2 Speak unto the children of Israel, saying, If a woman have conceived seed, and born a man child: then she shall be unclean seven days; according to the days of the separation for her infirmity shall she be unclean.

12:3 And in the eighth day the flesh of his foreskin shall be circumcised.

12:4 And she shall then continue in the blood of her purifying three and thirty days; she shall touch no hallowed thing, nor come into the sanctuary, until the days of her purifying be fulfilled.

12:5 But if she bear a maid child, then she shall be unclean two weeks, as in her separation: and she shall continue in the blood of her purifying threescore and six days.

12:6 And when the days of her purifying are fulfilled, for a son, or for a daughter, she shall bring a lamb of the first year for a burnt offering, and a young pigeon, or a turtledove, for a sin offering, unto the door of the tabernacle of the congregation, unto the priest: 12:7 Who shall offer it before the LORD, and make an atonement for her; and she shall be cleansed from the issue of her blood. This is the law for her that hath born a male or a female.

12:8 And if she be not able to bring a lamb, then she shall bring two turtles, or two young pigeons; the one for the burnt offering, and the other for a sin offering: and the priest shall make an atonement for her, and she shall be clean.

13:1 And the LORD spake unto Moses and Aaron, saying, 13:2 When a man shall have in the skin of his flesh a rising, a scab, or bright spot, and it be in the skin of his flesh like the plague of leprosy; then he shall be brought unto Aaron the priest, or unto one of his sons the priests: 13:3 And the priest shall look on the plague in the skin of the flesh: and when the hair in the plague is turned white, and the plague in sight be deeper than the skin of his flesh, it is a plague of leprosy: and the priest shall look on him, and pronounce him unclean.

13:4 If the bright spot be white in the skin of his flesh, and in sight be not deeper than the skin, and the hair thereof be not turned white; then the priest shall shut up him that hath the plague seven days: 13:5 And the priest shall look on him the seventh day: and, behold, if the plague in his sight be at a stay, and the plague spread not in the skin; then the priest shall shut him up seven days more: 13:6 And the priest shall look on him again the seventh day: and, behold, if the plague be somewhat dark, and the plague spread not in the skin, the priest shall pronounce him clean: it is but a scab: and he shall wash his clothes, and be clean.

13:7 But if the scab spread much abroad in the skin, after that he hath been seen of the priest for his cleansing, he shall be seen of the priest again.

13:8 And if the priest see that, behold, the scab spreadeth in the skin, then the priest shall pronounce him unclean: it is a leprosy.

13:9 When the plague of leprosy is in a man, then he shall be brought unto the priest; 13:10 And the priest shall see him: and, behold, if the rising be white in the skin, and it have turned the hair white, and there be quick raw flesh in the rising; 13:11 It is an old leprosy in the skin of his flesh, and the priest shall pronounce him unclean, and shall not shut him up: for he is unclean.

13:12 And if a leprosy break out abroad in the skin, and the leprosy cover all the skin of him that hath the plague from his head even to his foot, wheresoever the priest looketh; 13:13 Then the priest shall consider: and, behold, if the leprosy have covered all his flesh, he shall pronounce him clean that hath the plague: it is all turned white: he is clean.

13:14 But when raw flesh appeareth in him, he shall be unclean.

13:15 And the priest shall see the raw flesh, and pronounce him to be unclean: for the raw flesh is unclean: it is a leprosy.

13:16 Or if the raw flesh turn again, and be changed unto white, he shall come unto the priest; 13:17 And the priest shall see him: and, behold, if the plague be turned into white; then the priest shall pronounce him clean that hath the plague: he is clean.

13:18 The flesh also, in which, even in the skin thereof, was a boil, and is healed, 13:19 And in the place of the boil there be a white rising, or a bright spot, white, and somewhat reddish, and it be shewed to the priest; 13:20 And if, when the priest seeth it, behold, it be in sight lower than the skin, and the hair thereof be turned white; the priest shall pronounce him unclean: it is a plague of leprosy broken out of the boil.

13:21 But if the priest look on it, and, behold, there be no white hairs therein, and if it be not lower than the skin, but be somewhat dark; then the priest shall shut him up seven days: 13:22 And if it spread much abroad in the skin, then the priest shall pronounce him unclean: it is a plague.

13:23 But if the bright spot stay in his place, and spread not, it is a burning boil; and the priest shall pronounce him clean.

13:24 Or if there be any flesh, in the skin whereof there is a hot burning, and the quick flesh that burneth have a white bright spot, somewhat reddish, or white; 13:25 Then the priest shall look upon it: and, behold, if the hair in the bright spot be turned white, and it be in sight deeper than the skin; it is a leprosy broken out of the burning: wherefore the priest shall pronounce him unclean: it is the plague of leprosy.

13:26 But if the priest look on it, and, behold, there be no white hair in the bright spot, and it be no lower than the other skin, but be somewhat dark; then the priest shall shut him up seven days: 13:27 And the priest shall look upon him the seventh day: and if it be spread much abroad in the skin, then the priest shall pronounce him unclean: it is the plague of leprosy.

13:28 And if the bright spot stay in his place, and spread not in the skin, but it be somewhat dark; it is a rising of the burning, and the priest shall pronounce him clean: for it is an inflammation of the burning.

13:29 If a man or woman have a plague upon the head or the beard; 13:30 Then the priest shall see the plague: and, behold, if it be in sight deeper than the skin; and there be in it a yellow thin hair; then the priest shall pronounce him unclean: it is a dry scall, even a leprosy upon the head or beard.

13:31 And if the priest look on the plague of the scall, and, behold, it be not in sight deeper than the skin, and that there is no black hair in it; then the priest shall shut up him that hath the plague of the scall seven days: 13:32 And in the seventh day the priest shall look on the plague: and, behold, if the scall spread not, and there be in it no yellow hair, and the scall be not in sight deeper than the skin; 13:33 He shall be shaven, but the scall shall he not shave; and the priest shall shut up him that hath the scall seven days more: 13:34 And in the seventh day the priest shall look on the scall: and, behold, if the scall be not spread in the skin, nor be in sight deeper than the skin; then the priest shall pronounce him clean: and he shall wash his clothes, and be clean.

13:35 But if the scall spread much in the skin after his cleansing; 13:36 Then the priest shall look on him: and, behold, if the scall be spread in the skin, the priest shall not seek for yellow hair; he is unclean.

13:37 But if the scall be in his sight at a stay, and that there is black hair grown up therein; the scall is healed, he is clean: and the priest shall pronounce him clean.

13:38 If a man also or a woman have in the skin of their flesh bright spots, even white bright spots; 13:39 Then the priest shall look: and, behold, if the bright spots in the skin of their flesh be darkish white; it is a freckled spot that groweth in the skin; he is clean.

13:40 And the man whose hair is fallen off his head, he is bald; yet is he clean.

13:41 And he that hath his hair fallen off from the part of his head toward his face, he is forehead bald: yet is he clean.

13:42 And if there be in the bald head, or bald forehead, a white reddish sore; it is a leprosy sprung up in his bald head, or his bald forehead.

13:43 Then the priest shall look upon it: and, behold, if the rising of the sore be white reddish in his bald head, or in his bald forehead, as the leprosy appeareth in the skin of the flesh; 13:44 He is a leprous man, he is unclean: the priest shall pronounce him utterly unclean; his plague is in his head.

13:45 And the leper in whom the plague is, his clothes shall be rent, and his head bare, and he shall put a covering upon his upper lip, and shall cry, Unclean, unclean.

13:46 All the days wherein the plague shall be in him he shall be defiled; he is unclean: he shall dwell alone; without the camp shall his habitation be.

13:47 The garment also that the plague of leprosy is in, whether it be a woollen garment, or a linen garment; 13:48 Whether it be in the warp, or woof; of linen, or of woollen; whether in a skin, or in any thing made of skin; 13:49 And if the plague be greenish or reddish in the garment, or in the skin, either in the warp, or in the woof, or in any thing of skin; it is a plague of leprosy, and shall be shewed unto the priest: 13:50 And the priest shall look upon the plague, and shut up it that hath the plague seven days: 13:51 And he shall look on the plague on the seventh day: if the plague be spread in the garment, either in the warp, or in the woof, or in a skin, or in any work that is made of skin; the plague is a fretting leprosy; it is unclean.

13:52 He shall therefore burn that garment, whether warp or woof, in woollen or in linen, or any thing of skin, wherein the plague is: for it is a fretting leprosy; it shall be burnt in the fire.

13:53 And if the priest shall look, and, behold, the plague be not spread in the garment, either in the warp, or in the woof, or in any thing of skin; 13:54 Then the priest shall command that they wash the thing wherein the plague is, and he shall shut it up seven days more: 13:55 And the priest shall look on the plague, after that it is washed: and, behold, if the plague have not changed his colour, and the plague be not spread; it is unclean; thou shalt burn it in the fire; it is fret inward, whether it be bare within or without.

13:56 And if the priest look, and, behold, the plague be somewhat dark after the washing of it; then he shall rend it out of the garment, or out of the skin, or out of the warp, or out of the woof: 13:57 And if it appear still in the garment, either in the warp, or in the woof, or in any thing of skin; it is a spreading plague: thou shalt burn that wherein the plague is with fire.

13:58 And the garment, either warp, or woof, or whatsoever thing of skin it be, which thou shalt wash, if the plague be departed from them, then it shall be washed the second time, and shall be clean.

13:59 This is the law of the plague of leprosy in a garment of woollen or linen, either in the warp, or woof, or any thing of skins, to pronounce it clean, or to pronounce it unclean.

14:1 And the LORD spake unto Moses, saying, 14:2 This shall be the law of the leper in the day of his cleansing: He shall be brought unto the priest: 14:3 And the priest shall go forth out of the camp; and the priest shall look, and, behold, if the plague of leprosy be healed in the leper; 14:4 Then shall the priest command to take for him that is to be cleansed two birds alive and clean, and cedar wood, and scarlet, and hyssop: 14:5 And the priest shall command that one of the birds be killed in an earthen vessel over running water: 14:6 As for the living bird, he shall take it, and the cedar wood, and the scarlet, and the hyssop, and shall dip them and the living bird in the blood of the bird that was killed over the running water: 14:7 And he shall sprinkle upon him that is to be cleansed from the leprosy seven times, and shall pronounce him clean, and shall let the living bird loose into the open field.

14:8 And he that is to be cleansed shall wash his clothes, and shave off all his hair, and wash himself in water, that he may be clean: and after that he shall come into the camp, and shall tarry abroad out of his tent seven days.

14:9 But it shall be on the seventh day, that he shall shave all his hair off his head and his beard and his eyebrows, even all his hair he shall shave off: and he shall wash his clothes, also he shall wash his flesh in water, and he shall be clean.

14:10 And on the eighth day he shall take two he lambs without blemish, and one ewe lamb of the first year without blemish, and three tenth deals of fine flour for a meat offering, mingled with oil, and one log of oil.

14:11 And the priest that maketh him clean shall present the man that is to be made clean, and those things, before the LORD, at the door of the tabernacle of the congregation: 14:12 And the priest shall take one he lamb, and offer him for a trespass offering, and the log of oil, and wave them for a wave offering before the LORD: 14:13 And he shall slay the lamb in the place where he shall kill the sin offering and the burnt offering, in the holy place: for as the sin offering is the priest’s, so is the trespass offering: it is most holy: 14:14 And the priest shall take some of the blood of the trespass offering, and the priest shall put it upon the tip of the right ear of him that is to be cleansed, and upon the thumb of his right hand, and upon the great toe of his right foot: 14:15 And the priest shall take some of the log of oil, and pour it into the palm of his own left hand: 14:16 And the priest shall dip his right finger in the oil that is in his left hand, and shall sprinkle of the oil with his finger seven times before the LORD: 14:17 And of the rest of the oil that is in his hand shall the priest put upon the tip of the right ear of him that is to be cleansed, and upon the thumb of his right hand, and upon the great toe of his right foot, upon the blood of the trespass offering: 14:18 And the remnant of the oil that is in the priest’s hand he shall pour upon the head of him that is to be cleansed: and the priest shall make an atonement for him before the LORD.

14:19 And the priest shall offer the sin offering, and make an atonement for him that is to be cleansed from his uncleanness; and afterward he shall kill the burnt offering: 14:20 And the priest shall offer the burnt offering and the meat offering upon the altar: and the priest shall make an atonement for him, and he shall be clean.

14:21 And if he be poor, and cannot get so much; then he shall take one lamb for a trespass offering to be waved, to make an atonement for him, and one tenth deal of fine flour mingled with oil for a meat offering, and a log of oil; 14:22 And two turtledoves, or two young pigeons, such as he is able to get; and the one shall be a sin offering, and the other a burnt offering.

14:23 And he shall bring them on the eighth day for his cleansing unto the priest, unto the door of the tabernacle of the congregation, before the LORD.

14:24 And the priest shall take the lamb of the trespass offering, and the log of oil, and the priest shall wave them for a wave offering before the LORD: 14:25 And he shall kill the lamb of the trespass offering, and the priest shall take some of the blood of the trespass offering, and put it upon the tip of the right ear of him that is to be cleansed, and upon the thumb of his right hand, and upon the great toe of his right foot: 14:26 And the priest shall pour of the oil into the palm of his own left hand: 14:27 And the priest shall sprinkle with his right finger some of the oil that is in his left hand seven times before the LORD: 14:28 And the priest shall put of the oil that is in his hand upon the tip of the right ear of him that is to be cleansed, and upon the thumb of his right hand, and upon the great toe of his right foot, upon the place of the blood of the trespass offering: 14:29 And the rest of the oil that is in the priest’s hand he shall put upon the head of him that is to be cleansed, to make an atonement for him before the LORD.

14:30 And he shall offer the one of the turtledoves, or of the young pigeons, such as he can get; 14:31 Even such as he is able to get, the one for a sin offering, and the other for a burnt offering, with the meat offering: and the priest shall make an atonement for him that is to be cleansed before the LORD.

14:32 This is the law of him in whom is the plague of leprosy, whose hand is not able to get that which pertaineth to his cleansing.

14:33 And the LORD spake unto Moses and unto Aaron, saying, 14:34 When ye be come into the land of Canaan, which I give to you for a possession, and I put the plague of leprosy in a house of the land of your possession; 14:35 And he that owneth the house shall come and tell the priest, saying, It seemeth to me there is as it were a plague in the house: 14:36 Then the priest shall command that they empty the house, before the priest go into it to see the plague, that all that is in the house be not made unclean: and afterward the priest shall go in to see the house: 14:37 And he shall look on the plague, and, behold, if the plague be in the walls of the house with hollow strakes, greenish or reddish, which in sight are lower than the wall; 14:38 Then the priest shall go out of the house to the door of the house, and shut up the house seven days: 14:39 And the priest shall come again the seventh day, and shall look: and, behold, if the plague be spread in the walls of the house; 14:40 Then the priest shall command that they take away the stones in which the plague is, and they shall cast them into an unclean place without the city: 14:41 And he shall cause the house to be scraped within round about, and they shall pour out the dust that they scrape off without the city into an unclean place: 14:42 And they shall take other stones, and put them in the place of those stones; and he shall take other morter, and shall plaister the house.

14:43 And if the plague come again, and break out in the house, after that he hath taken away the stones, and after he hath scraped the house, and after it is plaistered; 14:44 Then the priest shall come and look, and, behold, if the plague be spread in the house, it is a fretting leprosy in the house; it is unclean.

14:45 And he shall break down the house, the stones of it, and the timber thereof, and all the morter of the house; and he shall carry them forth out of the city into an unclean place.

14:46 Moreover he that goeth into the house all the while that it is shut up shall be unclean until the even.

14:47 And he that lieth in the house shall wash his clothes; and he that eateth in the house shall wash his clothes.

14:48 And if the priest shall come in, and look upon it, and, behold, the plague hath not spread in the house, after the house was plaistered: then the priest shall pronounce the house clean, because the plague is healed.

14:49 And he shall take to cleanse the house two birds, and cedar wood, and scarlet, and hyssop: 14:50 And he shall kill the one of the birds in an earthen vessel over running water: 14:51 And he shall take the cedar wood, and the hyssop, and the scarlet, and the living bird, and dip them in the blood of the slain bird, and in the running water, and sprinkle the house seven times: 14:52 And he shall cleanse the house with the blood of the bird, and with the running water, and with the living bird, and with the cedar wood, and with the hyssop, and with the scarlet: 14:53 But he shall let go the living bird out of the city into the open fields, and make an atonement for the house: and it shall be clean.

14:54 This is the law for all manner of plague of leprosy, and scall, 14:55 And for the leprosy of a garment, and of a house, 14:56 And for a rising, and for a scab, and for a bright spot: 14:57 To teach when it is unclean, and when it is clean: this is the law of leprosy.

15:1 And the LORD spake unto Moses and to Aaron, saying, 15:2 Speak unto the children of Israel, and say unto them, When any man hath a running issue out of his flesh, because of his issue he is unclean.

15:3 And this shall be his uncleanness in his issue: whether his flesh run with his issue, or his flesh be stopped from his issue, it is his uncleanness.

15:4 Every bed, whereon he lieth that hath the issue, is unclean: and every thing, whereon he sitteth, shall be unclean.

15:5 And whosoever toucheth his bed shall wash his clothes, and bathe himself in water, and be unclean until the even.

15:6 And he that sitteth on any thing whereon he sat that hath the issue shall wash his clothes, and bathe himself in water, and be unclean until the even.

15:7 And he that toucheth the flesh of him that hath the issue shall wash his clothes, and bathe himself in water, and be unclean until the even.

15:8 And if he that hath the issue spit upon him that is clean; then he shall wash his clothes, and bathe himself in water, and be unclean until the even.

15:9 And what saddle soever he rideth upon that hath the issue shall be unclean.

15:10 And whosoever toucheth any thing that was under him shall be unclean until the even: and he that beareth any of those things shall wash his clothes, and bathe himself in water, and be unclean until the even.

15:11 And whomsoever he toucheth that hath the issue, and hath not rinsed his hands in water, he shall wash his clothes, and bathe himself in water, and be unclean until the even.

15:12 And the vessel of earth, that he toucheth which hath the issue, shall be broken: and every vessel of wood shall be rinsed in water.

15:13 And when he that hath an issue is cleansed of his issue; then he shall number to himself seven days for his cleansing, and wash his clothes, and bathe his flesh in running water, and shall be clean.

15:14 And on the eighth day he shall take to him two turtledoves, or two young pigeons, and come before the LORD unto the door of the tabernacle of the congregation, and give them unto the priest: 15:15 And the priest shall offer them, the one for a sin offering, and the other for a burnt offering; and the priest shall make an atonement for him before the LORD for his issue.

15:16 And if any man’s seed of copulation go out from him, then he shall wash all his flesh in water, and be unclean until the even.

15:17 And every garment, and every skin, whereon is the seed of copulation, shall be washed with water, and be unclean until the even.

15:18 The woman also with whom man shall lie with seed of copulation, they shall both bathe themselves in water, and be unclean until the even.

15:19 And if a woman have an issue, and her issue in her flesh be blood, she shall be put apart seven days: and whosoever toucheth her shall be unclean until the even.

15:20 And every thing that she lieth upon in her separation shall be unclean: every thing also that she sitteth upon shall be unclean.

15:21 And whosoever toucheth her bed shall wash his clothes, and bathe himself in water, and be unclean until the even.

15:22 And whosoever toucheth any thing that she sat upon shall wash his clothes, and bathe himself in water, and be unclean until the even.

15:23 And if it be on her bed, or on any thing whereon she sitteth, when he toucheth it, he shall be unclean until the even.

15:24 And if any man lie with her at all, and her flowers be upon him, he shall be unclean seven days; and all the bed whereon he lieth shall be unclean.

15:25 And if a woman have an issue of her blood many days out of the time of her separation, or if it run beyond the time of her separation; all the days of the issue of her uncleanness shall be as the days of her separation: she shall be unclean.

15:26 Every bed whereon she lieth all the days of her issue shall be unto her as the bed of her separation: and whatsoever she sitteth upon shall be unclean, as the uncleanness of her separation.

15:27 And whosoever toucheth those things shall be unclean, and shall wash his clothes, and bathe himself in water, and be unclean until the even.

15:28 But if she be cleansed of her issue, then she shall number to herself seven days, and after that she shall be clean.

15:29 And on the eighth day she shall take unto her two turtles, or two young pigeons, and bring them unto the priest, to the door of the tabernacle of the congregation.

15:30 And the priest shall offer the one for a sin offering, and the other for a burnt offering; and the priest shall make an atonement for her before the LORD for the issue of her uncleanness.

15:31 Thus shall ye separate the children of Israel from their uncleanness; that they die not in their uncleanness, when they defile my tabernacle that is among them.

15:32 This is the law of him that hath an issue, and of him whose seed goeth from him, and is defiled therewith; 15:33 And of her that is sick of her flowers, and of him that hath an issue, of the man, and of the woman, and of him that lieth with her that is unclean.

16:1 And the LORD spake unto Moses after the death of the two sons of Aaron, when they offered before the LORD, and died; 16:2 And the LORD said unto Moses, Speak unto Aaron thy brother, that he come not at all times into the holy place within the vail before the mercy seat, which is upon the ark; that he die not: for I will appear in the cloud upon the mercy seat.

16:3 Thus shall Aaron come into the holy place: with a young bullock for a sin offering, and a ram for a burnt offering.

16:4 He shall put on the holy linen coat, and he shall have the linen breeches upon his flesh, and shall be girded with a linen girdle, and with the linen mitre shall he be attired: these are holy garments; therefore shall he wash his flesh in water, and so put them on.

16:5 And he shall take of the congregation of the children of Israel two kids of the goats for a sin offering, and one ram for a burnt offering.

16:6 And Aaron shall offer his bullock of the sin offering, which is for himself, and make an atonement for himself, and for his house.

16:7 And he shall take the two goats, and present them before the LORD at the door of the tabernacle of the congregation.

16:8 And Aaron shall cast lots upon the two goats; one lot for the LORD, and the other lot for the scapegoat.

16:9 And Aaron shall bring the goat upon which the LORD’s lot fell, and offer him for a sin offering.

16:10 But the goat, on which the lot fell to be the scapegoat, shall be presented alive before the LORD, to make an atonement with him, and to let him go for a scapegoat into the wilderness.

16:11 And Aaron shall bring the bullock of the sin offering, which is for himself, and shall make an atonement for himself, and for his house, and shall kill the bullock of the sin offering which is for himself: 16:12 And he shall take a censer full of burning coals of fire from off the altar before the LORD, and his hands full of sweet incense beaten small, and bring it within the vail: 16:13 And he shall put the incense upon the fire before the LORD, that the cloud of the incense may cover the mercy seat that is upon the testimony, that he die not: 16:14 And he shall take of the blood of the bullock, and sprinkle it with his finger upon the mercy seat eastward; and before the mercy seat shall he sprinkle of the blood with his finger seven times.

16:15 Then shall he kill the goat of the sin offering, that is for the people, and bring his blood within the vail, and do with that blood as he did with the blood of the bullock, and sprinkle it upon the mercy seat, and before the mercy seat: 16:16 And he shall make an atonement for the holy place, because of the uncleanness of the children of Israel, and because of their transgressions in all their sins: and so shall he do for the tabernacle of the congregation, that remaineth among them in the midst of their uncleanness.

16:17 And there shall be no man in the tabernacle of the congregation when he goeth in to make an atonement in the holy place, until he come out, and have made an atonement for himself, and for his household, and for all the congregation of Israel.

16:18 And he shall go out unto the altar that is before the LORD, and make an atonement for it; and shall take of the blood of the bullock, and of the blood of the goat, and put it upon the horns of the altar round about.

16:19 And he shall sprinkle of the blood upon it with his finger seven times, and cleanse it, and hallow it from the uncleanness of the children of Israel.

16:20 And when he hath made an end of reconciling the holy place, and the tabernacle of the congregation, and the altar, he shall bring the live goat: 16:21 And Aaron shall lay both his hands upon the head of the live goat, and confess over him all the iniquities of the children of Israel, and all their transgressions in all their sins, putting them upon the head of the goat, and shall send him away by the hand of a fit man into the wilderness: 16:22 And the goat shall bear upon him all their iniquities unto a land not inhabited: and he shall let go the goat in the wilderness.

16:23 And Aaron shall come into the tabernacle of the congregation, and shall put off the linen garments, which he put on when he went into the holy place, and shall leave them there: 16:24 And he shall wash his flesh with water in the holy place, and put on his garments, and come forth, and offer his burnt offering, and the burnt offering of the people, and make an atonement for himself, and for the people.

16:25 And the fat of the sin offering shall he burn upon the altar.

16:26 And he that let go the goat for the scapegoat shall wash his clothes, and bathe his flesh in water, and afterward come into the camp.

16:27 And the bullock for the sin offering, and the goat for the sin offering, whose blood was brought in to make atonement in the holy place, shall one carry forth without the camp; and they shall burn in the fire their skins, and their flesh, and their dung.

16:28 And he that burneth them shall wash his clothes, and bathe his flesh in water, and afterward he shall come into the camp.

16:29 And this shall be a statute for ever unto you: that in the seventh month, on the tenth day of the month, ye shall afflict your souls, and do no work at all, whether it be one of your own country, or a stranger that sojourneth among you: 16:30 For on that day shall the priest make an atonement for you, to cleanse you, that ye may be clean from all your sins before the LORD.

16:31 It shall be a sabbath of rest unto you, and ye shall afflict your souls, by a statute for ever.

16:32 And the priest, whom he shall anoint, and whom he shall consecrate to minister in the priest’s office in his father’s stead, shall make the atonement, and shall put on the linen clothes, even the holy garments: 16:33 And he shall make an atonement for the holy sanctuary, and he shall make an atonement for the tabernacle of the congregation, and for the altar, and he shall make an atonement for the priests, and for all the people of the congregation.

16:34 And this shall be an everlasting statute unto you, to make an atonement for the children of Israel for all their sins once a year. And he did as the LORD commanded Moses.

17:1 And the LORD spake unto Moses, saying, 17:2 Speak unto Aaron, and unto his sons, and unto all the children of Israel, and say unto them; This is the thing which the LORD hath commanded, saying, 17:3 What man soever there be of the house of Israel, that killeth an ox, or lamb, or goat, in the camp, or that killeth it out of the camp, 17:4 And bringeth it not unto the door of the tabernacle of the congregation, to offer an offering unto the LORD before the tabernacle of the LORD; blood shall be imputed unto that man; he hath shed blood; and that man shall be cut off from among his people: 17:5 To the end that the children of Israel may bring their sacrifices, which they offer in the open field, even that they may bring them unto the LORD, unto the door of the tabernacle of the congregation, unto the priest, and offer them for peace offerings unto the LORD.

17:6 And the priest shall sprinkle the blood upon the altar of the LORD at the door of the tabernacle of the congregation, and burn the fat for a sweet savour unto the LORD.

17:7 And they shall no more offer their sacrifices unto devils, after whom they have gone a whoring. This shall be a statute for ever unto them throughout their generations.

17:8 And thou shalt say unto them, Whatsoever man there be of the house of Israel, or of the strangers which sojourn among you, that offereth a burnt offering or sacrifice, 17:9 And bringeth it not unto the door of the tabernacle of the congregation, to offer it unto the LORD; even that man shall be cut off from among his people.

17:10 And whatsoever man there be of the house of Israel, or of the strangers that sojourn among you, that eateth any manner of blood; I will even set my face against that soul that eateth blood, and will cut him off from among his people.

17:11 For the life of the flesh is in the blood: and I have given it to you upon the altar to make an atonement for your souls: for it is the blood that maketh an atonement for the soul.

17:12 Therefore I said unto the children of Israel, No soul of you shall eat blood, neither shall any stranger that sojourneth among you eat blood.

17:13 And whatsoever man there be of the children of Israel, or of the strangers that sojourn among you, which hunteth and catcheth any beast or fowl that may be eaten; he shall even pour out the blood thereof, and cover it with dust.

17:14 For it is the life of all flesh; the blood of it is for the life thereof: therefore I said unto the children of Israel, Ye shall eat the blood of no manner of flesh: for the life of all flesh is the blood thereof: whosoever eateth it shall be cut off.

17:15 And every soul that eateth that which died of itself, or that which was torn with beasts, whether it be one of your own country, or a stranger, he shall both wash his clothes, and bathe himself in water, and be unclean until the even: then shall he be clean.

17:16 But if he wash them not, nor bathe his flesh; then he shall bear his iniquity.

18:1 And the LORD spake unto Moses, saying, 18:2 Speak unto the children of Israel, and say unto them, I am the LORD your God.

18:3 After the doings of the land of Egypt, wherein ye dwelt, shall ye not do: and after the doings of the land of Canaan, whither I bring you, shall ye not do: neither shall ye walk in their ordinances.

18:4 Ye shall do my judgments, and keep mine ordinances, to walk therein: I am the LORD your God.

18:5 Ye shall therefore keep my statutes, and my judgments: which if a man do, he shall live in them: I am the LORD.

18:6 None of you shall approach to any that is near of kin to him, to uncover their nakedness: I am the LORD.

18:7 The nakedness of thy father, or the nakedness of thy mother, shalt thou not uncover: she is thy mother; thou shalt not uncover her nakedness.

18:8 The nakedness of thy father’s wife shalt thou not uncover: it is thy father’s nakedness.

18:9 The nakedness of thy sister, the daughter of thy father, or daughter of thy mother, whether she be born at home, or born abroad, even their nakedness thou shalt not uncover.

18:10 The nakedness of thy son’s daughter, or of thy daughter’s daughter, even their nakedness thou shalt not uncover: for theirs is thine own nakedness.

18:11 The nakedness of thy father’s wife’s daughter, begotten of thy father, she is thy sister, thou shalt not uncover her nakedness.

18:12 Thou shalt not uncover the nakedness of thy father’s sister: she is thy father’s near kinswoman.

18:13 Thou shalt not uncover the nakedness of thy mother’s sister: for she is thy mother’s near kinswoman.

18:14 Thou shalt not uncover the nakedness of thy father’s brother, thou shalt not approach to his wife: she is thine aunt.

18:15 Thou shalt not uncover the nakedness of thy daughter in law: she is thy son’s wife; thou shalt not uncover her nakedness.

18:16 Thou shalt not uncover the nakedness of thy brother’s wife: it is thy brother’s nakedness.

18:17 Thou shalt not uncover the nakedness of a woman and her daughter, neither shalt thou take her son’s daughter, or her daughter’s daughter, to uncover her nakedness; for they are her near kinswomen: it is wickedness.

18:18 Neither shalt thou take a wife to her sister, to vex her, to uncover her nakedness, beside the other in her life time.

18:19 Also thou shalt not approach unto a woman to uncover her nakedness, as long as she is put apart for her uncleanness.

18:20 Moreover thou shalt not lie carnally with thy neighbour’s wife, to defile thyself with her.

18:21 And thou shalt not let any of thy seed pass through the fire to Molech, neither shalt thou profane the name of thy God: I am the LORD.

18:22 Thou shalt not lie with mankind, as with womankind: it is abomination.

18:23 Neither shalt thou lie with any beast to defile thyself therewith: neither shall any woman stand before a beast to lie down thereto: it is confusion.

18:24 Defile not ye yourselves in any of these things: for in all these the nations are defiled which I cast out before you: 18:25 And the land is defiled: therefore I do visit the iniquity thereof upon it, and the land itself vomiteth out her inhabitants.

18:26 Ye shall therefore keep my statutes and my judgments, and shall not commit any of these abominations; neither any of your own nation, nor any stranger that sojourneth among you: 18:27 (For all these abominations have the men of the land done, which were before you, and the land is defiled;) 18:28 That the land spue not you out also, when ye defile it, as it spued out the nations that were before you.

18:29 For whosoever shall commit any of these abominations, even the souls that commit them shall be cut off from among their people.

18:30 Therefore shall ye keep mine ordinance, that ye commit not any one of these abominable customs, which were committed before you, and that ye defile not yourselves therein: I am the LORD your God.

19:1 And the LORD spake unto Moses, saying, 19:2 Speak unto all the congregation of the children of Israel, and say unto them, Ye shall be holy: for I the LORD your God am holy.

19:3 Ye shall fear every man his mother, and his father, and keep my sabbaths: I am the LORD your God.

19:4 Turn ye not unto idols, nor make to yourselves molten gods: I am the LORD your God.

19:5 And if ye offer a sacrifice of peace offerings unto the LORD, ye shall offer it at your own will.

19:6 It shall be eaten the same day ye offer it, and on the morrow: and if ought remain until the third day, it shall be burnt in the fire.

19:7 And if it be eaten at all on the third day, it is abominable; it shall not be accepted.

19:8 Therefore every one that eateth it shall bear his iniquity, because he hath profaned the hallowed thing of the LORD: and that soul shall be cut off from among his people.

19:9 And when ye reap the harvest of your land, thou shalt not wholly reap the corners of thy field, neither shalt thou gather the gleanings of thy harvest.

19:10 And thou shalt not glean thy vineyard, neither shalt thou gather every grape of thy vineyard; thou shalt leave them for the poor and stranger: I am the LORD your God.

19:11 Ye shall not steal, neither deal falsely, neither lie one to another.

19:12 And ye shall not swear by my name falsely, neither shalt thou profane the name of thy God: I am the LORD.

19:13 Thou shalt not defraud thy neighbour, neither rob him: the wages of him that is hired shall not abide with thee all night until the morning.

19:14 Thou shalt not curse the deaf, nor put a stumblingblock before the blind, but shalt fear thy God: I am the LORD.

19:15 Ye shall do no unrighteousness in judgment: thou shalt not respect the person of the poor, nor honor the person of the mighty: but in righteousness shalt thou judge thy neighbour.

19:16 Thou shalt not go up and down as a talebearer among thy people: neither shalt thou stand against the blood of thy neighbour; I am the LORD.

19:17 Thou shalt not hate thy brother in thine heart: thou shalt in any wise rebuke thy neighbour, and not suffer sin upon him.

19:18 Thou shalt not avenge, nor bear any grudge against the children of thy people, but thou shalt love thy neighbour as thyself: I am the LORD.

19:19 Ye shall keep my statutes. Thou shalt not let thy cattle gender with a diverse kind: thou shalt not sow thy field with mingled seed: neither shall a garment mingled of linen and woollen come upon thee.

19:20 And whosoever lieth carnally with a woman, that is a bondmaid, betrothed to an husband, and not at all redeemed, nor freedom given her; she shall be scourged; they shall not be put to death, because she was not free.

19:21 And he shall bring his trespass offering unto the LORD, unto the door of the tabernacle of the congregation, even a ram for a trespass offering.

19:22 And the priest shall make an atonement for him with the ram of the trespass offering before the LORD for his sin which he hath done: and the sin which he hath done shall be forgiven him.

19:23 And when ye shall come into the land, and shall have planted all manner of trees for food, then ye shall count the fruit thereof as uncircumcised: three years shall it be as uncircumcised unto you: it shall not be eaten of.

19:24 But in the fourth year all the fruit thereof shall be holy to praise the LORD withal.

19:25 And in the fifth year shall ye eat of the fruit thereof, that it may yield unto you the increase thereof: I am the LORD your God.

19:26 Ye shall not eat any thing with the blood: neither shall ye use enchantment, nor observe times.

19:27 Ye shall not round the corners of your heads, neither shalt thou mar the corners of thy beard.

19:28 Ye shall not make any cuttings in your flesh for the dead, nor print any marks upon you: I am the LORD.

19:29 Do not prostitute thy daughter, to cause her to be a whore; lest the land fall to whoredom, and the land become full of wickedness.

19:30 Ye shall keep my sabbaths, and reverence my sanctuary: I am the LORD.

19:31 Regard not them that have familiar spirits, neither seek after wizards, to be defiled by them: I am the LORD your God.

19:32 Thou shalt rise up before the hoary head, and honour the face of the old man, and fear thy God: I am the LORD.

19:33 And if a stranger sojourn with thee in your land, ye shall not vex him.

19:34 But the stranger that dwelleth with you shall be unto you as one born among you, and thou shalt love him as thyself; for ye were strangers in the land of Egypt: I am the LORD your God.

19:35 Ye shall do no unrighteousness in judgment, in meteyard, in weight, or in measure.

19:36 Just balances, just weights, a just ephah, and a just hin, shall ye have: I am the LORD your God, which brought you out of the land of Egypt.

19:37 Therefore shall ye observe all my statutes, and all my judgments, and do them: I am the LORD.

20:1 And the LORD spake unto Moses, saying, 20:2 Again, thou shalt say to the children of Israel, Whosoever he be of the children of Israel, or of the strangers that sojourn in Israel, that giveth any of his seed unto Molech; he shall surely be put to death: the people of the land shall stone him with stones.

20:3 And I will set my face against that man, and will cut him off from among his people; because he hath given of his seed unto Molech, to defile my sanctuary, and to profane my holy name.

20:4 And if the people of the land do any ways hide their eyes from the man, when he giveth of his seed unto Molech, and kill him not: 20:5 Then I will set my face against that man, and against his family, and will cut him off, and all that go a whoring after him, to commit whoredom with Molech, from among their people.

20:6 And the soul that turneth after such as have familiar spirits, and after wizards, to go a whoring after them, I will even set my face against that soul, and will cut him off from among his people.

20:7 Sanctify yourselves therefore, and be ye holy: for I am the LORD your God.

20:8 And ye shall keep my statutes, and do them: I am the LORD which sanctify you.

20:9 For every one that curseth his father or his mother shall be surely put to death: he hath cursed his father or his mother; his blood shall be upon him.

20:10 And the man that committeth adultery with another man’s wife, even he that committeth adultery with his neighbour’s wife, the adulterer and the adulteress shall surely be put to death.

20:11 And the man that lieth with his father’s wife hath uncovered his father’s nakedness: both of them shall surely be put to death; their blood shall be upon them.

20:12 And if a man lie with his daughter in law, both of them shall surely be put to death: they have wrought confusion; their blood shall be upon them.

20:13 If a man also lie with mankind, as he lieth with a woman, both of them have committed an abomination: they shall surely be put to death; their blood shall be upon them.

20:14 And if a man take a wife and her mother, it is wickedness: they shall be burnt with fire, both he and they; that there be no wickedness among you.

20:15 And if a man lie with a beast, he shall surely be put to death: and ye shall slay the beast.

20:16 And if a woman approach unto any beast, and lie down thereto, thou shalt kill the woman, and the beast: they shall surely be put to death; their blood shall be upon them.

20:17 And if a man shall take his sister, his father’s daughter, or his mother’s daughter, and see her nakedness, and she see his nakedness; it is a wicked thing; and they shall be cut off in the sight of their people: he hath uncovered his sister’s nakedness; he shall bear his iniquity.

20:18 And if a man shall lie with a woman having her sickness, and shall uncover her nakedness; he hath discovered her fountain, and she hath uncovered the fountain of her blood: and both of them shall be cut off from among their people.

20:19 And thou shalt not uncover the nakedness of thy mother’s sister, nor of thy father’s sister: for he uncovereth his near kin: they shall bear their iniquity.

20:20 And if a man shall lie with his uncle’s wife, he hath uncovered his uncle’s nakedness: they shall bear their sin; they shall die childless.

20:21 And if a man shall take his brother’s wife, it is an unclean thing: he hath uncovered his brother’s nakedness; they shall be childless.

20:22 Ye shall therefore keep all my statutes, and all my judgments, and do them: that the land, whither I bring you to dwell therein, spue you not out.

20:23 And ye shall not walk in the manners of the nation, which I cast out before you: for they committed all these things, and therefore I abhorred them.

20:24 But I have said unto you, Ye shall inherit their land, and I will give it unto you to possess it, a land that floweth with milk and honey: I am the LORD your God, which have separated you from other people.

20:25 Ye shall therefore put difference between clean beasts and unclean, and between unclean fowls and clean: and ye shall not make your souls abominable by beast, or by fowl, or by any manner of living thing that creepeth on the ground, which I have separated from you as unclean.

20:26 And ye shall be holy unto me: for I the LORD am holy, and have severed you from other people, that ye should be mine.

20:27 A man also or woman that hath a familiar spirit, or that is a wizard, shall surely be put to death: they shall stone them with stones: their blood shall be upon them.

21:1 And the LORD said unto Moses, Speak unto the priests the sons of Aaron, and say unto them, There shall none be defiled for the dead among his people: 21:2 But for his kin, that is near unto him, that is, for his mother, and for his father, and for his son, and for his daughter, and for his brother.

21:3 And for his sister a virgin, that is nigh unto him, which hath had no husband; for her may he be defiled.

21:4 But he shall not defile himself, being a chief man among his people, to profane himself.

21:5 They shall not make baldness upon their head, neither shall they shave off the corner of their beard, nor make any cuttings in their flesh.

21:6 They shall be holy unto their God, and not profane the name of their God: for the offerings of the LORD made by fire, and the bread of their God, they do offer: therefore they shall be holy.

21:7 They shall not take a wife that is a whore, or profane; neither shall they take a woman put away from her husband: for he is holy unto his God.

21:8 Thou shalt sanctify him therefore; for he offereth the bread of thy God: he shall be holy unto thee: for I the LORD, which sanctify you, am holy.

21:9 And the daughter of any priest, if she profane herself by playing the whore, she profaneth her father: she shall be burnt with fire.

21:10 And he that is the high priest among his brethren, upon whose head the anointing oil was poured, and that is consecrated to put on the garments, shall not uncover his head, nor rend his clothes; 21:11 Neither shall he go in to any dead body, nor defile himself for his father, or for his mother; 21:12 Neither shall he go out of the sanctuary, nor profane the sanctuary of his God; for the crown of the anointing oil of his God is upon him: I am the LORD.

21:13 And he shall take a wife in her virginity.

21:14 A widow, or a divorced woman, or profane, or an harlot, these shall he not take: but he shall take a virgin of his own people to wife.

21:15 Neither shall he profane his seed among his people: for I the LORD do sanctify him.

21:16 And the LORD spake unto Moses, saying, 21:17 Speak unto Aaron, saying, Whosoever he be of thy seed in their generations that hath any blemish, let him not approach to offer the bread of his God.

21:18 For whatsoever man he be that hath a blemish, he shall not approach: a blind man, or a lame, or he that hath a flat nose, or any thing superfluous, 21:19 Or a man that is brokenfooted, or brokenhanded, 21:20 Or crookbackt, or a dwarf, or that hath a blemish in his eye, or be scurvy, or scabbed, or hath his stones broken; 21:21 No man that hath a blemish of the seed of Aaron the priest shall come nigh to offer the offerings of the LORD made by fire: he hath a blemish; he shall not come nigh to offer the bread of his God.

21:22 He shall eat the bread of his God, both of the most holy, and of the holy.

21:23 Only he shall not go in unto the vail, nor come nigh unto the altar, because he hath a blemish; that he profane not my sanctuaries: for I the LORD do sanctify them.

21:24 And Moses told it unto Aaron, and to his sons, and unto all the children of Israel.

22:1 And the LORD spake unto Moses, saying, 22:2 Speak unto Aaron and to his sons, that they separate themselves from the holy things of the children of Israel, and that they profane not my holy name in those things which they hallow unto me: I am the LORD.

22:3 Say unto them, Whosoever he be of all your seed among your generations, that goeth unto the holy things, which the children of Israel hallow unto the LORD, having his uncleanness upon him, that soul shall be cut off from my presence: I am the LORD.

22:4 What man soever of the seed of Aaron is a leper, or hath a running issue; he shall not eat of the holy things, until he be clean. And whoso toucheth any thing that is unclean by the dead, or a man whose seed goeth from him; 22:5 Or whosoever toucheth any creeping thing, whereby he may be made unclean, or a man of whom he may take uncleanness, whatsoever uncleanness he hath; 22:6 The soul which hath touched any such shall be unclean until even, and shall not eat of the holy things, unless he wash his flesh with water.

22:7 And when the sun is down, he shall be clean, and shall afterward eat of the holy things; because it is his food.

22:8 That which dieth of itself, or is torn with beasts, he shall not eat to defile himself therewith; I am the LORD.

22:9 They shall therefore keep mine ordinance, lest they bear sin for it, and die therefore, if they profane it: I the LORD do sanctify them.

22:10 There shall no stranger eat of the holy thing: a sojourner of the priest, or an hired servant, shall not eat of the holy thing.

22:11 But if the priest buy any soul with his money, he shall eat of it, and he that is born in his house: they shall eat of his meat.

22:12 If the priest’s daughter also be married unto a stranger, she may not eat of an offering of the holy things.

22:13 But if the priest’s daughter be a widow, or divorced, and have no child, and is returned unto her father’s house, as in her youth, she shall eat of her father’s meat: but there shall be no stranger eat thereof.

22:14 And if a man eat of the holy thing unwittingly, then he shall put the fifth part thereof unto it, and shall give it unto the priest with the holy thing.

22:15 And they shall not profane the holy things of the children of Israel, which they offer unto the LORD; 22:16 Or suffer them to bear the iniquity of trespass, when they eat their holy things: for I the LORD do sanctify them.

22:17 And the LORD spake unto Moses, saying, 22:18 Speak unto Aaron, and to his sons, and unto all the children of Israel, and say unto them, Whatsoever he be of the house of Israel, or of the strangers in Israel, that will offer his oblation for all his vows, and for all his freewill offerings, which they will offer unto the LORD for a burnt offering; 22:19 Ye shall offer at your own will a male without blemish, of the beeves, of the sheep, or of the goats.

22:20 But whatsoever hath a blemish, that shall ye not offer: for it shall not be acceptable for you.

22:21 And whosoever offereth a sacrifice of peace offerings unto the LORD to accomplish his vow, or a freewill offering in beeves or sheep, it shall be perfect to be accepted; there shall be no blemish therein.

22:22 Blind, or broken, or maimed, or having a wen, or scurvy, or scabbed, ye shall not offer these unto the LORD, nor make an offering by fire of them upon the altar unto the LORD.

22:23 Either a bullock or a lamb that hath any thing superfluous or lacking in his parts, that mayest thou offer for a freewill offering; but for a vow it shall not be accepted.

22:24 Ye shall not offer unto the LORD that which is bruised, or crushed, or broken, or cut; neither shall ye make any offering thereof in your land.

22:25 Neither from a stranger’s hand shall ye offer the bread of your God of any of these; because their corruption is in them, and blemishes be in them: they shall not be accepted for you.

22:26 And the LORD spake unto Moses, saying, 22:27 When a bullock, or a sheep, or a goat, is brought forth, then it shall be seven days under the dam; and from the eighth day and thenceforth it shall be accepted for an offering made by fire unto the LORD.

22:28 And whether it be cow, or ewe, ye shall not kill it and her young both in one day.

22:29 And when ye will offer a sacrifice of thanksgiving unto the LORD, offer it at your own will.

22:30 On the same day it shall be eaten up; ye shall leave none of it until the morrow: I am the LORD.

22:31 Therefore shall ye keep my commandments, and do them: I am the LORD.

22:32 Neither shall ye profane my holy name; but I will be hallowed among the children of Israel: I am the LORD which hallow you, 22:33 That brought you out of the land of Egypt, to be your God: I am the LORD.

23:1 And the LORD spake unto Moses, saying, 23:2 Speak unto the children of Israel, and say unto them, Concerning the feasts of the LORD, which ye shall proclaim to be holy convocations, even these are my feasts.

23:3 Six days shall work be done: but the seventh day is the sabbath of rest, an holy convocation; ye shall do no work therein: it is the sabbath of the LORD in all your dwellings.

23:4 These are the feasts of the LORD, even holy convocations, which ye shall proclaim in their seasons.

23:5 In the fourteenth day of the first month at even is the LORD’s passover.

23:6 And on the fifteenth day of the same month is the feast of unleavened bread unto the LORD: seven days ye must eat unleavened bread.

23:7 In the first day ye shall have an holy convocation: ye shall do no servile work therein.

23:8 But ye shall offer an offering made by fire unto the LORD seven days: in the seventh day is an holy convocation: ye shall do no servile work therein.

23:9 And the LORD spake unto Moses, saying, 23:10 Speak unto the children of Israel, and say unto them, When ye be come into the land which I give unto you, and shall reap the harvest thereof, then ye shall bring a sheaf of the firstfruits of your harvest unto the priest: 23:11 And he shall wave the sheaf before the LORD, to be accepted for you: on the morrow after the sabbath the priest shall wave it.

23:12 And ye shall offer that day when ye wave the sheaf an he lamb without blemish of the first year for a burnt offering unto the LORD.

23:13 And the meat offering thereof shall be two tenth deals of fine flour mingled with oil, an offering made by fire unto the LORD for a sweet savour: and the drink offering thereof shall be of wine, the fourth part of an hin.

23:14 And ye shall eat neither bread, nor parched corn, nor green ears, until the selfsame day that ye have brought an offering unto your God: it shall be a statute for ever throughout your generations in all your dwellings.

23:15 And ye shall count unto you from the morrow after the sabbath, from the day that ye brought the sheaf of the wave offering; seven sabbaths shall be complete: 23:16 Even unto the morrow after the seventh sabbath shall ye number fifty days; and ye shall offer a new meat offering unto the LORD.

23:17 Ye shall bring out of your habitations two wave loaves of two tenth deals; they shall be of fine flour; they shall be baken with leaven; they are the firstfruits unto the LORD.

23:18 And ye shall offer with the bread seven lambs without blemish of the first year, and one young bullock, and two rams: they shall be for a burnt offering unto the LORD, with their meat offering, and their drink offerings, even an offering made by fire, of sweet savour unto the LORD.

23:19 Then ye shall sacrifice one kid of the goats for a sin offering, and two lambs of the first year for a sacrifice of peace offerings.

23:20 And the priest shall wave them with the bread of the firstfruits for a wave offering before the LORD, with the two lambs: they shall be holy to the LORD for the priest.

23:21 And ye shall proclaim on the selfsame day, that it may be an holy convocation unto you: ye shall do no servile work therein: it shall be a statute for ever in all your dwellings throughout your generations.

23:22 And when ye reap the harvest of your land, thou shalt not make clean riddance of the corners of thy field when thou reapest, neither shalt thou gather any gleaning of thy harvest: thou shalt leave them unto the poor, and to the stranger: I am the LORD your God.

23:23 And the LORD spake unto Moses, saying, 23:24 Speak unto the children of Israel, saying, In the seventh month, in the first day of the month, shall ye have a sabbath, a memorial of blowing of trumpets, an holy convocation.

23:25 Ye shall do no servile work therein: but ye shall offer an offering made by fire unto the LORD.

23:26 And the LORD spake unto Moses, saying, 23:27 Also on the tenth day of this seventh month there shall be a day of atonement: it shall be an holy convocation unto you; and ye shall afflict your souls, and offer an offering made by fire unto the LORD.

23:28 And ye shall do no work in that same day: for it is a day of atonement, to make an atonement for you before the LORD your God.

23:29 For whatsoever soul it be that shall not be afflicted in that same day, he shall be cut off from among his people.

23:30 And whatsoever soul it be that doeth any work in that same day, the same soul will I destroy from among his people.

23:31 Ye shall do no manner of work: it shall be a statute for ever throughout your generations in all your dwellings.

23:32 It shall be unto you a sabbath of rest, and ye shall afflict your souls: in the ninth day of the month at even, from even unto even, shall ye celebrate your sabbath.

23:33 And the LORD spake unto Moses, saying, 23:34 Speak unto the children of Israel, saying, The fifteenth day of this seventh month shall be the feast of tabernacles for seven days unto the LORD.

23:35 On the first day shall be an holy convocation: ye shall do no servile work therein.

23:36 Seven days ye shall offer an offering made by fire unto the LORD: on the eighth day shall be an holy convocation unto you; and ye shall offer an offering made by fire unto the LORD: it is a solemn assembly; and ye shall do no servile work therein.

23:37 These are the feasts of the LORD, which ye shall proclaim to be holy convocations, to offer an offering made by fire unto the LORD, a burnt offering, and a meat offering, a sacrifice, and drink offerings, every thing upon his day: 23:38 Beside the sabbaths of the LORD, and beside your gifts, and beside all your vows, and beside all your freewill offerings, which ye give unto the LORD.

23:39 Also in the fifteenth day of the seventh month, when ye have gathered in the fruit of the land, ye shall keep a feast unto the LORD seven days: on the first day shall be a sabbath, and on the eighth day shall be a sabbath.

23:40 And ye shall take you on the first day the boughs of goodly trees, branches of palm trees, and the boughs of thick trees, and willows of the brook; and ye shall rejoice before the LORD your God seven days.

23:41 And ye shall keep it a feast unto the LORD seven days in the year.

It shall be a statute for ever in your generations: ye shall celebrate it in the seventh month.

23:42 Ye shall dwell in booths seven days; all that are Israelites born shall dwell in booths: 23:43 That your generations may know that I made the children of Israel to dwell in booths, when I brought them out of the land of Egypt: I am the LORD your God.

23:44 And Moses declared unto the children of Israel the feasts of the LORD.

24:1 And the LORD spake unto Moses, saying, 24:2 Command the children of Israel, that they bring unto thee pure oil olive beaten for the light, to cause the lamps to burn continually.

24:3 Without the vail of the testimony, in the tabernacle of the congregation, shall Aaron order it from the evening unto the morning before the LORD continually: it shall be a statute for ever in your generations.

24:4 He shall order the lamps upon the pure candlestick before the LORD continually.

24:5 And thou shalt take fine flour, and bake twelve cakes thereof: two tenth deals shall be in one cake.

24:6 And thou shalt set them in two rows, six on a row, upon the pure table before the LORD.

24:7 And thou shalt put pure frankincense upon each row, that it may be on the bread for a memorial, even an offering made by fire unto the LORD.

24:8 Every sabbath he shall set it in order before the LORD continually, being taken from the children of Israel by an everlasting covenant.

24:9 And it shall be Aaron’s and his sons’; and they shall eat it in the holy place: for it is most holy unto him of the offerings of the LORD made by fire by a perpetual statute.

24:10 And the son of an Israelitish woman, whose father was an Egyptian, went out among the children of Israel: and this son of the Israelitish woman and a man of Israel strove together in the camp; 24:11 And the Israelitish woman’s son blasphemed the name of the Lord, and cursed. And they brought him unto Moses: (and his mother’s name was Shelomith, the daughter of Dibri, of the tribe of Dan:) 24:12 And they put him in ward, that the mind of the LORD might be shewed them.

24:13 And the LORD spake unto Moses, saying, 24:14 Bring forth him that hath cursed without the camp; and let all that heard him lay their hands upon his head, and let all the congregation stone him.

24:15 And thou shalt speak unto the children of Israel, saying, Whosoever curseth his God shall bear his sin.

24:16 And he that blasphemeth the name of the LORD, he shall surely be put to death, and all the congregation shall certainly stone him: as well the stranger, as he that is born in the land, when he blasphemeth the name of the Lord, shall be put to death.

24:17 And he that killeth any man shall surely be put to death.

24:18 And he that killeth a beast shall make it good; beast for beast.

24:19 And if a man cause a blemish in his neighbour; as he hath done, so shall it be done to him; 24:20 Breach for breach, eye for eye, tooth for tooth: as he hath caused a blemish in a man, so shall it be done to him again.

24:21 And he that killeth a beast, he shall restore it: and he that killeth a man, he shall be put to death.

24:22 Ye shall have one manner of law, as well for the stranger, as for one of your own country: for I am the LORD your God.

24:23 And Moses spake to the children of Israel, that they should bring forth him that had cursed out of the camp, and stone him with stones. And the children of Israel did as the LORD commanded Moses.

25:1 And the LORD spake unto Moses in mount Sinai, saying, 25:2 Speak unto the children of Israel, and say unto them, When ye come into the land which I give you, then shall the land keep a sabbath unto the LORD.

25:3 Six years thou shalt sow thy field, and six years thou shalt prune thy vineyard, and gather in the fruit thereof; 25:4 But in the seventh year shall be a sabbath of rest unto the land, a sabbath for the LORD: thou shalt neither sow thy field, nor prune thy vineyard.

25:5 That which groweth of its own accord of thy harvest thou shalt not reap, neither gather the grapes of thy vine undressed: for it is a year of rest unto the land.

25:6 And the sabbath of the land shall be meat for you; for thee, and for thy servant, and for thy maid, and for thy hired servant, and for thy stranger that sojourneth with thee.

25:7 And for thy cattle, and for the beast that are in thy land, shall all the increase thereof be meat.

25:8 And thou shalt number seven sabbaths of years unto thee, seven times seven years; and the space of the seven sabbaths of years shall be unto thee forty and nine years.

25:9 Then shalt thou cause the trumpet of the jubile to sound on the tenth day of the seventh month, in the day of atonement shall ye make the trumpet sound throughout all your land.

25:10 And ye shall hallow the fiftieth year, and proclaim liberty throughout all the land unto all the inhabitants thereof: it shall be a jubile unto you; and ye shall return every man unto his possession, and ye shall return every man unto his family.

25:11 A jubile shall that fiftieth year be unto you: ye shall not sow, neither reap that which groweth of itself in it, nor gather the grapes in it of thy vine undressed.

25:12 For it is the jubile; it shall be holy unto you: ye shall eat the increase thereof out of the field.

25:13 In the year of this jubile ye shall return every man unto his possession.

25:14 And if thou sell ought unto thy neighbour, or buyest ought of thy neighbour’s hand, ye shall not oppress one another: 25:15 According to the number of years after the jubile thou shalt buy of thy neighbour, and according unto the number of years of the fruits he shall sell unto thee: 25:16 According to the multitude of years thou shalt increase the price thereof, and according to the fewness of years thou shalt diminish the price of it: for according to the number of the years of the fruits doth he sell unto thee.

25:17 Ye shall not therefore oppress one another; but thou shalt fear thy God: for I am the LORD your God.

25:18 Wherefore ye shall do my statutes, and keep my judgments, and do them; and ye shall dwell in the land in safety.

25:19 And the land shall yield her fruit, and ye shall eat your fill, and dwell therein in safety.

25:20 And if ye shall say, What shall we eat the seventh year? behold, we shall not sow, nor gather in our increase: 25:21 Then I will command my blessing upon you in the sixth year, and it shall bring forth fruit for three years.

25:22 And ye shall sow the eighth year, and eat yet of old fruit until the ninth year; until her fruits come in ye shall eat of the old store.

25:23 The land shall not be sold for ever: for the land is mine, for ye are strangers and sojourners with me.

25:24 And in all the land of your possession ye shall grant a redemption for the land.

25:25 If thy brother be waxen poor, and hath sold away some of his possession, and if any of his kin come to redeem it, then shall he redeem that which his brother sold.

25:26 And if the man have none to redeem it, and himself be able to redeem it; 25:27 Then let him count the years of the sale thereof, and restore the overplus unto the man to whom he sold it; that he may return unto his possession.

25:28 But if he be not able to restore it to him, then that which is sold shall remain in the hand of him that hath bought it until the year of jubile: and in the jubile it shall go out, and he shall return unto his possession.

25:29 And if a man sell a dwelling house in a walled city, then he may redeem it within a whole year after it is sold; within a full year may he redeem it.

25:30 And if it be not redeemed within the space of a full year, then the house that is in the walled city shall be established for ever to him that bought it throughout his generations: it shall not go out in the jubile.

25:31 But the houses of the villages which have no wall round about them shall be counted as the fields of the country: they may be redeemed, and they shall go out in the jubile.

25:32 Notwithstanding the cities of the Levites, and the houses of the cities of their possession, may the Levites redeem at any time.

25:33 And if a man purchase of the Levites, then the house that was sold, and the city of his possession, shall go out in the year of jubile: for the houses of the cities of the Levites are their possession among the children of Israel.

25:34 But the field of the suburbs of their cities may not be sold; for it is their perpetual possession.

25:35 And if thy brother be waxen poor, and fallen in decay with thee; then thou shalt relieve him: yea, though he be a stranger, or a sojourner; that he may live with thee.

25:36 Take thou no usury of him, or increase: but fear thy God; that thy brother may live with thee.

25:37 Thou shalt not give him thy money upon usury, nor lend him thy victuals for increase.

25:38 I am the LORD your God, which brought you forth out of the land of Egypt, to give you the land of Canaan, and to be your God.

25:39 And if thy brother that dwelleth by thee be waxen poor, and be sold unto thee; thou shalt not compel him to serve as a bondservant: 25:40 But as an hired servant, and as a sojourner, he shall be with thee, and shall serve thee unto the year of jubile.

25:41 And then shall he depart from thee, both he and his children with him, and shall return unto his own family, and unto the possession of his fathers shall he return.

25:42 For they are my servants, which I brought forth out of the land of Egypt: they shall not be sold as bondmen.

25:43 Thou shalt not rule over him with rigour; but shalt fear thy God.

25:44 Both thy bondmen, and thy bondmaids, which thou shalt have, shall be of the heathen that are round about you; of them shall ye buy bondmen and bondmaids.

25:45 Moreover of the children of the strangers that do sojourn among you, of them shall ye buy, and of their families that are with you, which they begat in your land: and they shall be your possession.

25:46 And ye shall take them as an inheritance for your children after you, to inherit them for a possession; they shall be your bondmen for ever: but over your brethren the children of Israel, ye shall not rule one over another with rigour.

25:47 And if a sojourner or stranger wax rich by thee, and thy brother that dwelleth by him wax poor, and sell himself unto the stranger or sojourner by thee, or to the stock of the stranger’s family: 25:48 After that he is sold he may be redeemed again; one of his brethren may redeem him: 25:49 Either his uncle, or his uncle’s son, may redeem him, or any that is nigh of kin unto him of his family may redeem him; or if he be able, he may redeem himself.

25:50 And he shall reckon with him that bought him from the year that he was sold to him unto the year of jubile: and the price of his sale shall be according unto the number of years, according to the time of an hired servant shall it be with him.

25:51 If there be yet many years behind, according unto them he shall give again the price of his redemption out of the money that he was bought for.

25:52 And if there remain but few years unto the year of jubile, then he shall count with him, and according unto his years shall he give him again the price of his redemption.

25:53 And as a yearly hired servant shall he be with him: and the other shall not rule with rigour over him in thy sight.

25:54 And if he be not redeemed in these years, then he shall go out in the year of jubile, both he, and his children with him.

25:55 For unto me the children of Israel are servants; they are my servants whom I brought forth out of the land of Egypt: I am the LORD your God.

26:1 Ye shall make you no idols nor graven image, neither rear you up a standing image, neither shall ye set up any image of stone in your land, to bow down unto it: for I am the LORD your God.

26:2 Ye shall keep my sabbaths, and reverence my sanctuary: I am the LORD.

26:3 If ye walk in my statutes, and keep my commandments, and do them; 26:4 Then I will give you rain in due season, and the land shall yield her increase, and the trees of the field shall yield their fruit.

26:5 And your threshing shall reach unto the vintage, and the vintage shall reach unto the sowing time: and ye shall eat your bread to the full, and dwell in your land safely.

26:6 And I will give peace in the land, and ye shall lie down, and none shall make you afraid: and I will rid evil beasts out of the land, neither shall the sword go through your land.

26:7 And ye shall chase your enemies, and they shall fall before you by the sword.

26:8 And five of you shall chase an hundred, and an hundred of you shall put ten thousand to flight: and your enemies shall fall before you by the sword.

26:9 For I will have respect unto you, and make you fruitful, and multiply you, and establish my covenant with you.

26:10 And ye shall eat old store, and bring forth the old because of the new.

26:11 And I set my tabernacle among you: and my soul shall not abhor you.

26:12 And I will walk among you, and will be your God, and ye shall be my people.

26:13 I am the LORD your God, which brought you forth out of the land of Egypt, that ye should not be their bondmen; and I have broken the bands of your yoke, and made you go upright.

26:14 But if ye will not hearken unto me, and will not do all these commandments; 26:15 And if ye shall despise my statutes, or if your soul abhor my judgments, so that ye will not do all my commandments, but that ye break my covenant: 26:16 I also will do this unto you; I will even appoint over you terror, consumption, and the burning ague, that shall consume the eyes, and cause sorrow of heart: and ye shall sow your seed in vain, for your enemies shall eat it.

26:17 And I will set my face against you, and ye shall be slain before your enemies: they that hate you shall reign over you; and ye shall flee when none pursueth you.

26:18 And if ye will not yet for all this hearken unto me, then I will punish you seven times more for your sins.

26:19 And I will break the pride of your power; and I will make your heaven as iron, and your earth as brass: 26:20 And your strength shall be spent in vain: for your land shall not yield her increase, neither shall the trees of the land yield their fruits.

26:21 And if ye walk contrary unto me, and will not hearken unto me; I will bring seven times more plagues upon you according to your sins.

26:22 I will also send wild beasts among you, which shall rob you of your children, and destroy your cattle, and make you few in number; and your high ways shall be desolate.

26:23 And if ye will not be reformed by me by these things, but will walk contrary unto me; 26:24 Then will I also walk contrary unto you, and will punish you yet seven times for your sins.

26:25 And I will bring a sword upon you, that shall avenge the quarrel of my covenant: and when ye are gathered together within your cities, I will send the pestilence among you; and ye shall be delivered into the hand of the enemy.

26:26 And when I have broken the staff of your bread, ten women shall bake your bread in one oven, and they shall deliver you your bread again by weight: and ye shall eat, and not be satisfied.

26:27 And if ye will not for all this hearken unto me, but walk contrary unto me; 26:28 Then I will walk contrary unto you also in fury; and I, even I, will chastise you seven times for your sins.

26:29 And ye shall eat the flesh of your sons, and the flesh of your daughters shall ye eat.

26:30 And I will destroy your high places, and cut down your images, and cast your carcases upon the carcases of your idols, and my soul shall abhor you.

26:31 And I will make your cities waste, and bring your sanctuaries unto desolation, and I will not smell the savour of your sweet odours.

26:32 And I will bring the land into desolation: and your enemies which dwell therein shall be astonished at it.

26:33 And I will scatter you among the heathen, and will draw out a sword after you: and your land shall be desolate, and your cities waste.

26:34 Then shall the land enjoy her sabbaths, as long as it lieth desolate, and ye be in your enemies’ land; even then shall the land rest, and enjoy her sabbaths.

26:35 As long as it lieth desolate it shall rest; because it did not rest in your sabbaths, when ye dwelt upon it.

26:36 And upon them that are left alive of you I will send a faintness into their hearts in the lands of their enemies; and the sound of a shaken leaf shall chase them; and they shall flee, as fleeing from a sword; and they shall fall when none pursueth.

26:37 And they shall fall one upon another, as it were before a sword, when none pursueth: and ye shall have no power to stand before your enemies.

26:38 And ye shall perish among the heathen, and the land of your enemies shall eat you up.

26:39 And they that are left of you shall pine away in their iniquity in your enemies’ lands; and also in the iniquities of their fathers shall they pine away with them.

26:40 If they shall confess their iniquity, and the iniquity of their fathers, with their trespass which they trespassed against me, and that also they have walked contrary unto me; 26:41 And that I also have walked contrary unto them, and have brought them into the land of their enemies; if then their uncircumcised hearts be humbled, and they then accept of the punishment of their iniquity: 26:42 Then will I remember my covenant with Jacob, and also my covenant with Isaac, and also my covenant with Abraham will I remember; and I will remember the land.

26:43 The land also shall be left of them, and shall enjoy her sabbaths, while she lieth desolate without them: and they shall accept of the punishment of their iniquity: because, even because they despised my judgments, and because their soul abhorred my statutes.

26:44 And yet for all that, when they be in the land of their enemies, I will not cast them away, neither will I abhor them, to destroy them utterly, and to break my covenant with them: for I am the LORD their God.

26:45 But I will for their sakes remember the covenant of their ancestors, whom I brought forth out of the land of Egypt in the sight of the heathen, that I might be their God: I am the LORD.

26:46 These are the statutes and judgments and laws, which the LORD made between him and the children of Israel in mount Sinai by the hand of Moses.

27:1 And the LORD spake unto Moses, saying, 27:2 Speak unto the children of Israel, and say unto them, When a man shall make a singular vow, the persons shall be for the LORD by thy estimation.

27:3 And thy estimation shall be of the male from twenty years old even unto sixty years old, even thy estimation shall be fifty shekels of silver, after the shekel of the sanctuary.

27:4 And if it be a female, then thy estimation shall be thirty shekels.

27:5 And if it be from five years old even unto twenty years old, then thy estimation shall be of the male twenty shekels, and for the female ten shekels.

27:6 And if it be from a month old even unto five years old, then thy estimation shall be of the male five shekels of silver, and for the female thy estimation shall be three shekels of silver.

27:7 And if it be from sixty years old and above; if it be a male, then thy estimation shall be fifteen shekels, and for the female ten shekels.

27:8 But if he be poorer than thy estimation, then he shall present himself before the priest, and the priest shall value him; according to his ability that vowed shall the priest value him.

27:9 And if it be a beast, whereof men bring an offering unto the LORD, all that any man giveth of such unto the LORD shall be holy.

27:10 He shall not alter it, nor change it, a good for a bad, or a bad for a good: and if he shall at all change beast for beast, then it and the exchange thereof shall be holy.

27:11 And if it be any unclean beast, of which they do not offer a sacrifice unto the LORD, then he shall present the beast before the priest: 27:12 And the priest shall value it, whether it be good or bad: as thou valuest it, who art the priest, so shall it be.

27:13 But if he will at all redeem it, then he shall add a fifth part thereof unto thy estimation.

27:14 And when a man shall sanctify his house to be holy unto the LORD, then the priest shall estimate it, whether it be good or bad: as the priest shall estimate it, so shall it stand.

27:15 And if he that sanctified it will redeem his house, then he shall add the fifth part of the money of thy estimation unto it, and it shall be his.

27:16 And if a man shall sanctify unto the LORD some part of a field of his possession, then thy estimation shall be according to the seed thereof: an homer of barley seed shall be valued at fifty shekels of silver.

27:17 If he sanctify his field from the year of jubile, according to thy estimation it shall stand.

27:18 But if he sanctify his field after the jubile, then the priest shall reckon unto him the money according to the years that remain, even unto the year of the jubile, and it shall be abated from thy estimation.

27:19 And if he that sanctified the field will in any wise redeem it, then he shall add the fifth part of the money of thy estimation unto it, and it shall be assured to him.

27:20 And if he will not redeem the field, or if he have sold the field to another man, it shall not be redeemed any more.

27:21 But the field, when it goeth out in the jubile, shall be holy unto the LORD, as a field devoted; the possession thereof shall be the priest’s.

27:22 And if a man sanctify unto the LORD a field which he hath bought, which is not of the fields of his possession; 27:23 Then the priest shall reckon unto him the worth of thy estimation, even unto the year of the jubile: and he shall give thine estimation in that day, as a holy thing unto the LORD.

27:24 In the year of the jubile the field shall return unto him of whom it was bought, even to him to whom the possession of the land did belong.

27:25 And all thy estimations shall be according to the shekel of the sanctuary: twenty gerahs shall be the shekel.

27:26 Only the firstling of the beasts, which should be the LORD’s firstling, no man shall sanctify it; whether it be ox, or sheep: it is the LORD’s.

27:27 And if it be of an unclean beast, then he shall redeem it according to thine estimation, and shall add a fifth part of it thereto: or if it be not redeemed, then it shall be sold according to thy estimation.

27:28 Notwithstanding no devoted thing, that a man shall devote unto the LORD of all that he hath, both of man and beast, and of the field of his possession, shall be sold or redeemed: every devoted thing is most holy unto the LORD.

27:29 None devoted, which shall be devoted of men, shall be redeemed; but shall surely be put to death.

27:30 And all the tithe of the land, whether of the seed of the land, or of the fruit of the tree, is the LORD’s: it is holy unto the LORD.

27:31 And if a man will at all redeem ought of his tithes, he shall add thereto the fifth part thereof.

27:32 And concerning the tithe of the herd, or of the flock, even of whatsoever passeth under the rod, the tenth shall be holy unto the LORD.

27:33 He shall not search whether it be good or bad, neither shall he change it: and if he change it at all, then both it and the change thereof shall be holy; it shall not be redeemed.

27:34 These are the commandments, which the LORD commanded Moses for the children of Israel in mount Sinai.

"""  # Replace with your actual text string
json_output = format_text_as_json(text, description, external_url, image, name, title, chapter)

output_filename = "Genesis.json"
write_json_to_file(json_output, output_filename)

print(f"JSON data has been written to {output_filename}")
